import posthog from 'posthog-js';

// Initialize PostHog
// Note: In a real production app, the key would come from an environment variable
// For this demo/setup, we'll set it up to handle both dev and prod
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
    const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        autocapture: true, // Automatically capture clicks, pageviews, etc.
        capture_pageview: true,
        persistence: 'localStorage',
      });
    }
  }
};

// Custom event tracking
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  posthog.capture(eventName, properties);
};

// User identification
export const identifyUser = (userId: string, properties?: Record<string, unknown>) => {
  posthog.identify(userId, properties);
};

// Page tracking helper (PostHog does this automatically, but manual tracking is good for SPAs)
export const trackPageView = (url: string) => {
  posthog.capture('$pageview', {
    $current_url: url,
  });
};
