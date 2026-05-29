const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as
  | string
  | undefined;
const TRACKING_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as
  | string
  | undefined;

let loaderPromise: Promise<typeof google> | null = null;

declare global {
  interface Window {
    __mtlInitMap?: () => void;
    google: typeof google;
  }
}

/** Loads the Google Maps JS API once. Safe to call multiple times. */
export function loadGoogleMaps(): Promise<typeof google> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }
  if (loaderPromise) return loaderPromise;
  if (!BROWSER_KEY) {
    return Promise.reject(new Error("Missing VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"));
  }

  loaderPromise = new Promise((resolve, reject) => {
    window.__mtlInitMap = () => resolve(window.google);

    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: BROWSER_KEY,
      loading: "async",
      callback: "__mtlInitMap",
      libraries: "places,marker",
      v: "weekly",
    });
    if (TRACKING_ID) params.set("channel", TRACKING_ID);
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      loaderPromise = null;
      reject(new Error("Failed to load Google Maps JS API"));
    };
    document.head.appendChild(script);
  });

  return loaderPromise;
}