# Project: BetterHealth Front-End

## Purpose
A modern, conversion-optimized SaaS landing page for BetterHealth Africa -- a health-tech company offering comprehensive lab testing with 127+ biomarkers, home sample collection, and results in 48 hours. The site targets health-conscious consumers in Ghana/Africa and is designed to drive signups and conversions for the BetterHealth platform at app.betterhealth.africa.

## Stack
- **Language:** JavaScript (JSX)
- **Framework:** React 19 + Vite 8 (SPA with client-side routing via react-router-dom v6)
- **Styling:** Tailwind CSS 3 + PostCSS + Autoprefixer
- **Animations:** Framer Motion 12
- **Icons:** Lucide React
- **SEO:** react-helmet-async for per-page meta tags; Open Graph + Twitter Card meta in index.html
- **Fonts:** Plus Jakarta Sans (headings), DM Sans (body), JetBrains Mono (mono) via Google Fonts
- **Database:** None (static front-end only)
- **Auth:** None (marketing site; the product app lives at app.betterhealth.africa)
- **Hosting:** GitHub Pages (via GitHub Actions CI/CD)
- **Package manager:** npm
- **Linting:** ESLint 9 with react-hooks and react-refresh plugins

## Architecture
Static single-page React application with client-side routing (BrowserRouter, basename `/BetterHealth-Front-End`). No backend, no API layer, no database. Content data is co-located in `src/data/content.js`. Vite builds to `dist/` which is deployed to GitHub Pages via a GitHub Actions workflow on push to `main`. A 404.html redirect script handles SPA routing on GitHub Pages.

## Database schema (key tables)
N/A -- this is a static front-end site with no database.

## Directory structure
```
BetterHealth-Front-End/
  index.html            -- Entry HTML with OG meta, font preloads, SPA redirect script
  vite.config.js        -- Vite config (base: /BetterHealth-Front-End/)
  tailwind.config.js    -- Custom colors, fonts, animations, shadows
  postcss.config.js     -- Tailwind + Autoprefixer
  eslint.config.js      -- ESLint 9 flat config
  package.json          -- Dependencies & scripts
  src/
    main.jsx            -- React root (StrictMode + App)
    App.jsx             -- BrowserRouter with all routes
    index.css           -- Global styles, Tailwind directives, font imports
    assets/             -- Static assets (logo.png)
    data/
      content.js        -- Centralized page/section content data
    components/         -- Landing page section components
      Nav.jsx           -- Navigation bar
      Hero.jsx          -- Hero section with phone mockup
      TrustBar.jsx      -- Trust/credibility badges
      ConditionMarquee.jsx -- Scrolling condition ticker
      HowItWorks.jsx    -- Process steps with carousel
      ProductShowcase.jsx -- App screenshots showcase
      WhatWeTest.jsx    -- Biomarker categories
      ComparisonTable.jsx -- Competitor comparison
      Testimonials.jsx  -- Customer testimonials
      Pricing.jsx       -- Pricing plans
      FounderStory.jsx  -- Founder narrative section
      AdvisoryTeam.jsx  -- Advisory board members
      FAQ.jsx           -- Frequently asked questions
      FinalCTA.jsx      -- Bottom call-to-action
      Footer.jsx        -- Site footer
    components/ui/      -- Reusable UI primitives
      Badge.jsx         -- Badge component
      GradientOrb.jsx   -- Decorative gradient orb
      PhoneFrame.jsx    -- iPhone 15 Pro frame with Dynamic Island
      PhoneMockup.jsx   -- Phone mockup wrapper
      Reveal.jsx        -- Framer Motion scroll-reveal wrapper
    pages/              -- Route-level page components
      Home.jsx          -- Landing page (composes all section components)
      HowItWorks.jsx    -- /how-it-works
      WhatWeTest.jsx    -- /what-we-test
      Stories.jsx       -- /stories
      About.jsx         -- /about
      Pricing.jsx       -- /pricing
      FAQ.jsx           -- /faq
      Contact.jsx       -- /contact
      Privacy.jsx       -- /privacy
      Blog.jsx          -- /blog
      Careers.jsx       -- /careers
      NotFound.jsx      -- 404 catch-all
  public/
    favicon.svg         -- SVG favicon
    icons.svg           -- Icon sprite
    og-image.png        -- Open Graph social image
    hero-demo.png       -- Hero section demo image
    triptych.png        -- Three-panel product image
    404.html            -- GitHub Pages SPA fallback redirect
    robots.txt          -- Crawl directives
    sitemap.xml         -- XML sitemap for all routes
    .nojekyll           -- Bypass Jekyll processing on GitHub Pages
    screenshots/        -- App screenshots (mobile JPGs + desktop WebPs)
  scripts/              -- Playwright-based screenshot capture scripts (Python)
  artifacts/            -- Sprint specs, QA reports, compliance reports
  .github/workflows/
    deploy.yml          -- GitHub Actions: build + deploy to GitHub Pages on push to main
  dist/                 -- Build output (gitignored)
```

## Environment variables
None required. This is a purely static front-end with no secrets or environment-specific configuration. The `.gitignore` excludes `.env` and `.env.*` files (except `.env.example`) as a precaution, but no env files exist in the project.

## Routes (client-side)
- `/` -- Home (landing page with all sections)
- `/how-it-works` -- How It Works page
- `/what-we-test` -- What We Test page
- `/stories` -- Customer Stories page
- `/about` -- About page
- `/pricing` -- Pricing page
- `/faq` -- FAQ page
- `/contact` -- Contact page
- `/privacy` -- Privacy Policy page
- `/blog` -- Blog page
- `/careers` -- Careers page
- `*` -- 404 Not Found catch-all

All routes are prefixed with basename `/BetterHealth-Front-End` for GitHub Pages deployment.

## Live URL
https://blakrisemarketing-spec.github.io/BetterHealth-Front-End/

## npm scripts
- `npm run dev` -- Start Vite dev server
- `npm run build` -- Production build to `dist/`
- `npm run lint` -- Run ESLint
- `npm run preview` -- Preview production build locally
- `npm run deploy` -- Build + deploy to GitHub Pages via gh-pages

## Project-specific conventions
- Content data is centralized in `src/data/content.js` rather than hardcoded in components.
- Scroll-reveal animations use the `<Reveal>` wrapper component (Framer Motion).
- Phone mockups use the `<PhoneFrame>` component styled as an iPhone 15 Pro with Dynamic Island.
- The project follows an agent-team sprint pipeline (Atlas/Forge/Scout/Echo II/Cal) documented in README.md.
- Sprint artifacts (specs, QA reports, compliance reports) are stored in `artifacts/`.

---
*This file contains stable project context only. For recent changes, read the active changelog via changelog-index.md.*
*Update this file ONLY for structural changes: new DB tables, new dependencies, architecture shifts, new env vars, new API routes.*
