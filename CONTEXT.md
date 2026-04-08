# BetterHealth Front-End - Project Context

## Current State
The application is a modern, conversion-optimized SaaS landing page for BetterHealth Africa. Most core components and pages are built, and the project has undergone several recent iterations to improve visual polish, performance, and responsiveness.

## Recent Changes & Improvements

### 🖼️ Image & Mockup Updates (2026-04-08 — Task betterhealth-20260408-001)
- **Retina Screenshots:** Replaced all 660×1303px JPEGs with 1170×2532px captures (390×844 @ 3× DPR — iPhone 14 Pro Retina).
  - `mobile-healthscore.jpg` → `/biomarkers` page showing Health Score 83/100 with organ breakdown
  - `mobile-focus.jpg` → Root `/` dashboard showing "Good morning, Kofi" + 31 biomarkers in range
  - `mobile-biomarker.jpg` → `/biomarkers` scrolled to Today's Focus (Creatinine/Direct Bilirubin) + Wins
  - Screenshots captured via Playwright automation (`scripts/capture-screens.py`)
- **Premium PhoneFrame Upgrade:**
  - Bumped to iPhone 15 Pro aesthetic with titanium-finish multi-layer shadow stack
  - Top specular edge highlight, Dynamic Island with front-camera iris
  - Screen glare overlay for depth/realism
  - Hardware buttons upgraded with gradient fills and inset highlights
  - 9-dot speaker grill (was 7), interactive pill-style carousel indicators
  - Scale-based Framer Motion transition (vs. plain Y-slide)
  - Accessibility: aria-labels on wrapper and dot buttons
- **Desktop Carousel:** The `HowItWorks` section's carousel uses optimized WebP images for desktop views.

### 📱 Mobile Responsiveness & Layout
- **Full Responsiveness:** A major update (`1265ffb`) made all pages and components mobile-responsive.
- **Layout Adjustments:** 
  - Used flex-wrap and grid systems (`sm:`, `md:`, `lg:`) to ensure smooth transitions from mobile to desktop viewports.
  - The Hero section correctly stacks the copy and the phone mockup on smaller screens.
- **Typography & Clipping Fixes (2026-04-08):**
  - Hero `h1`: leading `1.08→1.1`, `mb-5→mb-6`, italic pr padding `0.1em→0.15em`
  - Hero body copy: `leading-relaxed→leading-[1.7]`
  - Hero CTA button: added `duration-200` + `hover:shadow-glow-green`
  - ProductShowcase `h2`: `mb-4→mb-5`, `leading-[1.1]` added, italic pr padding `→0.12em`
  - ProductShowcase body copy: `leading-relaxed→leading-[1.7]`

### 🛠️ Technical Status
- **Framework:** React + Vite + Tailwind CSS.
- **Animations:** Framer Motion is used for reveals and the hero phone animation.
- **Deployment:** GitHub Actions workflow is configured for GitHub Pages.
- **Dependencies:** `react-helmet-async` is included for SEO/metadata management.
- **Build status:** Clean ✓ (862ms, zero errors as of 2026-04-08)

- **Patient Interface Credentials:** `app.betterhealth.africa` (Email: peter.dag@gmail.com) - *Stored in project credentials file.*

### 🗓️ Pending Recommendations
- Convert new JPEG screenshots to WebP (~730 KB → ~400 KB)
- Code-split JS bundle (pre-existing 569 KB warning)
- Investigate `/focus` route (currently 404 in production app)

