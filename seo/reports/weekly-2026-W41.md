# SEO Weekly: 2026-W41 (11 Oct 2026)

No weekly reports exist for W32-W40 (last was W31, 26 Jul), so deltas below compare against W31.

## Data sources

| Source | Status |
|---|---|
| Google Search Console | Working (28 days, 11 Sep - 9 Oct 2026) |
| DataForSEO | Working. SERP (Ghana, depth 20) for the primary keyword of all 66 published roadmap items |
| Bing Webmaster | Skipped, no credentials configured |

## Headline

The first blog page is now indexed. URL Inspection shows `fasting-blood-sugar-explained` as "Submitted and indexed" (last crawled 2026-09-21). The GSC sitemap report still says 113 submitted, 0 indexed, which lags URL Inspection. Two blog pages now show impressions, but still no clicks and no tracked keyword in the top 20.

## GSC top queries (28 days)

| Query | Clicks | Impr. | CTR | Pos. |
|---|---|---|---|---|
| better health | 0 | 7 | 0% | 9.1 |
| better health africa | 2 | 6 | 33% | 3.2 |
| betterhealth | 0 | 2 | 0% | 5.0 |
| better health app | 0 | 1 | 0% | 30 |

All four are branded. No health-topic queries yet.

## GSC top pages (28 days)

| Page | Clicks | Impr. | Pos. |
|---|---|---|---|
| www.betterhealth.africa/ | 5 | 17 | 3.0 |
| app.betterhealth.africa/ | 4 | 16 | 7.9 |
| /about/ | 0 | 5 | 5.6 |
| app.betterhealth.africa/join | 0 | 3 | 5.0 |
| /blog/lipid-profile-cholesterol-test/ | 0 | 3 | 8.3 |
| /blog/fasting-blood-sugar-explained/ | 0 | 2 | 8.0 |
| /book-tests/, /contact/, /faq/, /how-it-works/, /what-we-test/ | 0 | 2 each | 2-7 |

## Indexation (URL Inspection)

| URL | State |
|---|---|
| /blog/fasting-blood-sugar-explained/ | Submitted and indexed |
| /blog/hba1c-explained/ | Discovered, currently not indexed |
| /blog/fatty-liver-disease-explained/ | URL is unknown to Google |

Sitemap: 113 URLs submitted, 0 errors, last downloaded by Google 2026-10-01.

## SERP positions (DataForSEO, Ghana)

66 of 66 primary keywords: betterhealth.africa not in top 20. Slugs are in `seo/roadmap.yml`. This is unchanged from W31. For example, "fasting blood sugar normal range" is held by Cleveland Clinic, UCSF, CDC and Medscape, even though the page has GSC impressions at about position 8 in other queries.

## AI-citation (GEO) scoreboard

| Query | W31 | W41 |
|---|---|---|
| fasting blood sugar normal range | Not yet | Not yet |
| health screening Ghana | Not yet | Not yet |
| lipid profile test how to read results | n/a | Not yet |

Web search returned no betterhealth.africa results for any of these. The search tool is a US-only proxy and is a weak signal. Some results for the fasting-blood-sugar query looked like scraped spam on unrelated .edu/.int domains, which says nothing about us.

## Week-over-week (vs W31)

| Metric | W31 | W41 |
|---|---|---|
| Distinct GSC queries | 4 | 4 |
| Blog pages with impressions | 0 | 2 |
| Blog pages confirmed indexed (sample of 3) | 0 of 10 sampled | 1 of 3 |
| Keywords in top 20 | 0 | 0 |
| Published roadmap items | 51 | 66 |

## Quick wins

- `/blog/lipid-profile-cholesterol-test/` (pos 8.3, 3 impr.) and `/blog/fasting-blood-sugar-explained/` (pos 8.0, 2 impr.) are the only content pages with impressions. Volumes are too small to act on statistically. Worth an on-page review (title, intro answer block, internal links) once they have 20+ impressions.
- The root cause remains indexation, not ranking: most articles are still "Discovered, not indexed" or unknown. Backlinks (`seo/backlinks.md`) and internal links from indexed pages are the lever.

## Gaps

No health-topic queries in GSC, so there is no data-driven gap list yet.

## Roadmap changes

None. With no health-query data, reordering would be guesswork. The todo queue (dengue 4,400/mo, prolactin 720/mo, PCOS, hepatitis A, four local pages) keeps its order. Only 8 article items remain todo, so the queue will run dry in two nightly runs; the next nightly refill pass should add items.
