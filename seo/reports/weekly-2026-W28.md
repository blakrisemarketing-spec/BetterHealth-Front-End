# SEO Weekly: 2026-W28 (05 Jul 2026)

**Week 3 of reporting — week-over-week vs 2026-W27 (28 Jun 2026)**

---

## Data Sources

| Source | Status | Notes |
|--------|--------|-------|
| Google Search Console | **Blocked (new reason)** | Credentials now parse correctly (last week's invalid-JSON issue is fixed), but the query fails with `HTTP 403 — User does not have sufficient permission for site 'https://www.betterhealth.africa/'`. The service account needs to be added as a user in Search Console → Settings → Users and permissions. |
| DataForSEO | **Operational** | SERP (Ghana, depth 20) for all 13 published articles + volume refresh for 22 todo-queue keywords across Ghana/Nigeria/Kenya |
| Bing Webmaster | **Skipped** | `BING_API_KEY` not configured |

---

## Indexation Status

A `site:betterhealth.africa` search still returns **only the homepage** (plus tracking-param variants) — no blog articles are indexed. The oldest articles (hba1c, preventive screening, fatty liver, fasting blood sugar) are now **15 days** old; the newest (vitamin D, creatinine/eGFR) are 3–5 days old. Indexation lag alone doesn't explain 15 days with zero index presence for the oldest content.

This is not a `robots.txt`/sitemap misconfiguration: `robots.txt` allows all crawling and references `sitemap.xml` correctly, and the live `sitemap.xml` already lists 12 of the 13 published articles. The most likely explanation is that the sitemap was never submitted inside Search Console — which needs the same access grant the service account is currently missing (see Data Sources).

---

## SERP Positions — All 13 Published Articles (Ghana, 2026-07-05)

| Article slug | Primary keyword | Vol (mo) | W27 | W28 | Delta |
|---|---|---|---|---|---|
| hba1c-explained | hba1c test | 590 | Not in top 20 | Not in top 20 | — |
| preventive-health-screening-ghana | health screening Ghana | — | Not in top 20 | Not in top 20 | — |
| fatty-liver-disease-explained | fatty liver disease | 1,600 | Not in top 20 | Not in top 20 | — |
| fasting-blood-sugar-explained | fasting blood sugar normal range | 1,300 | Not in top 20 | Not in top 20 | — |
| lipid-profile-cholesterol-test | lipid profile test | 1,000 | Not in top 20 | Not in top 20 | — |
| full-blood-count-explained | fbc test | 1,000 | Not in top 20 | Not in top 20 | — |
| high-blood-pressure-silent-killer | hypertension symptoms | 480 | Not in top 20 | Not in top 20 | — |
| prediabetes-warning-signs | prediabetes symptoms | 70 | Not in top 20 | Not in top 20 | — |
| ferritin-iron-anaemia | ferritin test | 50 | n/a (new) | Not in top 20 | new |
| vitamin-d-deficiency | vitamin d test | 20 | n/a (new) | Not in top 20 | new |
| sickle-cell-trait-testing | sickle cell trait test | — | n/a (new) | Not in top 20 | new |
| creatinine-egfr-kidney-function | creatinine test | 110 | n/a (new) | Not in top 20 | new |
| preventable-diseases-preventive-healthcare-ghana | preventive healthcare Ghana | — | Not in top 20 | Not in top 20 | — |

**Zero ranking movement across all 13 articles, for the second week running.** None of the 9 keywords tracked since W26/W27 have moved. This is now a strong signal, not noise: 15 days live with no top-20 presence for the oldest 4 articles is unusual if indexed, and consistent with the "not indexed at all" finding above.

### Competitive landscape (unchanged from W27, spot-checked this week)

- **lipid profile test**: Diamed Ghana (`diamedghana.com`) still ranks — now **#9** (was #8 in W27), essentially flat. Remains the only Ghana-specific competitor in this SERP.
- **health screening Ghana**: SYNLAB Ghana (#1), Ministry of Health (#3), Trust Hospital (#6) — local service pages dominate; still no local editorial competitor.
- **hba1c test, fatty liver disease, hypertension symptoms, prediabetes symptoms, ferritin test, fbc test**: unchanged — international authority sites (Mayo, Cleveland Clinic, MedlinePlus, HealthDirect, LabTestsOnline, NHS) fill the top 10; no African-specific competitor in any of these SERPs.
- **preventive healthcare Ghana**: UG Medical Centre (#1), NHIS (#2), MOH (#3) — institutional, no editorial competitor.

---

## AI Citation (GEO) Scoreboard

| Query | W26 | W27 | W28 |
|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet (new) | Not yet | Not yet |

**No AI citations after 3 weeks of tracking.** Every check this week returned generic international results (Medical News Today, NCBI, Cleveland Clinic, Johns Hopkins, etc.) with no betterhealth.africa presence. This tracks with the indexation problem: a page can't be cited if it isn't indexed.

---

## Week-over-Week Movement

**Week 3 — still no position changes anywhere.** Combined with the `site:` query returning only the homepage, the picture is now clear: **indexation, not ranking competitiveness, is the binding constraint.** The content itself hasn't yet been tested against real SERP competition.

---

## Volume Refresh (DataForSEO, 2026-07-05)

### Published articles — Ghana

| Keyword | Vol (GH/mo) | Competition | Roadmap item |
|---|---|---|---|
| TSH test meaning | 10 | LOW | art-thyroid-tsh |
| liver function test results explained | 10 | — | art-liver-function-tests |

### Pan-African / multi-market todo items — confirmed for the first time this week

These were added 2026-06-28 with `volume: null` pending confirmation. This is the first DataForSEO pull against them:

| Keyword | Market | Vol/mo | Competition | Roadmap item |
|---|---|---|---|---|
| blood group test | Nigeria | **1,600** | LOW | art-blood-group |
| widal test | Ghana | **1,000** | LOW | art-typhoid-widal |
| genotype test | Nigeria | **880** | LOW | art-genotype-test |
| psa test | Ghana | 480 | LOW | art-psa-prostate |
| g6pd test | Ghana | 390 | LOW | art-g6pd |
| malaria test | Ghana | 320 | LOW | art-malaria-test |
| hiv test | Ghana | 320 | LOW | art-hiv-test |
| uric acid test | Ghana | 210 | LOW | art-uric-acid-gout |
| hepatitis b test | Ghana | 110 | LOW | art-hepatitis-b |
| urinalysis test | Ghana | 110 | LOW | art-urinalysis |
| premarital screening | Nigeria | 50 | LOW | art-premarital-screening |
| blood test Nairobi | Kenya | 40 | LOW | local-nairobi |
| hepatitis c test | Ghana | 20 | LOW | art-hepatitis-c |
| vitamin b12 test | Ghana | 10 | LOW | art-vitamin-b12 |
| antenatal blood tests | Ghana | 10 | LOW | art-antenatal-tests |
| blood test Lagos | Nigeria | 10 | LOW | local-lagos |
| pap smear test | Ghana | no data | — | art-pap-smear |
| h pylori test | Ghana | no data | — | art-h-pylori |
| stool test | Ghana | no data | — | art-stool-test |
| crp test | Ghana | no data | — | art-crp-inflammation |
| health screening Nigeria | Nigeria | no data | — | art-screening-nigeria |
| health screening Kenya | Kenya | no data | — | art-screening-kenya |

**Headline finding: three pan-African items — blood group test (1,600/mo), widal test (1,000/mo), and genotype test (880/mo) — all LOW competition — outrank every remaining Ghana biomarker keyword in the queue by 8–160x.** The current #1/#2 items (thyroid TSH, liver function tests) sit at 10/mo each.

---

## Quick Wins

**Still not available** — GSC is now blocked by a permissions error rather than broken credentials. Once the service account is granted read access on the property, this section can identify position 5–20 queries and low-CTR pages. This is the single highest-leverage fix available: it unlocks quick-win detection, real click/impression data, and confirmation of whether pages are indexed at all.

---

## Gaps

1. **Pan-African cluster is underweighted relative to demand.** Blood group (1,600/mo), widal/typhoid (1,000/mo), and genotype (880/mo) tests were sitting in the queue with `volume: null` and no priority signal — now confirmed as the highest-value, lowest-competition targets in the entire backlog. Addressed this week via reprioritization (see below).
2. **No local Ghana/Nigeria editorial competitor in nearly every tracked SERP.** Aside from Diamed Ghana (#9, lipid profile) and the health-screening service pages, every keyword we checked is dominated entirely by international authority sites. This is a standing opportunity, not a new one — but it can't be captured without indexation.
3. **Indexation is now the single blocking issue for the whole program.** Three weeks of publishing, zero index presence beyond the homepage. This is **not** a technical misconfiguration: `robots.txt` allows all crawling and correctly references the sitemap, and `sitemap.xml` is live and already lists 12 of the 13 published articles. The gap is entirely in Google's crawl/index queue and the fact that the sitemap likely was never submitted inside Search Console (which requires the same access the service account is missing). Recommend a direct GSC sitemap submission + URL Inspection for all 13 article URLs the moment GSC access is restored (see Action Items).

---

## Roadmap Changes

**Major reprioritization of the todo queue**, driven entirely by this week's DataForSEO pull (first confirmation of the pan-African items added 2026-06-28). No `done` items were reordered.

New todo order (was: thyroid-tsh, liver-function, malaria, widal, hepatitis-b, hiv, hepatitis-c, genotype, premarital, blood-group, psa, pap-smear, uric-acid, h-pylori, stool, urinalysis, crp, vitamin-b12, g6pd, antenatal, screening-nigeria, screening-kenya, lagos, nairobi, cost-of-screening, full-body-checkup, home-vs-lab, accra, kumasi, tech x2):

1. **art-blood-group** (1,600/mo, Nigeria) ← promoted from #10
2. **art-typhoid-widal** (1,000/mo) ← promoted from #4
3. **art-genotype-test** (880/mo, Nigeria) ← promoted from #8
4. **art-psa-prostate** (480/mo) ← promoted from #11
5. **art-g6pd** (390/mo) ← promoted from #19
6. **art-malaria-test** (320/mo) ← promoted from #3
7. **art-hiv-test** (320/mo) ← promoted from #6
8. **art-uric-acid-gout** (210/mo) ← promoted from #13
9. **art-hepatitis-b** (110/mo) ← was #5
10. **art-urinalysis** (110/mo) ← promoted from #16
11. **art-premarital-screening** (50/mo, Nigeria) ← was #9
12. **local-nairobi** (40/mo, Kenya) ← promoted from #24
13. **art-hepatitis-c** (20/mo) ← was #7
14. art-thyroid-tsh (10/mo) ← demoted from #1
15. art-liver-function-tests (10/mo) ← demoted from #2
16. art-vitamin-b12 (10/mo)
17. art-antenatal-tests (10/mo)
18. local-lagos (10/mo, Nigeria)
19–29. Remaining items with no DataForSEO data yet (pap-smear, h-pylori, stool-test, crp-inflammation, screening-nigeria, screening-kenya, cost-of-screening, full-body-checkup, home-vs-lab, local-accra, local-kumasi) — unchanged relative order
30–31. Technical tasks (og-images, programmatic biomarkers) — unchanged, still last

**Rationale:** the pan-African expansion items added last week (2026-06-28) all carried `volume: null` pending confirmation. This is that confirmation, and it changes the picture substantially — blood group, widal, and genotype tests all clear 850+/mo at LOW competition, well above every remaining Ghana biomarker term. Thyroid TSH and liver function tests (last week's #1 and #2) drop to 10/mo each once compared against real numbers. HIV testing is flagged for careful, dignity-first framing per its existing roadmap note; this reordering doesn't change that requirement, only the priority position.

Updated `meta.updated` to 2026-07-05 and `meta.keyword_data` to reflect this week's confirmed pan-African volumes.

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | Grant the GSC service account read access on the `betterhealth.africa` property (Search Console → Settings → Users and permissions → add the service account's `client_email`) | Human (Google account access required) | **Yes** — this is now the only remaining GSC blocker; credentials are valid |
| 2 | Once GSC access works, submit all 13 published article URLs via URL Inspection | Human | **Yes** — 15 days with zero index presence beyond the homepage is unusual and needs direct action, not more waiting |
| 3 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data | Human | No |
| 4 | Publish next article: **art-blood-group** (blood group test, 1,600/mo Nigeria, LOW competition) — new #1 per this week's reprioritization | Nightly routine | No |
| 5 | Submit `sitemap.xml` inside Search Console once access is granted — `robots.txt` and the sitemap itself are already correctly configured, so this is very likely the missing step, not a code issue | Human | No |

---

*Generated by the seo-weekly routine · 2026-07-05*
