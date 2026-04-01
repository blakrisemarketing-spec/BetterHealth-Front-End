# Sprint 0 Spec — BetterHealth Africa New Homepage
## UPDATED WITH STRATEGY DOCUMENT

**Agent:** Atlas | Product Manager, BetterHealth Front-End
**Date:** 2026-04-01
**Strategy Source:** BetterHealth-Website-Strategy.docx (received from Godol)
**Status:** APPROVED — Ready for Forge

---

## Project Brief

Build a world-class, conversion-optimised marketing website homepage for **BetterHealth Africa** — Ghana's comprehensive preventive health testing platform.

### The Mandate
The strategy document (BetterHealth-Website-Strategy.docx) and prototype (React JSX) establish the content structure and visual direction. This is informed by deep competitive analysis of Function Health, Geviti, Empirical Health, and Nucleus Genomics. The final site must be **significantly more beautiful** than the prototype — premium design comparable to those four reference sites.

### Primary Reference Sites
1. **Function Health** (functionhealth.com) — Copy clarity, hero design, disease marquee, comparison table, patient stories
2. **Geviti** (gogeviti.com) — App showcase, tiered pricing, founder story, numbered steps
3. **Empirical Health** (empirical.health) — Three-act narrative, phone mockup, focused copywriting, biomarker explorer
4. **Nucleus Genomics** (mynucleus.com) — Press logo bar, scroll animations, mission-driven closing

### Conversion Goal
A health-conscious Ghanaian professional (25–45) lands on this page and books their first health screening. Every section must earn its place in that argument.

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Vite + React 18** | Prototype is React; fast builds; GitHub Pages deployable |
| Styling | **Tailwind CSS v3** | Utility-first, great responsive support |
| Animation | **Framer Motion** | Smooth scroll reveals, phone floating, parallax |
| Icons | **Lucide React** | Clean, consistent, tree-shakeable |
| Fonts | Google Fonts (self-hosted preferred) | Plus Jakarta Sans + DM Sans + JetBrains Mono |
| Build target | **Static** (`vite build`) → `dist/` | GitHub Pages deployment |

---

## Design System

### IMPORTANT: This is a LIGHT-MODE site with dark accent sections

The strategy document specifies a warm white background (`#FAFAF9`) for the primary page experience — NOT a fully dark site. Dark backgrounds are used only for specific accent sections (condition marquee, footer, and final CTA).

This follows Function Health and Empirical Health's aesthetic: clean, premium, medical authority without clinical coldness.

### Color Tokens

```css
/* Page & Layout */
--bg-page:        #FAFAF9   /* primary page background — warm white */
--bg-section-alt: #F3F4F6   /* alternating section background */
--bg-dark:        #0F1724   /* dark accent sections (marquee, footer, CTA) */
--bg-dark-card:   #1A2537   /* cards inside dark sections */
--bg-card:        #FFFFFF   /* card surfaces on light sections */
--bg-card-hover:  #F8FFFE   /* card hover on light */
--border:         #E5E7EB   /* borders on light sections */
--border-dark:    rgba(255,255,255,0.08) /* borders on dark sections */

/* Brand */
--primary:        #0D9488   /* primary teal — BetterHealth brand */
--primary-light:  #14B8A6   /* lighter teal for gradients */
--primary-dark:   #0F766E   /* darker teal for hover/pressed */
--primary-glow:   rgba(13,148,136,0.15)
--primary-bg:     rgba(13,148,136,0.08)

/* Text */
--text-primary:   #111827   /* headlines and primary copy */
--text-secondary: #4B5563   /* body copy */
--text-muted:     #9CA3AF   /* captions, labels */
--text-on-dark:   #F1F5F9   /* text on dark sections */
--text-muted-dark:#94A3B8   /* secondary text on dark sections */

/* Status (biomarker indicators) */
--success:        #22C55E   /* healthy/normal */
--warning:        #F59E0B   /* borderline */
--danger:         #EF4444   /* critical/abnormal */
```

### Typography

```
Display/Headlines: Plus Jakarta Sans — 800/700 weight, -0.03em tracking
Body:             DM Sans — 400/500 weight, 1.7 line-height
Mono:             JetBrains Mono — 500 weight (biomarker values only)
```

### Type Scale

```
Display:   clamp(44px, 6vw, 72px) — hero headline
H1:        clamp(36px, 5vw, 58px)
H2:        clamp(28px, 4vw, 44px)
H3:        24px
Body:      16–18px
Small:     14px
Caption:   12–13px
```

### Spacing
- Section padding: `120px 0` (desktop) / `80px 0` (mobile)
- Max container: `1280px`, padding `0 24px`
- Card padding: `32px` (desktop) / `24px` (mobile)

### Border Radius
- Cards: `20px`
- Buttons: `10px`
- Badges/pills: `100px`

---

## Site Structure — 15 Sections in Scroll Order

### Section 1 — Navigation Bar
**Inspiration: Function Health + Nucleus**

- Fixed position; transparent on load → frosted glass on scroll (`backdrop-filter: blur(16px)`, `background: rgba(255,255,255,0.85)`)
- Left: Logo (teal "B" + "BetterHealth Africa" wordmark)
- Center: Nav links — How It Works | What We Test | Pricing | About | Stories
- Right: "Get Started" CTA button (primary teal, rounded)
- Mobile: hamburger → fullscreen overlay menu
- Trust badge near CTA: small "Mobile Money Accepted" pill

---

### Section 2 — Hero
**Inspiration: Function Health (copy clarity) + Empirical Health (focused promise)**

This is the most important 5 seconds of the website. Must answer instantly: What is this? Who is it for? What do I get?

- **Layout**: Split — left text, right product mockup (phone showing health dashboard)
- **Background**: Warm white (`#FAFAF9`) — CLEAN, no busy patterns
- **Subtle background element**: One very soft teal gradient blob (low opacity: 0.06) bottom-right, plus faint dot grid overlay (opacity: 0.04)
- **Eyebrow badge**: Pulsing green dot + "Now available in Ghana"
- **Headline**: "Know What's Happening *Inside* Your Body." — large, bold, dark navy. "*Inside*" in teal italic
- **Sub**: "Comprehensive lab testing with 100+ biomarkers, personalized health insights, and home sample collection. Starting from GHS 8/day."
- **Primary CTA**: "Start Your Health Check →" (teal button, large)
- **Secondary CTA**: "See What We Test" (ghost/outline button)
- **Stats bar**: Three pills below CTAs — `127+ Biomarkers` | `Home Collection` | `GHS 8/day`
- **Animation**: Text fades in from left, phone slides in from right with spring easing + floating loop
- **Phone mockup**: Dark phone skin, cycles through 3 screens every 3.5s (Health Score / Lab Results / Trends)

---

### Section 3 — Trust / Partner Logo Bar
**Inspiration: Nucleus (press logos) + Function Health (lab partner)**

- Subtle light gray band (`#F3F4F6`)
- Eyebrow label: "In partnership with"
- Logos: Lab Access Ghana | Paystack | Ghana Health Service | [any other]
- Style: Grayscale logos, auto-scrolling marquee on mobile, static on desktop
- No headline — just logos + label

---

### Section 4 — Condition Detection Marquee
**Inspiration: Function Health (disease scrolling wall)**

- **Dark section** (`#0F1724`)
- Eyebrow: "Screen for early indicators of 100+ conditions"
- Two rows of infinite scrolling pills — opposite directions
- Row 1 scrolls left, Row 2 scrolls right
- Pill style: subtle teal border, white text on dark background, pause on hover
- **Row 1 (22 items)**: Diabetes, Hypertension, Sickle Cell Trait, Hepatitis B, Thyroid Disorders, Kidney Disease, Liver Disease, Anemia, PCOS, Prostate Cancer, High Cholesterol, Vitamin D Deficiency, Gout, HIV Monitoring, Iron Deficiency, Malaria Aftermath, Fatty Liver, Insulin Resistance, Hormonal Imbalance, Chronic Inflammation, Autoimmune Markers, Celiac Disease
- **Row 2 (16 items)**: Testosterone Levels, Estrogen Levels, B12 Deficiency, Folate Deficiency, Cortisol Imbalance, Uric Acid, Calcium Disorders, Potassium Imbalance, Hemochromatosis, Lupus Markers, Rheumatoid Markers, Pancreatic Function, Metabolic Syndrome, Pre-eclampsia Risk, Fertility Markers, Bone Health

---

### Section 5 — How It Works
**Inspiration: Geviti (numbered steps) + Empirical Health (three-act narrative)**

- Light background (`#FAFAF9`)
- 4 oversized numbered steps (01 / 02 / 03 / 04) in a horizontal row on desktop, stacked on mobile
- Number watermark: giant low-opacity teal number in background of each card
- Each card: white card with soft shadow, icon, number, title, description
- Steps stagger-reveal on scroll (framer-motion, 100ms delay between cards)
- CTA button below the steps: "Get Started"

**Steps:**
1. **Sign Up** — Create your account, choose your package, and pay with Mobile Money or card.
2. **Book Collection** — Choose in-lab visit or home collection. A certified phlebotomist comes to your door.
3. **Get Your Results** — Comprehensive results in your health dashboard within 48–72 hours. Every biomarker explained.
4. **Take Action** — Personalized insights and recommendations. Track changes over time.

---

### Section 6 — Product Dashboard Showcase
**Inspiration: Geviti (app showcase) + Empirical Health (phone mockup)**

This is the second most important conversion section. Visitors must SEE what they're paying for.

- Alternating layout: phone mockup + copy
- Supporting copy: "Your health, in one place. Track every biomarker. Understand every result. See how your body changes over time."
- Feature list: 3 items with animated teal check:
  - Organ System Health View
  - Biomarker Trend Tracking
  - Plain-Language Explanations
- **Interactive tabs** (or auto-cycling): Dashboard | Lab Results | Health History | Biomarker Trends
- Phone floats with subtle animation + shadow
- Light teal background band (`rgba(13,148,136,0.05)`)

---

### Section 7 — What We Test (Interactive Explorer)
**Inspiration: Empirical Health (body system categories)**

- Light background
- 8 category tabs across the top
- Active tab: teal background
- Tab panel: biomarkers as monospace pills with count badge
- Hover: card lifts, teal border glow
- CTA: "See Full Test Menu"

**Categories (with biomarker counts):**
- ❤️ Heart & Cardiovascular (12): Total Cholesterol, LDL, HDL, Triglycerides, ApoB, Lp(a), hs-CRP, Homocysteine, Chol/HDL Ratio, + 3 more
- 🫀 Liver Function (6): ALT, AST, ALP, GGT, Bilirubin, Albumin
- 🫘 Kidney Function (8): Creatinine, BUN, eGFR, Uric Acid, Na/K/Cl, Calcium, Phosphate, CO2
- ⚡ Metabolic & Diabetes (6): Fasting Glucose, HbA1c, Insulin, HOMA-IR, C-Peptide, Fructosamine
- 🧬 Hormones (10): Testosterone (Total & Free), Estradiol, Progesterone, DHEA-S, Cortisol, FSH/LH, Prolactin, SHBG
- 🌿 Nutrients & Vitamins (8): Vitamin D, B12, Folate, Iron/Ferritin, TIBC, Zinc, Magnesium, Selenium
- 🩸 Blood Health (14): CBC Full Blood Count, Hemoglobin, Hematocrit, WBC Differential, Platelet Count, ESR, Reticulocytes, Sickle Cell Screen
- 🦋 Thyroid (5): TSH, Free T3, Free T4, TPO Antibodies, Thyroglobulin Ab

---

### Section 8 — BetterHealth vs. Hospital Labs
**Inspiration: Function Health (comparison table — "best for this pattern")**

- Light section, two-column table
- BetterHealth column: teal header with white check marks
- Hospital Lab column: gray header with X marks
- Alternating row shading
- 10 comparison rows:
  1. 100+ biomarkers in one visit
  2. Home sample collection
  3. Results in 48–72 hours
  4. Plain-language explanations
  5. Biomarker tracking over time
  6. Digital health dashboard
  7. Personalized recommendations
  8. Mobile Money payment
  9. No referral needed
  10. Affordable fixed pricing
- Value anchor above table: "What would cost GHS 15,000+ at a private hospital is GHS 247/month with BetterHealth"

---

### Section 9 — Testimonials & Patient Stories
**Inspiration: Function Health (outcome stories) + Geviti (mixed format)**

- Light alt background
- 3 cards in a grid (or auto-scroll carousel)
- Each card: discovery badge (e.g., "Discovered: Pre-diabetes" in amber), 5-star rating, italic quote, avatar with gradient initial, name + location
- Hover: card lifts + teal border

**Stories:**
1. **Ama K.**, 34, Accra — Pre-diabetes — "I discovered I was pre-diabetic at 34. My HbA1c was 6.1% — my doctor at the polyclinic had never tested for it. Three months of lifestyle changes later, I'm back in the normal range."
2. **Kwame M.**, 28, Kumasi — Vitamin D deficiency — "My Vitamin D was critically low at 11 ng/mL. I had no idea that was causing my chronic fatigue and muscle pain. No doctor had ever checked this."
3. **Efua & Kofi A.**, Tema — Sickle cell trait — "We both found out we carry the sickle cell trait. We had no idea. Now we can make informed decisions about our family planning. This test may have saved our future child's life."

---

### Section 10 — Pricing
**Inspiration: Geviti (tiered cards — "best for this pattern") + Function Health (price anchoring)**

- Light background
- Value anchor above cards: "What would cost GHS 15,000+ at a private hospital is GHS 247/month with BetterHealth"
- Three cards; middle card elevated (scale 1.02), "Most Popular" teal badge
- Price anchoring: show per-day equivalent (e.g., "GHS 8/day")
- Trust badges below: Mobile Money Accepted | Paystack Secured | Cancel Anytime

**Plans:**
- **Essential** — GHS 247/mo — 60+ core biomarkers, In-lab collection, Digital dashboard, PDF report, Email results
- **Complete (MOST POPULAR)** — GHS 413/mo — 100+ biomarkers, Home collection, Organ system view, Trend tracking, Personalized recommendations, Priority 48hr results
- **Premium** — GHS 580/mo — 127+ biomarkers, Home collection, Everything in Complete, Doctor consultation, Quarterly re-testing, Family discount

---

### Section 11 — Founder Story & Mission
**Inspiration: Geviti (founder section — "best for this pattern")**

- Light alt background
- Full-width section: gradient avatar/photo placeholder left, story text right
- Not corporate. First person. Emotional but grounded.
- **Pull quote**: "I built BetterHealth because Africans deserve to know their health — not after illness strikes, but before."
- **Para 1**: "In Ghana, comprehensive health screening has been a privilege — expensive, fragmented, and available only in a few facilities. Most people only see a doctor when something is already wrong. We're changing that."
- **Para 2**: "BetterHealth Africa makes proactive health monitoring accessible, affordable, and beautifully simple. Because your health shouldn't be a mystery."
- CTA: "Read Our Story"

---

### Section 12 — Medical & Advisory Team
**Inspiration: Function Health (medical board — "best for this pattern")**

- Light background
- Eyebrow: "Backed by Medical Experts"
- Headline: "Your results, reviewed by qualified professionals"
- 3 placeholder team cards with circular photo placeholder, name, title, institution
- **Placeholders (to be updated with real people)**:
  - Dr. [Name] — Medical Director — University of Ghana Medical School
  - [Name], MSc — Laboratory Scientist — Lab Access Ghana
  - Dr. [Name] — Public Health Advisor — Ghana Health Service
- Design: circular photo with teal ring, name bold, title in muted text

---

### Section 13 — FAQ Accordion
**Inspiration: Geviti (expandable FAQ)**

- Light alt background
- Smooth height animation on open/close (Framer Motion `AnimatePresence`)
- One open at a time
- 6 questions:

1. **How does home sample collection work?** — A certified phlebotomist from our partner Lab Access Ghana comes to your home at your scheduled time. The entire process takes about 15 minutes. You'll receive a confirmation SMS with your collector's name and estimated arrival time.
2. **How do I pay?** — We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit/credit cards, and bank transfers. All payments are processed securely through Paystack.
3. **How long until I get my results?** — Most results are available within 48–72 hours after your sample is collected. You'll receive an SMS and email notification when your results are ready.
4. **Is my health data private and secure?** — Absolutely. Your data is encrypted at rest and in transit. We follow international healthcare data protection standards. Only you and your authorized healthcare providers can access your results.
5. **Do I need a doctor's referral?** — No referral needed. BetterHealth is a direct-to-consumer health platform. You can sign up, choose your package, and book your collection independently.
6. **What if my results show something concerning?** — Our platform flags any results outside the normal range. For critical findings, you'll receive immediate notification. The Premium plan includes a doctor consultation call.

---

### Section 14 — Final CTA / Mission Statement
**Inspiration: Function Health ("Life is short? We disagree.") + Nucleus (emotionally powerful closing)**

- **Dark section** (`#0F1724`)
- Animated gradient orb background (subtle)
- Subtle dot grid overlay
- Large centered headline: "Preventable doesn't mean *inevitable.*" — "*inevitable*" in teal italic
- Subheadline: "Your body is speaking. BetterHealth helps you listen — before it's too late."
- Large primary CTA button: "Start Your Health Check →"
- Subtle supporting text: "Results in 48 hours. Cancel anytime. Mobile Money accepted."

---

### Section 15 — Footer
**Dark section** (`#0A0F1A`)

- 4-column grid: Brand | Product | Company | Support
- **Brand**: Logo, tagline, social icons (Instagram, Twitter/X, LinkedIn, WhatsApp)
- **Product**: How It Works, What We Test, Pricing, Download App (coming soon)
- **Company**: About Us, Stories, Blog, Careers
- **Support**: FAQ, Contact, WhatsApp, Privacy Policy
- Payment badges row: MTN MoMo | Vodafone Cash | AirtelTigo | Visa | Mastercard
- Copyright: "© 2026 BetterHealth Africa. All rights reserved. Made in Ghana 🇬🇭"

---

## Component Architecture

```
src/
├── main.jsx
├── App.jsx
├── index.css               (Tailwind directives + CSS custom properties)
├── components/
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── TrustBar.jsx          (partner logos)
│   ├── ConditionMarquee.jsx
│   ├── HowItWorks.jsx
│   ├── ProductShowcase.jsx
│   ├── WhatWeTest.jsx
│   ├── ComparisonTable.jsx
│   ├── Testimonials.jsx
│   ├── Pricing.jsx
│   ├── FounderStory.jsx
│   ├── AdvisoryTeam.jsx      (new — medical team)
│   ├── FAQ.jsx
│   ├── FinalCTA.jsx
│   ├── Footer.jsx
│   └── ui/
│       ├── Reveal.jsx        (framer motion scroll reveal)
│       ├── PhoneMockup.jsx   (animated phone cycling 3 screens)
│       └── GradientOrb.jsx   (animated background blob)
└── data/
    └── content.js            (ALL copy, arrays, data — no hardcoded text in components)
```

---

## Animation & Motion

| Element | Behavior |
|---------|----------|
| Scroll reveal | `whileInView`, y:40→0, opacity:0→1, 0.6s ease-out |
| Staggered children | 100ms delay between items |
| Phone float | `y:[0,-14,0]` loop, 6s ease-in-out |
| Screen cycle | Every 3.5s, opacity fade transition |
| Stat counters | Count up on viewport enter (127, 100, 8) |
| Marquee | CSS animation, two rows opposite directions |
| FAQ accordion | `AnimatePresence` height animation |
| Card hover | `scale:1.02`, `y:-4px`, border color transition |
| CTA hover | `y:-2px`, shadow intensify |
| Nav scroll | Background transitions from transparent → frosted glass |
| `prefers-reduced-motion` | All animations disabled/simplified |

---

## Performance Targets

- **LCP ≤ 2.5s** — mobile 4G Lighthouse throttle
- **CLS < 0.1** — declared image dimensions, font-display swap
- **INP < 200ms**
- **Lighthouse Mobile Performance ≥ 90**
- `font-display: swap` on all fonts
- `loading="lazy"` on all below-fold images
- No render-blocking scripts (all async/defer)

---

## GitHub Pages Config

```js
// vite.config.js
export default defineConfig({
  base: '/BetterHealth-Front-End/',
  plugins: [react()],
})
```

```json
// package.json — add to scripts:
"deploy": "vite build && npx gh-pages -d dist"
```

---

## Sprint Sign-Off

Atlas | Product Manager, BetterHealth Front-End
Spec updated with strategy document. 15 sections specified. Approved for Forge to build.
