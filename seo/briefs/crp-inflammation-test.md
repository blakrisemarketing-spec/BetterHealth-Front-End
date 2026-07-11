# Brief: CRP and ESR: What Inflammation Markers Tell You

- **Slug:** `crp-inflammation-test`
- **Primary keyword:** c-reactive protein test (Ghana, 480/mo, DataForSEO-confirmed). "CRP"
  used throughout as the friendly abbreviation. Broader term "c reactive protein" (880/mo)
  is folded into the same content since it is a near-synonym search.
- **Secondary keywords (DataForSEO-confirmed):** c-reactive protein normal range (90/mo),
  c-reactive protein high means (40/mo), c-reactive protein high (30/mo), c-reactive
  protein range (10/mo), c-reactive protein level chart (10/mo)
- **Secondary keywords (roadmap seeds, no confirmed volume):** esr test, inflammation
  blood test, high crp causes
- **Intent:** informational
- **Cluster:** biomarkers
- **Market:** pan-Africa. Ghana mentioned only where it adds real specificity (e.g. CRP/ESR
  ordered alongside fever workups across African clinical practice), not a Ghana-only frame.

## Angle
CRP and ESR are the two blood tests doctors reach for when they suspect inflammation
somewhere in the body, but neither one says where or why. The article's job is to make
that nonspecific nature crystal clear (repeatedly), explain the practical difference
between the two tests (CRP moves fast, ESR is slower and less specific), walk through
what a high result can mean, and cover the hs-CRP cardiovascular use case as one input
among several, never a standalone diagnostic cutoff.

## H2 outline (each opens with a self-contained, citable claim)
1. What CRP and ESR measure (liver-made acute-phase protein vs. how fast red cells
   settle; both rise with inflammation, neither points to a cause)
2. CRP vs ESR: what's the practical difference (speed of rise/fall, specificity)
3. C-reactive protein normal range and what the c-reactive protein level chart shows
   (mg/L bands used by most labs; always read your own lab's reference range)
4. What a high CRP means, and what causes it (infection, autoimmune conditions like
   rheumatoid arthritis/lupus, obesity, smoking, recent injury or surgery)
5. hs-CRP and heart disease risk (the AHA/CDC-associated <1 / 1-3 / >3 mg/L framework,
   heavily hedged as one input among several risk factors)
6. Does a normal CRP rule out inflammation? (no test is perfect; false negatives happen)
7. What to do with your CRP or ESR result

## Must include
- 2 SVG images in `public/blog/`: `crp-hero.svg` (hero) and `crp-risk-ranges.svg`
  (data graphic showing CRP risk/result bands), matching house style (flat, clean,
  system-ui font, sage/terracotta/gold palette seen in hba1c-hero.svg / hba1c-ranges.svg).
- FAQ block, 5+ answer-first Q&As: what is CRP, CRP vs ESR difference, what does high
  CRP mean, what causes high CRP, what is hs-CRP for heart-disease risk, does normal
  CRP rule out inflammation.
- Disclaimer block (general health education, not medical advice).
- No `medicallyReviewedBy` field, no fabricated studies or clinician names.

## Internal links (3-4, at least 2 blog cross-links)
1. `/blog/lipid-profile-cholesterol-test` — hs-CRP is read alongside a lipid panel for
   cardiovascular risk stratification.
2. `/blog/high-blood-pressure-silent-killer` — shared cardiovascular risk theme.
3. `/blog/uric-acid-gout-test` — both are inflammation-adjacent markers.
4. `/what-we-test` and `/pricing` — conversion links.

## Clinical accuracy guardrails
- CRP and ESR are nonspecific: state repeatedly that neither test alone diagnoses a
  disease.
- hs-CRP cardiovascular bands attributed as a widely-used clinical framework
  (AHA/CDC-associated guidance), explicitly hedged as one input among several risk
  factors, never a standalone cutoff, and noted that guidance varies by clinician
  and guideline body.
- No invented studies, no precise unsourced statistics, no treatment/dosing advice.

## Humanize
Run through bh-humanizer. Zero spaced em dashes anywhere in the file (title,
description, excerpt, body). Verify with `grep -n " — "` after the pass.
