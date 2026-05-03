# BetterHealth Front-End - Project Context

## Current State

The application is a modern, conversion-optimized marketing frontend for BetterHealth Africa. It serves as the primary public-facing site at `betterhealth.africa`, covering consumer health plans, B2B partner pages, a waitlist signup system, and compliance documentation.

The project has undergone a major design system alignment (May 2026) and now reflects the official BetterHealth Africa Design System across all pages and components.

---

## Tech Stack

- **Framework:** React 19 + Vite 8 + Tailwind CSS
- **Animations:** Framer Motion (Apple-style cubic-bezier, 300ms standard)
- **SEO:** react-helmet-async
- **Backend:** Supabase (waitlist signups)
- **Deployment:** GitHub Pages with custom domain `betterhealth.africa`
- **Repository:** `blakrisemarketing-spec/BetterHealth-Front-End`

---

## Current Routes (16 pages + 404)

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Hero, ProductShowcase, PhoneFrame carousel |
| `/how-it-works` | How It Works | Step-by-step flow |
| `/what-we-test` | What We Test | Biomarker breakdown |
| `/stories` | Stories | Patient stories |
| `/about` | About | Team + Medical Advisory Board |
| `/pricing` | Pricing | Plan comparison table |
| `/faq` | FAQ | GDPC cert link included |
| `/contact` | Contact | Contact form |
| `/privacy` | Privacy | GDPC certification callout |
| `/terms` | Terms of Service | |
| `/blog` | Blog | |
| `/careers` | Careers | |
| `/download-app` | Download App | |
| `/for-labs` | For Labs | B2B page for lab partners |
| `/for-doctors` | For Doctors | B2B page for clinician partners |
| `/waitlist` | Waitlist | Standalone waitlist landing page |
| `/*` | 404 Not Found | SPA fallback |

---

## Key Files

- `tailwind.config.js` — all design tokens
- `src/index.css` — global styles, font imports (Quicksand)
- `src/data/content.js` — all page content data (including FAQ GDPC link)
- `src/App.jsx` — routing

---

## Design System

**Source:** `/BetterHealth Africa Design System/` (README.md, colors_and_type.css, ui_kits/, fonts/, assets/)

| Token | Value |
|-------|-------|
| Primary color | `#6B8E7F` (sage green) |
| Font | Quicksand variable font, 300–700 |
| Canvas background | `#F5F3EE` warm beige (never pure white) |
| Border radius | `rounded-card` = 12px |
| Dark mode | Apple HIG compliant |

**Removed patterns:**
- Glass morphism (backdrop-blur, translucent backgrounds)
- Gradient text effects (bg-clip-text)
- Gradient CTA backgrounds → replaced with solid `bg-primary`

---

## Test Packages Offered

| Plan | Frequency | Includes |
|------|-----------|---------|
| Essential | 1×/year | Full blood count, Blood sugar, Kidney function, Liver function, Urinalysis, Lipid profile |
| Complete | 2×/year | Essential + Uric acid |
| Premium | 2×/year | Complete + Cardiac troponins I & T, C-Reactive Protein |

**Plan comparison table categories:** Hematology (29), Urinalysis (20), Liver Function (12), Lipids (8), Renal Function (8), Metabolic (1), Uric Acid (Complete + Premium only), Cardiovascular (3, Premium only)

---

## Recent Work Completed (Late April–May 2026)

### Waitlist System
- Added `/waitlist` page with `WaitlistForm.jsx`, `WaitlistSection`, and `WaitlistProvider` context
- Connected to Supabase for waitlist signups

### New Pages
- `/waitlist` — Standalone waitlist landing page
- `/for-labs` — `ForLabs.jsx` — B2B page for lab partners
- `/for-doctors` — `ForDoctors.jsx` — B2B page for clinician partners
- `/careers` — Careers page
- `/download-app` — Download app page

### CTA Link Update
- All `app.betterhealth.africa` links changed from `/login` to `/join` (gated entry) across all pages and Footer

### GDPC Data Protection Verification
- Added "Verify our certification →" link to `https://app.dataprotection.org.gh/company/dpdZwcRth19j7oQFxmwoDj1ELCOABE` in:
  - `GDPCBadge.jsx` (banner variant on Home page)
  - `Privacy.jsx` (certification callout)
  - `Footer.jsx` (compliance section)
  - FAQ content in `content.js`

### Plan Comparison Table Overhaul
- Removed Thyroid and Hormones categories (not offered)
- Added correct categories with accurate test counts (see table above)
- Added frequency labels per plan

### Design System Alignment
- Full visual overhaul to match official BetterHealth Africa Design System (see Design System section above)

### SPA Routing Fix
- Fixed `404.html` and `index.html` redirect logic for GitHub Pages with custom domain
- All routes now work on direct navigation

### Medical Advisory Board
- Added real doctor photos: Dr. Delasy Gbekor, Dr. Afia Agyinsam Amponsah, Dr. Jumana

---

## Earlier Work (April 2026)

### Image & Mockup Updates (2026-04-08)
- Replaced all 660×1303px JPEGs with 1170×2532px Retina captures (iPhone 14 Pro, 390×844 @ 3× DPR)
  - `mobile-healthscore.jpg` → `/biomarkers` page, Health Score 83/100
  - `mobile-focus.jpg` → Root `/` dashboard, "Good morning, Kofi"
  - `mobile-biomarker.jpg` → `/biomarkers` scrolled to Today's Focus
  - Captured via Playwright automation (`scripts/capture-screens.py`)
- PhoneFrame upgraded to iPhone 15 Pro aesthetic (titanium shadow stack, Dynamic Island, hardware buttons)
- Desktop Carousel: `HowItWorks` uses optimized WebP images

### Mobile Responsiveness
- All pages and components made fully mobile-responsive (commit `1265ffb`)
- Hero section stacks correctly on mobile; flex-wrap and grid breakpoints applied throughout

---

## Credentials

- **Patient Interface:** `app.betterhealth.africa` (Email: peter.dag@gmail.com) — stored in project credentials file

---

## Pending Recommendations

- Convert JPEG screenshots to WebP (~730 KB → ~400 KB)
- Code-split JS bundle (pre-existing 569 KB warning)
