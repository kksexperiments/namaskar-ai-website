import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSiteUrl, toAbsoluteSiteUrl } from "@/lib/site";
import { getLanguageFromPath, stripLocalePrefix, toLocalePath } from "@/lib/locale";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  robots?: string;
  type?: "website" | "article";
  language?: "en" | "as";
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const upsertMeta = (identifier: "name" | "property", key: string, content: string) => {
  const selector = `meta[${identifier}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(identifier, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const upsertAlternate = (hreflang: string, href: string) => {
  const selector = `link[rel='alternate'][hreflang='${hreflang}']`;
  let link = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const upsertStructuredData = (data?: Record<string, unknown> | Array<Record<string, unknown>>) => {
  const scriptId = "seo-structured-data";
  const existing = document.head.querySelector(`#${scriptId}`) as HTMLScriptElement | null;

  if (!data) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);

  if (!existing) {
    document.head.appendChild(script);
  }
};

const Seo = ({
  title,
  description,
  path = "/",
  image = "/og-image.png",
  keywords = [],
  robots = "index, follow",
  type = "website",
  language = "en",
  structuredData,
}: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const configuredXDefaultPath = import.meta.env.VITE_X_DEFAULT_PATH;
    const routePath = typeof window !== "undefined" ? location.pathname : path;
    const localeClusterPath = stripLocalePrefix(routePath);
    const enPath = toLocalePath(localeClusterPath, "en");
    const asPath = toLocalePath(localeClusterPath, "as");
    const canonicalPath = language === "as" ? asPath : enPath;

    const canonicalUrl = toAbsoluteSiteUrl(canonicalPath, siteUrl);
    const englishAlternateUrl = toAbsoluteSiteUrl(enPath, siteUrl);
    const assameseAlternateUrl = toAbsoluteSiteUrl(asPath, siteUrl);
    const normalizedXDefaultPath =
      typeof configuredXDefaultPath === "string" && configuredXDefaultPath.trim().length > 0
        ? configuredXDefaultPath.trim().startsWith("/")
          ? configuredXDefaultPath.trim()
          : `/${configuredXDefaultPath.trim()}`
        : null;
    const xDefaultAlternateUrl = normalizedXDefaultPath
      ? toAbsoluteSiteUrl(normalizedXDefaultPath, siteUrl)
      : englishAlternateUrl;
    const imageUrl = toAbsoluteSiteUrl(image, siteUrl);
    const htmlLanguage = getLanguageFromPath(location.pathname);

    document.title = title;
    document.documentElement.lang = htmlLanguage;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:url", canonicalUrl);
    upsertMeta("property", "twitter:url", canonicalUrl);

    if (keywords.length > 0) {
      upsertMeta("name", "keywords", keywords.join(", "));
    }

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:locale", language === "as" ? "as_IN" : "en_IN");

    upsertCanonical(canonicalUrl);
    upsertAlternate("en", englishAlternateUrl);
    upsertAlternate("as", assameseAlternateUrl);
    upsertAlternate("x-default", xDefaultAlternateUrl);
    upsertStructuredData(structuredData);
  }, [description, image, keywords, language, location.pathname, path, robots, structuredData, title, type]);

  return null;
};

export default Seo;
