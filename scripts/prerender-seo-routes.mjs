import { promises as fs } from "node:fs";
import path from "node:path";

const DEFAULT_PROD_SITE_URL = "https://www.namaskarai.in";
const DEFAULT_LOCAL_SITE_URL = "http://localhost:5173";

const EN_ROUTES = ["/", "/prompt-packs", "/ai-tools", "/learning-roadmaps", "/news", "/privacy", "/terms"];
const ROUTE_SEO_COPY = {
  "/": {
    en: {
      title: "Namaskar AI | Learn AI in Assamese",
      description:
        "Learn AI in Assamese with practical prompt packs, AI tools, roadmaps, and community-first guidance for students, professionals, parents, and small businesses.",
    },
    as: {
      title: "নমস্কাৰ AI | অসমীয়াত AI শিকক",
      description:
        "অসমীয়া ভাষাত আপুনি practical prompt pack, AI tool, learning roadmap আৰু community guidance-ৰ সহায়ত সহজে AI শিকিব পাৰে।",
    },
  },
  "/prompt-packs": {
    en: {
      title: "AI Prompt Packs | Namaskar AI",
      description:
        "Copy-ready AI prompt packs for career, study, business, and family workflows in Assamese and English.",
    },
    as: {
      title: "AI প্ৰম্প্ট পেক | নমস্কাৰ AI",
      description:
        "কৰ্মজীৱন, পঢ়া-শুনা, ব্যৱসায় আৰু পৰিয়ালৰ বাবে অসমীয়া-ইংৰাজী copy-ready AI prompt pack একেলগে পাওক।",
    },
  },
  "/ai-tools": {
    en: {
      title: "AI Tools Library | Namaskar AI",
      description:
        "Explore practical AI tools with filters by category, pricing, and skill level for Assam-focused learners and professionals.",
    },
    as: {
      title: "AI টুল লাইব্ৰেৰী | নমস্কাৰ AI",
      description:
        "শ্ৰেণী, মূল্য আৰু skill level অনুসৰি Assamese-first ব্যৱহাৰৰ বাবে practical AI tool বাছনি কৰক।",
    },
  },
  "/learning-roadmaps": {
    en: {
      title: "Learning Roadmaps | Namaskar AI",
      description:
        "Step-by-step AI learning roadmaps for aspirers, students, parents, and small business owners in Assam.",
    },
    as: {
      title: "শিকাৰ ৰোডমেপ | নমস্কাৰ AI",
      description:
        "Aspirer, student, parent আৰু small business owner-সকলৰ বাবে ধাপে ধাপে Assamese AI learning roadmap।",
    },
  },
  "/news": {
    en: {
      title: "AI News and Guides | Namaskar AI",
      description:
        "Read AI news, explainers, and practical guides curated for Assamese learners and local use cases.",
    },
    as: {
      title: "AI খবৰ আৰু গাইড | নমস্কাৰ AI",
      description:
        "অসমীয়া শিকাৰ্থীৰ বাবে AI খবৰ, সহজ ব্যাখ্যা আৰু practical guide একেটা ঠাইত পঢ়ক।",
    },
  },
  "/privacy": {
    en: {
      title: "Privacy Policy | Namaskar AI",
      description:
        "Read how Namaskar AI collects, uses, and protects your data across learning resources and newsletter updates.",
    },
    as: {
      title: "গোপনীয়তা নীতি | নমস্কাৰ AI",
      description:
        "নমস্কাৰ AI-এ আপোনাৰ তথ্য কেনেকৈ সংগ্ৰহ, ব্যৱহাৰ আৰু সুৰক্ষিত ৰাখে তাৰ স্পষ্ট গোপনীয়তা নীতি পঢ়ক।",
    },
  },
  "/terms": {
    en: {
      title: "Terms of Service | Namaskar AI",
      description:
        "Review platform usage rules, responsibilities, and terms for using Namaskar AI resources.",
    },
    as: {
      title: "সেৱাৰ শর্তসমূহ | নমস্কাৰ AI",
      description:
        "নমস্কাৰ AI সম্পদ ব্যৱহাৰৰ নিয়ম, দায়বদ্ধতা আৰু প্লেটফৰ্ম শর্তসমূহ ইয়াত চাওক।",
    },
  },
};

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
const escapeAttribute = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const escapeText = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

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

const upsertTitle = (html, title) => {
  const escapedTitle = escapeText(title);
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapedTitle}</title>`);
  }

  return html.replace("</head>", `  <title>${escapedTitle}</title>\n</head>`);
};

const upsertMeta = (html, identifier, key, content) => {
  const escapedContent = escapeAttribute(content);
  const selector = new RegExp(`<meta[^>]*${identifier}=["']${escapeRegex(key)}["'][^>]*>`, "gi");
  const sanitized = html.replace(selector, "");
  return sanitized.replace("</head>", `  <meta ${identifier}="${key}" content="${escapedContent}" />\n</head>`);
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
  const copySet = ROUTE_SEO_COPY[clusterBasePath] ?? ROUTE_SEO_COPY["/"];
  const pageCopy = copySet[pageLanguage];

  let html = templateHtml;
  html = upsertHtmlLang(html, pageLanguage);
  html = upsertTitle(html, pageCopy.title);
  html = upsertMeta(html, "name", "description", pageCopy.description);
  html = upsertMeta(html, "property", "og:title", pageCopy.title);
  html = upsertMeta(html, "property", "og:description", pageCopy.description);
  html = upsertMeta(html, "property", "twitter:title", pageCopy.title);
  html = upsertMeta(html, "property", "twitter:description", pageCopy.description);
  html = upsertMeta(html, "property", "og:url", canonicalUrl);
  html = upsertMeta(html, "property", "twitter:url", canonicalUrl);
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
