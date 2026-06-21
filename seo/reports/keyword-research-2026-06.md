# Keyword Research — June 2026

Source: DataForSEO Google Ads search volume + related keywords. Location: **Ghana**.
Language: English. Run via `seo/tools/dataforseo.mjs`. Volumes are monthly searches.

## Headline findings

- The **biomarker explainer** terms carry the real Ghana volume. The **local commercial**
  terms ("blood test Accra", "health screening Ghana", "full body checkup Ghana") return
  little or no Google Ads volume. They stay on the roadmap as low-competition + AI-citation
  plays, but they do not lead.
- Several originally-planned primary keywords were far weaker than an obvious sibling term.
  Retargeted (see below).

## Volume table (primary candidates)

| Keyword | Ghana vol/mo | Competition | Action |
|---|---:|---|---|
| fatty liver disease | 1600 | LOW | **Promoted to #1.** Rich cluster (see below). |
| fasting blood sugar normal range | 1300 | LOW | Kept high. |
| lipid profile test | 1000 | LOW | **Retarget** cholesterol article to this (was "LDL vs HDL", 10). |
| fbc test | 1000 | LOW | **Retarget** full-blood-count article to this (was "full blood count explained", 10). |
| hba1c test | 590 | LOW | Published article already covers it (+ "hba1c normal range" 320). |
| hypertension symptoms | 480 | LOW | **Retarget** hypertension article (was "high blood pressure symptoms", n/a). |
| fatty liver symptoms | 210 | LOW | Secondary for fatty-liver article. |
| cholesterol test | 140 | LOW | Secondary for lipid article. |
| blood sugar test | 110 | LOW | Secondary for fasting-glucose article. |
| prediabetes symptoms | 70 | LOW | Kept. |
| ferritin test | 50 | LOW | **Retarget** anaemia article (was "iron deficiency anaemia symptoms", n/a). |
| diabetes test | 50 | LOW | Secondary. |
| vitamin d test | 20 | LOW | Retarget vitamin-D article (was "deficiency symptoms", n/a). |
| ldl vs hdl / creatinine / full blood count explained / tsh test meaning | 10 each | LOW | Demoted; used as secondary terms. |
| kidney function, liver function test, thyroid function test, sickle cell, anaemia symptoms, all Ghana-local commercial/local terms | n/a | — | Low/no data. Long-tail + GEO plays. |

## Fatty liver cluster (related keywords, Ghana)

fatty liver disease (1600), fatty liver (590), fatty liver symptoms (210), fatty liver
symptoms in females (170), fatty liver causes (110), treatment for fatty liver (40),
fatty liver diet (20). One comprehensive article covering symptoms (incl. in women),
causes, the liver tests that catch it, and diet/reversal can own this whole cluster.

## "Blood test" related (Ghana) — low

blood test (170), list of blood tests (30), blood test names and meanings (10),
blood test results chart (10), blood test procedure (10), blood test online (10).
Confirms the generic commercial cluster is small in Ghana; lead with conditions/biomarkers.

## Roadmap actions taken

1. Reordered `seo/roadmap.yml` by Ghana volume.
2. Retargeted four articles to higher-volume sibling keywords (cholesterol → lipid profile
   test; full blood count → fbc test; hypertension → hypertension symptoms; anaemia →
   ferritin test) and updated their titles/slugs.
3. Added `volume` + `secondary` fields per item so the nightly routine targets the
   strongest term and covers the cluster.

## Caveats

- Ghana Google Ads volume is sparse for niche health terms; absolute numbers are
  directional. Low/no volume does NOT mean no opportunity (long-tail, low competition,
  and AI-engine citations don't require high search volume).
- Re-run monthly (the weekly analytics routine) and fold GSC's own query data in once
  connected, since GSC shows what BetterHealth is *actually* surfacing for.
