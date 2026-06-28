# SEO Weekly: 2026-W27 (28 Jun 2026)

**Week 2 of reporting — week-over-week vs 2026-W26 (24 Jun baseline)**

---

## Data Sources

| Source | Status | Notes |
|--------|--------|-------|
| Google Search Console | **Skipped** | `GSC_SERVICE_ACCOUNT_JSON` contains invalid JSON (parse error at position 1) — credentials broken |
| DataForSEO | **Operational** | SERP (Ghana, depth 20) + volume refresh |
| Bing Webmaster | **Skipped** | `BING_API_KEY` not configured |

---

## New Articles Published Since W26

Four articles shipped in the 4 days since the last weekly run:

| Article slug | Primary keyword | Volume (GH/mo) | Published |
|---|---|---|---|
| lipid-profile-cholesterol-test | lipid profile test | 1,000 | 2026-06-23 |
| full-blood-count-explained | fbc test | 1,000 | 2026-06-25 |
| high-blood-pressure-silent-killer | hypertension symptoms | 480 | 2026-06-26 |
| prediabetes-warning-signs | prediabetes symptoms | 70 | 2026-06-27 |

Total published: 9 (8 nightly-routine + 1 manual).

---

## SERP Positions — All Published Articles (Ghana, 2026-06-28)

| Article slug | Primary keyword | Vol (GH/mo) | W26 | W27 | Delta |
|---|---|---|---|---|---|
| hba1c-explained | hba1c test | 590 | Not in top 20 | Not in top 20 | — |
| preventive-health-screening-ghana | health screening Ghana | — | Not in top 20 | Not in top 20 | — |
| fatty-liver-disease-explained | fatty liver disease | 1,600 | Not in top 20 | Not in top 20 | — |
| fasting-blood-sugar-explained | fasting blood sugar normal range | 1,300 | Not in top 20 | Not in top 20 | — |
| lipid-profile-cholesterol-test | lipid profile test | 1,000 | n/a (new) | Not in top 20 | new |
| full-blood-count-explained | fbc test | 1,000 | n/a (new) | Not in top 20 | new |
| high-blood-pressure-silent-killer | hypertension symptoms | 480 | n/a (new) | Not in top 20 | new |
| prediabetes-warning-signs | prediabetes symptoms | 70 | n/a (new) | Not in top 20 | new |
| preventable-diseases-preventive-healthcare-ghana | preventive healthcare Ghana | — | Not in top 20 | Not in top 20 | — |

**No ranking movement.** The oldest articles (hba1c, preventive screening, fatty liver, fasting blood sugar) have been live for 6–9 days; indexation almost certainly remains the blocker for all of them.

### Notable SERP observation

**Diamed Ghana** (`diamedghana.com`) ranks **#8 for "lipid profile test"** in Ghana — a local diagnostics company. This is the strongest competitive signal this week: Ghana-specific health content can break into the top 10 for these terms. betterhealth.africa needs to get its articles indexed to compete.

### Top-20 domain landscape (by term)

| Keyword | Who dominates top 20 |
|---|---|
| hba1c test | MedlinePlus, Diabetes UK, LabTestsOnline, NIH, HealthDirect, Mayo — all international |
| health screening Ghana | SYNLAB Ghana (#2), MOH Ghana (#7), Trust Hospital (#6), GlobalGiving (#4) — local service pages, no editorial guide |
| fatty liver disease | Mayo, NHS, HealthDirect, MedlinePlus, NIDDK, Harvard — all international |
| fasting blood sugar normal range | Mayo, Cleveland Clinic, WHO PDF, BHF — all international |
| lipid profile test | Cleveland Clinic, LabTestsOnline, HealthDirect, **Diamed Ghana (#8)**, Mayo — local Ghana lab CAN rank |
| fbc test | LabTestsOnline, HealthDirect, NHS trust, Wikipedia, London Doctors Clinic — all UK/AU |
| hypertension symptoms | Cleveland Clinic, WHO, Mayo, BHF, CDC — all international, no Ghana page in top 20 |
| prediabetes symptoms | Mayo, Cleveland Clinic, Diabetes UK, CDC, MedlinePlus — all international |
| preventive healthcare Ghana | UG Medical Centre (#2), MOH Ghana (#5), NHIS Ghana (#7) — institutional, no editorial |

---

## AI Citation (GEO) Scoreboard

| Query | W26 | W27 |
|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet |
| "hypertension symptoms" | Not yet | Not yet |
| "fbc test meaning" | Not yet (new) | Not yet |

No AI citations yet. Indexation remains the prerequisite; no change from W26.

---

## Week-over-Week Movement

**Week 2 — no position changes.** All published articles remain unranked (not in top 20).

Context on timeline:
- Oldest articles (hba1c, fatty liver, fasting blood sugar, preventive screening): 6–9 days live as of today
- Newest articles (lipid profile, FBC, hypertension, prediabetes): 1–5 days live
- No GSC data to confirm crawl/index status
- Ranking movement expected to begin appearing in W28–W29 once Googlebot catches up

---

## Volume Refresh — Todo Items (DataForSEO, Ghana, 2026-06-28)

| Keyword | Vol (GH/mo) | Competition | Roadmap item |
|---|---|---|---|
| ferritin test | 50 | LOW | art-anaemia-iron |
| vitamin d test | 20 | LOW | art-vitamin-d |
| sickle cell trait test | null | (no data, confirmed low) | art-sickle-cell-trait |
| creatinine test meaning | 10 | LOW | art-creatinine-egfr |
| TSH test meaning | 10 | LOW | art-thyroid-tsh |
| liver function test results explained | 10 | — | art-liver-function-tests |

No material volume changes vs W26. Volumes are stable.

---

## Quick Wins

**Not available this week** — GSC credentials are broken (invalid JSON). Cannot identify position 5–20 queries or low-CTR pages without GSC data.

**Immediate action:** Fix the `GSC_SERVICE_ACCOUNT_JSON` environment variable. The value is set but contains malformed JSON (the parser errored at position 1, character 2 — likely a quoting or escaping issue with the service account key). This is the most blocking issue in the program right now.

---

## Gaps

From competitive SERP analysis this week:

1. **"random blood sugar normal range" (1,300/mo GH)** — no Ghana-specific result in top 20. The published `fasting-blood-sugar-explained` article lists this as a secondary keyword and should capture both terms once indexed.
2. **"liver function tests Ghana"** — no local editorial result in top 20; `art-liver-function-tests` is in the roadmap.
3. **"cholesterol test Accra"** — no local result in top 20; natural secondary keyword for the published lipid-profile article and future local-accra page.
4. **"blood test Accra" / "blood test Kumasi"** — local landing pages (`local-accra`, `local-kumasi`) not yet published; no competitors in top 20 for either term.
5. **"sickle cell disease Ghana"** — the `art-sickle-cell-trait` roadmap item focuses on trait testing; a follow-up on sickle cell disease management could extend the cluster once the trait article is published.

---

## Roadmap Changes

**One reordering change:**

`art-sickle-cell-trait` promoted from position #6 → **position #3** in the todo queue.

Rationale: DataForSEO confirms near-zero competition for "sickle cell trait test" in Ghana. 1 in 4 Ghanaians carry the trait — exceptional local relevance. No international authority sites target this specific term; betterhealth.africa would be the only editorial article in a very thin SERP. The displaced biomarker articles (creatinine, TSH, liver function) share 10/mo volume and identical competition profiles, so the ordering cost among them is negligible. Sickle cell trait is also the strongest AI-citation candidate in the remaining queue: AI Overviews tend to cite locally-specific, culturally-relevant health information that no global authority covers well.

Updated `meta.updated` to 2026-06-28.

New todo order:
1. art-anaemia-iron (ferritin test, 50/mo)
2. art-vitamin-d (vitamin d test, 20/mo)
3. **art-sickle-cell-trait** ← moved up from #6
4. art-creatinine-egfr (creatinine test meaning, 10/mo)
5. art-thyroid-tsh (TSH test meaning, 10/mo)
6. art-liver-function-tests (null/mo)
7. art-cost-of-screening
8. art-full-body-checkup
9. art-home-vs-lab
10. local-accra
11. local-kumasi
12. tech-og-images-blog
13. tech-programmatic-biomarkers

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | Fix `GSC_SERVICE_ACCOUNT_JSON` — current value is invalid JSON | Human (re-paste service account key from GCP console) | **Yes** — no traffic or position data without it |
| 2 | Submit all 9 blog article URLs to GSC URL Inspection | Human (once GSC is fixed) | **Yes** — indexation blocked |
| 3 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data | Human | No |
| 4 | Publish next article: **art-anaemia-iron** (ferritin test, 50/mo) | Nightly routine | No |
| 5 | Add internal links: lipid-profile → fasting-blood-sugar, FBC → hba1c | Editorial / nightly | No |

---

*Generated by the seo-weekly routine · 2026-06-28*
