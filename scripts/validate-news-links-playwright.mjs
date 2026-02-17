import { promises as fs } from "node:fs";
import path from "node:path";

const FEED_PATH = path.join(process.cwd(), "src", "data", "newsHubFeed.ts");

const truthy = (value) => value === "1" || value === "true" || value === "TRUE";

const normalizeUrl = (value) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
};

const extractNewsItems = (rawTs) => {
  const startToken = "export const NEWS_FEED_ITEMS";
  const startIndex = rawTs.indexOf(startToken);
  if (startIndex === -1) {
    throw new Error(`Unable to locate ${startToken} in ${FEED_PATH}`);
  }

  const section = rawTs.slice(startIndex);
  const endIndex = section.indexOf("];");
  if (endIndex === -1) {
    throw new Error(`Unable to locate end of NEWS_FEED_ITEMS array ("];") in ${FEED_PATH}`);
  }

  const itemsSection = section.slice(0, endIndex);

  const itemRegex =
    /id:\s*"([^"]+)"[\s\S]*?sourceName:\s*"([^"]+)"[\s\S]*?sourceUrl:\s*(?:\n\s*)?"([^"]+)"/g;

  const items = [];
  let match;

  while ((match = itemRegex.exec(itemsSection)) !== null) {
    const [_, id, sourceName, sourceUrl] = match;
    if (id === "unique-id") continue;
    items.push({ id, sourceName, sourceUrl });
  }

  if (items.length === 0) {
    throw new Error(`No NEWS_FEED_ITEMS parsed from ${FEED_PATH}. Validator cannot proceed.`);
  }

  return items;
};

const mapWithConcurrency = async (items, concurrency, fn) => {
  const results = new Array(items.length);
  let cursor = 0;

  const workers = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  });

  await Promise.all(workers);
  return results;
};

const normalizePath = (pathname) => {
  if (typeof pathname !== "string") return "/";
  const trimmed = pathname.trim();
  if (!trimmed) return "/";
  const withoutTrailing = trimmed.replace(/\/+$/, "");
  return withoutTrailing.length === 0 ? "/" : withoutTrailing;
};

const isHomepageRedirect = (originalUrl, effectiveUrl) => {
  try {
    const original = new URL(originalUrl);
    const effective = new URL(effectiveUrl);

    const originalPath = normalizePath(original.pathname);
    const effectivePath = normalizePath(effective.pathname);

    if (originalPath === "/") return false;

    const homepagePaths = new Set(["/", "/home", "/index", "/index.html"]);
    return homepagePaths.has(effectivePath.toLowerCase());
  } catch {
    return false;
  }
};

const looksLikeNotFound = (title, bodyText) => {
  const hay = `${title}\n${bodyText}`.toLowerCase();
  const patterns = [
    "404",
    "page not found",
    "not found",
    "we can't find",
    "doesn't exist",
    "this page is unavailable",
    "requested url was not found",
  ];
  return patterns.some((pattern) => hay.includes(pattern));
};

const looksLikeBotOrConsent = (finalUrl, title, bodyText) => {
  const hay = `${finalUrl}\n${title}\n${bodyText}`.toLowerCase();
  const patterns = [
    "captcha",
    "access denied",
    "verify you are human",
    "unusual traffic",
    "cloudflare",
    "/cdn-cgi/",
    "consent",
    "accept cookies",
    "enable cookies",
    "temporarily unavailable",
    "request blocked",
  ];
  return patterns.some((pattern) => hay.includes(pattern));
};

const validateWithPlaywright = async ({ context }, { url, label }) => {
  const timeoutMs = Number.parseInt(process.env.NEWS_LINK_VALIDATION_TIMEOUT_MS ?? "45000", 10) || 45000;
  const page = await context.newPage();
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: timeoutMs });

    // Allow short client-side redirects (common on large media sites).
    await page.waitForTimeout(1200);

    const finalUrl = page.url();
    const status = response ? response.status() : null;

    const title = await page.title().catch(() => "");
    const bodyText = await page
      .evaluate(() => (document?.body?.innerText || "").slice(0, 5000))
      .catch(() => "");

    if (status !== null && status >= 400 && status !== 401 && status !== 403 && status !== 429) {
      return {
        ok: false,
        level: "FAIL",
        url,
        finalUrl,
        status,
        label,
        reason: `HTTP ${status}`,
      };
    }

    if (finalUrl && isHomepageRedirect(url, finalUrl)) {
      return {
        ok: false,
        level: "FAIL",
        url,
        finalUrl,
        status,
        label,
        reason: "Redirected to homepage (likely missing exact article URL).",
      };
    }

    if (status === 200 && looksLikeNotFound(title, bodyText)) {
      return {
        ok: false,
        level: "FAIL",
        url,
        finalUrl,
        status,
        label,
        reason: "Page looks like 404 / not-found content.",
      };
    }

    if (status === 401 || status === 403 || status === 429 || looksLikeBotOrConsent(finalUrl, title, bodyText)) {
      return {
        ok: true,
        level: "WARN",
        url,
        finalUrl,
        status,
        label,
        reason: "Possible bot-block/captcha/consent/paywall detected (link may still work for real users).",
      };
    }

    if (status !== null && status !== 200) {
      // Some sites return 3xx/204 etc for navigations; treat as warning to avoid false fails.
      return {
        ok: true,
        level: "WARN",
        url,
        finalUrl,
        status,
        label,
        reason: `Unexpected HTTP status ${status} (not 200).`,
      };
    }

    return {
      ok: true,
      level: "OK",
      url,
      finalUrl,
      status,
      label,
    };
  } catch (error) {
    const message =
      error && typeof error === "object" && "cause" in error && error.cause
        ? `${String(error)} (cause=${String(error.cause)})`
        : String(error);

    return {
      ok: false,
      level: "FAIL",
      url,
      finalUrl: url,
      status: null,
      label,
      reason: "Navigation failed.",
      error: message,
    };
  } finally {
    await page.close().catch(() => undefined);
  }
};

const run = async () => {
  const rawTs = await fs.readFile(FEED_PATH, "utf8");
  const items = extractNewsItems(rawTs);

  const invalidItems = items.filter((item) => !normalizeUrl(item.sourceUrl));
  if (invalidItems.length > 0) {
    console.error("[news-links-pw] Invalid sourceUrl values detected:");
    for (const item of invalidItems) {
      console.error(`- ${item.id} (${item.sourceName}): ${item.sourceUrl}`);
    }
    process.exit(1);
  }

  const urlToItems = new Map();
  for (const item of items) {
    const url = normalizeUrl(item.sourceUrl);
    if (!url) continue;
    const list = urlToItems.get(url) ?? [];
    list.push(item);
    urlToItems.set(url, list);
  }

  const uniqueUrls = Array.from(urlToItems.keys());
  const concurrency = Number.parseInt(process.env.NEWS_LINK_VALIDATION_CONCURRENCY ?? "3", 10) || 3;

  if (truthy(process.env.NEWS_LINK_VALIDATION_DRY_RUN)) {
    console.log(`[news-links-pw] Dry run: ${uniqueUrls.length} URLs parsed from src/data/newsHubFeed.ts`);
    for (const url of uniqueUrls) console.log(`- ${url}`);
    return;
  }

  let playwright;
  try {
    playwright = await import("playwright");
  } catch (error) {
    console.error(
      "[news-links-pw] Playwright is not installed. In CI, install it with `npm install --no-save playwright` (then `npx playwright install chromium`).",
    );
    console.error(`[news-links-pw] import error: ${String(error)}`);
    process.exit(2);
  }

  console.log(`[news-links-pw] Validating ${uniqueUrls.length} source links with Playwright (concurrency=${concurrency})...`);

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    locale: "en-US",
  });

  // Speed up validation and reduce noisy failures due to heavy media payloads.
  await context.route("**/*", (route) => {
    const type = route.request().resourceType();
    if (type === "image" || type === "stylesheet" || type === "font") {
      return route.abort();
    }
    return route.continue();
  });

  let results = [];
  try {
    results = await mapWithConcurrency(
      uniqueUrls.map((url) => ({
        url,
        label: urlToItems
          .get(url)
          ?.map((item) => `${item.id} (${item.sourceName})`)
          .join(", "),
      })),
      concurrency,
      async (task) => validateWithPlaywright({ context }, task),
    );
  } finally {
    await context.close().catch(() => undefined);
    await browser.close().catch(() => undefined);
  }

  const warnings = results.filter((result) => result.level === "WARN");
  const failures = results.filter((result) => result.level === "FAIL");

  for (const result of results) {
    const arrow = result.finalUrl && result.finalUrl !== result.url ? ` -> ${result.finalUrl}` : "";
    const status = result.status === null ? "ERR" : String(result.status);
    if (result.level === "OK") {
      console.log(`[news-links-pw] OK   ${status} ${result.url}${arrow}`);
      continue;
    }
    if (result.level === "WARN") {
      console.log(`[news-links-pw] WARN ${status} ${result.url}${arrow}`);
      if (result.reason) console.log(`  reason: ${result.reason}`);
      continue;
    }
    console.error(`[news-links-pw] FAIL ${status} ${result.url}${arrow}`);
    if (result.reason) console.error(`  reason: ${result.reason}`);
    if (result.label) console.error(`  items: ${result.label}`);
    if (result.error) console.error(`  error: ${result.error}`);
  }

  if (warnings.length > 0) {
    console.log(`\n[news-links-pw] WARNINGS: ${warnings.length} link(s) may be blocked by consent/captcha/paywall.`);
    console.log("[news-links-pw] If these are real-user accessible, you can ignore warnings; otherwise, switch sources.");
  }

  if (failures.length > 0) {
    console.error(`\n[news-links-pw] FAILED: ${failures.length} link(s) are broken for users (404/homepage redirect/timeouts).\n`);
    console.error("[news-links-pw] Fix the failing sourceUrl values in src/data/newsHubFeed.ts and rerun.");
    process.exit(1);
  }

  const failOnWarn = truthy(process.env.NEWS_LINK_VALIDATION_FAIL_ON_WARN);
  if (failOnWarn && warnings.length > 0) {
    console.error(`\n[news-links-pw] FAIL_ON_WARN enabled and ${warnings.length} warning(s) detected.\n`);
    process.exit(1);
  }

  console.log(`[news-links-pw] All source links passed (failures=0, warnings=${warnings.length}).`);
};

await run();
