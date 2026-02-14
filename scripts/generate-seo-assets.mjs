import { promises as fs } from "node:fs";
import path from "node:path";

const DEFAULT_PROD_SITE_URL = "https://www.namaskarai.in";
const DEFAULT_LOCAL_SITE_URL = "http://localhost:5173";

const normalizeSiteUrl = (value) => value.replace(/\/$/, "");

const resolveSiteUrl = () => {
  const fromEnv = process.env.VITE_SITE_URL?.trim();
  if (fromEnv) {
    return normalizeSiteUrl(fromEnv);
  }

  if (process.env.NODE_ENV === "development") {
    return DEFAULT_LOCAL_SITE_URL;
  }

  return DEFAULT_PROD_SITE_URL;
};

const siteUrl = resolveSiteUrl();
const lastmod = new Date().toISOString().slice(0, 10);

const routes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/prompt-packs", changefreq: "daily", priority: "0.95" },
  { path: "/ai-tools", changefreq: "weekly", priority: "0.9" },
  { path: "/learning-roadmaps", changefreq: "weekly", priority: "0.9" },
  { path: "/news", changefreq: "daily", priority: "0.85" },
  { path: "/privacy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms", changefreq: "yearly", priority: "0.4" },
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

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map(
    (route) => `  <url>\n    <loc>${toAbsolute(route.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
  )
  .join("\n")}\n</urlset>\n`;

const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${toAbsolute("/sitemap.xml")}\nHost: ${host}\n`;

const publicDir = path.join(process.cwd(), "public");

await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
await fs.writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`[seo] Generated robots.txt and sitemap.xml for ${siteUrl}`);
