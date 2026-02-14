import { Language } from "@/types/language";

const ASSAMESE_PREFIX = "/as";

const normalizePathname = (pathname: string): string => {
  if (!pathname || pathname.trim().length === 0) {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
};

export const isAssamesePath = (pathname: string): boolean => {
  const normalized = normalizePathname(pathname);
  return normalized === ASSAMESE_PREFIX || normalized.startsWith(`${ASSAMESE_PREFIX}/`);
};

export const getLanguageFromPath = (pathname: string): Language =>
  isAssamesePath(pathname) ? "as" : "en";

export const stripLocalePrefix = (pathname: string): string => {
  const normalized = normalizePathname(pathname);

  if (normalized === ASSAMESE_PREFIX || normalized === `${ASSAMESE_PREFIX}/`) {
    return "/";
  }

  if (normalized.startsWith(`${ASSAMESE_PREFIX}/`)) {
    return normalized.slice(ASSAMESE_PREFIX.length) || "/";
  }

  return normalized;
};

export const toLocalePath = (pathname: string, language: Language): string => {
  const basePath = stripLocalePrefix(pathname);

  if (language === "as") {
    return basePath === "/" ? "/as/" : `${ASSAMESE_PREFIX}${basePath}`;
  }

  return basePath;
};
