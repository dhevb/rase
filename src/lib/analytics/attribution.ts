const STORAGE_KEY = "smk_attribution";

export interface AttributionBundle {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  referrer: string;
  trafficSource: string;
  deviceType: string;
  browserLanguage: string;
  screenClass: string;
}

function deviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function screenClass(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 640) return "sm";
  if (w < 1024) return "md";
  return "lg";
}

function readStoredAttribution(): AttributionBundle | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AttributionBundle;
  } catch {
    /* ignore */
  }
  return null;
}

export function captureAttribution(): AttributionBundle {
  if (typeof window === "undefined") {
    return {
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
      referrer: "",
      trafficSource: "direct",
      deviceType: "unknown",
      browserLanguage: "en",
      screenClass: "unknown",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const stored = readStoredAttribution();
  const referrer = document.referrer ?? stored?.referrer ?? "";
  const utmSource = params.get("utm_source") ?? stored?.utmSource ?? "";
  const utmMedium = params.get("utm_medium") ?? stored?.utmMedium ?? "";
  const utmCampaign = params.get("utm_campaign") ?? stored?.utmCampaign ?? "";
  const utmTerm = params.get("utm_term") ?? stored?.utmTerm ?? "";
  const utmContent = params.get("utm_content") ?? stored?.utmContent ?? "";
  const refTag = params.get("ref") ?? "";

  const bundle: AttributionBundle = {
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    referrer,
    trafficSource:
      utmSource ||
      refTag ||
      (referrer ? referrer.split("/")[2] ?? "" : "") ||
      stored?.trafficSource ||
      "direct",
    deviceType: deviceType(),
    browserLanguage: navigator.language ?? "en",
    screenClass: screenClass(),
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
  return bundle;
}

export function getAttribution(): AttributionBundle {
  if (typeof window === "undefined") {
    return captureAttribution();
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AttributionBundle;
  } catch {
    /* ignore */
  }
  return captureAttribution();
}

export function attributionForSubmission(): Record<string, string> {
  const a = getAttribution();
  return {
    trafficSource: a.trafficSource,
    utmSource: a.utmSource,
    utmMedium: a.utmMedium,
    utmCampaign: a.utmCampaign,
    utmTerm: a.utmTerm,
    utmContent: a.utmContent,
    deviceType: a.deviceType,
    browserLanguage: a.browserLanguage,
    screenClass: a.screenClass,
  };
}
