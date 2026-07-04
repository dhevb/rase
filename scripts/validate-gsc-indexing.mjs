#!/usr/bin/env node
/**
 * GSC indexing readiness — sitemap health, robots, redirects, locale prefixes.
 *
 * Usage:
 *   node scripts/validate-gsc-indexing.mjs
 *   node scripts/validate-gsc-indexing.mjs https://www.rase.co.in
 */
const BASE = (process.argv[2] || "https://www.rase.co.in").replace(/\/$/, "");
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const checks = [];

function pass(name, detail) {
  checks.push({ name, ok: true, detail });
}
function fail(name, detail) {
  checks.push({ name, ok: false, detail });
}

async function fetchStatus(url, redirect = "follow") {
  const res = await fetch(url, { redirect, headers: { "User-Agent": UA } });
  return { status: res.status, url: res.url, text: res.ok ? await res.text() : "" };
}

async function main() {
  console.log(`=== GSC indexing validation — ${BASE} ===\n`);

  const sitemapRes = await fetchStatus(`${BASE}/sitemap.xml`);
  if (sitemapRes.status !== 200) {
    fail("sitemap-live", `HTTP ${sitemapRes.status}`);
  } else {
    const urls = [...sitemapRes.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    pass("sitemap-live", `${urls.length} URLs`);

    const bad = [];
    for (const u of urls) {
      const r = await fetch(u, { redirect: "manual", headers: { "User-Agent": UA } });
      if (r.status !== 200) bad.push({ u, status: r.status, loc: r.headers.get("location") });
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    if (bad.length === 0) pass("sitemap-urls-200", "all sitemap URLs return 200");
    else fail("sitemap-urls-200", `${bad.length} non-200: ${bad.map((b) => `${b.status} ${b.u}`).join("; ")}`);
  }

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

  const localeStrip = await fetch(`${BASE}/en/gallery`, {
    redirect: "manual",
    headers: { "User-Agent": UA },
  });
  if (localeStrip.status >= 300 && localeStrip.status < 400) {
    const loc = localeStrip.headers.get("location") ?? "";
    if (loc.includes("/gallery")) pass("locale-strip-en", `308 → ${loc}`);
    else fail("locale-strip-en", `unexpected Location: ${loc}`);
  } else {
    fail("locale-strip-en", `expected 308, got ${localeStrip.status}`);
  }

  for (const [path, expect] of [
    ["/BatonCeremony", "/press/baton-ceremony-smk-4"],
    ["/coming-soon", "/merchandise"],
    ["/about", "/introduction"],
  ]) {
    const r = await fetch(`${BASE}${path}`, { redirect: "manual", headers: { "User-Agent": UA } });
    const loc = r.headers.get("location") ?? "";
    if (r.status >= 300 && r.status < 400 && loc.includes(expect)) {
      pass(`redirect-${path}`, `${r.status} → ${expect}`);
    } else {
      fail(`redirect-${path}`, `${r.status} loc=${loc}`);
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
  console.error(err);
  process.exit(1);
});
