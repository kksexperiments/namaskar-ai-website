import posthog from 'posthog-js';

let posthogInitialized = false;

const isLikelyProjectApiKey = (key: string) => {
  const trimmed = key.trim();
  if (!trimmed) return false;

  // PostHog cloud project API keys typically use `phc_`.
  // `phx_` keys are often personal API keys and will fail in posthog-js.
  if (trimmed.startsWith('phx_')) return false;
  if (trimmed.startsWith('phc_')) return true;

  // Support older/self-hosted keys without prefixes.
  return /^[a-zA-Z0-9]{16,}$/.test(trimmed);
};

const getPosthogHost = () => {
  const configured = import.meta.env.VITE_POSTHOG_HOST?.trim();
  return configured || 'https://us.i.posthog.com';
};

export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    const posthogKey = import.meta.env.VITE_POSTHOG_KEY?.trim();
    const posthogHost = getPosthogHost();

    if (posthogKey && isLikelyProjectApiKey(posthogKey)) {
      posthogInitialized = true;
      posthog.init(posthogKey, {
        api_host: posthogHost,
        autocapture: true, // Automatically capture clicks, pageviews, etc.
        capture_pageview: true,
        persistence: 'localStorage',
      });
    } else {
      posthogInitialized = false;
      if (import.meta.env.DEV && posthogKey) {
        console.warn('PostHog disabled: VITE_POSTHOG_KEY does not look like a project API key.');
      }
    }
  }
};

// Custom event tracking
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (!posthogInitialized) return;
  posthog.capture(eventName, properties);
};

// User identification
export const identifyUser = (userId: string, properties?: Record<string, unknown>) => {
  if (!posthogInitialized) return;
  posthog.identify(userId, properties);
};

// Page tracking helper (PostHog does this automatically, but manual tracking is good for SPAs)
export const trackPageView = (url: string) => {
  if (!posthogInitialized) return;
  posthog.capture('$pageview', {
    $current_url: url,
  });
};
