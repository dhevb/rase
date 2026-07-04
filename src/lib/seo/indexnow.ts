import { CANONICAL_SITE_URL } from "@/config/site";

export const INDEXNOW_HOSTS = [
  "www.rase.co.in",
  "www.shikshamahakumbh.com",
] as const;

export const INDEXNOW_GLOBAL_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_BING_ENDPOINT = "https://www.bing.com/indexnow";

/** Public API path for the hosted IndexNow key (see app/api/indexnow/route.ts). */
export function indexNowKeyPath(): string {
  return "/api/indexnow";
}

export function indexNowKeyLocation(origin: string, _key?: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}${indexNowKeyPath()}`;
}

export function rewriteUrlsForHost(urls: readonly string[], host: string): string[] {
  const origin = host.startsWith("http") ? host.replace(/\/$/, "") : `https://${host}`;
  return urls.map((url) => {
    try {
      const parsed = new URL(url);
      parsed.hostname = new URL(origin).hostname;
      return parsed.href;
    } catch {
      return url;
    }
  });
}

export type IndexNowSubmitResult = {
  endpoint: string;
  host: string;
  status: number;
  ok: boolean;
  urlCount: number;
};

export async function submitIndexNowBatch(options: {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
  endpoint?: string;
}): Promise<IndexNowSubmitResult> {
  const endpoint = options.endpoint ?? INDEXNOW_GLOBAL_ENDPOINT;
  const urlList = options.urlList.slice(0, 10_000);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: options.host.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      key: options.key,
      keyLocation: options.keyLocation,
      urlList,
    }),
  });

  return {
    endpoint,
    host: options.host,
    status: res.status,
    ok: res.ok || res.status === 202,
    urlCount: urlList.length,
  };
}

export async function submitIndexNowSingleUrl(options: {
  url: string;
  key: string;
  keyLocation: string;
  endpoint?: string;
}): Promise<IndexNowSubmitResult> {
  const endpoint = options.endpoint ?? INDEXNOW_BING_ENDPOINT;
  const parsed = new URL(options.url);
  const qs = new URLSearchParams({
    url: options.url,
    key: options.key,
    keyLocation: options.keyLocation,
  });

  const res = await fetch(`${endpoint}?${qs.toString()}`, { method: "GET" });

  return {
    endpoint,
    host: parsed.hostname,
    status: res.status,
    ok: res.ok || res.status === 202,
    urlCount: 1,
  };
}

/** Priority URLs for first IndexNow + Open Graph beta pass. */
export const DISCOVERY_PRIORITY_PATHS = [
  "/",
  "/registration",
  "/introduction",
  "/departments/academic-council",
  "/downloads",
  "/noticeboard",
  "/faq",
] as const;

export function priorityDiscoveryUrls(origin: string = CANONICAL_SITE_URL): string[] {
  const base = origin.replace(/\/$/, "");
  return DISCOVERY_PRIORITY_PATHS.map((path) =>
    path === "/" ? base : `${base}${path}`
  );
}

export async function fetchSitemapUrls(origin: string): Promise<string[]> {
  const base = origin.replace(/\/$/, "");
  const res = await fetch(`${base}/sitemap.xml`, { redirect: "follow" });
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim());
  return Array.from(new Set(urls));
}
