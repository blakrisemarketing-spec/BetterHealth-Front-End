# SEO/GEO Baseline — June 2026

Snapshot of the starting state at the launch of the SEO/GEO program, so progress is
measurable. Captured from the repository and build output (live rank/traffic data
will be added once GSC + DataForSEO are connected).

## Site

- **Domain:** https://www.betterhealth.africa (Hostinger / LiteSpeed)
- **Stack:** Vite 8 SPA, React 19, react-helmet-async; build-time per-route prerender
- **Market:** Ghana (Accra, Kumasi, Tema); patients-led focus
- **Analytics:** GA4 `G-1KTCH9TZLV`, GTM `GTM-KMH4QTML`

## Technical SEO — before vs after this program's foundation PR

| Area | Before | After (this PR) |
|---|---|---|
| Per-route meta / OG / canonical | ✅ (prerendered) | ✅ unchanged |
| Sitemap | Manual, hand-edited, 17 URLs | **Auto-generated at build**, 19 URLs, dynamic lastmod |
| robots.txt | ✅ | ✅ unchanged (points to sitemap) |
| JSON-LD coverage | Organization (runtime only), FAQ, Product, NGO | **Organization + WebSite in static HTML on every page**, + Breadcrumb sitewide, + MedicalWebPage on health pages, + Article/Breadcrumb/FAQ on blog |
| Blog / content engine | Empty ("coming soon") | **Live pipeline**, 2 articles, single-append authoring |
| GEO (`llms.txt`) | None | **`llms.txt` + `llms-full.txt` auto-generated** |
| `og:type` per page type | All `website` | `article` on blog posts, `website` elsewhere |
| Rank tracking / keyword strategy | None | Roadmap of 20+ targets + data tools wired |

## Indexable URLs at baseline (19)

Homepage + 16 marketing routes + 2 blog articles. Blog and programmatic layers will
grow this substantially over the program.

## Schema graph verified in prerendered HTML

- Every page: `Organization` + `WebSite` (static, non-JS-readable)
- Health pages (`/what-we-test`, `/how-it-works`, `/stories`): `MedicalWebPage` + `BreadcrumbList`
- `/pricing`: `Product`/`AggregateOffer` + `BreadcrumbList`
- `/faq`: `FAQPage` + `BreadcrumbList`
- `/foundation`: `NGO` + `BreadcrumbList`
- `/blog/<slug>`: `Article` + `BreadcrumbList` + `FAQPage`

## To capture once data sources connect

- [ ] GSC: current impressions, clicks, avg position, indexed page count
- [ ] DataForSEO: baseline SERP positions for the roadmap's target keywords
- [ ] Bing Webmaster: index coverage
- [ ] GEO: baseline AI-citation check (ChatGPT / Perplexity / AI Overviews / Copilot)
      for "health screening Ghana", "blood test Accra", "what is HbA1c", etc.
- [ ] Core Web Vitals (CrUX field data) per template

## Known gaps / next priorities

1. Per-article OG images (currently fall back to default) — `tech-og-images-blog`.
2. Programmatic `/biomarkers/<slug>` layer (127 pages) — `tech-programmatic-biomarkers`.
3. Off-site authority: directory citations + digital PR (see `seo/offsite/`).
4. Resolved 2026-06-21: biomarker count standardized to **127** and pricing to **GHS 2/day** site-wide.
