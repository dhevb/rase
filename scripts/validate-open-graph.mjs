#!/usr/bin/env node
/**
 * Validate Open Graph + Twitter Card tags on live pages (beta testing pass).
 *
 * Usage:
 *   node scripts/validate-open-graph.mjs
 *   node scripts/validate-open-graph.mjs https://www.rase.co.in
 */
const BASE = (process.argv[2] ?? "https://www.rase.co.in").replace(/\/$/, "");

const PATHS = [
  "/",
  "/registration",
  "/introduction",
  "/departments/academic-council",
  "/downloads",
  "/noticeboard",
];

function readMeta(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`property="${escaped}" content="([^"]+)"`, "i"),
    new RegExp(`name="${escaped}" content="([^"]+)"`, "i"),
    new RegExp(`content="([^"]+)" property="${escaped}"`, "i"),
    new RegExp(`content="([^"]+)" name="${escaped}"`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

function readCanonical(html) {
  const m =
    html.match(/rel="canonical" href="([^"]+)"/i) ??
    html.match(/href="([^"]+)" rel="canonical"/i);
  return m?.[1] ?? null;
}

async function validatePath(path) {
  const url = path === "/" ? BASE : `${BASE}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  const html = res.ok ? await res.text() : "";

  const checks = {
    status: res.status,
    ogTitle: readMeta(html, "og:title"),
    ogDescription: readMeta(html, "og:description"),
    ogUrl: readMeta(html, "og:url"),
    ogImage: readMeta(html, "og:image"),
    ogSiteName: readMeta(html, "og:site_name"),
    twitterCard: readMeta(html, "twitter:card"),
    canonical: readCanonical(html),
    facebookDomain: readMeta(html, "facebook-domain-verification"),
  };

  const required = ["ogTitle", "ogDescription", "ogUrl", "ogImage", "twitterCard", "canonical"];
  const ok = res.ok && required.every((k) => Boolean(checks[k]));

  return { url, ok, checks };
}

async function main() {
  console.log(`Open Graph beta validation: ${BASE}\n`);
  let failed = 0;

  for (const path of PATHS) {
    const result = await validatePath(path);
    if (result.ok) {
      console.log(`[pass] ${result.url}`);
      console.log(`       og:image → ${result.checks.ogImage}`);
    } else {
      failed += 1;
      console.log(`[fail] ${result.url} (HTTP ${result.checks.status})`);
      for (const key of ["ogTitle", "ogDescription", "ogUrl", "ogImage", "twitterCard", "canonical"]) {
        if (!result.checks[key]) console.log(`       missing ${key}`);
      }
    }
  }

  console.log(`\n${PATHS.length - failed}/${PATHS.length} pages passed Open Graph checks.`);
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
