import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import { getSiteUrl, toAbsoluteSiteUrl } from "./lib/site";
import { initSiteTheme } from "./lib/siteTheme";
import "./index.css";

const applyInitialSeoHost = () => {
    const siteUrl = getSiteUrl();
    const rootUrl = toAbsoluteSiteUrl("/", siteUrl);
    const ogImageUrl = toAbsoluteSiteUrl("/og-image.png", siteUrl);
    const logoUrl = toAbsoluteSiteUrl("/logo.png", siteUrl);
    const normalizedSiteUrl = rootUrl.replace(/\/$/, "");

    const updateJsonLdScript = (
        scriptId: string,
        updater: (data: Record<string, unknown>) => Record<string, unknown>,
    ) => {
        const script = document.getElementById(scriptId);
        if (!script?.textContent) {
            return;
        }

        try {
            const parsed = JSON.parse(script.textContent) as Record<string, unknown>;
            script.textContent = JSON.stringify(updater(parsed));
        } catch {
            // Keep static schema if parsing fails.
        }
    };

    const canonical = document.getElementById("canonical-link");
    if (canonical) {
        canonical.setAttribute("href", rootUrl);
    }

    const ogUrlMeta = document.getElementById("og-url-meta");
    if (ogUrlMeta) {
        ogUrlMeta.setAttribute("content", rootUrl);
    }

    const ogImageMeta = document.getElementById("og-image-meta");
    if (ogImageMeta) {
        ogImageMeta.setAttribute("content", ogImageUrl);
    }

    const twitterUrlMeta = document.getElementById("twitter-url-meta");
    if (twitterUrlMeta) {
        twitterUrlMeta.setAttribute("content", rootUrl);
    }

    const twitterImageMeta = document.getElementById("twitter-image-meta");
    if (twitterImageMeta) {
        twitterImageMeta.setAttribute("content", ogImageUrl);
    }

    updateJsonLdScript("org-schema", (parsed) => ({
        ...parsed,
        "@id": `${normalizedSiteUrl}/#organization`,
        url: rootUrl,
        logo: logoUrl,
    }));

    updateJsonLdScript("website-schema", (parsed) => ({
        ...parsed,
        "@id": `${normalizedSiteUrl}/#website`,
        url: rootUrl,
        publisher: {
            "@id": `${normalizedSiteUrl}/#organization`,
        },
    }));
};

applyInitialSeoHost();
initSiteTheme();

const removeStaticSeoContent = () => {
    const staticContent = document.getElementById("seo-static-content");
    staticContent?.remove();
};

removeStaticSeoContent();

// Initialize custom analytics (PostHog)
initAnalytics();

const shouldRenderVercelAnalytics =
    import.meta.env.PROD && import.meta.env.VITE_ENABLE_VERCEL_ANALYTICS === "true";

createRoot(document.getElementById("root")!).render(
    <>
        <App />
        {shouldRenderVercelAnalytics ? <Analytics /> : null}
    </>
);
