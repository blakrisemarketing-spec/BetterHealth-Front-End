# Ad landing URLs — App onboarding deep links

Exact URLs to point ads at. Each opens App onboarding and, after the visitor
signs in/up, pre-selects the panel/test on the "Choose your test" step (and
keeps it selected even if the recommender suggests otherwise).

Codes come from [`src/data/app-catalogue.js`](../src/data/app-catalogue.js),
which mirrors the App's public catalogue. Matching is **case-insensitive**,
`panel` wins over `test`/`tests`, and unknown/disabled codes **degrade to the
normal chooser** — a stale link never errors.

Base: `https://app.betterhealth.africa/join`

## Panels (one per package)

| Package | Panel code | Ad landing URL |
|---|---|---|
| Complete Health Check | `panorama` | https://app.betterhealth.africa/join?panel=panorama |
| Blood Sugar Check | `dialics` | https://app.betterhealth.africa/join?panel=dialics |
| Heart Health Check | `cardion` | https://app.betterhealth.africa/join?panel=cardion |
| Core Health Check | `metabolix` | https://app.betterhealth.africa/join?panel=metabolix |
| Private STI Check | `privara` | https://app.betterhealth.africa/join?panel=privara |
| Men's Health Check | `alpha` | https://app.betterhealth.africa/join?panel=alpha |
| Women's Health Check | `empress` | https://app.betterhealth.africa/join?panel=empress |
| Him/Her Fertility Test | `spark` | https://app.betterhealth.africa/join?panel=spark |
| Wellness Check | `shield` | https://app.betterhealth.africa/join?panel=shield |

## Promoted single tests

| Test | Test code | Ad landing URL |
|---|---|---|
| Malaria RDT | `MALARIA_RDT` | https://app.betterhealth.africa/join?test=MALARIA_RDT |

> ⚠️ The other promoted single tests (FBC, HbA1c, Lipid Profile, Liver, Kidney,
> Thyroid, Urine R/E, HIV, Hep B, Uric Acid) still need their App codes from
> `/api/public/diagnostic-tests` (endpoint currently returns 404). Fill the
> nulls in `src/data/app-catalogue.js`, then add rows here.

## Disease/program pages (on-site CTA targets, for reference)

| Program | → Panel code |
|---|---|
| Diabetes | `dialics` |
| Hypertension | `cardion` |
| Heart Health | `cardion` |
| Kidney Health | `metabolix` |
| Liver Health | `metabolix` |
| Fertility | `spark` |
| PCOS | `empress` |

## Attribution

Append campaign params — they are preserved through onboarding, sign-in/up, and
Google OAuth:

```
https://app.betterhealth.africa/join?panel=dialics&utm_source=meta&utm_medium=cpc&utm_campaign=diabetes_gh
https://app.betterhealth.africa/join?panel=dialics&ref=PARTNER123
```

The on-site CTAs do this automatically: `joinUrl()` carries any `?ref=` / `utm_*`
/ `gclid` / `fbclid` from the current page (or a `ref` captured earlier this
session) into the join link.

## Multiple tests

```
https://app.betterhealth.africa/join?tests=MALARIA_RDT,CRP
```

## Notes

- Use real query params (not `#fragments`) so they survive redirects.
- To verify codes against the live catalogue once it's deployed:
  `node scripts/sync-app-catalogue.mjs`
