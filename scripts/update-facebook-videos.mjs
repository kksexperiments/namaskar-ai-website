import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_JSON_PATH = "src/content/facebookVideos.json";
const DEFAULT_PROFILE_REELS_URL =
  "https://www.facebook.com/people/NamaskarAI/61578782241757/?sk=reels_tab";

function getArgValue(argv, name) {
  const index = argv.indexOf(name);
  if (index === -1) return null;
  return argv[index + 1] ?? null;
}

function getNumberEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function reelIdFromUrl(url) {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/\/reel\/(\d+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function canonicalReelUrl(id) {
  return `https://www.facebook.com/reel/${id}/`;
}

function extractReelIds(html) {
  const ids = [];
  const seen = new Set();

  const pushId = (id) => {
    if (!id) return;
    if (seen.has(id)) return;
    seen.add(id);
    ids.push(id);
  };

  // Absolute URLs
  {
    const re = /https?:\/\/(?:www\.)?facebook\.com\/reel\/(\d+)/g;
    let match;
    while ((match = re.exec(html))) pushId(match[1]);
  }

  // Relative URLs
  {
    const re = /\/reel\/(\d+)/g;
    let match;
    while ((match = re.exec(html))) pushId(match[1]);
  }

  return ids;
}

async function fetchText(url, timeoutMs = 25_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Helps avoid some bot blocks / locale quirks.
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText} (${url})`);
    }
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function assertUrlLoads(url, timeoutMs = 15_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        accept: "text/html,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) throw new Error(`Non-OK: ${res.status} ${url}`);
    return true;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const argv = process.argv.slice(2);

  const jsonPath =
    getArgValue(argv, "--json") ||
    process.env.FACEBOOK_VIDEOS_JSON_PATH ||
    DEFAULT_JSON_PATH;

  const profileUrl =
    getArgValue(argv, "--profile-url") ||
    process.env.FACEBOOK_PROFILE_REELS_URL ||
    DEFAULT_PROFILE_REELS_URL;

  const embedCount = getNumberEnv("FACEBOOK_EMBED_COUNT", 6);
  const pinnedCount = getNumberEnv("FACEBOOK_PINNED_COUNT", 3);

  if (pinnedCount >= embedCount) {
    throw new Error(
      `Invalid config: FACEBOOK_PINNED_COUNT (${pinnedCount}) must be < FACEBOOK_EMBED_COUNT (${embedCount}).`
    );
  }

  const absJsonPath = path.resolve(process.cwd(), jsonPath);
  const raw = await fs.readFile(absJsonPath, "utf8");
  const current = JSON.parse(raw);

  if (!Array.isArray(current)) {
    throw new Error(`Invalid JSON: expected array in ${jsonPath}`);
  }

  const pinned = current.slice(0, pinnedCount);
  const pinnedUrls = pinned.map((v) => String(v?.url ?? "").trim());
  const pinnedIds = new Set(pinnedUrls.map(reelIdFromUrl).filter(Boolean));

  if (pinnedUrls.some((u) => !u)) {
    throw new Error(
      `Pinned videos missing url. Fill the first ${pinnedCount} items in ${jsonPath} before running this updater.`
    );
  }

  // Fetch reels page HTML and extract reel IDs
  const html = await fetchText(profileUrl);
  const ids = extractReelIds(html);

  const candidates = ids
    .filter((id) => !pinnedIds.has(id))
    .map((id) => canonicalReelUrl(id));

  const needed = embedCount - pinnedCount;
  if (candidates.length < needed) {
    throw new Error(
      `Not enough reel links found on profile page. Needed ${needed}, found ${candidates.length}. URL: ${profileUrl}`
    );
  }

  // Validate candidates actually load (helps avoid dead/redirect-only links).
  const validated = [];
  for (const url of candidates) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await assertUrlLoads(url);
      validated.push(url);
      if (validated.length >= needed) break;
    } catch {
      // Skip invalid URLs
    }
  }

  if (validated.length < needed) {
    throw new Error(
      `Not enough valid reel URLs after validation. Needed ${needed}, got ${validated.length}.`
    );
  }

  const existingByUrl = new Map();
  for (const item of current) {
    const u = String(item?.url ?? "").trim();
    if (u) existingByUrl.set(u.replace(/\/+$/, "/"), item);
  }

  const autoItems = validated.slice(0, needed).map((url, i) => {
    const normalized = url.replace(/\/+$/, "/");
    const existing = existingByUrl.get(normalized);
    if (existing) return existing;
    return {
      title: `Namaskar AI Reel (Auto) ${i + 1}`,
      url: normalized,
      publishedAt: "",
    };
  });

  const next = [...pinned, ...autoItems];
  const output = JSON.stringify(next, null, 2) + "\n";
  await fs.writeFile(absJsonPath, output, "utf8");

  process.stdout.write(
    `[facebook-videos] Updated ${jsonPath}: pinned=${pinnedCount}, auto=${needed}\n`
  );
}

main().catch((err) => {
  process.stderr.write(`[facebook-videos] ERROR: ${err?.message ?? String(err)}\n`);
  process.exit(1);
});

