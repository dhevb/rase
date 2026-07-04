#!/usr/bin/env node
/**
 * GSC indexing readiness — sitemap health, robots, redirects, locale prefixes.
 *
 * Usage:
 *   node scripts/validate-gsc-indexing.mjs
 *   node scripts/validate-gsc-indexing.mjs https://www.rase.co.in
 *   node scripts/validate-gsc-indexing.mjs --quick   # skip per-URL sitemap crawl
 *   node scripts/validate-gsc-indexing.mjs --timeout=60000
 */
const args = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const flags = new Set(process.argv.slice(2).filter((a) => a.startsWith("-")));
const timeoutArg = process.argv.find((a) => a.startsWith("--timeout="));
const BASE = (args[0] || "https://www.rase.co.in").replace(/\/$/, "");
const QUICK = flags.has("--quick");
const TIMEOUT_MS = timeoutArg ? Number(timeoutArg.split("=")[1]) : 45_000;
const RETRIES = 2;
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const checks = [];

function pass(name, detail) {
  checks.push({ name, ok: true, detail });
}
function fail(name, detail) {
  checks.push({ name, ok: false, detail });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchErrorDetail(err) {
  if (err?.cause?.code) return err.cause.code;
  if (err?.code) return err.code;
  return err?.message ?? String(err);
}

async function fetchWithRetry(url, options = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: { "User-Agent": UA, ...options.headers },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      return res;
    } catch (err) {
      lastErr = err;
      if (attempt < RETRIES) await sleep(800 * (attempt + 1));
    }
  }
  throw lastErr;
}

async function fetchStatus(url, redirect = "follow") {
  const res = await fetchWithRetry(url, { redirect });
  const text = res.ok ? await res.text() : "";
  return { status: res.status, url: res.url, text };
}

async function checkSitemapUrls(urls) {
  const bad = [];
  const errors = [];
  const total = urls.length;

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    try {
      const r = await fetchWithRetry(u, { redirect: "manual" });
      if (r.status !== 200) {
        bad.push({ u, status: r.status, loc: r.headers.get("location") });
      }
    } catch (err) {
      errors.push({ u, error: fetchErrorDetail(err) });
    }
    if ((i + 1) % 10 === 0 || i + 1 === total) {
      process.stdout.write(`\r  checked ${i + 1}/${total} sitemap URLs…`);
    }
    await sleep(120);
  }
  process.stdout.write("\n");

  if (errors.length > 0) {
    fail(
      "sitemap-urls-reachable",
      `${errors.length} timeout/error: ${errors
        .slice(0, 3)
        .map((e) => `${e.error} ${e.u}`)
        .join("; ")}${errors.length > 3 ? "…" : ""}`
    );
  } else {
    pass("sitemap-urls-reachable", `all ${total} URLs responded`);
  }

  if (bad.length === 0) pass("sitemap-urls-200", "all reachable sitemap URLs return 200");
  else {
    fail(
      "sitemap-urls-200",
      `${bad.length} non-200: ${bad
        .slice(0, 5)
        .map((b) => `${b.status} ${b.u}`)
        .join("; ")}${bad.length > 5 ? "…" : ""}`
    );
  }
}

async function main() {
  console.log(`=== GSC indexing validation — ${BASE} ===`);
  console.log(`timeout=${TIMEOUT_MS}ms retries=${RETRIES}${QUICK ? " quick=1" : ""}\n`);

  try {
    const sitemapRes = await fetchStatus(`${BASE}/sitemap.xml`);
    if (sitemapRes.status !== 200) {
      fail("sitemap-live", `HTTP ${sitemapRes.status}`);
    } else {
      const urls = [...sitemapRes.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      pass("sitemap-live", `${urls.length} URLs`);
      if (QUICK) {
        pass("sitemap-urls-200", "skipped (--quick)");
        pass("sitemap-urls-reachable", "skipped (--quick)");
      } else if (urls.length > 0) {
        await checkSitemapUrls(urls);
      }
    }
  } catch (err) {
    fail("sitemap-live", fetchErrorDetail(err));
  }

  try {
    const robots = await fetchStatus(`${BASE}/robots.txt`);
    if (robots.status === 200 && robots.text.includes("Sitemap:")) {
      pass("robots-sitemap", "robots.txt declares sitemap");
    } else {
      fail("robots-sitemap", `HTTP ${robots.status}`);
    }

    if (robots.text.includes("Disallow: /admin")) {
      pass("robots-admin", "admin disallowed");
    } else {
      fail("robots-admin", "missing /admin disallow");
    }

    if (robots.text.includes("participantregistrationdatadekh")) {
      pass("robots-datadekh", "datadekh paths disallowed");
    } else {
      fail("robots-datadekh", "datadekh paths not in robots.txt");
    }
  } catch (err) {
    fail("robots-txt", fetchErrorDetail(err));
  }

  try {
    const localeStrip = await fetchWithRetry(`${BASE}/en/gallery`, { redirect: "manual" });
    if (localeStrip.status >= 300 && localeStrip.status < 400) {
      const loc = localeStrip.headers.get("location") ?? "";
      if (loc.includes("/gallery")) pass("locale-strip-en", `${localeStrip.status} → ${loc}`);
      else fail("locale-strip-en", `unexpected Location: ${loc}`);
    } else {
      fail("locale-strip-en", `expected 3xx, got ${localeStrip.status}`);
    }
  } catch (err) {
    fail("locale-strip-en", fetchErrorDetail(err));
  }

  for (const [path, expect] of [
    ["/BatonCeremony", "/press/baton-ceremony-smk-4"],
    ["/coming-soon", "/merchandise"],
    ["/about", "/introduction"],
  ]) {
    try {
      const r = await fetchWithRetry(`${BASE}${path}`, { redirect: "manual" });
      const loc = r.headers.get("location") ?? "";
      if (r.status >= 300 && r.status < 400 && loc.includes(expect)) {
        pass(`redirect-${path}`, `${r.status} → ${expect}`);
      } else if (r.status === 200 && path === "/BatonCeremony") {
        fail(`redirect-${path}`, "still 200 — deploy may not be live on this host yet");
      } else {
        fail(`redirect-${path}`, `${r.status} loc=${loc || "(none)"}`);
      }
    } catch (err) {
      fail(`redirect-${path}`, fetchErrorDetail(err));
    }
  }

  for (const c of checks) {
    console.log(c.ok ? `[pass] ${c.name}: ${c.detail}` : `[fail] ${c.name}: ${c.detail}`);
  }

  const failed = checks.filter((c) => !c.ok).length;
  console.log(`\n${checks.length - failed}/${checks.length} passed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("\nUnexpected error:", fetchErrorDetail(err));
  process.exit(1);
});
