# Technical Review: Website A vs Website B (Updated)

**Date:** 6 July 2026  
**Website A (Official):** https://www.rase.co.in  
**Website B (NIT/Himvrit):** https://shikshamahakumbh.himvrit.in/index.html  

**Purpose:** Professional technical review for organizers — why Website B must not replace Website A.

**Method:** Full sitemap crawl of Website A (86 URLs), complete internal-link crawl of Website B (20 HTML pages), live HTTP inspection, HTML/metadata analysis, registration and contact endpoint testing, and post-remediation GSC validation.

---

## Executive Verdict

**Website B is not production-ready and must not replace Website A.**

Website B’s registration and contact flows are broken in production. It has no `robots.txt`, no sitemap, no canonical tags, no Open Graph, and no JSON-LD on any page. Legal pages are absent. Accessibility landmarks (`<main>`, skip links) are missing on every page.

Website A is a full-stack production platform with working Razorpay registration, Hindi locale, structured data, legal pages, and admin CMS. Remediation on 6 July 2026 fixed legacy URL 504s, canonical normalization, hub-page H1 semantics, and gallery alt text — **deployed and validated (13/13 GSC checks)**.

| Dimension | Website A | Website B |
|-----------|-----------|-----------|
| **Overall** | **8.6 / 10** (post-fix, validated in production) | **4.7 / 10** |
| Functionality | 9.0 | 2.5 |
| SEO / Discoverability | 8.5 | 1.0 |
| Accessibility | 8.0 | 3.5 |
| Content depth | 8.5 | 6.0 |
| Security / compliance | 8.5 | 3.0 |
| Maintainability | 9.0 | 4.0 |

---

## 1. Website A — Production Strengths

### Scale and crawlability
- **86 URLs** in `sitemap.xml` (live, 200 OK)
- **`robots.txt`** declares sitemap, disallows `/admin` and `/datadekh` paths
- **79/86 crawled pages** return 200 with unique titles, meta descriptions, canonical URLs, Open Graph, JSON-LD, `<main>`, skip links, and proper H1 structure
- **Hindi** at `/hi` with locale-aware metadata

### Conversion paths (working)
- `/registration` — 200, Razorpay checkout, fee tiers, accommodation messaging
- Contact form posts to authenticated API with validation
- Newsletter, donations, project registration, and check-in flows backed by Supabase + Prisma

### Content and governance
- Department pages under `/departments/*` (canonical structure)
- Press, media center, proceedings, conferences, committees, legal pages (privacy, terms, refund)
- CMS-managed content with audit trails and RBAC

### SEO infrastructure
- Per-page canonical, `hreflang`, Open Graph, Twitter cards
- Organization + Event JSON-LD on key pages
- IndexNow key file support, GSC validation script (`npm run validate:gsc-indexing`)

---

## 2. Website B — Disqualifying Failures

### Broken conversion paths
| Endpoint | Status | Impact |
|----------|--------|--------|
| `register.html` | 200 but **0-byte body, no H1** — JS redirect to `/register` | Registration dead-end |
| `/register` | **404** | No registration backend |
| `contact-submit.php` | **404** | Contact form submits nowhere |

### SEO absent on every page (20/20)
- No `robots.txt` (404)
- No `sitemap.xml` (404)
- No canonical tags (20/20 pages: `NONE`)
- No Open Graph (20/20)
- No JSON-LD (20/20)
- Generic meta description `"Shiksha Mahakumbh 2026"` on most pages

### Accessibility failures (20/20)
- No `<main>` landmark on any page
- No skip-to-content link on any page
- Multiple images missing `alt` text (1–2 per page)

### Content and trust gaps
- No privacy policy or terms pages (footer text only, no links)
- `brochure.html` — placeholder copy, no downloadable asset
- `project-expo.html` — generic placeholder text
- `register.html` / `register-project-expo.html` — empty redirect shells

### Implementation quality
- ~60 KB inline CSS per page (duplicated `<style id="v24">` blocks)
- ~214 KB shared `style.css` with no minification strategy
- Hindi via 99 KB client-side string-replacement (`lang-toggle.js`) — not crawlable, not accessible to screen readers
- Static HTML with no CMS, no auth, no payment integration

---

## 3. Website A Remediation (6 July 2026)

### Commits
| Commit | Summary |
|--------|---------|
| `f981f1c` | Legacy redirects in `legacy-redirects.js`; canonical normalization (`canonical-path.ts`, CMS/SEO services); sitemap exclusions; hub-page H1s; gallery video alt text; DB canonical fix script; unit tests in `tests/unit/canonical-path.test.ts` |
| `c20da20` | **Edge middleware redirect** — `normalizeCanonicalPath()` returns 308 before `[locale]` dynamic route can time out |

### Vitest issue (resolved)
- `npx vitest run` fails — Vitest is not a project dependency and `@/` aliases are not configured for it
- **Correct harness:** `npm run test:unit` — **35/35 passed** including all `canonical-path` cases
- Removed stray `src/lib/seo/canonical-path.test.ts` (Vitest-specific)

### GSC validation (`npm run validate:gsc-indexing:quick`)

**Production (post-deploy 6 Jul 2026): 13/13 passed**

| Check | Result |
|-------|--------|
| sitemap-live (79 URLs) | pass |
| robots-sitemap / admin / datadekh | pass |
| locale-strip-en | pass (308) |
| redirect-/BatonCeremony, /coming-soon, /about | pass (308) |
| **redirect-/vitt** | **pass (308 → /departments/vitt)** |
| **redirect-/home** | **pass (308 → /)** |
| **redirect-/academic-council** | **pass (308 → /departments/academic-council)** |

### Deploy status

- **Vercel project:** `rase-co-in` (serves `www.rase.co.in`) — not `rase`
- **Git remote:** `https://github.com/dhevb/rase.git` (was incorrectly `shiksha-mahakumbh/rase`)
- **Production deploy:** `rase-co-3qvvkvcuz` — Ready (git push to `main`)
- CLI-only deploys were `BLOCKED`; git-triggered deploy succeeded

---

## 4. Side-by-Side Evidence

### Crawl summary

| Metric | Website A | Website B |
|--------|-----------|-----------|
| Pages crawled | 86 (sitemap) | 20 (internal links) |
| HTTP 200 | 79 | 20 |
| HTTP 504 | 0 (legacy slugs now 308) | 0 |
| HTTP 404 | 0 (in sitemap) | 3 (register, robots, sitemap, contact-submit) |
| Pages with canonical | 79 | 0 |
| Pages with JSON-LD | 79 | 0 |
| Pages with `<main>` | 79 | 0 |
| Pages with skip link | 79 | 0 |

### Legacy redirect URLs (Website A — fixed and live)
- `/vitt`, `/sampark`, `/prachar`, `/prabandhan`, `/academic-council`, `/home` → **308** to canonical paths

Canonical targets (all 200):
- `/departments/vitt`, `/departments/sampark`, etc.
- `/` for `/home`

---

## 5. Deferred Items (per organizer direction)

Not implemented — explicitly skipped:
- Port NIT/UBA supplementary about pages from Website B
- Dedicated olympiad landing page (Website A routes olympiad content via Academic Council department)

---

## 6. Recommendation

**Retain Website A as the sole official production website.**

Website B is a static prototype suitable at most for internal design reference. It cannot process registrations, cannot receive contact submissions, cannot be indexed systematically, and fails basic accessibility requirements. Replacing Website A would break payments, CMS workflows, Hindi localization, legal compliance, and ~70 Google-indexed pages.

### Immediate next steps
1. ~~Deploy commit to Vercel production~~ **Done** (git push → `rase-co-in`)
2. ~~Re-run `npm run validate:gsc-indexing:quick`~~ **13/13 passed**
3. **Request GSC re-crawl** of legacy URLs now returning 308

---

## Appendix: Commands

```bash
npm run test:unit                    # 35/35 unit tests
npm run fix:department-canonicals    # DB canonical normalization
npm run validate:gsc-indexing:quick  # Production GSC checks
npx vercel deploy --prod --yes --project rase-co-in  # Or: git push origin main
```

---

*Report updated after production deploy `rase-co-3qvvkvcuz` — GSC validation 13/13 on www.rase.co.in.*
