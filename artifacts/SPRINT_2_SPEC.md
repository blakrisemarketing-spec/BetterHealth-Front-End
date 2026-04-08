# Sprint 2 Spec — Phone Mockup & Visual Polish
**Authored by:** Penny (Product Manager)  
**Date:** 2026-04-07  
**Collaborators:** Howard (Engineer, GPT 5.4) · Raj (UX/UI Designer, Gemini 3.1 Pro)

---

## Sprint Goal
Elevate the hero section by upgrading the phone mockup to a realistic, high-quality render — and resolve all UX/visual issues identified in the full-site audit.

---

## Background

The existing `PhoneFrame` component is a gray rounded rectangle with a simple notch. It lacks the hardware details that make a phone mockup feel real and premium. For a health-tech product in a competitive African market, first impressions matter — the hero phone needs to look like a *real device* people recognize and trust.

The existing screenshots are real and have strong content — the Health Score at 83/100, the Today's Focus biomarker breakdown, and the Blood Urea Nitrogen detail view. They don't need to be replaced; the frame around them needs to look polished.

---

## Task 1 — Realistic PhoneFrame Redesign (Raj → Howard)

### Raj's Design Spec

The phone mockup should evoke a modern flagship device. Key hardware details:

**Frame:**
- Dark material: `#1A1A1A` (near-black, like space black aluminum)
- Width: `max-w-[280px]`, same as current
- Border-radius: `rounded-[48px]` (slightly more rounded than current 36px)
- Outer shadow: `0 50px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)` — deep shadow with subtle rim light
- Body padding: `p-[10px]`

**Camera — Dynamic Island (pill):**
- Centered at top, `width: 100px, height: 28px`
- Color: `#000000`
- Border-radius: `9999px`
- Contains: a `6px × 6px` circular dot (front camera) centered inside on the right third
- Position: `absolute top-[10px] left-1/2 -translate-x-1/2 z-20`

**Side hardware buttons (CSS only — decorative):**
- **Left side — Volume Up:** `h-8 w-[3px]` pill shape, `bg-[#2A2A2A]`, positioned `left-[-3px] top-[110px]`
- **Left side — Volume Down:** `h-8 w-[3px]` pill shape, `bg-[#2A2A2A]`, positioned `left-[-3px] top-[155px]`
- **Left side — Silent switch:** `h-5 w-[3px]` pill shape, `bg-[#2A2A2A]`, positioned `left-[-3px] top-[80px]`
- **Right side — Power:** `h-10 w-[3px]` pill shape, `bg-[#2A2A2A]`, positioned `right-[-3px] top-[120px]`

**Screen area:**
- Inner container: `rounded-[38px] overflow-hidden bg-black` — tight inner radius
- Screen: `w-full h-auto block` on the img

**Speaker grill (bottom):**
- A row of 7 dots, each `3px × 3px`, `bg-[#2A2A2A]`, spaced `gap-1.5`
- Centered at bottom inside the frame padding: `mt-2 mb-1`

**Bottom indicator bar:**
- Replace cycling dots with a thin `h-[4px] w-[80px] rounded-full bg-white/30` bar centered at bottom (iPhone home indicator style)
- Only show when `isMulti` is true (replaces the dot indicators)

**Status bar polish:**
- The current notch is `bg-[#E8E8E8]` (frame color) — with new dark frame, camera pill approach makes notch unnecessary. Remove the old notch `<div>` entirely.

---

## Task 2 — Remove Dead Code

`src/components/ui/PhoneMockup.jsx` is an older prototype with broken JSX double-tags (`<<divdiv`) and is not imported anywhere. **Delete this file.**

---

## Task 3 — Full UX/Visual Audit Findings & Fixes

Identified by Raj (UX/UI) + Penny (PM) through code review and screenshot inspection:

### P0 — Critical (Blocks Conversion)
| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 1 | `Hero.jsx` | Floating badge `-bottom-4 -right-4` clips on narrow screens (< 320px) | Change to `bottom-0 -right-2 sm:-bottom-4 sm:-right-4` or use `translate-y-1/2` positioning |
| 2 | `Nav.jsx` | "Log in" link is `href="#"` — dead link on desktop | Replace with real URL or `/login` route when available; for now change to `href="/login"` |

### P1 — High Priority (Visual Polish)
| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 3 | `PhoneFrame.jsx` | Generic gray frame, no hardware details | ✅ Addressed in Task 1 |
| 4 | `PhoneMockup.jsx` | Broken dead code | ✅ Addressed in Task 2 |
| 5 | `Footer.jsx` | Social links all `href="#"` — broken | Leave as-is (no real social URLs yet), but add `title` attributes for accessibility |
| 6 | `Nav.jsx` | "Get Started" button has no route — is a `<button>` not a link | Wrap with `<Link to="/pricing">` for proper CTA routing |

### P2 — Medium Priority (UX Improvements)
| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 7 | `Pricing.jsx` | Plan CTA buttons have no `onClick`/`href` — they're visually buttons but do nothing | Link to `/contact` or `/signup` |
| 8 | `FAQ.jsx` | Check for keyboard accessibility on accordion items | Ensure `role="button"` + `tabIndex={0}` + `onKeyDown` on accordion triggers |
| 9 | `HowItWorks.jsx` | Step cards have `cursor-default` but the numbers suggest clickability — visual confusion | Add a subtle "read more" link or remove cursor-pointer hover effect |
| 10 | `Hero.jsx` | `CountUp` animation uses `setInterval` — should use `requestAnimationFrame` for smoother, frame-rate-accurate animation | Refactor to rAF (low priority) |

### P3 — Low Priority (Content Polish)
| # | Location | Issue | Fix |
|---|----------|-------|-----|
| 11 | `Footer.jsx` | `<Bird>` icon used for Twitter/X — Lucide doesn't have X icon; `Bird` is a workaround | Acceptable workaround; note in comments |
| 12 | All pages | Missing `<Helmet>` title tags on inner pages (About, Blog, etc.) | Add `<Helmet><title>Page Name — BetterHealth Africa</title></Helmet>` |

---

## Acceptance Criteria

- [ ] `PhoneFrame.jsx` renders a dark, realistic phone with camera pill, side buttons, speaker, and home indicator
- [ ] `PhoneMockup.jsx` deleted
- [ ] Hero floating badge no longer clips on small screens
- [ ] Nav "Get Started" button routes to `/pricing`
- [ ] Pricing plan CTAs linked to `/contact`
- [ ] No broken `href="#"` on navigable CTAs (Log in exception: TBD)
- [ ] All changes pass Echo II compliance review
- [ ] No regressions in mobile responsive layout

---

## Files to Change
- `src/components/ui/PhoneFrame.jsx` — rewrite
- `src/components/ui/PhoneMockup.jsx` — delete
- `src/components/Hero.jsx` — fix badge positioning
- `src/components/Nav.jsx` — fix "Get Started" + "Log in"
- `src/components/Pricing.jsx` — fix plan CTAs

---

## Pre-Read Instruction for Howard (Engineer)
Before making any changes, read:
1. `~/projects/BetterHealth-Front-End/CONTEXT.md`
2. `~/projects/BetterHealth-Front-End/src/components/ui/PhoneFrame.jsx`
3. `~/projects/BetterHealth-Front-End/src/components/Hero.jsx`

Then implement all changes from this spec. Do not push to git — Cal (orchestrator) handles that after Echo II compliance sign-off.
