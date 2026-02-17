import { promises as fs } from "node:fs";
import path from "node:path";

const DEFAULT_PROD_SITE_URL = "https://www.namaskarai.in";
const DEFAULT_LOCAL_SITE_URL = "http://localhost:5173";

const normalizeSiteUrl = (value) => value.replace(/\/$/, "");
const toOrigin = (value) => {
  try {
    return new URL(value).origin;
  } catch {
    return normalizeSiteUrl(value);
  }
};

const hydrateProcessEnvFromFile = async (filename) => {
  const filePath = path.join(process.cwd(), filename);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const lines = raw.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separator = trimmed.indexOf("=");
      if (separator <= 0) {
        continue;
      }

      const key = trimmed.slice(0, separator).trim();
      if (!key || process.env[key]) {
        continue;
      }

      let value = trimmed.slice(separator + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[key] = value;
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }

    console.warn(`[seo] Failed to read ${filename}: ${String(error)}`);
  }
};

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const resolveSiteUrl = () => {
  const fromEnv = process.env.VITE_SITE_URL?.trim();
  if (fromEnv) {
    return toOrigin(fromEnv);
  }

  if (process.env.NODE_ENV === "development") {
    return DEFAULT_LOCAL_SITE_URL;
  }

  return DEFAULT_PROD_SITE_URL;
};

const normalizeDate = (value) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
};

await hydrateProcessEnvFromFile(".env.local");
await hydrateProcessEnvFromFile(".env");

const resolveSupabaseConfig = () => {
  const supabaseProjectId =
    process.env.VITE_SUPABASE_PROJECT_ID?.trim() ||
    process.env.SUPABASE_PROJECT_ID?.trim();
  const supabaseUrl =
    process.env.VITE_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    (supabaseProjectId ? `https://${supabaseProjectId}.supabase.co` : undefined);
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return {
    url: supabaseUrl.replace(/\/$/, ""),
    key: supabaseKey,
  };
};

const fetchArticleRoutes = async (generatedDate) => {
  const supabase = resolveSupabaseConfig();
  if (!supabase) {
    console.log("[seo] Supabase credentials not found for sitemap article enrichment; continuing with static routes only.");
    return [];
  }

  const endpoint =
    `${supabase.url}/rest/v1/articles` +
    "?select=slug,published_at,updated_at,status" +
    "&status=eq.published" +
    "&slug=not.is.null" +
    "&order=published_at.desc";

  try {
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(10000),
      headers: {
        apikey: supabase.key,
        Authorization: `Bearer ${supabase.key}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Supabase request failed with ${response.status}`);
    }

    const rows = await response.json();
    if (!Array.isArray(rows)) {
      return [];
    }

    const articleEntries = [];

    for (const row of rows) {
      if (typeof row?.slug !== "string") {
        continue;
      }

      const slug = row.slug.trim();
      if (!slug) {
        continue;
      }

      const routeLastmod =
        normalizeDate(row.updated_at) ||
        normalizeDate(row.published_at) ||
        generatedDate;

      articleEntries.push(
        { path: `/article/${slug}`, lastmod: routeLastmod },
        { path: `/as/article/${slug}`, lastmod: routeLastmod },
      );
    }

    console.log(`[seo] Loaded ${articleEntries.length / 2} published article slugs from Supabase for sitemap enrichment.`);
    return articleEntries;
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? ` (${String(error.code)})` : "";
    const cause =
      error &&
      typeof error === "object" &&
      "cause" in error &&
      error.cause &&
      typeof error.cause === "object" &&
      "code" in error.cause
        ? ` cause=${String(error.cause.code)}`
        : "";
    console.warn(`[seo] Skipped article routes from ${supabase.url}: ${String(error)}${code}${cause}`);
    return [];
  }
};

const siteUrl = resolveSiteUrl();
const generatedDate = new Date().toISOString().slice(0, 10);

const baseRoutes = [
  "/",
  "/prompt-packs",
  "/ai-tools",
  "/learning-roadmaps",
  "/news",
  "/ai-in-assamese",
  "/chatgpt-in-assamese",
  "/ai-course-in-assamese",
  "/faq",
  "/learn-ai-in-assamese-30-days",
  "/best-ai-course-for-assamese-speakers",
  "/learning-assamese-with-ai",
  "/assamese-llm-chatbot-guide",
  "/about",
  "/contact",
  "/editorial-policy",
  "/press-collaboration",
  "/privacy",
  "/terms",
];

const llmsPrimaryLinks = [
  {
    path: "/",
    title: "Namaskar AI Home",
    summary: "Assamese-first AI learning platform with practical guides and tools.",
  },
  {
    path: "/ai-in-assamese",
    title: "AI in Assamese",
    summary: "Beginner guide for learning AI in Assamese with first-step workflows.",
  },
  {
    path: "/chatgpt-in-assamese",
    title: "ChatGPT in Assamese",
    summary: "Practical setup and day-to-day ChatGPT usage in Assamese.",
  },
  {
    path: "/ai-course-in-assamese",
    title: "AI Course in Assamese",
    summary: "Program overview with curriculum, tracks, and enrollment updates.",
  },
  {
    path: "/learn-ai-in-assamese-30-days",
    title: "Learn AI in Assamese in 30 Days",
    summary: "Structured 30-day roadmap for Assamese learners.",
  },
  {
    path: "/best-ai-course-for-assamese-speakers",
    title: "Best AI Course for Assamese Speakers",
    summary: "Free vs paid vs cohort comparison with clear selection criteria.",
  },
  {
    path: "/learning-assamese-with-ai",
    title: "Learning Assamese with AI",
    summary: "Use AI for Assamese vocabulary, speaking practice, and grammar support.",
  },
  {
    path: "/assamese-llm-chatbot-guide",
    title: "Assamese LLM and Chatbot Guide",
    summary: "Implementation guide for Assamese chatbot and LLM use-cases.",
  },
  {
    path: "/about",
    title: "About Namaskar AI",
    summary: "Mission, principles, and Assam-focused AI education approach.",
  },
  {
    path: "/contact",
    title: "Contact Namaskar AI",
    summary: "Support, collaboration, and media contact channels.",
  },
  {
    path: "/faq",
    title: "Assamese AI FAQ",
    summary: "Direct answers to common AI-learning questions from Assamese audiences.",
  },
  {
    path: "/editorial-policy",
    title: "Editorial Policy",
    summary: "Source standards, fact-check workflow, and correction policy.",
  },
  {
    path: "/press-collaboration",
    title: "Press and Collaboration",
    summary: "Media contact, guest post topics, and collaboration workflow.",
  },
];

const toAbsolute = (pathname) => {
  try {
    return new URL(pathname, `${siteUrl}/`).toString();
  } catch {
    return `${siteUrl}${pathname}`;
  }
};

const host = (() => {
  try {
    return new URL(siteUrl).host;
  } catch {
    return siteUrl.replace(/^https?:\/\//, "");
  }
})();

const baseRouteEntries = [
  ...baseRoutes.map((path) => ({ path, lastmod: generatedDate })),
  ...baseRoutes.map((path) => ({ path: path === "/" ? "/as/" : `/as${path}`, lastmod: generatedDate })),
];
const articleRouteEntries = await fetchArticleRoutes(generatedDate);
const routeEntries = [...baseRouteEntries, ...articleRouteEntries];
const dedupedEntries = Array.from(
  new Map(routeEntries.map((entry) => [entry.path, entry])).values(),
);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${dedupedEntries
  .map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(toAbsolute(entry.path))}</loc>\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n  </url>`,
  )
  .join("\n")}\n</urlset>\n`;

const robotsTxt =
  `User-agent: *\n` +
  `Allow: /\n` +
  `Disallow: /admin\n` +
  `Disallow: /auth\n` +
  `Disallow: /as/admin\n` +
  `Disallow: /as/auth\n\n` +
  `Sitemap: ${toAbsolute("/sitemap.xml")}\n` +
  `Host: ${host}\n`;

const englishArticlePaths = dedupedEntries
  .map((entry) => entry.path)
  .filter((entryPath) => entryPath.startsWith("/article/"));

const llmsPrimarySection = llmsPrimaryLinks
  .map((link) => `- [${link.title}](${toAbsolute(link.path)}): ${link.summary}`)
  .join("\n");

const llmsAssameseSection = llmsPrimaryLinks
  .map((link) => {
    const localizedPath = link.path === "/" ? "/as/" : `/as${link.path}`;
    return `- [${link.title} (Assamese)](${toAbsolute(localizedPath)})`;
  })
  .join("\n");

const llmsArticleSection =
  englishArticlePaths.length > 0
    ? englishArticlePaths
        .slice(0, 25)
        .map((entryPath) => `- [${entryPath.replace("/article/", "").replace(/-/g, " ")}](${toAbsolute(entryPath)})`)
        .join("\n")
    : "- No published article routes available in this build.";

const llmsTxt =
  `# Namaskar AI\n\n` +
  `> Assamese-first practical AI learning platform focused on learners, professionals, and small businesses in Assam.\n\n` +
  `## Primary learning resources\n` +
  `${llmsPrimarySection}\n\n` +
  `## Assamese versions\n` +
  `${llmsAssameseSection}\n\n` +
  `## Published articles (latest available)\n` +
  `${llmsArticleSection}\n\n` +
  `## Crawl notes\n` +
  `- Canonical host: ${siteUrl}\n` +
  `- Sitemap: ${toAbsolute("/sitemap.xml")}\n`;

const llmsFullLines = dedupedEntries
  .map((entry) => `- [${entry.path}](${toAbsolute(entry.path)})`)
  .join("\n");

const llmsFullTxt =
  `# Namaskar AI URL Inventory\n\n` +
  `Generated: ${new Date().toISOString()}\n` +
  `Canonical host: ${siteUrl}\n` +
  `Total URLs: ${dedupedEntries.length}\n\n` +
  `## All known crawlable routes from this build\n` +
  `${llmsFullLines}\n`;

const publicDir = path.join(process.cwd(), "public");

await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
await fs.writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
await fs.writeFile(path.join(publicDir, "llms.txt"), llmsTxt, "utf8");
await fs.writeFile(path.join(publicDir, "llms-full.txt"), llmsFullTxt, "utf8");

console.log(`[seo] Generated robots.txt, sitemap.xml, llms.txt, and llms-full.txt for ${siteUrl} (${dedupedEntries.length} URLs)`);
