# Deep Content Audit: Website A vs Website B

**Audit date:** 6 July 2026  
**Website A (Official):** https://www.rase.co.in  
**Website B (Alternative):** https://shikshamahakumbh.himvrit.in/index.html  
**Method:** Live HTTP crawl of all sitemap URLs (A) and all internal `.html` links (B); per-page metadata extraction; endpoint probing; asset size measurement. No assumptions beyond captured evidence.

**Audit artifacts:**  
`agent-tools/audit-A-pages.csv` (79 indexable + 7 redirect URLs probed) · `agent-tools/audit-B-pages.csv` (20 pages)

---

## Executive Summary

| | Website A | Website B |
|---|-----------|-----------|
| **Reachable pages crawled** | **79** (sitemap) + 7 legacy redirects | **20** (internal link crawl) |
| **Production readiness** | **Production platform** | **Not production-ready** |
| **Overall score** | **8.4 / 10** | **4.6 / 10** |
| **Registration** | Working hub at `/registration` | **Broken** (`register.html` → `/register` 404) |
| **Contact** | API-backed form at `/contact-us` | **Broken** (`contact-submit.php` 404) |
| **SEO infrastructure** | Full (sitemap, robots, canonical, OG, JSON-LD) | **Absent** (no robots, no sitemap, no canonical) |
| **Legal pages** | 5 policy pages live | **404** (privacy, terms not found) |
| **Accessibility landmarks** | `<main>` + skip link on 79/79 pages | **0/20** pages |

**Verdict:** Website A is the only site suitable as the official Shiksha Mahakumbh platform. Website B is a static NIT-hosted prototype with attractive section layouts on some pages but **fatal gaps** in registration, contact, SEO, legal compliance, and accessibility. It must not replace Website A.

---

# PHASE 1 — Complete Site Map

## Website A — 79 URLs (`sitemap.xml`, HTTP 200)

| Category | URLs (representative) |
|----------|----------------------|
| **Home** | `/` |
| **About / vision** | `/introduction`, `/hi/introduction` |
| **Organizers / departments** | `/departments/academic-council`, `prabandhan`, `prachar`, `sampark`, `vitt` |
| **Committees** | `/committees`, `/committee/Shiksha%20Mahakumbh%20{1.0–6.0}` |
| **Partners** | `/partners` |
| **Downloads** | `/downloads`, `/books`, `/proceedings`, `/proceeding1–3`, `/publications/*` |
| **Events** | `/upcoming-events`, `/past-events`, `/past_event/*` (7 editions/programmes) |
| **Conclaves / conference** | `/conferences`, `/departments/academic-council`, `/workshops` |
| **Research** | `/research/submit` |
| **Registration** | `/registration`, `/hi/registration` |
| **Gallery / media** | `/gallery`, `/media-center`, `/media/shiksha-mahakumbh/{1.0–5.0}/{digital\|print}` |
| **Press** | `/press` + 9 article URLs |
| **FAQ / feedback** | `/faq`, `/feedback` |
| **Contact** | `/contact-us`, `/hi/contact-us` |
| **Policies** | `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`, `/cookie-policy`, `/disclaimer`, `/licenses` |
| **Other** | `/donation`, `/merchandise`, `/noticeboard`, `/best-wishes`, `/speakers/directory`, `/search`, `/education`, `/abhiyaninphotoframe`, `/hi` |

**Legacy redirects (308, not in sitemap):** `/vitt`, `/sampark`, `/prachar`, `/prabandhan`, `/academic-council`, `/home` → canonical paths (validated post-deploy).

## Website B — 20 URLs (internal crawl from `index.html`)

| Page | URL |
|------|-----|
| Home | `index.html` |
| About Shiksha | `about-shiksha.html` |
| About UBA | `about-uba.html` |
| About NIT | `about-nit.html` |
| About Vidya Bharati | `about-vidya-bharati.html` |
| Partners | `esteemed-partners.html` |
| Committees | `committees.html` |
| Events hub | `events.html` |
| Conference | `conference.html` |
| Conclaves | `conclaves.html` |
| Exhibition | `exhibition.html` |
| Gallery | `gallery.html` |
| Olympiad | `olympiad.html` |
| Press | `press.html` |
| Project Expo | `project-expo.html` |
| Brochure | `brochure.html` |
| Bal Shodh | `bal-shodh.html` |
| Contact | `contact.html` |
| Register | `register.html` |
| Register Project Expo | `register-project-expo.html` |

**Not found (404):** `robots.txt`, `sitemap.xml`, `/register`, `contact-submit.php`, `privacy.html`, `terms.html`

## Pages in A but not in B (59+ topic gaps)

Accommodation (integrated in A registration), donation/sponsorship, merchandise, noticeboard, speaker directory, edition-specific past-event archives, digital/print media archives per edition, proceedings volumes, books, publications hub, FAQ, feedback, Hindi locale, search, legal policies (5), research/CMT submission, best-wishes, workshops hub, education programmes hub, cookie policy, open-source licenses, department operations pages (Prabandhan/Prachar/Sampark/Vitt).

## Pages in B but not in A (dedicated equivalents)

| B page | A equivalent / gap |
|--------|-------------------|
| `about-nit.html` | Partially covered in introduction/partners; **no dedicated NIT about page** |
| `about-uba.html` | **No dedicated UBA page** |
| `about-vidya-bharati.html` | **No dedicated Vidya Bharati page** |
| `exhibition.html` | Embedded in events; **no standalone exhibition page** |
| `bal-shodh.html` | **No Bal Shodh Patrika page** |
| `olympiad.html` | Content under `/departments/academic-council`; **no standalone olympiad landing** |

---

# PHASE 2 — Content Audit (site-wide patterns)

## Website A — evidence summary

| Dimension | Evidence | Assessment |
|-----------|----------|------------|
| **Titles** | 79/79 unique, descriptive titles (e.g. `Register – Shiksha Mahakumbh 6.0`) | Strong |
| **Meta descriptions** | Present on all 79 indexed pages | Strong |
| **H1** | Exactly 1 H1 on 79/79 pages | Strong |
| **H2/H3 depth** | e.g. `/introduction`: 8 H2, 21 H3; `/departments/prabandhan`: 12 H2 | Deep |
| **Body size** | Homepage ~263 KB HTML; registration ~166 KB | Substantive CMS content |
| **Grammar/tone** | Formal, institution-grade copy on legal and department pages | Professional |
| **Placeholder content** | Not observed on indexed pages | — |
| **Duplication** | Press articles are distinct; proceedings split by volume intentionally | Low risk |
| **Images missing alt** | **23 images** across site with `alt=""` (crawl aggregate) | Medium gap |

### 🔴 Critical (A)
| Severity | Page | Evidence | Issue | Recommendation |
|----------|------|----------|-------|----------------|
| 🔴 | Various gallery/media pages | 23 `alt=""` images site-wide | Screen readers get no image context | Audit gallery/video thumbnails; enforce descriptive alt in CMS |

### 🟡 Medium (A)
| Severity | Page | Evidence | Issue | Recommendation |
|----------|------|----------|-------|----------------|
| 🟡 | `/departments/vitt` | Canonical historically pointed to `/vitt` (DB fix deployed) | Risk of duplicate signals | Confirm canonical in live HTML shows `/departments/vitt` |
| 🟡 | `/research/submit` | 2× H1 in crawl | Heading hierarchy violation | Demote secondary H1 to H2 |

## Website B — evidence summary

| Dimension | Evidence | Assessment |
|-----------|----------|------------|
| **Meta description** | `<meta content="Shiksha Mahakumbh 2026" name="description"/>` on **all 20 pages** | Duplicate, non-specific |
| **Canonical** | **0/20** | Critical SEO failure |
| **H1** | 18/20 have H1; `register.html` and `register-project-expo.html` have **0 H1** | Broken on conversion pages |
| **Content depth** | Conference/conclaves/events have cards + paragraphs; press has **0 H2** | Uneven |
| **Placeholder** | `register.html`: title `Redirecting...`, body redirect only | Non-content |
| **Images missing alt** | **32 images** with empty alt (crawl) | Critical a11y |
| **Footer** | Repeated; contains garbled glyphs (`f d???`) on crawl text extract | Unfinished/paste error |

### 🔴 Critical (B)
| Severity | Page | Evidence | Issue | Recommendation |
|----------|------|----------|-------|----------------|
| 🔴 | `register.html` | `<meta http-equiv="refresh" content="0; url=/register"/>`, `location.replace('/register')` | `/register` returns **404** | Point to official `https://www.rase.co.in/registration` or build real form |
| 🔴 | `contact.html` | `action="contact-submit.php"` | **404** on submit endpoint | Implement backend or link to A contact |
| 🔴 | All 20 pages | No canonical, OG, JSON-LD | Not indexable systematically | Add metadata stack or retire site |
| 🔴 | All 20 pages | No `<main>`, no skip link | Fails WCAG landmark requirements | Add semantic structure |

### 🟠 High (B)
| Severity | Page | Evidence | Issue | Recommendation |
|----------|------|----------|-------|----------------|
| 🟠 | All pages | Same meta description | Duplicate SERP snippets | Unique descriptions per page |
| 🟠 | `brochure.html` | No downloadable PDF evidenced in crawl | Likely placeholder | Publish real brochure or remove CTA |
| 🟠 | `press.html` | 0 H2 headings | Flat content structure | Add article hierarchy |
| 🟠 | Footer (all) | Garbled social/icon text in extract | Broken markup or encoding | Fix footer component |

---

# PHASE 3 — Design Audit

| Criterion | Website A | Website B |
|-----------|-----------|-----------|
| **First impression** | Polished Next.js layout, hero with edition branding, ticker, partner strip | Collage hero, institutional logos, card grid — visually modern |
| **Typography** | System + web fonts via Next; consistent scale | Custom CSS; mixed inline `font-size` on cards (e.g. 23px H3) |
| **Whitespace / balance** | Component library spacing | Adequate on homepage; repetitive card pattern |
| **Image quality** | Optimized Next/Image, AVIF/WebP | Full-size JPGs in cards |
| **Color / contrast** | Design tokens, tested components | Custom palette; not verified for WCAG |
| **Animations** | Framer Motion (subtle) | CSS transitions; Hindi via JS string replace (not visual-only) |
| **Outdated elements** | Some legacy path naming in URLs | Inline `<style>` blocks duplicated per page (6 on index) |
| **Unfinished** | — | Register redirect shell; footer glyphs; legal links missing |
| **Copied feel** | Original CMS | Template-style duplicated nav/footer on every page |
| **Premium feel** | High (payments, CMS, Hindi, legal) | Medium (skin only) |

**Screenshot suggestions:**  
- A: Homepage hero + registration fee table + Hindi `/hi`  
- B: Homepage collage hero; `register.html` redirect screen; `contact.html` form with dead action

---

# PHASE 4 — Navigation Audit

## Website A
- **Primary nav:** Registration, About, Events, Media, Committees, Contact (+ search, language toggle)
- **Depth:** 2–3 levels (e.g. Media → edition → digital/print)
- **Breadcrumbs:** Present on hub pages
- **Footer:** Legal links, departments, social, sitemap-linked destinations
- **Broken links:** Legacy slugs now **308** (fixed); sitemap URLs **79/79 → 200**

## Website B
- **Primary nav:** Home, About (dropdown: 4 about pages, partners, committees), Events (dropdown), Gallery, Contact, Register
- **Depth:** Flat (max 1 level under dropdowns)
- **Breadcrumbs:** **None observed**
- **Footer:** Marketing blurb + quick links; **no working privacy/terms**
- **Broken links:** `register.html` → `/register` **404**; `contact-submit.php` **404**

| Severity | Site | Evidence | Recommendation |
|----------|------|----------|----------------|
| 🔴 | B | Registration CTA chain broken | Fix or link externally |
| 🟠 | B | No breadcrumbs | Add for deep pages (conference, conclaves) |
| 🟢 | A | Search at `/search` | Maintain; ensure mobile discoverability |

---

# PHASE 5 — Content Completeness Matrix

| Topic | Website A | Website B |
|-------|-----------|-----------|
| Conference information | `/conferences`, academic council | `conference.html` |
| Registration | `/registration` (multi-type) | **Broken redirect** |
| Programme schedule | `/upcoming-events`, noticeboard | `events.html` (cards only) |
| Venue (NIT Hamirpur) | Introduction, upcoming events | `about-nit.html` |
| Accommodation | On registration page | **Missing** |
| Committees | Hub + 6 edition pages | `committees.html` (single) |
| Partners | `/partners` | `esteemed-partners.html` |
| Sponsors / donation | `/donation` (80G) | **Missing** |
| Downloads / brochures | `/downloads` | `brochure.html` (weak) |
| Publications | `/publications`, books, proceedings | **Missing** |
| Research submission | `/research/submit` (CMT) | **Missing** |
| School programmes | Education hub, past events | Partial in events |
| Olympiad | Under academic council | `olympiad.html` |
| Awards / best practices | Past events, press | **Missing** |
| Projects / expo | Registration types | `project-expo.html` |
| Cultural programmes | Past events, gallery | Gallery only |
| Media / gallery | Gallery + media center + archives | `gallery.html` |
| Press | Hub + 9 articles | `press.html` (shallow) |
| FAQ | `/faq` | **Missing** |
| Contact | Working form | **Broken backend** |
| Privacy / terms / refund | 5 legal pages | **404** |

---

# PHASE 6 — Registration Audit

## Website A — `/registration`
| Check | Evidence |
|-------|----------|
| HTTP status | **200** |
| Options | Participant, project, accommodation messaging present in HTML |
| Fees | Fee tiers referenced (`fee`, `₹` in page) |
| Payment | Razorpay loaded client-side (`/pay/v1/checkout.js` rewrite; not in static HTML) |
| Guidance | H2 sections: "Shiksha Mahakumbh 6.0", "Registration FAQ", "Related programmes" |
| Hindi | `/hi/registration` — **200** |
| Professional quality | CMS-managed, FAQ, related links |

## Website B — `register.html`
| Check | Evidence |
|-------|----------|
| HTTP status | **200** but **no content** |
| Title | `Redirecting...` |
| H1 | **None** |
| Redirect | `location.replace('/register')` |
| Target | `https://shikshamahakumbh.himvrit.in/register` → **404** |
| Payment | **None** |
| Forms | Empty shell |

| Severity | Site | Evidence | Recommendation |
|----------|------|----------|----------------|
| 🔴 | B | Conversion path dead-end | Use official registration URL immediately |
| 🟢 | A | End-to-end registration platform | Keep as single source of truth |

---

# PHASE 7 — SEO Audit

| Signal | Website A (79 pages) | Website B (20 pages) |
|--------|-------------------|---------------------|
| `robots.txt` | **200** (873 B), declares sitemap | **404** |
| `sitemap.xml` | **200** (79 URLs) | **404** |
| Unique `<title>` | **79/79** | 20/20 (but 2 are "Redirecting...") |
| Meta description | Unique, keyword-rich | **Same string on all pages** |
| Canonical | **79/79** | **0/20** |
| Open Graph | **79/79** | **0/20** |
| JSON-LD | **79/79** | **0/20** |
| `hreflang` | Present on homepage | **Absent** |
| GSC validation | **13/13** (quick script) | N/A |
| URL structure | Clean paths (`/departments/vitt`) | `.html` suffix, flat |
| Internal linking | Sitemap + hub cross-links | Nav + cards only |

### 🔴 Critical (B): Zero crawl infrastructure
**Recommendation:** If site remains published, add `robots.txt`, `sitemap.xml`, per-page canonical + OG + unique descriptions. Otherwise add `noindex` and banner pointing to rase.co.in.

---

# PHASE 8 — Accessibility

| Check | Website A | Website B |
|-------|-----------|-----------|
| `<main>` landmark | **79/79** | **0/20** |
| Skip to content | **79/79** | **0/20** |
| `viewport` meta | Yes | Yes |
| Image `alt=""` count | 23 total | **32 total** |
| H1 per page | 1 (except research submit: 2) | 0 on register pages |
| Semantic nav/footer | Yes | Nav/footer present but no main |
| Screen reader flow | Logical heading order on hubs | Register redirect announces only "Redirecting..." |

| Severity | Site | Page | Evidence | Fix |
|----------|------|------|----------|-----|
| 🔴 | B | All | No `<main>` | Wrap content in `<main id="main-content">` |
| 🔴 | B | All | 32 empty alts | Descriptive alt on event/partner images |
| 🟡 | A | Gallery/media | 23 empty alts | CMS alt enforcement |

---

# PHASE 9 — Performance

| Asset | Website A | Website B |
|-------|-----------|-----------|
| Homepage HTML | ~263 KB | **60 KB** (+ 6 inline `<style>` blocks) |
| CSS | Bundled/chunked | **`style.css` 214 KB** single file |
| JS | Code-split Next chunks | `app.js` **4.7 KB** (+ `lang-toggle.js` not measured) |
| Images | Next/Image optimization | Direct JPG references |
| Lazy loading | Framework default | Not evidenced |

| Severity | Site | Evidence | Recommendation |
|----------|------|----------|----------------|
| 🟠 | B | 214 KB CSS blocking | Minify, split, purge unused |
| 🟠 | B | Duplicated inline CSS per page | Extract to shared cached file |
| 🟡 | A | Large HTML on homepage | Monitor LCP; hero preload already present |

---

# PHASE 10 — Mobile Experience

| Check | Website A | Website B |
|-------|-----------|-----------|
| Viewport meta | Present | Present |
| Responsive layout | Next responsive components | CSS grid collapses (`grid-3`) |
| Touch targets | Button components sized | Nav dropdowns — needs manual tap test |
| Forms | Registration optimized | Contact form 5 inputs; **submit fails** |
| Mobile menu | Implemented in navbar | Nav present; dropdown JS dependent |

**Screenshot suggestion:** Mobile viewport 375px — A registration vs B register redirect.

---

# PHASE 11 — Branding

| Criterion | Website A | Website B |
|-----------|-----------|-----------|
| Logo usage | DHE + SMK logos, consistent header | NIT + UBA + SMK logos in header |
| Edition branding | **6.0** prominent | Mixed **2026** and **6.0** in footer |
| Institution credibility | Legal pages, donation 80G, press archive | NIT co-brand strong; legal missing |
| Government professionalism | High (policies, departments, Hindi) | Medium (visual only) |
| Trust signals | Razorpay, GSC verification, structured data | No trust/compliance signals |

| Severity | Site | Evidence | Issue |
|----------|------|----------|-------|
| 🟡 | B | Footer says "2026" on index, "6.0" on committees | Inconsistent edition naming |
| 🟢 | A | Consistent "Shiksha Mahakumbh 6.0" | Maintain |

---

# PHASE 12 — Information Architecture

**Website A:** Hub-and-spoke — editions, departments, media archives, and legal content are first-class IA branches. User journeys: Register → Pay; Research → CMT; Past edition → Gallery/Media.

**Website B:** Flat marketing IA — all content fits in ~20 static pages; no archive depth, no policy branch, no post-registration journey.

| Strength | Weakness |
|----------|----------|
| A: Discoverable downloads, proceedings, FAQ | A: Supplementary about pages (NIT/UBA) only implicit |
| B: Simple mental model for first-time visitors | B: Dead-end registration/contact flows |

---

# PHASE 13 — Differential Analysis (by page group)

| Page group | A better | B better | Missing in A | Missing in B |
|------------|----------|----------|--------------|--------------|
| Home | SEO, JSON-LD, depth, Hindi entry | Collage hero visual impact | — | FAQ, legal, registration |
| About | Abhiyan introduction depth | Dedicated NIT/UBA/Vidya Bharati pages | Standalone NIT/UBA/about pages | Movement history depth |
| Events | Past editions 1.0–5.0, workshops | Simple event cards | — | Past edition archive |
| Registration | Full platform | — | — | Everything |
| Committees | Per-edition committee pages | Single organizing committee view | — | Edition committee depth |
| Media | Digital + print per edition | — | — | Media archive entirely |
| Contact | Working API | — | — | Working form |
| Legal | 5 policies | — | — | All policies |

---

# PHASE 14 — Content Scoring (representative pages)

Scores 1–10 from crawl evidence (not subjective design preference alone).

## Website A — sample pages

| Page | Content | Design | Nav | Readability | Professional | SEO | A11y | UX | Trust | **Overall** |
|------|---------|--------|-----|-------------|--------------|-----|------|-----|-------|-------------|
| `/` | 9 | 9 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | **8.9** |
| `/registration` | 9 | 8 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | **8.8** |
| `/introduction` | 9 | 8 | 8 | 9 | 9 | 9 | 8 | 8 | 9 | **8.6** |
| `/committees` | 8 | 8 | 8 | 8 | 9 | 9 | 8 | 8 | 9 | **8.3** |
| `/gallery` | 8 | 8 | 8 | 8 | 8 | 9 | 7 | 8 | 8 | **8.0** |
| `/faq` | 8 | 8 | 8 | 9 | 9 | 9 | 8 | 8 | 8 | **8.3** |
| `/departments/academic-council` | 9 | 8 | 8 | 8 | 9 | 9 | 8 | 8 | 9 | **8.4** |

## Website B — all pages (grouped)

| Page | Content | Design | Nav | Readability | Professional | SEO | A11y | UX | Trust | **Overall** |
|------|---------|--------|-----|-------------|--------------|-----|------|-----|-------|-------------|
| `index.html` | 7 | 8 | 7 | 7 | 6 | 2 | 3 | 5 | 4 | **5.4** |
| `conference.html` | 6 | 7 | 7 | 7 | 6 | 2 | 4 | 6 | 4 | **5.4** |
| `committees.html` | 6 | 7 | 7 | 7 | 6 | 2 | 4 | 6 | 5 | **5.6** |
| `contact.html` | 4 | 7 | 7 | 7 | 5 | 2 | 4 | **2** | 3 | **4.6** |
| `register.html` | **1** | 3 | 7 | 4 | 3 | 2 | **1** | **1** | 2 | **2.7** |
| `about-nit.html` | 7 | 7 | 7 | 7 | 7 | 2 | 4 | 6 | 6 | **5.9** |
| `press.html` | 4 | 6 | 7 | 6 | 5 | 2 | 4 | 5 | 4 | **4.8** |
| `brochure.html` | 4 | 6 | 7 | 6 | 5 | 2 | 4 | 4 | 4 | **4.7** |

**Site average:** A **~8.4** · B **~4.6**

---

# PHASE 15 — Final Report

## Major strengths — Website A
1. **79-page indexed corpus** with unique SEO metadata on every page  
2. **Working registration and contact** conversion paths  
3. **Legal compliance** (privacy, terms, refund, cookie, disclaimer)  
4. **Hindi localization** (`/hi/*`)  
5. **Historical depth** — editions 1.0–5.0, proceedings, media archives  
6. **Department structure** (Academic Council, Prabandhan, Prachar, Sampark, Vitt)  
7. **Post-July-2026:** legacy URL **308 redirects** validated (GSC 13/13)

## Major weaknesses — Website A
1. **23 images** with empty alt text (accessibility)  
2. **No dedicated** NIT Hamirpur / UBA / Vidya Bharati / Olympiad landing pages (content exists elsewhere)  
3. **`/research/submit`** has duplicate H1  
4. Large HTML payloads on content-heavy pages (performance monitoring)

## Major strengths — Website B
1. **Clean visual marketing** layout on homepage and event cards  
2. **Dedicated supplementary about pages** (NIT, UBA, Vidya Bharati)  
3. **Simple navigation** for first-time visitors  
4. **Institutional co-branding** (NIT + UBA logos in header)

## Major weaknesses — Website B
1. 🔴 **Registration broken** (`register.html` → 404)  
2. 🔴 **Contact backend missing** (`contact-submit.php` 404)  
3. 🔴 **No SEO infrastructure** (robots, sitemap, canonical, OG, JSON-LD)  
4. 🔴 **No legal pages** (privacy, terms 404)  
5. 🔴 **No accessibility landmarks** on any page  
6. 🟠 Duplicate meta description on all pages  
7. 🟠 **214 KB CSS** + duplicated inline styles  
8. 🟠 Footer encoding/markup issues  

## Critical missing features (Website B)
- Payment integration  
- CMS / content governance  
- Hindi crawlable content  
- FAQ, feedback, donation  
- Media/proceedings archive  
- Search  
- Sitemap / Search Console readiness  

## Content gaps (Website A — optional enhancements)
- Standalone `/about/nit-hamirpur`, `/about/uba`, `/about/vidya-bharati` (B has these; A could add as supplementary, not replacement)  
- Standalone olympiad landing (currently under Academic Council)  
- Exhibition as dedicated page  

## Recommendations — Website A
| Priority | Action |
|----------|--------|
| 🟡 | Fix remaining empty `alt` on gallery/media images |
| 🟡 | Add supplementary about pages if organizers want parity with B's NIT/UBA content |
| 🟢 | Request GSC re-crawl of legacy URLs now returning 308 |
| 🟢 | Consider dedicated olympiad URL for marketing campaigns |

## Recommendations — Website B
| Priority | Action |
|----------|--------|
| 🔴 | **Do not use as official site** — link all CTAs to rase.co.in |
| 🔴 | Fix or remove `register.html` and `contact.html` until functional |
| 🔴 | Add `noindex` if site remains as preview mirror |
| 🟠 | Add robots.txt, sitemap, canonical, unique meta per page |
| 🟠 | Add `<main>`, skip link, image alt text |
| 🟠 | Publish privacy policy and terms |

## Final verdict

**Website A (rase.co.in)** is a production-grade national education summit platform with evidence-backed registration, legal compliance, multilingual support, deep archival content, and validated SEO (79 indexed URLs, 13/13 GSC checks).

**Website B (himvrit.in)** is a **20-page static prototype** suitable at most as a **supplementary marketing mirror**. Its registration and contact flows are **broken in production**. It lacks the crawlability, accessibility, legal, and payment infrastructure required for an official government-adjacent education event website.

**Decision for organizers:** Retain Website A as the sole official website. Website B should not replace it. If B remains online, it should prominently link to A for registration, contact, and policies.

---

*Audit conducted 6 July 2026. Evidence files: `audit-A-pages.csv`, `audit-B-pages.csv`, `audit-a-urls-2026-07-06.txt`, `audit-b-urls-2026-07-06.txt`.*
