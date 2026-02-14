import { promises as fs } from "node:fs";
import path from "node:path";

const DEFAULT_PROD_SITE_URL = "https://www.namaskarai.in";
const DEFAULT_LOCAL_SITE_URL = "http://localhost:5173";

const EN_ROUTES = ["/", "/prompt-packs", "/ai-tools", "/learning-roadmaps", "/news", "/privacy", "/terms"];

const normalizeSiteUrl = (value) => value.trim().replace(/\/$/, "");
const normalizePathname = (pathname) => {
  if (!pathname || pathname.trim().length === 0) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
};

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

const stripLocalePrefix = (pathname) => {
  const normalized = normalizePathname(pathname);
  if (normalized === "/as" || normalized === "/as/") {
    return "/";
  }

  if (normalized.startsWith("/as/")) {
    return normalized.slice(3) || "/";
  }

  return normalized;
};

const toLocalePath = (pathname, language) => {
  const basePath = stripLocalePrefix(pathname);
  if (language === "as") {
    return basePath === "/" ? "/as/" : `/as${basePath}`;
  }

  return basePath;
};

const toAbsoluteUrl = (siteUrl, pathname) => {
  try {
    return new URL(pathname, `${siteUrl}/`).toString();
  } catch {
    return `${siteUrl}${pathname}`;
  }
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const upsertLink = (html, { rel, href, hreflang }) => {
  const attributes = hreflang
    ? `rel="${rel}" hreflang="${hreflang}" href="${href}"`
    : `rel="${rel}" href="${href}"`;

  if (hreflang) {
    const selector = `<link[^>]*rel=["']${rel}["'][^>]*hreflang=["']${hreflang}["'][^>]*>`;
    const regex = new RegExp(selector, "i");
    if (regex.test(html)) {
      return html.replace(regex, `<link ${attributes} />`);
    }
  } else {
    const selector = `<link[^>]*rel=["']${rel}["'][^>]*>`;
    const regex = new RegExp(selector, "i");
    if (regex.test(html)) {
      return html.replace(regex, `<link ${attributes} />`);
    }
  }

  return html.replace("</head>", `  <link ${attributes} />\n</head>`);
};

const upsertHtmlLang = (html, lang) => {
  const tagRegex = /<html[^>]*>/i;
  const match = html.match(tagRegex);
  if (!match) {
    return html;
  }

  const htmlTag = match[0];
  if (/lang=["'][^"']*["']/i.test(htmlTag)) {
    return html.replace(/<html[^>]*>/i, htmlTag.replace(/lang=["'][^"']*["']/i, `lang="${lang}"`));
  }

  return html.replace(/<html/i, `<html lang="${lang}"`);
};

const routeToFile = (pathname) => {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") {
    return "index.html";
  }

  const stripped = normalized.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(stripped, "index.html");
};

const buildSeoRouteHtml = (templateHtml, siteUrl, pathname) => {
  const normalizedPath = normalizePathname(pathname);
  const pageLanguage = normalizedPath === "/as" || normalizedPath.startsWith("/as/") ? "as" : "en";
  const clusterBasePath = stripLocalePrefix(normalizedPath);

  const enPath = toLocalePath(clusterBasePath, "en");
  const asPath = toLocalePath(clusterBasePath, "as");
  const canonicalPath = pageLanguage === "as" ? asPath : enPath;

  const canonicalUrl = toAbsoluteUrl(siteUrl, canonicalPath);
  const enAlternateUrl = toAbsoluteUrl(siteUrl, enPath);
  const asAlternateUrl = toAbsoluteUrl(siteUrl, asPath);

  let html = templateHtml;
  html = upsertHtmlLang(html, pageLanguage);
  html = html.replace(new RegExp(`<link[^>]*rel=["']canonical["'][^>]*>`, "gi"), "");
  html = html.replace(new RegExp(`<link[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>`, "gi"), "");

  html = upsertLink(html, { rel: "canonical", href: canonicalUrl });
  html = upsertLink(html, { rel: "alternate", hreflang: "en", href: enAlternateUrl });
  html = upsertLink(html, { rel: "alternate", hreflang: "as", href: asAlternateUrl });
  html = upsertLink(html, { rel: "alternate", hreflang: "x-default", href: enAlternateUrl });

  // Ensure no stale canonical-link id mismatch remains from template replacement.
  html = html.replace(new RegExp(`id=["']${escapeRegex("canonical-link")}["']\\s*`, "gi"), "");

  return html;
};

const run = async () => {
  const distDir = path.join(process.cwd(), "dist");
  const sourceFile = path.join(distDir, "index.html");
  const siteUrl = resolveSiteUrl();

  const templateHtml = await fs.readFile(sourceFile, "utf8");
  const seoRoutes = [...EN_ROUTES, ...EN_ROUTES.map((route) => (route === "/" ? "/as/" : `/as${route}`))];

  for (const route of seoRoutes) {
    const renderedHtml = buildSeoRouteHtml(templateHtml, siteUrl, route);
    const outputFile = path.join(distDir, routeToFile(route));
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, renderedHtml, "utf8");
  }

  console.log(`[prerender] Generated HTML for ${seoRoutes.length} localized SEO routes (${siteUrl}).`);
};

await run();
