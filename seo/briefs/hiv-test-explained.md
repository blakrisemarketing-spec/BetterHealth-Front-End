# Brief: HIV Testing: Window Period, Test Types, and Reading Your Result

- **Roadmap id:** art-hiv-test
- **Slug:** hiv-test-explained
- **Primary keyword:** hiv test (320/mo Ghana, LOW competition, DataForSEO confirmed 2026-07-05)
- **Secondary keywords:** hiv test kit (1000/mo, no direct volume data but strong related-idea volume), hiv window period, hiv self test, hiv viral load, how accurate is an hiv test
- **Market:** pan-Africa (sub-Saharan Africa carries the highest global HIV burden; Ghana used as the home-market anchor stat)
- **Intent:** informational
- **Cluster:** conditions

## Angle

Handle with care and dignity throughout, no stigmatizing language, no assumptions
about risk groups. The citable, differentiating angle: most people only know "HIV
test" as one thing, but the window period and the confirmatory step are what most
questions and confusion online are actually about. Walk through:

1. The three test types (NAT/RNA, 4th-gen antigen/antibody combo, antibody-only
   rapid tests) and how their window periods differ (10 to 33 days, 18 to 45 days,
   up to about 3 months respectively).
2. Why one reactive rapid test is never a final diagnosis: WHO's sequential
   testing strategy (two or three different tests in a row) before an HIV-positive
   result is confirmed.
3. Self-testing: WHO-recommended, available in Ghana (oral fluid or blood-based
   kits), what a self-test can and cannot do (screening only, still needs
   confirmatory lab testing if reactive).
4. Viral load testing: a different tool entirely, used for monitoring people
   already diagnosed and on treatment, not for initial diagnosis.
5. Confidentiality and next steps after a reactive result, framed around
   Ghana/Africa's testing and treatment access.

## H2 outline

1. What an HIV test actually checks for
2. The three types of HIV test, and why the window period differs
3. Window period: how soon after exposure a test is reliable
4. Why a single reactive result is not a diagnosis (the confirmatory testing step)
5. HIV self-testing: what it can and cannot tell you
6. HIV viral load: a different test, for a different purpose
7. HIV testing in Ghana and across Africa
8. What to do with your result

## Citable opening claims (per H2)

- "An HIV test looks for one of three things in a blood or oral fluid sample: HIV
  antibodies, the p24 viral antigen, or the virus's genetic material itself, and
  which one a test looks for determines how soon after exposure it can be trusted."
- "A nucleic acid test (NAT) can detect HIV's genetic material as early as 10 to 33
  days after exposure, making it the fastest of the three test types, though it is
  not the one most testing centres use for routine screening."
- "The window period, the time between exposure and a reliable result, ranges from
  about 10 days for the most sensitive lab test to about 3 months for an
  antibody-only test, so the right test to trust depends on how recently the
  exposure happened."
- "A single reactive HIV test is a preliminary result, not a diagnosis, and the
  World Health Organization requires it to be confirmed with one or two additional,
  different tests before anyone is told they are HIV-positive."
- "HIV self-testing, recommended by the World Health Organization and available in
  Ghana as an oral-fluid or finger-prick kit, lets you screen your own status
  privately, but a reactive self-test still needs confirmatory testing at a clinic
  or lab."
- "HIV viral load testing measures how much virus is in the blood of someone
  already diagnosed with HIV, and it is a monitoring tool for people on treatment,
  not a way to diagnose a new infection."
- "Sub-Saharan Africa carries the largest share of people living with HIV
  worldwide, and in Ghana an estimated 1.49% of adults aged 15 to 49 were living
  with HIV as of the 2024 national estimates."
- "What you do after a test result depends on which result you got and how recent
  the possible exposure was, not on guesswork."

## Internal links (2 to 4, only to articles that already exist on main)

- `/blog/sickle-cell-trait-testing` (context: premarital/pre-family screening
  panels commonly test HIV alongside genotype)
- `/blog/full-blood-count-explained` (context: routine blood work companion test)
- `/what-we-test` (Infectious Diseases panel: HIV Retroscreen)
- `/pricing`

Do NOT link to hepatitis-b-test, malaria-test-explained, typhoid-widal-test, or
liver-function-tests-explained: those slugs only exist in other open, unmerged PRs
(#29, #31) and do not exist in this branch's `src/data/blog/index.js`. Linking to
them would 404 until those PRs merge.

## Facts verified via web search (2026-07-05), for the clinical-safety gate

- 4th-gen Ag/Ab combo window: 18 to 45 days (aidsmap, testing.com, i-Base).
- NAT/RNA window: 10 to 33 days (thebody.com, stdtest.com).
- Antibody-only (3rd-gen/rapid) window: conventionally up to about 3 months.
- WHO sequential testing strategy: 2 or 3 consecutive reactive tests required
  before an HIV-positive diagnosis is given (WHO 2019 guidance / PMC10759095).
- WHO recommends HIV self-testing (oral fluid and blood-based); available in
  Ghana via OraQuick and Ghana Health Service self-test distribution.
- Ghana 2024 National HIV Estimates: adult (15-49) prevalence 1.49%, ~334,721
  people living with HIV (~68.5% female), 15,290 new infections in 2024
  (Ghana AIDS Commission / UNAIDS, via Graphic Online and Citi Newsroom coverage).

## Images

- `public/blog/hiv-test-hero.svg`: hero data-graphic, on-brand palette matching
  existing hero SVGs.
- `public/blog/hiv-window-period.svg`: horizontal timeline chart of the three
  window periods (NAT, combo, antibody-only).
- Top-level `image` field: `/og-image.png` (raster, existing convention).

## Clinical-safety notes

- No treatment or PrEP/ART dosing advice.
- No assumptions about who is "at risk"; framed as a test anyone can choose to
  take.
- Explicit: a reactive rapid/self-test is preliminary, always needs confirmatory
  testing.
- Confidentiality emphasized.
- Standard disclaimer block included.
- No fabricated clinician review.
