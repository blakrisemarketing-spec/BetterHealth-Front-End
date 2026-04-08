# Task Report: betterhealth-20260408-001

**Date:** 2026-04-08  
**Engineer:** Howard (Senior Software Engineer)  
**Task:** Screenshot capture + PhoneFrame upgrade + typography fixes

---

## Summary

All 4 objectives completed successfully. Build passes with zero errors.

---

## 1. Live App Screenshots Captured

Logged into `https://app.betterhealth.africa` as `peter.dag@gmail.com`.

**Tool used:** Python + Playwright (headless Chromium)  
**Resolution:** 1170×2532px (390×844 @ 3× DPR — true Retina / iPhone 14 Pro quality)  
**Format:** JPEG, 95% quality

| File | Source URL | Content | Size |
|------|-----------|---------|------|
| `mobile-healthscore.jpg` | `/biomarkers` | Health Score 83/100, organ system breakdown, trend graph | ~227 KB |
| `mobile-focus.jpg` | `/` (root dashboard) | "Good morning, Kofi" — 31 biomarkers in range, physical health overview | ~244 KB |
| `mobile-biomarker.jpg` | `/biomarkers` (scrolled) | Today's Focus (Creatinine, Direct Bilirubin) + Celebrate Your Wins section | ~249 KB |

**Previous resolution:** 660×1303px JPEG (old 1× screenshots)  
**New resolution:** 1170×2532px JPEG (true 3× Retina — 3.1× more pixels per screenshot)

**Important note on app routes:** The app's navigation uses icon-only links with no accessible text at the top level. The `/focus` route returns 404. The real "Focus" content (Today's Focus / biomarker actions) lives on the `/biomarkers` page, scrolled. The root `/` route serves the overview dashboard. Screenshots are mapped accordingly for maximum landing page impact.

---

## 2. PhoneFrame Component — Premium Upgrade

**File:** `src/components/ui/PhoneFrame.jsx`

### Changes:
- **Device model bumped** to iPhone 15 Pro aesthetic (slightly larger DI, refined proportions)
- **Titanium-finish body** — `linear-gradient(145deg, #2C2C2E, #1C1C1E, #141416)` with multi-layer box-shadow stack:
  - 3 depth shadows (60px / 30px / 8px) for realistic off-screen lift
  - 1.5px edge highlight (`rgba(255,255,255,0.12)`) — titanium edge shimmer
  - Inner rim + top-left specular overlay for 3D realism
- **Top specular line** — gradient line across top edge mimicking light reflection on metal frame
- **Dynamic Island** — larger (108×30px), correct black pill with improved front-camera dot (radial-gradient iris)
- **Screen glare overlay** — subtle `linear-gradient(145deg, rgba(255,255,255,0.04), transparent)` simulating screen reflection
- **Hardware buttons** — upgraded to `linear-gradient` fills with inset highlights and outer shadow for depth; correct left side (mute + vol up + vol down), right side (power)
- **Speaker grill** — 9 dots (was 7) with subtle `rgba(255,255,255,0.15)` for metallic appearance
- **Carousel dots** — replaced with interactive pill indicators (active = teal 20px pill, inactive = 6px dot); clicking dots jumps to that screen
- **Animation** — updated to scale-based transition (`scale: 1.03 → 1`) for premium feel vs. plain Y-translate
- **Accessibility** — `aria-label` on wrapper, `aria-label` on dot buttons, `aria-hidden` on decorative elements

---

## 3. Typography & Spacing Fixes

### Hero component (`src/components/Hero.jsx`)
- `h1` leading: `1.08` → `1.1` (prevents descender crowding at large clamp sizes)
- `h1` margin-bottom: `mb-5` → `mb-6` (more breathing room between headline and body)
- Italic gradient span: added `pr-[0.15em]` (was `pr-[0.1em]`) to prevent right-edge clipping on italic "inside"
- Body paragraph: `leading-relaxed` → `leading-[1.7]` (explicit line-height for body text)
- CTA primary button: added `duration-200` and `hover:shadow-glow-green` for polished hover state

### ProductShowcase component (`src/components/ProductShowcase.jsx`)
- `h2` margin-bottom: `mb-4` → `mb-5` + `leading-[1.1]` added for consistent heading spacing
- Italic gradient span: added `pr-[0.12em]` to prevent right-edge clipping on "in one place"
- Body paragraph: `leading-relaxed` → `leading-[1.7]`

---

## 4. Build Status

```
✓ 2160 modules transformed
✓ Built in 862ms
✓ Zero errors
```

Dist output:
- `dist/assets/index-*.css`: 45.67 kB (8.82 kB gzip)
- `dist/assets/index-*.js`: 569.24 kB (167.44 kB gzip)

Note: Large JS bundle warning is pre-existing (not introduced by this task). Recommend code-splitting as future optimization.

---

## Files Modified

| File | Change Type |
|------|------------|
| `public/screenshots/mobile-healthscore.jpg` | Replaced (660×1303 → 1170×2532px) |
| `public/screenshots/mobile-focus.jpg` | Replaced (660×1300 → 1170×2532px) |
| `public/screenshots/mobile-biomarker.jpg` | Replaced (660×1301 → 1170×2532px) |
| `src/components/ui/PhoneFrame.jsx` | Major upgrade — premium iPhone 15 Pro mockup |
| `src/components/Hero.jsx` | Typography / spacing fixes |
| `src/components/ProductShowcase.jsx` | Typography / spacing fixes |
| `scripts/capture-screens.py` | New — Playwright screenshot automation |
| `scripts/explore-nav.py` | New — App navigation explorer (dev utility) |

---

## Recommendations for Next Sprint

1. **Code-split the JS bundle** — break vendor dependencies (framer-motion, react-router) into separate chunks
2. **Convert screenshots to WebP** — the 3 new JPEGs total ~730 KB; WebP would reduce to ~400 KB
3. **Add a "Today's Focus" route** — the app doesn't have `/focus`; the landing page implies this feature prominently. Worth aligning with product team.
4. **Screen carousel timing** — consider increasing `interval` to 4500ms on mobile for slower readers
