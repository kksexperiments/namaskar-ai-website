import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import { getSiteUrl, toAbsoluteSiteUrl } from "./lib/site";
import "./index.css";

const applyInitialSeoHost = () => {
    const siteUrl = getSiteUrl();
    const rootUrl = toAbsoluteSiteUrl("/", siteUrl);
    const ogImageUrl = toAbsoluteSiteUrl("/og-image.png", siteUrl);
    const logoUrl = toAbsoluteSiteUrl("/logo.png", siteUrl);

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

    const schema = document.getElementById("org-schema");
    if (!schema?.textContent) {
        return;
    }

    try {
        const parsed = JSON.parse(schema.textContent) as Record<string, unknown>;
        parsed.url = rootUrl;
        parsed.logo = logoUrl;
        schema.textContent = JSON.stringify(parsed);
    } catch {
        // Keep static schema if parsing fails.
    }
};

applyInitialSeoHost();

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
