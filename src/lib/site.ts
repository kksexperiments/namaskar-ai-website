const DEFAULT_PROD_SITE_URL = "https://www.namaskarai.in";
const DEFAULT_LOCAL_SITE_URL = "http://localhost:5173";

const normalizeSiteUrl = (value: string): string => value.trim().replace(/\/$/, "");

export const getSiteUrl = (): string => {
  const envSiteUrl = import.meta.env.VITE_SITE_URL;
  if (typeof envSiteUrl === "string" && envSiteUrl.trim().length > 0) {
    return normalizeSiteUrl(envSiteUrl);
  }

  if (import.meta.env.DEV) {
    return DEFAULT_LOCAL_SITE_URL;
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return DEFAULT_LOCAL_SITE_URL;
    }
  }

  return DEFAULT_PROD_SITE_URL;
};

export const toAbsoluteSiteUrl = (value: string, siteUrl = getSiteUrl()): string => {
  try {
    return new URL(value, `${siteUrl}/`).toString();
  } catch {
    return siteUrl;
  }
};
