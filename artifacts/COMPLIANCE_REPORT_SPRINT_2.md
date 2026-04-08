# Compliance Report — Sprint 2
## BetterHealth Africa — Phone Mockup & Visual Polish

**Agent:** Echo II | Compliance Agent, BetterHealth Front-End
**Date:** 2026-04-08
**Commits reviewed:** `0b45a5b` · `78a3f97`
**Scout QA Report:** QA_REPORT_SPRINT_2.md — PARTIAL PASS
**Sprint Spec:** SPRINT_2_SPEC.md

> **Note:** This report is retrospective. Sprint 2 commits were pushed to `main` prior to Echo II sign-off, which deviates from the required pipeline (Atlas → Forge → Scout → Echo II → Cal). Pipeline compliance must be restored from Sprint 3 onward.

**Verdict:** CONDITIONALLY COMPLIANT — Core visual deliverable approved. Four outstanding spec items must be resolved in Sprint 3 before next push.

---

## Checklist

| # | Section | Status | Notes |
|---|---------|--------|-------|
| 1 | Assets & Dependencies | PASS | No new dependencies added in Sprint 2. All existing deps retained. Screenshot assets (JPEGs) added to `public/screenshots/` — served as static assets, no CDN risk. |
| 2 | Performance Standards | ADVISORY | Build succeeds (0 errors). JS bundle 569.82 KB — exceeds 500 KB soft limit. CSS 45.68 KB — within limit. Bundle growth attributable to Retina JPEG references and Framer Motion retained from Sprint 1. Code-splitting recommended for Sprint 3. |
| 3 | Accessibility | FAIL (deferred) | `PhoneFrame.jsx` hardware buttons correctly marked `aria-hidden="true"`. Carousel dots have proper `aria-label`. However, Sprint 2 spec required FAQ keyboard accessibility fix (`tabIndex`, `role="button"`, `onKeyDown`) — not implemented. Carried to Sprint 3. |
| 4 | HTML & Semantic Structure | PASS | No structural changes to index.html or App.jsx routing. Existing semantic structure (`<nav>`, `<main>`, `<footer>`) intact. `<title>` and OG tags unchanged. |
| 5 | No Broken References | ADVISORY | `src/components/ui/PhoneMockup.jsx` retained but not imported — dead code. Does not affect build. Must be deleted in Sprint 3 per spec. |
| 6 | Copy & Content Accuracy | PASS | No content changes. Pricing values, biomarker counts, and value anchors match Sprint 1 verified state. |

---

## Violations

| # | Severity | Item | Location | Required Action |
|---|----------|------|----------|-----------------|
| V1 | HIGH | Pipeline deviation — code pushed without Echo II sign-off | Process | No code action; process correction required from Sprint 3 |
| V2 | MEDIUM | `href="#"` on Nav "Log in" — dead link in production | `Nav.jsx:83` | Change to `href="/login"` in Sprint 3 |
| V3 | MEDIUM | Nav "Get Started" is `<button>`, not a routed `<Link>` | `Nav.jsx:86` | Wrap with `<Link to="/pricing">` in Sprint 3 |
| V4 | MEDIUM | Pricing CTAs are non-functional buttons | `Pricing.jsx:85,93` | Link to `/contact` in Sprint 3 |
| V5 | LOW | `PhoneMockup.jsx` dead code not deleted per spec | `src/components/ui/PhoneMockup.jsx` | Delete file in Sprint 3 |
| V6 | LOW | Hero badge may clip on < 320px viewports | `Hero.jsx:133` | Responsive positioning fix in Sprint 3 |

---

## Advisories (non-blocking)

| # | Item | Severity | Details |
|---|------|----------|---------|
| A1 | JS bundle size | Medium | 569.82 KB exceeds 500 KB soft limit. Implement `React.lazy()` + `Suspense` for route-level code splitting. |
| A2 | JPEG assets not WebP | Low | 3× Retina screenshots in `public/screenshots/` are JPEGs. Convert to WebP for ~30–40% size reduction and better LCP. |
| A3 | `/focus` route (404 in prod) | Low | Identified in prior context — no `/focus` route defined in `App.jsx`. Investigate if referenced from app deep link. |
| A4 | FAQ keyboard accessibility | Low | Carried from Sprint 1 advisory A1. `FAQ.jsx` accordion still lacks `tabIndex`, `role="button"`, `onKeyDown`. |

---

## Verification Summary

| Check | Method | Result |
|-------|--------|--------|
| Build | `npm run build` | 0 errors, 1 bundle-size warning |
| Bundle JS | dist asset inspection | 569.82 KB (advisory over 500 KB) |
| Bundle CSS | dist asset inspection | 45.68 KB (pass) |
| Dead code scan | Import grep across `src/` | `PhoneMockup.jsx` — unused, not imported |
| Broken link scan | Source grep `href="#"` | 1 hit: `Nav.jsx:83` — "Log in" |
| Hardware buttons | Component review | All `aria-hidden="true"` ✅ |
| Carousel accessibility | Component review | Dots have `aria-label` ✅ |
| No CDN references | grep for cdn/unpkg/jsdelivr | 0 matches |
| Placeholder text | grep Lorem/TODO/TBD | 0 matches |
| Image preloading | PhoneFrame source | `new Image()` preload on mount ✅ |
| Flicker fix | Hero.jsx + PhoneFrame.jsx | `translateZ(0)` compositing, desktop-only float ✅ |

---

## Approval

CONDITIONALLY COMPLIANT

Sprint 2's primary deliverable (PhoneFrame redesign + flicker fix) is approved. Six violations logged — all deferred to Sprint 3. Pipeline must return to correct sequence (Echo II sign-off before push) from Sprint 3 onward.

**Sprint 3 must resolve V2, V3, V4 (navigable CTAs) and V5 (dead code) before Echo II can issue a clean COMPLIANT verdict.**

---

Echo II | Compliance Agent, BetterHealth Front-End
