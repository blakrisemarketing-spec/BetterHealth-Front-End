# SEO Weekly: 2026-W33 (16 Aug 2026)

**Week-over-week vs 2026-W31 (26 Jul 2026)** — W32 has no report (routine did not run that week), so
this is a 3-week gap comparison, not a strict 7-day delta.

---

## Headline: the first two blog articles are indexed

For 8 straight weeks every URL Inspection sample came back "Discovered — currently not indexed."
That changed this week: direct URL Inspection shows **`fasting-blood-sugar-explained` and
`lipid-profile-cholesterol-test` now read "Submitted and indexed."** Both are from the earliest
June 2026 publishing batch (2026-06-22 and 2026-06-23) — the oldest, most-crawled pages in the
corpus — while every other sampled article (older and newer alike) is still "Discovered —
currently not indexed" or, for the newest batch, "URL is unknown to Google."

`fasting-blood-sugar-explained` also earned the site's **first-ever non-branded, content-topic GSC
impression**: the query "fasting blood sugar how many hours fasting" logged 1 impression at
position 78. The article already answers that question directly (intro, procedure section, and an
FAQ entry), so this is an authority/ranking gap, not a content gap — nothing to add to the article.

Caveat: `gsc.mjs sitemap-status` still reports **0 indexed** out of 85 submitted URLs. That
sitemap-level count is known to lag the per-URL Inspection result (it's a different, slower-updating
report), so read the two indexed pages above as the more current signal. Worth re-checking next week
to see whether the sitemap report catches up or whether this stays a discrepancy.

---

## Data Sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | **Working** | Queries/pages pulled for 17 Jul – 14 Aug 2026 (28-day window); URL Inspection sampled on 12 articles |
| DataForSEO | **Operational** | SERP checked for all 67 published articles' primary keywords (66 from `seo/roadmap.yml` done items + the 1 manually-published research report), depth 20, market-correct location codes. Volume refreshed for 5 `todo` items with previously-null volume. |
| Bing Webmaster | **Skipped** | `BING_API_KEY` / `BING_SITE_URL` not configured |

---

## GSC: Top Queries (28 days, 17 Jul – 14 Aug 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health | 0 | 1 | 0% | 68 |
| better health africa | 0 | 1 | 0% | 22 |
| ear hugs | 0 | 1 | 0% | 43 |
| fasting blood sugar how many hours fasting | 0 | 1 | 0% | 78 |

Still only 4 distinct queries in 28 days, and still 0 clicks from search. Three are branded/
unrelated stray impressions (one — "ear hugs" — is unrelated to the site); the fourth is the first
content-topic query, discussed above.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 15 | 25 | 60% | 5.0 |
| app.betterhealth.africa/ | 1 | 4 | 25% | 3.5 |
| app.betterhealth.africa/join | 0 | 3 | 0% | 5.0 |
| www.betterhealth.africa/about/ | 0 | 5 | 0% | 5.0 |
| www.betterhealth.africa/what-we-test/ | 0 | 4 | 0% | 6.3 |
| www.betterhealth.africa/how-it-works/ | 0 | 3 | 0% | 3.0 |
| www.betterhealth.africa/pricing/ | 0 | 3 | 0% | 4.7 |
| www.betterhealth.africa/blog/fasting-blood-sugar-explained/ | 0 | 1 | 0% | 78 |
| 7 referral short-links (`?be=...`) | 0 | 1 each | 0% | 3–43 |

15 total rows (down from 20 in W31). First-ever `/blog/` row appears. Homepage clicks jumped from
4 (W31) to 15 this week — still branded/direct traffic, not organic content discovery, but a real
increase worth watching.

---

## Indexation Status (GSC URL Inspection, sampled 16 Aug 2026, 12 articles)

| Article | Published | Coverage state |
|---|---|---|
| fasting-blood-sugar-explained | 2026-06-22 | **Submitted and indexed** |
| lipid-profile-cholesterol-test | 2026-06-23 | **Submitted and indexed** |
| hba1c-explained | 2026-06-20 (oldest) | Discovered — currently not indexed |
| fatty-liver-disease-explained | 2026-06-21 | Discovered — currently not indexed |
| preventive-health-screening-ghana | 2026-06-19 | Discovered — currently not indexed |
| malaria-test-explained | 2026-06 | Discovered — currently not indexed |
| hiv-test-explained | 2026-06 | Discovered — currently not indexed |
| gestational-diabetes-test | 2026-07-17 | Discovered — currently not indexed |
| perimenopause-menopause-test | 2026-07-17 | Discovered — currently not indexed |
| tuberculosis-test-explained | recent | Discovered — currently not indexed |
| blood-test-cape-town | 2026-07 | Discovered — currently not indexed |
| blood-test-eldoret | 2026-07-25 | Discovered — currently not indexed |
| testosterone-test-explained | recent | **URL is unknown to Google** |

Sitemap: `https://betterhealth.africa/sitemap.xml`, last submitted 2026-07-23, last downloaded by
Google 2026-08-13, **85 URLs submitted, 0 indexed** (per `sitemap-status` — see the discrepancy
note in the headline above; per-URL Inspection shows 2 of 12 sampled articles now indexed).

---

## SERP Positions — All 67 Published Articles (DataForSEO)

Every published article's primary keyword was re-checked against its target market (Ghana 2288 /
Nigeria 2566 / Kenya 2404 / South Africa 2710, depth 20), including the 1 manually-published
research report (`preventive healthcare Ghana`, Ghana market). **All 67: not in top 20**, unchanged
from W31. Full per-keyword list omitted here — see `seo/roadmap.yml` for keyword/market detail per
slug; nothing moved.

Queue grew from 51 published articles (W31) to 67 since then (16 shipped: blood test Kano batch's
predecessors — mammogram, colon-cancer-screening, allergy-test, breast-cancer-screening,
tuberculosis-test, blood test Abuja/Port Harcourt/Mombasa/Kisumu, testosterone-test, yellow-fever,
cholera-test, blood test Cape Town/Ibadan/Eldoret — plus the 1 manually-published research report).
All newly-checked keywords also came back "not in top 20" on first read, consistent with every
prior week.

---

## AI Citation (GEO) Scoreboard

| Query | W29 | W30 | W31 | W33 |
|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet |

**Still no AI citations after 8 weeks of tracking** (W32 not run). Results for all five queries
continue to be dominated by PMC/PubMed, Frontiers, Cleveland Clinic, healthdirect, and similar
international authority sources — no betterhealth.africa presence in organic results or AI
summaries. Expected while indexation is still at 2 of 67 articles.

---

## Week-over-Week Movement (vs W31, 26 Jul)

- **SERP positions: 0 movement**, 8th straight check at "not in top 20" for every tracked keyword —
  now spanning 67 articles (up from 51 in W31).
- **Indexed articles: 0 → 2.** First real movement in this metric since GSC access opened up.
  Both are from the oldest publishing batch — consistent with "indexation trickles in oldest-first
  as crawl budget allows," not a fix or a stall.
- **GSC clicks (homepage): 4 → 15** in the trailing 28-day window (branded/direct traffic, not
  organic content discovery).
- **GSC content-topic impressions: 0 → 1** — the first one ever recorded, tied to the newly-indexed
  `fasting-blood-sugar-explained` article.

---

## Quick Wins

**None available yet.** The one content-topic query with any data (`fasting blood sugar how many
hours fasting`, position 78) is far outside the 5–20 quick-win band. Quick-win detection needs a
larger set of indexed pages generating impressions in that band; re-run this check as soon as more
articles move into "Submitted and indexed."

## Gaps

- **No new GSC-sourced keyword gaps this week.** The single content-topic query recorded is
  already covered in-article — this is a ranking/authority gap, not a content gap, so no new
  roadmap item is warranted for it.
- **Todo queue: 8 article items + 2 technical items remain** (dengue fever, prolactin test, PCOS
  test, hepatitis A test, blood test Kano/Enugu/Nakuru/Bloemfontein, plus the OG-image and
  programmatic-biomarkers technical tasks). At 5 articles/night this covers roughly 2 more nightly
  batches before a refill is needed.

---

## Roadmap Changes

- **Volume refreshed:** `blood test Bloemfontein` now confirmed **10/mo, South Africa, LOW
  competition** (was `null`). Field updated in `seo/roadmap.yml`.
- **Re-checked, still no data:** `pcos test` / `pcos symptoms` (Nigeria), `blood test Kano`
  (Nigeria), `blood test Enugu` (Nigeria), `blood test Nakuru` (Kenya) — all still return null
  volume from DataForSEO. Left as-is; still worth publishing per the existing local-page precedent
  and PCOS's AI-citation value, per each item's notes.
- **No reordering.** With SERP positions unchanged across all 67 published keywords and GSC still
  producing only 1 content-topic data point, there is no data-driven basis to re-prioritize the
  `todo` queue this week — dengue fever (4,400/mo, LOW competition) remains the clear top item by
  volume. No `done` items were touched.
- Updated `meta.updated` to 2026-08-16 and `meta.keyword_data` with this week's findings (Bloemfontein
  volume, the 67-keyword SERP re-check, and the 2-articles-indexed finding).

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Watch the indexed count.** It moved from 0 to 2 this week (both oldest-batch articles). Re-run URL Inspection on a wider sample next week to see whether this is the start of a steady trickle or a one-off | Weekly routine | No |
| 2 | **Investigate the sitemap-status vs. URL-Inspection discrepancy** — `sitemap-status` says 0/85 indexed while direct URL Inspection shows 2 articles indexed. Confirm whether this is normal reporting lag (likely) or something worth a closer look if it persists past next week | Weekly routine | No |
| 3 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — still not configured, 9 weeks running | Human | No |
| 4 | Once more articles show "Submitted and indexed," re-run the GSC query/page reports specifically for quick-win detection (position 5–20 band) — the highest-value analysis this program still hasn't been able to do | Weekly routine | No (contingent on #1) |
| 5 | No roadmap reprioritization action needed this week — todo queue has 8 article items, covers ~2 more nightly batches; refill before it runs out | Nightly routine | No |
| 6 | **Note:** this report skipped a week (no W32) — confirm the weekly routine's schedule is still firing correctly | Human | No |

---

*Generated by the seo-weekly routine · 2026-08-16*
