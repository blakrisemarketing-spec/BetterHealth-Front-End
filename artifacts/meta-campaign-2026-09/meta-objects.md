# Meta objects (ad account 1332108492417465, all PAUSED)

Created 2026-09-02 through the Meta Ads MCP. Nothing here delivers until it is activated; activation is a separate approval under the spend gate in the `bh-meta-ads-execution` skill.

Ads Manager: https://www.facebook.com/adsmanager/manage/campaigns?act=1332108492417465

## Campaign 1: BHA — Test Panels — Sep 2026

- Campaign id `120253272623270020`. Objective Sales. CBO $5.00/day (set 2026-09-02 at Damzi's decision; 14-day stop time to be set at activation, since Meta's minimum spend cap is $100). Bid: lowest cost.
- [Open in Ads Manager](https://www.facebook.com/adsmanager/manage/campaigns/edit?act=1332108492417465&selected_campaign_ids=120253272623270020)
- Ad sets: optimisation landing page views, billing impressions, destination website, promoted object pixel `2118966258986670` + InitiateCheckout, Ghana, hard age/gender caps, Facebook + Instagram feed/story/reels.

| Ad set | Id | Audience | Ad A (card) | Ad B (statement) |
|---|---|---|---|---|
| Panorama — Complete Health Check | `120253272683010020` | 30 to 60, all | ad `120253275158520020` / creative `1043441845112268` | ad `120253275161010020` / creative `1401371602076198` |
| Dialics — Blood Sugar Check | `120253272663560020` | 30 to 60, all | ad `120253275162330020` / creative `1764839304828064` | ad `120253275163360020` / creative `1539235547513372` |
| Cardion — Heart Health Check (with lipid profile, v2) | `120253272664320020` | 35 to 60, all | ad `120253276154220020` / creative `2017351805644569` | ad `120253276154500020` / creative `2823634088019717` |
| Metabolix — Core Health Check | `120253272665610020` | 30 to 60, all | ad `120253275165810020` / creative `1431074092208774` | ad `120253275166260020` / creative `1085637287325444` |
| Alpha — Men's Health Check | `120253272668350020` | men 40 to 65 | ad `120253275166550020` / creative `1472557614682537` | ad `120253275166880020` / creative `1040993572145496` |
| Empress — Women's Health Check | `120253272670040020` | women 30 to 60 | ad `120253275167260020` / creative `2304176267000318` | ad `120253275167650020` / creative `2487445755109561` |
| Shield — Wellness Check (malaria + typhoid) | `120253272671320020` | 18 to 55, all | ad `120253275168060020` / creative `1599698774874892` | ad `120253275168320020` / creative `1369593501986224` |
| Spark — Him/Her Fertility Test (added 2026-09-02) | `120253276094290020` | 25 to 45, all | ad `120253276155140020` / creative `1594033508751384` | ad `120253276155370020` / creative `939026575921441` |

Destination pattern: `https://www.betterhealth.africa/book-tests/<slug>/?utm_source=meta&utm_medium=paid_social&utm_campaign=panels_sep26&utm_content=<slug>-<a|b>`. CTA button: Book Now.

Archived (superseded when the lipid profile was added to Cardion; never delivered): ads `120253275164350020` and `120253275165010020`, creatives `1869689447774414` and `1796755511666593`.

## Campaign 2: BHA — Lead Magnets — Sep 2026

- Campaign id `120253272624060020`. Objective Leads. CBO $5.00/day (set 2026-09-02; 14-day stop time at activation). Bid: lowest cost.
- [Open in Ads Manager](https://www.facebook.com/adsmanager/manage/campaigns/edit?act=1332108492417465&selected_campaign_ids=120253272624060020)
- Ad sets: optimisation conversions on pixel `Lead`, billing impressions, destination website, Ghana, hard age caps, same placements.

| Ad set | Id | Audience | Ad A (card) | Ad B (statement) |
|---|---|---|---|---|
| LM2 — Which Test Do I Need? (quiz) | `120253272653090020` | 25 to 55, all | ad `120253275175320020` / creative `1847194586661444` | ad `120253275176310020` / creative `1578490433766023` |
| LM7 — Genotype Compatibility Calculator | `120253288613440020` | 22 to 45, all | ad `120253288657980020` / creative `4396786157210604` | ad `120253288658090020` / creative `1663965192398186` |
| LM8 — Diabetes Risk Score | `120253288613870020` | 30 to 60, all | ad `120253288658260020` / creative `1731288687985824` | ad `120253288658420020` / creative `2073833823233383` |
| LM9 — Heart Age Check | `120253288614480020` | 30 to 65, all | ad `120253288658610020` / creative `1471277254831222` | ad `120253288659000020` / creative `1289255333201568` |
| LM10 — BMI and Waist Calculator | `120253293432130020` | 25 to 55, all | ad `120253293502450020` / creative `1596227718707006` | ad `120253293503330020` / creative `4549414572010134` |

Retired 2026-09-02 when the PDFs were dropped from the campaign. All paused, all renamed with a "(retired)" prefix in Ads Manager, ads left in place so the copy and images are recoverable:

| Retired ad set | Id |
|---|---|
| LM1 — Know Your Numbers | `120253272651280020` |
| LM3 — Family Health Map | `120253272654150020` |
| LM4 — 90-Day Blood Sugar Log | `120253272655030020` |
| LM5 — Home Blood Pressure 7-Day Guide | `120253272656780020` |
| LM6 — Read Your Lab Results | `120253272658220020` |

Destination pattern: `https://www.betterhealth.africa/tools/<slug>/` for the three calculators and `/guides/which-test/` for the quiz, each with `?utm_source=meta&utm_medium=paid_social&utm_campaign=leads_sep26&utm_content=<slug>-<a|b>`. CTA button: Learn More throughout, since the calculators run on the page rather than handing over a file.

## Previews checked

- Panorama A, mobile feed: https://business.facebook.com/ads/api/preview_iframe.php?d=AQK0iId0FE1-hK_PF3evkIeK8FZQvWNwXnC0BdcVAARxMy2xo10lKWlxqSkF3E5KQFf3PLlHp40rlNdT1bMu2s2114H08SjQCcW4IZbxgHeIHpw4Cy0-kArc7QEWNRipfg0z2LCUm8Z29cmfGZkdUnkln5zhaMGADJTwmEFV3uTFD0wPaGR1mw0CedJU7J_Yq1gA3g8WOAfeO1hHgKOvporvtKxRQ__V3_KUBK0CaEYanw&t=AQIT-ENnRUDxCBg0ulg
- Cardion B, Instagram feed: https://business.facebook.com/ads/api/preview_iframe.php?d=AQJ7yVKmw_-4gce-C1V30Caygn6DwsarlthS3c_rnftkGhzyPPZyMaBkUUF1GxbqqTimgEOWwzrkDGWNO6dchaKmviaskkFKFMng5kbeOPUELhtAW6I7qMkcBwEvqHLiUeFK-dLRzvT4Y2wS6YJ3EztWGmiMk4DqN6WRtxQrOJ3RKuz3MmOZBl1s5PK64MHdqCycO7s03u24JhtLmHMmY2eXm_jdJ9Myj4X0zqjqqWGLsA&t=AQItqg5CcF-5zFRmJ00
- Know Your Numbers A, mobile feed: https://business.facebook.com/ads/api/preview_iframe.php?d=AQLcFZhYpumlrfQSptZRywGErS8OuxK3Y8s935NofQYxZdUSTcSpZhsw-dwAJb-9TboLoCkexM7jzczlxaVPv2ss8hT6iz_ueMpA6IXX5TabzPJPZn-kfX7xcIEycFGaf1V7mdsg9f4CcThZVIjJ74ErOidgAbD8ARZ3g_c3tLTX5hCHbSdXQi4VR1mnujFCfXwKAIQ5Onc4LzNRewe_PBumpg-oRunFPdMt7dYiO2yllQ&t=AQJeF9xIY5ni2JBz_TY

- Spark A, mobile feed: https://business.facebook.com/ads/api/preview_iframe.php?d=AQIjoScNMMRrzUe8lP7U9dgH8ipUBMlctrsa92323CTXd1PFhwPD-upC6UE4i6i5mbGvqKAjLxQjDRJFJQKEvUkpIz31DY5OGP5JLNNtaTBpbEI2xWrJiel_h8k7wyA4y05zx7MfSXbuRB3_XRyDvgXeE-LV5-7-QmQkr-AJ_PHcQKLXylA1CxF-7-PY5uWNr9QWmZ5iTYFWYOQ_Eke-RkgLC6FzAYVI8Hdi7Y8JnHEe0Q&t=AQIZKPOXM2_5FFeIY4E

Preview links expire; regenerate from Ads Manager or `ads_get_ad_preview` with the ad id.

## Totals after Damzi's decisions (2026-09-02)

2 campaigns · 18 ad sets, 5 of them retired · 36 live-draft ads, all PAUSED · 2 archived ads. Daily budget $5.00 per campaign. Meta rejected a $70 spend cap ("must be at least $100.00"), so the 14-day flight is enforced by setting each campaign's `stop_time` to activation + 14 days when it is activated.

## Things to check in Ads Manager before activation

- **Instagram identity.** The API exposes no Instagram account for this ad account (`ads_get_ig_accounts` returns an empty list), so every creative was created with the Page identity only. Open one ad in Ads Manager and confirm the Instagram placement shows the BetterHealth Africa account (or the Page-backed identity); set it there if not.
- **Images are 4:5.** Stories and reels will be auto-adapted by Meta. The 9:16 versions under `creatives/story/` can be attached per placement in Ads Manager ("Edit placement" on the ad) if the auto-crop is poor.
- **The four `/tools/` destinations are not live yet.** Panel and guide pages are deployed and return 200, but the calculators ship in a second front-end PR. Do not activate LM7, LM8, LM9 or LM10 before that deploy lands and each URL returns 200.
- **Heart age needs a clinician's sign-off before LM9 activates.** The risk bands come from a published chart rather than anything invented, but the population-calibration question is real and worth one review. The other two do not need it: the genotype maths is a Punnett square and the diabetes score is a published instrument that the page labels honestly.

## Notes from the build

- A Sales campaign rejects an ad set whose promoted object is a bare pixel id, even with a landing-page-views goal; the fix was adding `custom_event_type: INITIATED_CHECKOUT`. Recorded for the `bh-meta-ads-execution` skill.
- One ad-set create returned a retryable "internal error" and did not create the object; listing ad sets before retrying avoided a duplicate.
- Both image-library upload tools are rollout-gated on this account ("This tool is new and is being gradually rolled out"). Creating the creative with `image_url` pointing at the committed file on GitHub (`raw.githubusercontent.com`, pinned to commit `cfbbc9d`) works and is what was used for all 26.
- `GET_STARTED` is not a valid link-ad button; the quiz ads use `LEARN_MORE`.
- The account still has no custom audiences. The August campaign's single ad set (`120253142445270020`) shows `ACTIVE` at ad-set level while its campaign is `PAUSED`; the campaign pause governs delivery, but tidy it before reusing that campaign.
