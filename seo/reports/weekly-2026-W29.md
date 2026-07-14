# SEO Weekly: 2026-W29 (12 Jul 2026)

**Week 4 of reporting — week-over-week vs 2026-W28 (05 Jul 2026)**

---

## Data Sources

| Source | Status | Notes |
|--------|--------|-------|
| Google Search Console | **Blocked (same reason, 3rd week running)** | `HTTP 403 — User does not have sufficient permission for site 'https://www.betterhealth.africa/'`. Credentials parse correctly; the service account still has not been added as a user in Search Console → Settings → Users and permissions. |
| DataForSEO | **Operational** | SERP (Ghana/Nigeria, depth 20) for all 26 published articles' primary keywords + volume refresh for 7 remaining todo-queue keywords |
| Bing Webmaster | **Skipped** | `BING_API_KEY` not configured |

---

## SERP Positions — All 26 Published Articles

Queue grew from 13 to 26 published articles since last week (7 articles shipped via the 2026-07-10 consolidation PR, plus hepatitis-c, genotype-test, premarital-screening, blood-group, psa-prostate, pap-smear, uric-acid-gout completed 07-06 through 07-10). Checked every one against its primary keyword.

| Article slug | Primary keyword | Market | Vol (mo) | W28 | W29 | Delta |
|---|---|---|---|---|---|---|
| hba1c-explained | hba1c test | Ghana | 590 | Not in top 20 | Not in top 20 | — |
| preventive-health-screening-ghana | health screening Ghana | Ghana | — | Not in top 20 | Not in top 20 | — |
| fatty-liver-disease-explained | fatty liver disease | Ghana | 1,600 | Not in top 20 | Not in top 20 | — |
| fasting-blood-sugar-explained | fasting blood sugar normal range | Ghana | 1,300 | Not in top 20 | Not in top 20 | — |
| lipid-profile-cholesterol-test | lipid profile test | Ghana | 1,000 | Not in top 20 | Not in top 20 | — |
| full-blood-count-explained | fbc test | Ghana | 1,000 | Not in top 20 | Not in top 20 | — |
| high-blood-pressure-silent-killer | hypertension symptoms | Ghana | 480 | Not in top 20 | Not in top 20 | — |
| prediabetes-warning-signs | prediabetes symptoms | Ghana | 70 | Not in top 20 | Not in top 20 | — |
| ferritin-iron-anaemia | ferritin test | Ghana | 50 | Not in top 20 | Not in top 20 | — |
| vitamin-d-deficiency | vitamin d test | Ghana | 20 | Not in top 20 | Not in top 20 | — |
| sickle-cell-trait-testing | sickle cell trait test | Ghana | — | Not in top 20 | Not in top 20 | — |
| creatinine-egfr-kidney-function | creatinine test | Ghana | 110 | Not in top 20 | Not in top 20 | — |
| thyroid-tsh-test-explained | thyroid test | Ghana | 260 | Not in top 20 | Not in top 20 | — |
| liver-function-tests-explained | liver function test results explained | Ghana | 10 | n/a (new) | Not in top 20 | new |
| malaria-test-explained | malaria test | Ghana | 320 | n/a (new) | Not in top 20 | new |
| typhoid-widal-test | widal test | Ghana | 1,000 | n/a (new) | Not in top 20 | new |
| hepatitis-b-test | hepatitis B test | Ghana | 110 | n/a (new) | Not in top 20 | new |
| hiv-test-explained | hiv test | Ghana | 320 | n/a (new) | Not in top 20 | new |
| hepatitis-c-test | hepatitis C test | Ghana | 20 | n/a (new) | Not in top 20 | new |
| genotype-test-aa-as-ss | genotype test | Nigeria | 880 | n/a (new) | Not in top 20 | new |
| premarital-screening | premarital screening | Nigeria | 50 | n/a (new) | Not in top 20 | new |
| blood-group-test | blood group test | Ghana | 260 | n/a (new) | Not in top 20 | new |
| psa-prostate-test | psa test | Ghana | 480 | n/a (new) | Not in top 20 | new |
| pap-smear-cervical-screening | pap smear test | Ghana | — | n/a (new) | Not in top 20 | new |
| uric-acid-gout-test | uric acid test | Ghana | — | n/a (new) | Not in top 20 | new |
| preventable-diseases-preventive-healthcare-ghana | preventive healthcare Ghana | Ghana | — | Not in top 20 | Not in top 20 | — |

**Zero ranking movement across all 26 articles, for the fourth week running** — including the 13 new checks this week, all of which came back "not in top 20" on their very first read against real SERP competition. This is now a structural pattern, not statistical noise on 9 keywords: with 26 articles and 0 top-20 placements, and GSC access still blocked so indexation can't be directly confirmed via `site:` history this week, the working hypothesis from W27/W28 stands — **indexation, not content or ranking competitiveness, is the binding constraint.**

### Competitive landscape (spot-checked this week)

- No African-specific editorial competitor appeared in any of the 26 SERPs checked. International authority sites dominate every query: Mayo Clinic, Cleveland Clinic, MedlinePlus, NHS, CDC, WHO, HealthDirect, LabTestsOnline, NCBI/PMC.
- Local/institutional competitors still present only in the two Ghana-specific commercial queries: SYNLAB Ghana and Trust Hospital (health screening Ghana), UG Medical Centre / NHIS / MOH (preventive healthcare Ghana).
- **genotype test** (Nigeria): SYNLAB Nigeria appears at #4 — the only local lab domain across the entire 26-keyword sweep this week.
- **widal test**: dominated by hospital/clinical-reference domains (Yashoda Hospitals, ScienceDirect, Gastro Journal) rather than consumer health sites — a thinner, more technical SERP than most of the biomarker set.

---

## AI Citation (GEO) Scoreboard

| Query | W26 | W27 | W28 | W29 |
|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet (new) | Not yet | Not yet | Not yet |

**No AI citations after 4 weeks of tracking.** Every check this week again returned only international authority sources (PMC/NCBI, Cleveland Clinic, Nutrisense, healthdirect, PLOS One, etc.) with no betterhealth.africa presence, in search results or AI-generated summaries. Consistent with the indexation hypothesis: a page not in the index cannot be cited.

---

## Week-over-Week Movement

**Week 4 — still no position changes anywhere**, and the 13 newly-published articles checked for the first time this week all came back "not in top 20" on their first read. GSC remains blocked (same 403 permission error as W27/W28), so this week's analysis again relies entirely on DataForSEO SERP snapshots rather than confirmed click/impression/index data. **The GSC access blocker (Action Item #1, open 3 weeks) is now the single highest-leverage unresolved item in the entire program** — every other analysis in this report (quick wins, real indexation status, actual click data) is gated behind it.

---

## Volume Refresh (DataForSEO, 2026-07-12)

Confirmed volumes for todo-queue keywords that had gone unconfirmed (or were confirmed in a prior report but never written back to `roadmap.yml` — corrected this week, see Roadmap Changes):

| Keyword | Market | Vol/mo | Competition | Roadmap item |
|---|---|---|---|---|
| g6pd test | Ghana | 390 | LOW | art-g6pd |
| urinalysis test | Ghana | 110 | LOW | art-urinalysis |
| blood test Nairobi | Kenya | 40 | LOW | local-nairobi |
| vitamin b12 test | Ghana | 10 | LOW | art-vitamin-b12 |
| antenatal blood tests | Ghana | 10 | — | art-antenatal-tests |
| blood test Lagos | Nigeria | 10 | LOW | local-lagos |
| h pylori test | Ghana | no data | — | art-h-pylori |
| stool test | Ghana | no data | — | art-stool-test |
| crp test | Ghana | no data | — | art-crp-inflammation |
| health screening Nigeria | Nigeria | no data | — | art-screening-nigeria |
| health screening Kenya | Kenya | no data | — | art-screening-kenya |

**Data-integrity note:** the W28 report (2026-07-05) stated that g6pd (390/mo), urinalysis (110/mo), and blood test Nairobi (40/mo) had been "confirmed for the first time" that week, but the corresponding `volume` fields in `seo/roadmap.yml` were left as `null` — the write-back step was skipped. This week's DataForSEO pull re-confirms the same figures and writes them into the roadmap (see Roadmap Changes below), so the queue now reflects real data instead of stale nulls.

---

## Quick Wins

**Still not available.** GSC has been blocked by the same permissions error for three consecutive weekly runs (W27, W28, W29). Without query-level position/CTR data, "quick win" queries (page-2 positions, high-impression/low-CTR pages) cannot be identified. This remains the single highest-leverage fix available to the whole program.

---

## Gaps

1. **Indexation is still the binding constraint, now with more evidence.** All 13 articles newly published since W28 landed at "not in top 20" on their very first SERP check — the same outcome as the original 13. A genuinely competitive but simply-not-yet-ranked content set would be expected to show at least some scatter (a few page-2 placements on lower-competition long-tail terms); instead every one of 26 keywords, across a wide range of estimated competition levels, reads identically. That pattern is more consistent with "not indexed" than "indexed but outranked."
2. **GSC permission grant is now a 3-week-old open blocker.** It gates quick-win detection, real click/impression/position data, and confirmation of whether the sitemap was ever submitted. No other action in this report can substitute for it.
3. **Todo queue volume data had silently gone stale.** Three keywords (g6pd, urinalysis, blood test Nairobi) were reported as confirmed in W28 but never landed in `roadmap.yml`, which would have caused next week's re-prioritization to work off nulls instead of real numbers. Fixed this week; worth a process note so it doesn't recur (see Action Items).
4. **No new GSC-sourced gap analysis possible this week** (source blocked) — carried forward from W27/W28.

---

## Roadmap Changes

**Reprioritized the todo queue using this week's DataForSEO volume refresh**, and corrected the write-back gap from last week. No `done` items were reordered.

Previous todo order (all `volume: null` as-written): h-pylori, stool-test, urinalysis, crp-inflammation, vitamin-b12, g6pd, antenatal-tests, screening-nigeria, screening-kenya, local-lagos, local-nairobi, cost-of-screening, full-body-checkup, home-vs-lab, local-accra, local-kumasi, tech-og-images, tech-programmatic-biomarkers.

New todo order:

1. **art-g6pd** (390/mo, Ghana) ← promoted from #6; highest-volume unpublished keyword in the queue
2. **art-urinalysis** (110/mo, Ghana) ← promoted from #3
3. **local-nairobi** (40/mo, Kenya) ← promoted from #11
4. **art-vitamin-b12** (10/mo, Ghana) ← was #5
5. **art-antenatal-tests** (10/mo, Ghana) ← was #7
6. **local-lagos** (10/mo, Nigeria) ← was #10
7. art-h-pylori (no data) ← demoted from #1
8. art-stool-test (no data) ← demoted from #2
9. art-crp-inflammation (no data) ← demoted from #4
10. art-screening-nigeria (no data) ← was #8
11. art-screening-kenya (no data) ← was #9
12–17. Remaining decision/local/technical items (cost-of-screening, full-body-checkup, home-vs-lab, local-accra, local-kumasi, tech-og-images-blog, tech-programmatic-biomarkers) — unchanged relative order

**Rationale:** g6pd (390/mo), urinalysis (110/mo), and Nairobi (40/mo) all clear the remaining unpublished 10/mo items by 4–39x, so they move to the front. This confirms and corrects the same data W28 reported but didn't persist to `roadmap.yml` — the `volume: null` fields for these three items were still `null` going into this run, which would have caused this reprioritization (and any nightly run reading the file) to treat them as unconfirmed. Corrected via direct DataForSEO re-pull today.

Updated `meta.updated` to 2026-07-12 and `meta.keyword_data` to record both the new confirmations and the write-back correction.

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | Grant the GSC service account read access on the `betterhealth.africa` property (Search Console → Settings → Users and permissions → add the service account's `client_email`) | Human (Google account access required) | **Yes** — open 3 weeks running; blocks quick-win detection and real click/index data |
| 2 | Once GSC access works, submit all 26 published article URLs via URL Inspection and confirm indexation status directly | Human | **Yes** |
| 3 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data | Human | No |
| 4 | Publish next article: **art-g6pd** (g6pd test, 390/mo Ghana, LOW competition) — new #1 per this week's reprioritization | Nightly routine | No |
| 5 | When a weekly report states a DataForSEO figure as "confirmed," verify it landed in `roadmap.yml`'s `volume` field before closing out the run — this week's g6pd/urinalysis/Nairobi correction suggests this step was skipped in a prior run | Weekly routine (process note) | No |

---

*Generated by the seo-weekly routine · 2026-07-12*
