import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSiteUrl, toAbsoluteSiteUrl } from "@/lib/site";

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
    const resolvedPath =
      typeof window !== "undefined" ? `${location.pathname}${location.search}` : path;
    const canonicalUrl = toAbsoluteSiteUrl(resolvedPath, siteUrl);
    const imageUrl = toAbsoluteSiteUrl(image, siteUrl);

    document.title = title;
    document.documentElement.lang = language;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

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
    upsertStructuredData(structuredData);
  }, [description, image, keywords, language, location.pathname, location.search, path, robots, structuredData, title, type]);

  return null;
};

export default Seo;
