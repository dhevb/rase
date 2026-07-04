#!/usr/bin/env node
/**
 * IndexNow + Bing + Open Graph discovery setup for rase.co.in and shikshamahakumbh.com.
 *
 * 1. Ensures INDEXNOW_API_KEY on Vercel production (generates if missing)
 * 2. Validates IndexNow key file URL after deploy
 * 3. Submits sitemap URLs to api.indexnow.org (both hosts)
 * 4. Pings bing.com/indexnow for priority URLs
 * 5. Runs Open Graph beta validation
 *
 * Usage:
 *   node scripts/setup-discovery-indexing.mjs
 *   node scripts/setup-discovery-indexing.mjs --dry-run
 *   node scripts/setup-discovery-indexing.mjs --skip-vercel --skip-submit
 */
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const PROJECT_ID = process.env.VERCEL_PROJECT_ID ?? "prj_k6YZpm35GqkuZcYOohnXVTM0Uy9f";
const TEAM_ID = process.env.VERCEL_ORG_ID ?? "team_0PYXWQMwAV9fPWOTuxk54H9K";
const HOSTS = [
  { origin: "https://www.rase.co.in", host: "www.rase.co.in" },
  { origin: "https://www.shikshamahakumbh.com", host: "www.shikshamahakumbh.com" },
];
const CANONICAL = HOSTS[0].origin;

const dryRun = process.argv.includes("--dry-run");
const skipVercelWrite = process.argv.includes("--skip-vercel");
const skipSubmit = process.argv.includes("--skip-submit");

const AUTH_PATHS = [
  join(homedir(), "AppData", "Roaming", "xdg.data", "com.vercel.cli", "auth.json"),
  join(homedir(), ".config", "vercel", "auth.json"),
];

function loadVercelToken() {
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN;
  for (const p of AUTH_PATHS) {
    if (!existsSync(p)) continue;
    try {
      const auth = JSON.parse(readFileSync(p, "utf8"));
      if (auth.token) return auth.token;
    } catch {
      /* ignore */
    }
  }
  return null;
}

async function vercelFetch(token, path, options = {}) {
  const url = `https://api.vercel.com${path}${path.includes("?") ? "&" : "?"}teamId=${TEAM_ID}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) throw new Error(`Vercel API ${path} → ${res.status}: ${text.slice(0, 240)}`);
  return body;
}

async function listProjectEnv(token) {
  const data = await vercelFetch(token, `/v9/projects/${PROJECT_ID}/env`);
  return data.envs ?? [];
}

async function getDecryptedEnv(token, key) {
  const envs = await listProjectEnv(token);
  const entry = envs.find((e) => e.key === key);
  if (!entry) return null;
  const data = await vercelFetch(
    token,
    `/v9/projects/${PROJECT_ID}/env/${entry.id}?decrypt=true`
  );
  return data.value ?? null;
}

async function upsertProductionEnv(token, key, value) {
  if (!value) return false;
  if (dryRun) {
    console.log(`[dry-run] would set ${key} on production`);
    return true;
  }

  const envs = await listProjectEnv(token);
  const existing = envs.filter((e) => e.key === key);
  const match = existing.find((e) => e.target?.includes("production"));

  if (match) {
    await vercelFetch(token, `/v9/projects/${PROJECT_ID}/env/${match.id}`, {
      method: "PATCH",
      body: JSON.stringify({ value, target: ["production"] }),
    });
    console.log(`[ok] ${key} updated → production`);
  } else {
    await vercelFetch(token, `/v10/projects/${PROJECT_ID}/env`, {
      method: "POST",
      body: JSON.stringify({
        key,
        value,
        type: "encrypted",
        target: ["production"],
      }),
    });
    console.log(`[ok] ${key} created → production`);
  }
  return true;
}

function generateIndexNowKey() {
  return randomBytes(16).toString("hex");
}

function rewriteUrlsForHost(urls, origin) {
  const host = new URL(origin).hostname;
  return urls.map((url) => {
    const parsed = new URL(url);
    parsed.hostname = host;
    return parsed.href;
  });
}

async function fetchSitemapUrls(origin) {
  const res = await fetch(`${origin}/sitemap.xml`, { redirect: "follow" });
  if (!res.ok) throw new Error(`Sitemap ${origin} → ${res.status}`);
  const xml = await res.text();
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
}

async function validateKeyFile(origin, key) {
  const url = `${origin.replace(/\/$/, "")}/api/indexnow`;
  const res = await fetch(url, { redirect: "follow" });
  const body = res.ok ? (await res.text()).trim() : "";
  const ok = res.ok && body === key;
  console.log(ok ? `[pass] IndexNow key file ${url}` : `[fail] IndexNow key file ${url} (${res.status})`);
  return ok;
}

async function submitIndexNowBatch({ host, key, keyLocation, urlList, endpoint }) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });
  const ok = res.ok || res.status === 202;
  console.log(
    ok
      ? `[ok] IndexNow POST ${endpoint} → ${host} (${urlList.length} URLs, ${res.status})`
      : `[warn] IndexNow POST ${endpoint} → ${host} (${res.status})`
  );
  return ok;
}

async function pingBingIndexNow({ url, key, keyLocation }) {
  const qs = new URLSearchParams({ url, key, keyLocation });
  const endpoint = `https://www.bing.com/indexnow?${qs.toString()}`;
  const res = await fetch(endpoint, { method: "GET" });
  const ok = res.ok || res.status === 202;
  console.log(
    ok
      ? `[ok] Bing IndexNow GET ${url} (${res.status})`
      : `[warn] Bing IndexNow GET ${url} (${res.status})`
  );
  return ok;
}

const PRIORITY_PATHS = [
  "/",
  "/registration",
  "/introduction",
  "/departments/academic-council",
];

async function main() {
  console.log("=== Discovery indexing setup (IndexNow + Bing + Open Graph) ===\n");

  let indexNowKey = process.env.INDEXNOW_API_KEY?.trim() ?? null;
  const vercelToken = loadVercelToken();

  if (!indexNowKey && vercelToken) {
    indexNowKey = await getDecryptedEnv(vercelToken, "INDEXNOW_API_KEY");
  }

  if (!indexNowKey) {
    indexNowKey = generateIndexNowKey();
    console.log(`[info] Generated new INDEXNOW_API_KEY (${indexNowKey.slice(0, 8)}…)`);
    if (vercelToken && !skipVercelWrite) {
      await upsertProductionEnv(vercelToken, "INDEXNOW_API_KEY", indexNowKey);
      console.log("[info] Redeploy required before key file is live");
    }
  } else {
    console.log(`[info] Using INDEXNOW_API_KEY (${indexNowKey.slice(0, 8)}…)`);
  }

  let keyReady = true;
  for (const { origin } of HOSTS) {
    const ok = await validateKeyFile(origin, indexNowKey);
    if (!ok) keyReady = false;
  }

  if (!keyReady) {
    console.log("\n[warn] IndexNow key file not live yet — run after production redeploy:");
    console.log("  npx vercel pull --yes --environment=production && npx vercel deploy --prod --yes");
    console.log("  node scripts/setup-discovery-indexing.mjs --skip-vercel\n");
  }

  if (!skipSubmit && keyReady) {
    console.log("\n--- IndexNow submissions ---");
    const canonicalUrls = await fetchSitemapUrls(CANONICAL);
    console.log(`[info] ${canonicalUrls.length} URLs from sitemap`);

    for (const { origin, host } of HOSTS) {
      const keyLocation = `${origin.replace(/\/$/, "")}/api/indexnow`;
      const urlList = rewriteUrlsForHost(canonicalUrls, origin);
      await submitIndexNowBatch({
        host,
        key: indexNowKey,
        keyLocation,
        urlList,
        endpoint: "https://api.indexnow.org/indexnow",
      });
    }

    console.log("\n--- Bing IndexNow (priority URLs) ---");
    for (const { origin, host } of HOSTS) {
      const keyLocation = `${origin.replace(/\/$/, "")}/api/indexnow`;
      for (const path of PRIORITY_PATHS) {
        const url = path === "/" ? origin : `${origin.replace(/\/$/, "")}${path}`;
        await pingBingIndexNow({ url, key: indexNowKey, keyLocation });
      }
      void host;
    }
  }

  console.log("\n--- Open Graph beta validation ---");
  const og = spawnSync(process.execPath, ["scripts/validate-open-graph.mjs", CANONICAL], {
    stdio: "inherit",
    cwd: join(process.cwd()),
  });

  console.log("\n--- Optional platform verification (add in Vercel when tokens available) ---");
  console.log("NEXT_PUBLIC_BING_SITE_VERIFICATION=        # Bing Webmaster HTML tag");
  console.log("NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION= # Meta domain verification");
  console.log("\nThen verify in Bing Webmaster Tools and Meta Business Settings.");

  if (og.status !== 0) process.exit(og.status ?? 1);
  if (!keyReady && !skipSubmit) process.exit(2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
