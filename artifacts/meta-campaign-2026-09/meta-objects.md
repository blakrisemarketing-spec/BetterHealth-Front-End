# Meta objects (ad account 1332108492417465, all PAUSED)

Created 2026-09-02 through the Meta Ads MCP. Nothing here delivers until it is activated; activation is a separate approval under the spend gate in the `bh-meta-ads-execution` skill.

Ads Manager: https://www.facebook.com/adsmanager/manage/campaigns?act=1332108492417465

## Campaign 1: BHA — Test Panels — Sep 2026

- Campaign id `120253272623270020`. Objective Sales. CBO $10.00/day. Bid: lowest cost.
- [Open in Ads Manager](https://www.facebook.com/adsmanager/manage/campaigns/edit?act=1332108492417465&selected_campaign_ids=120253272623270020)
- Ad sets: optimisation landing page views, billing impressions, destination website, promoted object pixel `2118966258986670` + InitiateCheckout, Ghana, hard age/gender caps, Facebook + Instagram feed/story/reels.

| Ad set | Id | Audience | Destination |
|---|---|---|---|
| Panorama — Complete Health Check | `120253272683010020` | 30 to 60, all | `/book-tests/panorama/` |
| Dialics — Blood Sugar Check | `120253272663560020` | 30 to 60, all | `/book-tests/dialics/` |
| Cardion — Heart Health Check | `120253272664320020` | 35 to 60, all | `/book-tests/cardion/` |
| Metabolix — Core Health Check | `120253272665610020` | 30 to 60, all | `/book-tests/metabolix/` |
| Alpha — Men's Health Check | `120253272668350020` | men 40 to 65 | `/book-tests/alpha/` |
| Empress — Women's Health Check | `120253272670040020` | women 30 to 60 | `/book-tests/empress/` |
| Shield — Wellness Check (malaria + typhoid) | `120253272671320020` | 18 to 55, all | `/book-tests/shield/` |

Full destination pattern: `https://www.betterhealth.africa/book-tests/<slug>/?utm_source=meta&utm_medium=paid_social&utm_campaign=panels_sep26&utm_content=<slug>-<a|b>`

## Campaign 2: BHA — Lead Magnets — Sep 2026

- Campaign id `120253272624060020`. Objective Leads. CBO $10.00/day. Bid: lowest cost.
- [Open in Ads Manager](https://www.facebook.com/adsmanager/manage/campaigns/edit?act=1332108492417465&selected_campaign_ids=120253272624060020)
- Ad sets: optimisation conversions on pixel `Lead`, billing impressions, destination website, Ghana, hard age caps, same placements.

| Ad set | Id | Audience | Destination |
|---|---|---|---|
| LM1 — Know Your Numbers | `120253272651280020` | 25 to 55, all | `/guides/know-your-numbers/` |
| LM2 — Which Test Do I Need? (quiz) | `120253272653090020` | 25 to 55, all | `/guides/which-test/` |
| LM3 — Family Health Map | `120253272654150020` | 25 to 55, all | `/guides/family-health-map/` |
| LM4 — 90-Day Blood Sugar Log | `120253272655030020` | 30 to 65, all | `/guides/blood-sugar-log/` |
| LM5 — Home Blood Pressure 7-Day Guide | `120253272656780020` | 30 to 65, all | `/guides/home-blood-pressure-guide/` |
| LM6 — Read Your Lab Results | `120253272658220020` | 25 to 60, all | `/guides/read-your-results/` |

Full destination pattern: `https://www.betterhealth.africa/guides/<slug>/?utm_source=meta&utm_medium=paid_social&utm_campaign=leads_sep26&utm_content=<slug>-<a|b>`

## Ads and creatives

Pending: created once the images are hosted (see `creatives/README.md`). Each ad set gets two ads, A (card) and B (statement). Preview links are recorded below when they exist.

## Notes from the build

- A Sales campaign rejects an ad set whose promoted object is a bare pixel id, even with a landing-page-views goal; the fix was adding `custom_event_type: INITIATED_CHECKOUT`. Recorded for the `bh-meta-ads-execution` skill.
- One ad-set create returned a retryable "internal error" and did not create the object; listing ad sets before retrying avoided a duplicate.
- The account still has no custom audiences. The August campaign's single ad set (`120253142445270020`, "Ghana 30-65 — Broad — Free Consultation") shows `ACTIVE` at ad-set level while its campaign is `PAUSED`; the campaign pause governs delivery, but tidy it before reusing that campaign.
