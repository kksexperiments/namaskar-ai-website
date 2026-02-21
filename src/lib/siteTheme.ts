export const SITE_THEME_STORAGE_KEY = "namaskar-site-theme";

export const SITE_THEMES = [
  {
    id: "saffron-dawn",
    labelEn: "Saffron Dawn",
    labelAs: "চাফ্ৰন ড'ন",
    themeColor: "#f97316",
  },
  {
    id: "tea-garden",
    labelEn: "Tea Garden",
    labelAs: "চাহ বাগিছা",
    themeColor: "#2f855a",
  },
  {
    id: "river-sky",
    labelEn: "River Sky",
    labelAs: "নদীৰ আকাশ",
    themeColor: "#0f7ec9",
  },
] as const;

export type SiteTheme = (typeof SITE_THEMES)[number]["id"];

const DEFAULT_THEME: SiteTheme = "saffron-dawn";

export const isSiteTheme = (value: string | null | undefined): value is SiteTheme =>
  Boolean(value && SITE_THEMES.some((theme) => theme.id === value));

export const resolveSiteTheme = (value: string | null | undefined): SiteTheme =>
  isSiteTheme(value) ? value : DEFAULT_THEME;

const setThemeColorMeta = (theme: SiteTheme) => {
  const themeColor = SITE_THEMES.find((candidate) => candidate.id === theme)?.themeColor;
  if (!themeColor) {
    return;
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    return;
  }

  meta.setAttribute("content", themeColor);
};

export const applySiteTheme = (theme: SiteTheme) => {
  document.documentElement.setAttribute("data-site-theme", theme);
  setThemeColorMeta(theme);
};

export const getStoredSiteTheme = (): SiteTheme => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  return resolveSiteTheme(window.localStorage.getItem(SITE_THEME_STORAGE_KEY));
};

export const setStoredSiteTheme = (theme: SiteTheme) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SITE_THEME_STORAGE_KEY, theme);
  }
  applySiteTheme(theme);
};

export const initSiteTheme = () => {
  if (typeof window === "undefined") {
    return;
  }

  applySiteTheme(getStoredSiteTheme());
};
