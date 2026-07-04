#!/usr/bin/env node
/**
 * Google Search Console readiness for rase.co.in + shikshamahakumbh.com.
 *
 * 1. Reads google-site-verification TXT from public DNS (both domains)
 * 2. Upserts NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION on Vercel production
 * 3. Validates sitemap.xml + robots.txt on canonical host
 * 4. Pings Google sitemap (legacy ping; GSC UI submit still recommended)
 *
 * Usage:
 *   node scripts/setup-search-console.mjs
 *   node scripts/setup-search-console.mjs --dry-run
 *   node scripts/setup-search-console.mjs --skip-vercel
 *
 * Requires Vercel CLI auth or VERCEL_TOKEN for env upsert.
 */
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import dns from "node:dns";

const resolveTxt = promisify(dns.resolveTxt);

const PROJECT_ID = process.env.VERCEL_PROJECT_ID ?? "prj_k6YZpm35GqkuZcYOohnXVTM0Uy9f";
const TEAM_ID = process.env.VERCEL_ORG_ID ?? "team_0PYXWQMwAV9fPWOTuxk54H9K";
const CANONICAL = "https://www.rase.co.in";
const DOMAINS = ["rase.co.in", "shikshamahakumbh.com"];

const dryRun = process.argv.includes("--dry-run");
const skipVercel = process.argv.includes("--skip-vercel");

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
  if (!res.ok) {
    throw new Error(`Vercel API ${path} → ${res.status}: ${text.slice(0, 240)}`);
  }
  return body;
}

async function listProjectEnv(token) {
  const data = await vercelFetch(token, `/v9/projects/${PROJECT_ID}/env`);
  return data.envs ?? [];
}

async function upsertProductionEnv(token, key, value) {
  if (!value) {
    console.log(`[skip] ${key}: empty value`);
    return false;
  }
  if (dryRun) {
    console.log(`[dry-run] would set ${key} on production (${value.split(",").length} token(s))`);
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

async function googleVerificationFromDns(domain) {
  try {
    const records = await resolveTxt(domain);
    const flat = records.flat();
    const hit = flat.find((r) => r.startsWith("google-site-verification="));
    if (!hit) return null;
    return hit.replace("google-site-verification=", "").trim();
  } catch (err) {
    console.warn(`[warn] DNS TXT lookup failed for ${domain}:`, err.message);
    return null;
  }
}

async function validateLiveSeo() {
  const checks = [];

  const sitemapRes = await fetch(`${CANONICAL}/sitemap.xml`, { redirect: "follow" });
  checks.push({
    name: "sitemap-status",
    ok: sitemapRes.ok,
    detail: `${sitemapRes.status} ${CANONICAL}/sitemap.xml`,
  });
  const sitemapText = sitemapRes.ok ? await sitemapRes.text() : "";
  checks.push({
    name: "sitemap-canonical-host",
    ok: sitemapText.includes("<loc>https://www.rase.co.in"),
    detail: "sitemap URLs use www.rase.co.in",
  });

  const robotsRes = await fetch(`${CANONICAL}/robots.txt`, { redirect: "follow" });
  const robotsText = robotsRes.ok ? await robotsRes.text() : "";
  checks.push({
    name: "robots-sitemap",
    ok: robotsText.includes("Sitemap: https://www.rase.co.in/sitemap.xml"),
    detail: "robots.txt references canonical sitemap",
  });

  const homeRes = await fetch(`${CANONICAL}/`, { redirect: "follow" });
  const homeHtml = homeRes.ok ? await homeRes.text() : "";
  checks.push({
    name: "canonical-link",
    ok: homeHtml.includes('rel="canonical"') && homeHtml.includes("https://www.rase.co.in"),
    detail: "homepage canonical → rase.co.in",
  });

  for (const c of checks) {
    console.log(c.ok ? `[pass] ${c.name}: ${c.detail}` : `[fail] ${c.name}: ${c.detail}`);
  }
  return checks.every((c) => c.ok);
}

async function pingGoogleSitemap() {
  const sitemapUrl = encodeURIComponent(`${CANONICAL}/sitemap.xml`);
  const pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
  try {
    const res = await fetch(pingUrl, { method: "GET", redirect: "follow" });
    const ok = res.ok || res.status === 404;
    console.log(
      ok
        ? `[ok] Google sitemap ping sent (${res.status}) — also submit in Search Console UI`
        : `[warn] Google sitemap ping returned ${res.status}`
    );
  } catch (err) {
    console.warn("[warn] Google sitemap ping failed:", err.message);
  }
}

async function main() {
  console.log("=== Google Search Console setup ===\n");

  const tokens = [];
  for (const domain of DOMAINS) {
    const token = await googleVerificationFromDns(domain);
    if (token) {
      tokens.push(token);
      console.log(`[dns] ${domain}: google-site-verification TXT found`);
    } else {
      console.log(`[dns] ${domain}: no google-site-verification TXT — add in DNS or GSC`);
    }
  }

  const uniqueTokens = [...new Set(tokens)];
  if (uniqueTokens.length === 0) {
    console.error("\nNo verification tokens found in DNS. Add TXT records from Search Console first.");
    process.exit(1);
  }

  const envValue = uniqueTokens.join(",");
  console.log(`\n[info] HTML meta tokens: ${uniqueTokens.length} (${DOMAINS.join(" + ")})`);

  if (!skipVercel) {
    const vercelToken = loadVercelToken();
    if (!vercelToken) {
      console.warn("[warn] No Vercel token — skip env upsert (use --skip-vercel or vercel login)");
    } else {
      await upsertProductionEnv(vercelToken, "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", envValue);
      console.log("[info] Redeploy production for meta tags to go live (git push or Vercel redeploy)");
    }
  }

  console.log("\n--- Live SEO checks ---");
  const seoOk = await validateLiveSeo();

  console.log("\n--- Sitemap ping ---");
  await pingGoogleSitemap();

  const sitemapFullUrl = `${CANONICAL}/sitemap.xml`;
  const priorityPaths = ["/", "/registration", "/departments/academic-council", "/introduction"];

  console.log("\n--- Manual GSC steps (DNS already configured) ---");
  console.log("1. https://search.google.com/search-console");
  console.log("2. Domain property rase.co.in → Settings → Ownership → Verify (DNS TXT already live)");
  console.log(`3. Sitemaps → submit FULL URL (domain properties reject sitemap.xml alone):`);
  console.log(`   ${sitemapFullUrl}`);
  console.log("4. URL Inspection → Request indexing for:");
  for (const p of priorityPaths) {
    console.log(`   • ${CANONICAL}${p === "/" ? "" : p}`);
  }
  console.log("\nOptional URL-prefix properties (submit path only: sitemap.xml):");
  console.log(`   • ${CANONICAL}`);
  console.log("   • https://www.shikshamahakumbh.com");

  if (!seoOk) process.exit(2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
