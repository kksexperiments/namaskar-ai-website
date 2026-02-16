declare global {
  interface Window {
    FB?: {
      init?: (options: { xfbml?: boolean; version?: string }) => void;
      XFBML?: { parse?: (dom?: Element) => void };
    };
    fbAsyncInit?: () => void;
  }
}

let facebookSdkPromise: Promise<Window["FB"] | null> | null = null;
let facebookSdkInitialized = false;

function waitForFacebookGlobal(timeoutMs: number): Promise<Window["FB"] | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(null);
    if (window.FB?.XFBML?.parse) return resolve(window.FB);

    const startedAt = Date.now();
    const tick = () => {
      if (window.FB?.XFBML?.parse) return resolve(window.FB);
      if (Date.now() - startedAt > timeoutMs) return resolve(null);
      window.setTimeout(tick, 50);
    };
    tick();
  });
}

export async function ensureFacebookSdk(
  locale: string = "en_US",
  version: string = "v19.0"
): Promise<Window["FB"] | null> {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  if (window.FB?.XFBML?.parse) return window.FB;
  if (facebookSdkPromise) return facebookSdkPromise;

  facebookSdkPromise = new Promise((resolve) => {
    // Required by the SDK/plugins. If it's missing, create it.
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.prepend(fbRoot);
    }

    const existing = document.getElementById("facebook-jssdk") as HTMLScriptElement | null;
    if (existing) {
      waitForFacebookGlobal(10_000).then(resolve);
      return;
    }

    window.fbAsyncInit = () => {
      try {
        if (!facebookSdkInitialized && window.FB?.init) {
          window.FB.init({ xfbml: true, version });
          facebookSdkInitialized = true;
        }
      } catch {
        // Ignore init failures; embeds will fall back gracefully.
      }

      resolve(window.FB ?? null);
    };

    const js = document.createElement("script");
    js.id = "facebook-jssdk";
    js.async = true;
    js.defer = true;
    js.crossOrigin = "anonymous";
    js.src = `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=${encodeURIComponent(
      version
    )}`;
    js.onerror = () => resolve(null);
    js.onload = () => {
      // If fbAsyncInit didn't fire for any reason, still attempt to resolve when FB appears.
      waitForFacebookGlobal(10_000).then(resolve);
    };

    document.body.appendChild(js);
  });

  return facebookSdkPromise;
}
