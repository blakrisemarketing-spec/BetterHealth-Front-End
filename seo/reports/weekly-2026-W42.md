# SEO Weekly: 2026-W42 (18 Oct 2026)

Data window: GSC 18 Sep to 16 Oct 2026 (28 days).

## Headline

- Still no blog content ranks. 0 of 66 published articles' primary keywords are in the top 20 (DataForSEO, per-article market, depth 20).
- Indexation is thin: `fasting-blood-sugar-explained` is "Submitted and indexed". `lipid-profile-cholesterol-test` was crawled on 2026-09-08 but now reads "Crawled - currently not indexed". It still earned 1 impression at position 7 in the window.
- `gsc.mjs sitemap-status` reports 0 of 113 URLs indexed. Treat it as unreliable (it contradicts URL Inspection). The sitemap was last submitted 2026-07-23 and last downloaded by Google 2026-10-12.
- Process problem: weekly PRs #68, #70, #71, #72, #76, #86, #88, #89, #90, #91 and #92 are all open and unmerged, and `main` still carries the 2026-07-26 state. This report was written against that stale `main`, so it overlaps with them. Merge the newest (#92) or close the stack; PR #70 holds a playbook/SKILL change worth keeping.

## Data sources

| Source | Status |
|---|---|
| Google Search Console | Working |
| DataForSEO | Working (66 SERP checks, no errors) |
| Bing Webmaster | Skipped, `BING_*` creds not set |

## GSC top queries (28 days)

| Query | Clicks | Impr. | CTR | Pos. |
|---|---|---|---|---|
| better health africa | 4 | 8 | 50% | 3.1 |
| better health | 0 | 13 | 0% | 8.7 |
| betterhealth | 0 | 4 | 0% | 5.5 |
| better health app | 0 | 1 | 0% | 30 |
| metabolic health check | 0 | 1 | 0% | 94 |

## GSC top pages (28 days)

| Page | Clicks | Impr. | Pos. |
|---|---|---|---|
| www.betterhealth.africa/ | 6 | 19 | 3.5 |
| app.betterhealth.africa/ | 4 | 27 | 7.5 |
| app.betterhealth.africa/join | 0 | 4 | 5.2 |
| /about/ | 0 | 4 | 6.2 |
| /contact/ | 0 | 2 | 3.0 |
| /what-we-test/ | 0 | 2 | 51 |
| /blog/lipid-profile-cholesterol-test/ | 0 | 1 | 7.0 |
| /book-tests/, /faq/, /how-it-works/ | 0 | 1 each | 7, 3, 9 |

## SERP positions

All 66 published articles' primary keywords (Ghana, Nigeria, Kenya or South Africa per item): **not in top 20**, no exceptions. Unchanged from W31. Per-keyword detail is in `seo/roadmap.yml`.

## Week-over-week

Compared with W31 (the last report on `main`; later reports sit in open PRs):

- SERP: no movement (0/66 vs 0/51).
- Queries: still brand-only, plus one non-brand impression ("metabolic health check", pos 94).
- Indexed blog pages: 1 confirmed (the lipid page has regressed).
- Sitemap size: 70 to 113 URLs.

## GEO / AI-citation scoreboard

| Query | betterhealth.africa present? |
|---|---|
| fatty liver disease Ghana | Not yet (PMC, UG, Ghana Medical Journal) |
| fasting blood sugar normal range | Not yet (low-quality mirror sites dominate) |
| health screening Ghana | Not yet (Graphic, GNA, foundations) |
| hypertension symptoms Ghana | Not yet (GNA, Ghanaian Times, PMC) |
| fbc test meaning | Not yet (healthdirect, healthify, Superdrug) |

0/5, same as every prior week.

## Quick wins

- `lipid-profile-cholesterol-test`: pos 7 on its single impression, but "Crawled - currently not indexed". The fix is content and linking, not keywords. Add internal links from indexed pages, expand with Ghana-specific detail, then request indexing in Search Console.
- Brand query "better health" at pos 8.7 with 13 impressions and 0 clicks: a homepage title/description tweak could capture clicks.

## Gaps

- "metabolic health check" (pos 94): a service-type query with no matching article. Added to the roadmap.
- No other health-topic queries have impressions, so there is nothing else to mine yet.

## Roadmap changes

- Added `art-metabolic-health-check` (todo) from the GSC gap, after the existing article todos.
- No reordering of other todo items: the data still does not distinguish them. Existing order (dengue 4,400, prolactin 720, then the rest) already follows volume.
- No `done` items touched. `meta.updated` and `keyword_data` refreshed.

## Action items

1. Clear the PR backlog (11 weekly PRs). Merge #92, close the rest, and keep #70's playbook/SKILL change.
2. Decide whether to resume the nightly routine (last batch 2026-07-25). The todo queue has 8 articles ready.
3. Investigate why the lipid page is "Crawled - not indexed" (quality/duplication/links), then request indexing.
4. Set `BING_API_KEY` and `BING_SITE_URL` for Bing data.
