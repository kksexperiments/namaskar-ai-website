import { useState, useEffect } from 'react';
import { Language, content } from '@/types/language';

const LANGUAGE_STORAGE_KEY = 'namaskar-ai-language';
const MODAL_SHOWN_KEY = 'namaskar-ai-modal-shown';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [showModal, setShowModal] = useState(false);

  const applyDocumentLanguage = (lang: Language) => {
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    const modalShown = localStorage.getItem(MODAL_SHOWN_KEY);
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'as')) {
      setLanguage(savedLanguage);
      applyDocumentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('as') || browserLang.includes('assamese')) {
        setLanguage('as');
        applyDocumentLanguage('as');
      } else {
        applyDocumentLanguage('en');
      }
    }
    
    // Show modal only if not shown before
    if (!modalShown) {
      setShowModal(true);
    }
  }, []);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    applyDocumentLanguage(lang);
  };

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem(MODAL_SHOWN_KEY, 'true');
  };

  const t = content[language];

  return {
    language,
    switchLanguage,
    showModal,
    closeModal,
    t
  };
};
