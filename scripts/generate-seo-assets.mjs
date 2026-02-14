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

const siteUrl = resolveSiteUrl();
const lastmod = new Date().toISOString().slice(0, 10);

const routes = ["/", "/prompt-packs", "/ai-tools", "/learning-roadmaps", "/news", "/privacy", "/terms"];

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
    (route) => `  <url>\n    <loc>${escapeXml(toAbsolute(route))}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`,
  )
  .join("\n")}\n</urlset>\n`;

const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${toAbsolute("/sitemap.xml")}\nHost: ${host}\n`;

const publicDir = path.join(process.cwd(), "public");

await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
await fs.writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`[seo] Generated robots.txt and sitemap.xml for ${siteUrl}`);
