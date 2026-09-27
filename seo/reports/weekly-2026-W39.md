# SEO Weekly: 2026-W39 (27 Sep 2026)

**Week 7 of DataForSEO/GEO tracking — vs 2026-W31 (26 Jul 2026).** No weekly report ran
in the 9 calendar weeks between W31 and this run, so "week-over-week" below actually
spans that full gap, not a single week. Flagged wherever it matters.

---

## Headline: first confirmed organic indexation, but the sitemap tool itself is now the unreliable read

Direct URL Inspection finds **2 articles indexed** (`fasting-blood-sugar-explained`,
`lipid-profile-cholesterol-test`) — the first confirmed indexation since tracking began.
Both now show up in the GSC pages report with real impressions, which is independent
confirmation. This is genuine, if very early, progress.

But `gsc.mjs sitemap-status` still reports **0 / 113 indexed** — a number that is now
provably wrong, since two of those 113 URLs are indexed per direct inspection. The
sitemap tool's indexed-count appears to lag or under-report; **direct URL Inspection,
not the sitemap tool, should be treated as ground truth going forward.**

A second, more concerning finding: 3 of 29 sampled URLs (`ferritin-iron-anaemia`,
`g6pd-deficiency-test`, `high-blood-pressure-silent-killer`) now read **"URL is unknown
to Google"** — a regression from "Discovered — currently not indexed," meaning Google
has stopped treating them as known/pending. This is worth a resubmission pass (see
Action Items).

Ranking has not followed indexation yet: all 66 checked keywords are still **"not in
top 20"** — expected, since 2 recently-indexed pages with no backlink profile take
time to earn rank, even once crawled.

---

## Data Sources

| Source | Status | Notes |
|--------|--------|-------|
| Google Search Console | **Working** | `queries`, `pages`, `sitemap-status`, and a 29-URL `inspect` sample all returned data. |
| DataForSEO | **Operational** | SERP (Ghana/Nigeria/Kenya/South Africa, depth 20) for all 66 published articles' primary keywords with a `keyword` field in `roadmap.yml`; volume refresh for the 8 todo-queue keywords. |
| Bing Webmaster | **Skipped** | `BING_API_KEY` / `BING_SITE_URL` still not configured (flagged every week since W27). |

---

## GSC: Top Queries (28 days, 28 Aug – 25 Sep 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health africa | 0 | 1 | 0% | 8 |

Only one query registered any impressions in 28 days — the same branded query as W31,
now at position 8 (was 3.3) on a single impression. Still **zero blog/content
queries** in the query report; this is a sample-size artifact (n=1), not a signal.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| app.betterhealth.africa/ | 5 | 8 | 62.5% | 2.5 |
| www.betterhealth.africa/ | 5 | 15 | 33.3% | 2.9 |
| app.betterhealth.africa/join | 0 | 7 | 0% | 5.9 |
| www.betterhealth.africa/about/ | 0 | 5 | 0% | 20.2 |
| www.betterhealth.africa/contact/ | 0 | 6 | 0% | 2.5 |
| **www.betterhealth.africa/blog/fasting-blood-sugar-explained/** | 0 | 3 | 0% | 6.0 |
| **www.betterhealth.africa/blog/lipid-profile-cholesterol-test/** | 0 | 3 | 0% | 6.3 |
| www.betterhealth.africa/book-tests/ | 0 | 4 | 0% | 3.3 |
| www.betterhealth.africa/faq/ | 0 | 4 | 0% | 3.0 |
| www.betterhealth.africa/how-it-works/ | 0 | 2 | 0% | 7.0 |
| www.betterhealth.africa/pricing/ | 0 | 2 | 0% | 2.0 |
| www.betterhealth.africa/what-we-test/ | 0 | 2 | 0% | 6.0 |
| betterhealth.africa/?be=98101720335 | 0 | 2 | 0% | 1.0 |

**First blog pages ever to appear in the pages report** (bolded above). W31 explicitly
stated "none are `/blog/` pages" — this is a real, if small, change. Both are
low-competition biomarker explainers (fasting blood sugar, lipid profile), both at
position ~6, both zero clicks so far (impressions only).

---

## Indexation Status (GSC URL Inspection, sampled 27 Sep 2026, n=29)

`gsc.mjs sitemap-status`: **113 URLs submitted, 0 indexed** (sitemap last downloaded
2026-09-23). Per the headline above, treat this "0" as stale/unreliable — direct
inspection below contradicts it.

| Coverage state | Count (of 29 sampled) | Slugs |
|---|---|---|
| Submitted and indexed | 2 | fasting-blood-sugar-explained, lipid-profile-cholesterol-test |
| Discovered — currently not indexed | 24 | remaining sample (oldest to newest articles) |
| URL is unknown to Google | 3 | ferritin-iron-anaemia, g6pd-deficiency-test, high-blood-pressure-silent-killer |

Sample spans the oldest article (hba1c-explained, 20 Jun) to the newest checked
(yellow-fever-explained, 25 Jul), stratified across the full 67-article catalogue plus
6 targeted re-checks. **~7% of the sample is now indexed**, up from 0% in every prior
report. Reading this correctly: indexation has started, but it is a slow trickle
against 9 weeks of dormancy (sitemap not resubmitted since 2026-07-23) — not yet a
turned corner.

---

## SERP Positions — All 66 Published Articles (DataForSEO)

Every article with a `keyword` field in `roadmap.yml` was checked against its primary
keyword and market (Ghana 2288 / Nigeria 2566 / Kenya 2404 / South Africa 2710, depth
20). **All 66: not in top 20 — 7th consecutive check, zero movement.**

| Article slug | Keyword | Market | Vol/mo |
|---|---|---|---|
| hba1c-explained | hba1c test | Ghana | 590 |
| preventive-health-screening-ghana | health screening Ghana | Ghana | — |
| fatty-liver-disease-explained | fatty liver disease | Ghana | 1,600 |
| fasting-blood-sugar-explained | fasting blood sugar normal range | Ghana | 1,300 |
| lipid-profile-cholesterol-test | lipid profile test | Ghana | 1,000 |
| full-blood-count-explained | fbc test | Ghana | 1,000 |
| high-blood-pressure-silent-killer | hypertension symptoms | Ghana | 480 |
| prediabetes-warning-signs | prediabetes symptoms | Ghana | 70 |
| ferritin-iron-anaemia | ferritin test | Ghana | 50 |
| vitamin-d-deficiency | vitamin d test | Ghana | 20 |
| sickle-cell-trait-testing | sickle cell trait test | Ghana | — |
| creatinine-egfr-kidney-function | creatinine test meaning | Ghana | 10 |
| thyroid-tsh-test-explained | TSH test meaning | Ghana | 10 |
| liver-function-tests-explained | liver function test results explained | Ghana | 10 |
| malaria-test-explained | malaria test | Ghana | 320 |
| typhoid-widal-test | widal test | Ghana | 1,000 |
| hepatitis-b-test | hepatitis B test | Ghana | 110 |
| hiv-test-explained | hiv test | Ghana | 320 |
| hepatitis-c-test | hepatitis C test | Ghana | 20 |
| genotype-test-aa-as-ss | genotype test | Nigeria | 880 |
| premarital-screening | premarital screening | Nigeria | 50 |
| blood-group-test | blood group test | Ghana | 260 |
| psa-prostate-test | psa test | Ghana | 480 |
| pap-smear-cervical-screening | pap smear test | Ghana | — |
| uric-acid-gout-test | uric acid test | Ghana | — |
| g6pd-deficiency-test | g6pd test | Ghana | 390 |
| urinalysis-explained | urinalysis test | Ghana | 110 |
| blood-test-nairobi | blood test Nairobi | Kenya | 40 |
| vitamin-b12-folate-test | vitamin b12 test | Ghana | 10 |
| antenatal-blood-tests | antenatal blood tests | Ghana | 10 |
| blood-test-lagos | blood test Lagos | Nigeria | 10 |
| h-pylori-test | h pylori test | Ghana | — |
| stool-test-explained | stool test | Ghana | — |
| crp-inflammation-test | crp test | Ghana | — |
| health-screening-nigeria | health screening Nigeria | Nigeria | — |
| health-screening-kenya | health screening Kenya | Kenya | — |
| cost-of-health-screening-ghana | cost of health screening in Ghana | Ghana | — |
| full-body-checkup-guide | full body checkup | Ghana | — |
| home-vs-lab-blood-test | home blood test Ghana | Ghana | — |
| blood-test-accra | blood test Accra | Ghana | — |
| blood-test-kumasi | blood test Kumasi | Ghana | — |
| mammogram-breast-cancer-screening | mammogram screening | South Africa | 210 |
| colon-cancer-screening-test | colon cancer screening | South Africa | 170 |
| allergy-test-explained | allergy test | South Africa | 880 |
| diabetes-test-types-explained | diabetes test | South Africa | 480 |
| blood-test-johannesburg | blood test Johannesburg | South Africa | 110 |
| syphilis-test-explained | syphilis test | Ghana | 140 |
| sperm-count-fertility-test | sperm count test | Nigeria | 320 |
| blood-test-durban | blood test Durban | South Africa | 70 |
| breast-cancer-screening-guide | breast cancer screening | Ghana | 70 |
| tuberculosis-test-explained | tuberculosis test | Ghana | — |
| blood-test-abuja | blood test Abuja | Nigeria | — |
| blood-test-port-harcourt | blood test Port Harcourt | Nigeria | — |
| blood-test-mombasa | blood test Mombasa | Kenya | — |
| blood-test-kisumu | blood test Kisumu | Kenya | — |
| bilharzia-schistosomiasis-test | bilharzia | Kenya | 880 |
| lassa-fever-symptoms-test | lassa fever | Nigeria | 4,400 |
| perimenopause-menopause-test | perimenopause test | South Africa | 210 |
| gestational-diabetes-test | gestational diabetes | South Africa | 2,400 |
| blood-test-pretoria | blood test Pretoria | South Africa | 50 |
| testosterone-test-explained | how to increase testosterone | Ghana | 260 |
| yellow-fever-explained | yellow fever | Nigeria | 2,400 |
| cholera-symptoms-test | cholera symptoms | Kenya | 390 |
| blood-test-cape-town | blood test Cape Town | South Africa | — |
| blood-test-ibadan | blood test Ibadan | Nigeria | — |
| blood-test-eldoret | blood test Eldoret | Kenya | — |

No African-specific editorial competitor appeared in any check; international
authority sites (MedlinePlus, Cleveland Clinic, healthdirect, NHS, Mayo Clinic,
LabTestsOnline, PMC/NCBI) continue to dominate every query, unchanged from every
prior week. `preventable-diseases-preventive-healthcare-ghana` (manually published,
no `keyword` field in `roadmap.yml`) was not included in this table; its indexation
was checked directly (see sample above — "Discovered - currently not indexed").

---

## AI Citation (GEO) Scoreboard

| Query | W28 | W29 | W30 | W31 | W39 |
|---|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet | Not yet |

**Still no AI citations after 7 checks.** Every query continues to surface only
PMC/PubMed, Cleveland Clinic, healthdirect, MedlinePlus-class sources. Consistent
with indexation coverage still being ~7% of the catalogue — GEO citation requires
organic indexation first, and only 2 pages are confirmed indexed today.

---

## Week-over-Week Movement (vs W31, 26 Jul 2026 — a 9-week gap, not 1 week)

- **SERP positions: 0 movement, 7th consecutive check.** Fully consistent with an
  index coverage rate still under 10%.
- **Indexed count: 0 → 2 (of a 29-URL sample).** The first positive movement of any
  kind since GSC access was restored. Small, but real and independently confirmed via
  the pages report.
- **GSC impressions: 4 distinct queries (W31) → 1 distinct query (W39).** Not a
  meaningful signal at this volume (both are single-digit-impression, branded-only
  totals); noise, not a regression.
- **Sitemap submitted count: 70 → 113 URLs**, tracking the growth from 51 to 67
  published articles plus other routes. Submitted-but-indexed ratio is still
  effectively 0 per the sitemap tool, though direct inspection shows otherwise (see
  Headline).

---

## Quick Wins

**Still none available.** Quick-win detection needs GSC queries at position 5–20 with
real impression volume; the only query with any impressions is a single-impression
branded term. This will stay empty until indexation clears single digits and organic
content queries start generating impressions — worth re-running as the first check
once the indexed count moves meaningfully off 2.

## Gaps

- **No GSC-sourced keyword gaps this week** — same reason as every prior week: the
  query report has no health-topic queries to mine (still effectively 0 organic
  content-query impressions).
- **Todo queue: 8 content items** (`art-dengue-fever`, `art-prolactin-test`,
  `art-pcos-test`, `art-hepatitis-a-test`, `local-kano`, `local-enugu`,
  `local-nakuru`, `local-bloemfontein`) + 2 technical tasks. This is below the
  nightly playbook's 10-item refill trigger — worth a refill pass at the next nightly
  run, though see the more urgent process flag below.
- **Process flag, not a content gap:** `seo/progress.json.lastRunDate` is still
  `2026-07-25` — the nightly content routine appears not to have run in the ~9 weeks
  since this weekly routine last ran either. This weekly pass cannot fix that, but it
  is worth a human checking why the nightly schedule stopped firing, since 8 ready
  `todo` articles have been sitting unpublished for two months.

---

## Roadmap Changes

**DataForSEO volume refresh on the 8 todo-queue keywords** (2026-09-27):

| Item | Keyword | Market | Old volume | New volume |
|---|---|---|---|---|
| art-dengue-fever | dengue fever | Kenya | 4,400 | 4,400 (unchanged) |
| art-prolactin-test | prolactin test | Nigeria | 720 | **590** (re-confirmed, LOW) |
| art-pcos-test | pcos test | Nigeria | null | **210** (newly confirmed, LOW) |
| art-hepatitis-a-test | hepatitis a test | Ghana | 10 | 10 (unchanged) |
| local-kano | blood test Kano | Nigeria | null | null (still no data) |
| local-enugu | blood test Enugu | Nigeria | null | null (still no data) |
| local-nakuru | blood test Nakuru | Kenya | null | null (still no data) |
| local-bloemfontein | blood test Bloemfontein | South Africa | null | **10** (newly confirmed, LOW) |

`art-pcos-test`'s volume field and `local-bloemfontein`'s volume field were updated
in `roadmap.yml` to reflect the newly-confirmed figures above; `art-prolactin-test`'s
volume was corrected to the re-confirmed 590/mo. **No reordering** — the existing
todo order (dengue fever 4,400 → prolactin 590 → pcos 210 → hepatitis A 10, then the
4 local pages) already matches volume-priority with the new data, so item order
stands. No `done` items were touched.

Updated `meta.updated` to 2026-09-27 and `meta.keyword_data` to record: (a) the first
confirmed indexed pages (2 of a 29-URL sample), (b) the sitemap tool's indexed-count
now being demonstrably stale, (c) 3 URLs regressing to "unknown to Google", and (d)
this week's volume refresh.

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Resubmit the sitemap** (`node seo/tools/gsc.mjs sitemap-submit sitemap.xml`) — it hasn't been resubmitted since 2026-07-23, and 3 sampled URLs have regressed to "URL is unknown to Google" | Weekly/nightly routine | No, but recommended this week |
| 2 | **Investigate why the nightly content routine hasn't run since 2026-07-25** — 8 ready `todo` articles are sitting unpublished for ~9 weeks | Human | Not this pass, but high-value |
| 3 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — still unconfigured after 12+ weeks of the same flag | Human | No |
| 4 | Treat `gsc.mjs sitemap-status`'s indexed-count as unreliable going forward; use direct `inspect` sampling (as this report did) for the real indexation read each week | Weekly routine (process note) | No |
| 5 | Once the indexed count grows past single digits, re-run GSC query/page quick-win detection — this remains the highest-value analysis the program has not yet been able to do at scale | Weekly routine | No (contingent on #2) |

---

*Generated by the seo-weekly routine · 2026-09-27*
