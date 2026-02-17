import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const FEED_PATH = path.join(process.cwd(), "src", "data", "newsHubFeed.ts");
const execFileAsync = promisify(execFile);

const truthy = (value) => value === "1" || value === "true" || value === "TRUE";

const shouldRunValidation = () => {
  if (truthy(process.env.SKIP_NEWS_LINK_VALIDATION)) {
    console.log("[news-links] Skipping validation: SKIP_NEWS_LINK_VALIDATION is set.");
    return false;
  }

  if (truthy(process.env.RUN_NEWS_LINK_VALIDATION)) {
    return true;
  }

  // Default: do not enforce automatically because many news sites return false negatives
  // (403/404/redirects) to non-browser HTTP clients. Run explicitly in CI when desired.
  return false;
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
    if (id === "unique-id") {
      continue;
    }

    items.push({ id, sourceName, sourceUrl });
  }

  if (items.length === 0) {
    throw new Error(`No NEWS_FEED_ITEMS parsed from ${FEED_PATH}. Validator cannot proceed.`);
  }

  return items;
};

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

const validateUrl = async ({ url, label }) => {
  const attempts = Math.max(1, Number.parseInt(process.env.NEWS_LINK_VALIDATION_RETRIES ?? "2", 10) || 2);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const validateWithCurl = async () => {
    const userAgent =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";
    const args = [
      "-sS",
      "-L",
      "-A",
      userAgent,
      // Try to look like a normal browser request to reduce false negatives from WAF/bot rules.
      "-H",
      "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "-H",
      "Accept-Language: en-US,en;q=0.9",
      "-H",
      "Cache-Control: no-cache",
      "--compressed",
      "--max-redirs",
      "8",
      "--connect-timeout",
      "12",
      "--max-time",
      "30",
      "-o",
      "/dev/null",
      "-w",
      "%{http_code}|%{url_effective}",
      url,
    ];

    const { stdout } = await execFileAsync("curl", args, {
      timeout: 35000,
      maxBuffer: 1024 * 1024,
    });

    const trimmed = String(stdout ?? "").trim();
    const [statusText, effectiveUrl] = trimmed.split("|");
    const status = Number.parseInt(statusText, 10);

    if (!Number.isFinite(status)) {
      throw new Error(`Unexpected curl output: ${trimmed}`);
    }

    return {
      ok: status === 200,
      status,
      url,
      effectiveUrl: effectiveUrl || url,
      label,
    };
  };

  const validateWithFetch = async () => {
    const headers = {
      // "Browser-ish" UA to reduce false negatives from anti-bot rules.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers,
      signal: AbortSignal.timeout(25000),
    });

    // Avoid holding open streams in Node fetch.
    response.body?.cancel();

    return {
      ok: response.status === 200,
      status: response.status,
      url,
      effectiveUrl: response.url || url,
      label,
    };
  };

  const shouldPreferCurl = process.env.NEWS_LINK_VALIDATION_METHOD
    ? process.env.NEWS_LINK_VALIDATION_METHOD === "curl"
    : true;

  const errors = [];

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      if (shouldPreferCurl) {
        const result = await validateWithCurl();
        if (result.ok && isHomepageRedirect(result.url, result.effectiveUrl)) {
          return {
            ...result,
            ok: false,
            reason: "Redirected to homepage (likely missing exact article URL).",
          };
        }
        return result;
      }

      const result = await validateWithFetch();
      if (result.ok && isHomepageRedirect(result.url, result.effectiveUrl)) {
        return {
          ...result,
          ok: false,
          reason: "Redirected to homepage (likely missing exact article URL).",
        };
      }
      return result;
    } catch (error) {
      const message =
        error && typeof error === "object" && "cause" in error && error.cause
          ? `${String(error)} (cause=${String(error.cause)})`
          : String(error);
      errors.push(message);

      // Backoff with jitter to reduce transient network flakiness on CI.
      if (attempt < attempts) {
        await sleep(350 * attempt + Math.floor(Math.random() * 250));
      }
    }
  }

  return {
    ok: false,
    status: null,
    url,
    effectiveUrl: url,
    label,
    error: errors.join(" | "),
  };
};

const run = async () => {
  if (!shouldRunValidation()) {
    return;
  }

  const rawTs = await fs.readFile(FEED_PATH, "utf8");
  const items = extractNewsItems(rawTs);

  const invalidItems = items.filter((item) => !normalizeUrl(item.sourceUrl));
  if (invalidItems.length > 0) {
    console.error("[news-links] Invalid sourceUrl values detected:");
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
  const concurrency = Number.parseInt(process.env.NEWS_LINK_VALIDATION_CONCURRENCY ?? "4", 10) || 4;

  console.log(`[news-links] Validating ${uniqueUrls.length} source links (concurrency=${concurrency})...`);

  const results = await mapWithConcurrency(
    uniqueUrls.map((url) => ({
      url,
      label: urlToItems
        .get(url)
        ?.map((item) => `${item.id} (${item.sourceName})`)
        .join(", "),
    })),
    concurrency,
    validateUrl,
  );

  const failures = results.filter((result) => !result.ok);
  for (const result of results) {
    if (!result.ok) continue;
    if (result.effectiveUrl && result.effectiveUrl !== result.url) {
      console.log(`[news-links] OK 200 ${result.url} -> ${result.effectiveUrl}`);
    } else {
      console.log(`[news-links] OK 200 ${result.url}`);
    }
  }

  if (failures.length > 0) {
    console.error(`\n[news-links] FAILED: ${failures.length} link(s) did not resolve to HTTP 200.\n`);
    for (const failure of failures) {
      const statusLabel = failure.status === null ? "ERROR" : String(failure.status);
      console.error(`- ${statusLabel} ${failure.url}`);
      if (failure.effectiveUrl && failure.effectiveUrl !== failure.url) {
        console.error(`  -> ${failure.effectiveUrl}`);
      }
      if (failure.reason) {
        console.error(`  reason: ${failure.reason}`);
      }
      if (failure.label) {
        console.error(`  items: ${failure.label}`);
      }
      if (failure.error) {
        console.error(`  error: ${failure.error}`);
      }
    }

    console.error("\n[news-links] Fix the failing sourceUrl values in src/data/newsHubFeed.ts and redeploy.");
    process.exit(1);
  }

  console.log(`[news-links] All source links are healthy (HTTP 200).`);
};

await run();
