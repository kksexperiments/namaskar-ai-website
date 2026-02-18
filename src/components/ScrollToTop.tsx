import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const normalizedHash = hash?.trim();
    if (normalizedHash && normalizedHash.startsWith("#")) {
      const id = normalizedHash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        const header = document.querySelector("header") as HTMLElement | null;
        const headerOffset = header?.offsetHeight ?? 0;
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const targetTop = Math.max(0, elementTop - headerOffset - 8);
        window.scrollTo({ top: targetTop, behavior: "smooth" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
