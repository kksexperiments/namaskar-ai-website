import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Language, content } from "@/types/language";
import { getLanguageFromPath, toLocalePath } from "@/lib/locale";

const LANGUAGE_STORAGE_KEY = "namaskar-ai-language";
const MODAL_SHOWN_KEY = "namaskar-ai-modal-shown";

export const useLanguage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = getLanguageFromPath(location.pathname);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore localStorage write issues.
    }
  }, [language]);

  useEffect(() => {
    let modalShown = null;

    try {
      modalShown = localStorage.getItem(MODAL_SHOWN_KEY);
    } catch {
      modalShown = "true";
    }

    if (!modalShown) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    let preferredLanguage: Language | null = null;

    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (savedLanguage === "en" || savedLanguage === "as") {
        preferredLanguage = savedLanguage;
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.includes("as") || browserLang.includes("assamese")) {
          preferredLanguage = "as";
        }
      }
    } catch {
      preferredLanguage = null;
    }

    if (preferredLanguage !== "as") {
      return;
    }

    const localizedPath = toLocalePath(location.pathname, preferredLanguage);
    const targetUrl = `${localizedPath}${location.search}${location.hash}`;
    const currentUrl = `${location.pathname}${location.search}${location.hash}`;

    if (targetUrl !== currentUrl) {
      navigate(targetUrl, { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  const switchLanguage = (lang: Language) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage write issues.
    }

    const localizedPath = toLocalePath(location.pathname, lang);
    const targetUrl = `${localizedPath}${location.search}${location.hash}`;
    const currentUrl = `${location.pathname}${location.search}${location.hash}`;

    if (targetUrl !== currentUrl) {
      navigate(targetUrl);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    try {
      localStorage.setItem(MODAL_SHOWN_KEY, "true");
    } catch {
      // Ignore localStorage write issues.
    }
  };

  const t = content[language];

  return {
    language,
    switchLanguage,
    showModal,
    closeModal,
    t,
  };
};
