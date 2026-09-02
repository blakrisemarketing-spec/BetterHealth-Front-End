# Council review: Meta panels + lead-magnet campaigns (September 2026)

Method: `.agents/copywriting-council/README.md`. Each lens was run as a separate pass on the same brief. Disagreements are kept where they changed the copy. Chair synthesis at the end. Final copy lives in [`ad-copy.md`](ad-copy.md).

## Brief

**What happened before.** "BHA — NCD Free Consultation — Aug 2026" bought 417 clicks at $0.07 and produced zero bookings. The ad destination was a 403 for most of the flight, the optimisation event (`Schedule`) has never fired on the pixel, and the offer (a free call that ends in a plan) asked a cold audience to give a stranger 20 minutes before it gave them anything.

**What the two new campaigns must do.**

| | Campaign 1: Test panels | Campaign 2: Lead magnets |
|---|---|---|
| Audience | People already looking for a health test in Ghana (solution-aware to product-aware) | People who are not shopping for a test today (unaware to problem-aware) |
| The ad's only job | Get the click to the panel page, with the offer already understood | Get the click to a free guide page and a WhatsApp number in exchange for it |
| What the next asset does | `/book-tests/<slug>` sells: tests included, price, who it is for, FAQ, Book CTA | `/guides/<slug>` delivers the guide instantly after the form, then offers the matching panel |
| Objective | Sales (landing page views now, InitiateCheckout later) | Leads (pixel `Lead` event, fires on form success) |

**Hard constraints.**
- Meta personal-attributes policy: state facts about a group, then invite. Never assert or imply the reader's condition, age band, or body. No "Are you...?" questions that imply a condition. This binds headlines, descriptions and the landing page meta description (it renders in the link preview).
- Health claims: "can help", "checks", "shows where things stand". Never "diagnoses", "reveals", "prevents".
- Copy rules in `.agents/skills/bh-social-visual-system/references/copy-rules.md`.
- Every number must come from a source already vetted on the site (the blog articles cite WHO, ADA, AHA/ACC, NCEP, Ghana Health Service, IDF). No invented prevalence, download counts, or testimonials.
- Cardion (Heart Health Check) does not include a lipid profile. The ad may not imply cholesterol is included.
- Empress (Women's Health Check) measures haemoglobin through the full blood count, not ferritin. "Iron" must be written as "haemoglobin (anaemia)".

**Proof available.** Doctor-reviewed results; 48 to 72 hours (24 to 48 for Dialics and Shield; same-day malaria rapid result); home collection by a certified phlebotomist (Lab Access Ghana) or a partner lab; results explained in plain English in a private dashboard; GDPC certification under Act 843; MoMo and card via Paystack; no referral needed; fixed prices (excl. VAT).

## Lens passes

### Breakthrough Advertising (awareness, sophistication, desire)

- Campaign 1 readers have already decided "I should get tested". They are choosing which test, where, and for how much. Lead with the product and the specifics. Education here is a delay.
- Campaign 2 readers have not decided anything. Leading with a condition ("high blood pressure") talks past the unaware; leading with identity and a small, concrete gift ("the 8 numbers every adult should know", "map your family") gives them a reason to act that does not require admitting a problem.
- Market sophistication for direct-to-consumer lab panels in Ghana is low. Hospital "full body check-up" packages exist, but nobody is advertising results explained in plain English with doctor review. A direct claim still works; mechanism ("plain-English results, doctor-reviewed, trends over time") is the second beat, not the first.
- Flag: the lead-magnet ads must not sell the test. The moment the ad mentions booking, the unaware reader is back to "not for me".

### Tested Advertising Methods (headlines and hooks)

- A headline that is only a label ("Panorama panel") promises nothing. Every panel headline needs a number or a benefit: "8 tests. One visit. GHS 1,100."
- "Free" plus a specific noun is the strongest headline device available to Campaign 2: "Free: the 8 numbers to know".
- Questions that imply the reader's condition are both policy risks and weak headlines. First-person questions ("Which health test do I need?") sidestep both.
- Flag: 27 characters is where a mobile headline stops truncating. Several drafts ran to 38; they were cut.

### Ogilvy on Advertising (main idea, proof, trust)

- Main selling idea for panels: "Know exactly where you stand, explained in plain English, within 72 hours." Every panel ad should carry that in the body.
- Proof is missing from most first drafts. Each ad now carries one specific proof line: turnaround, doctor review, GDPC, or home collection. Not all four; one, stated plainly.
- Treat the reader as intelligent. No "take control of your health", no exclamation marks, no scare framing.
- Flag: "number one killer of men" (from the site's own Alpha copy) is both a sensational-language risk on Meta and beneath the tone. Replaced with what clinicians recommend from 40.

### Scientific Advertising (offer, measurability, tests)

- The August offer failed partly because it was abstract. Both campaigns now put the deliverable and the price (or "free, 2 pages, 30 seconds") in the first 125 characters.
- One variable per test. Campaign 1 tests panel against panel (ad set = panel) and, inside each ad set, a product card against a statement hook. Campaign 2 tests magnet against magnet (ad set = magnet) and the same card-vs-hook split inside.
- Kill criteria written before spend: see the plan. `utm_content` carries the exact creative id so the site's analytics and Meta agree on what won.
- Flag: with a $10/day CBO budget the campaign cannot exit learning on `Lead` in week one. Judge it on cost per lead and lead-to-unlock rate, not on Meta's learning status.

### The Copywriter's Handbook (structure, clarity, CTA)

- Structure for every panel ad: promise with a number, what is inside, how it works, price with VAT note, friction reducer.
- Structure for every lead-magnet ad: hook, what the guide contains (concrete list), how to get it, what it is not ("no sales call").
- CTA buttons: Book Now for panels, Download for PDF guides, Get Started for the quiz. The description slot carries the friction reducer ("Home or lab collection", "2-page PDF").
- Flag: "Excl. VAT" must appear wherever a price appears. The site prices are exclusive of VAT and a surprised customer is a lost one.

### Influence (ethical persuasion)

- Campaign 2 runs on reciprocity: the guide has to be useful before any ask. The pages deliver the full guide immediately after the form, not "check your email".
- Commitment and consistency: the quiz asks seven small self-assessment questions; booking becomes the consistent next step. That is why the quiz reveals its result only after the WhatsApp number, and why the result screen shows the panel, price and tests.
- Authority replaces social proof, since there is no honest scale claim to make: doctor-reviewed, WHO/ADA/AHA ranges, GDPC certification.
- Flag: no fabricated "downloaded by 5,000 people". No countdown timers. No "only 3 slots left".

### Made to Stick (concreteness)

- Concrete beats abstract here: "HbA1c shows the last three months" beats "understand your blood sugar". "Malaria and typhoid share the same fever" beats "get tested when unwell".
- Unexpected but true: "A full body check-up is not always the answer. Sometimes the smarter first step is a GHS 45 single test." That line will do more for trust than any claim about thoroughness.
- Flag: every "your body is always talking" style abstraction was cut.

### Positioning (category, contrast)

- Category: health test panels booked online, results explained in plain English. Contrast: a hospital lab hands over a page of numbers; BetterHealth hands over an explanation and a trend.
- Sacrifice: BetterHealth is not a clinic and does not diagnose. The copy never pretends otherwise. That restraint is a positioning asset in a market full of overpromising.

### Compliance (Meta health and personal attributes)

- Every ad was rewritten to third-person or product-descriptive framing. "For people living with diabetes or prediabetes" describes who the guide is for; "if you have diabetes" is a violation and is absent.
- Negative and sensational words removed: killer, death, silent killer, damage, ruin, before illness strikes.
- Health verbs softened: "checks", "shows where things stand", "can pick up early signs".
- Disease names appear only in group statements with a cited source (Ghana Health Service surveys, IDF) or as the name of what a test measures.
- Landing pages carry the disclaimer, a privacy link, exit navigation, no auto-play, no fake urgency.

## Agreements

1. Offer and price in the first 125 characters, every ad, both campaigns.
2. One proof point per ad, specific.
3. No education in panel ads; no selling in lead-magnet ads.
4. Panel ad sets exclude Privara (sexual health: Meta policy risk, and the audience needs privacy the feed cannot give) and Spark (fertility: the personal-attributes line is hard to hold in a fertility ad, and the panel involves an ultrasound and semen analysis that need explaining on a page, not in a feed).
5. Headlines under 40 characters, ideally 27.

## Material disagreements, and how the Chair resolved them

**Long or short lead-magnet copy.** Breakthrough Advertising wants unaware readers educated at length before the ask. Tested Advertising Methods and the Handbook want the offer first and short. Resolved by position, not by averaging: the first 125 characters carry a one-line hook or the offer; everything educational sits below the "See more" fold where it costs nothing and rewards the reader who expands.

**Proof in every ad or in some.** Ogilvy wants proof everywhere. Made to Stick warns a proof line stacked on a benefit line is forgotten. Resolved: one proof point per ad, placed in the description slot or as the last line, never in the headline.

**Statement hooks on group statistics.** Influence and Compliance like the cited "1 in 3 adults in Ghana" line because it is true and third-person. Positioning worries it reads like a public-health poster rather than a product. Resolved: use it in primary text for the Heart Health Check and the blood pressure guide only, where it is directly relevant; never as a headline.

**Shield's name.** The panel is branded "Shield" and displayed as "Wellness Check", but it is a malaria and typhoid screen. Tested Advertising Methods wants the benefit ("malaria + typhoid, one test") in the headline; the message-match rule wants the page's h1 ("Wellness Check"). Resolved: headline carries both, "Wellness Check: malaria + typhoid". Flagged for product: the display name undersells the panel.

## Chair synthesis

Both campaigns share one voice. Panel ads work like shop windows: what is inside, what it costs, how fast, who reviews it. Lead-magnet ads are labelled gifts: what you get, how many pages, how many seconds, and what it is not. Neither campaign asks the reader to admit anything about themselves. Both carry one piece of proof and a price or a "free" in the first line.

Claims to verify before launch:
- Cardion vitals: blood pressure is measured at every visit (TestDetail `VITALS`), so "blood pressure measured at your visit" is true for lab and home collection. Confirm home-collection phlebotomists take BP.
- Dialics turnaround 24 to 48 hours and Shield same-day malaria RDT (from `test-details.js`).
- "No referral needed" (site FAQ).
- Prices in ads match `pricing-snapshot.json` at launch; re-run `scripts/build-pricing-snapshot.mjs`.

One test hypothesis per campaign:
- Campaign 1: a product card (tests + price) will beat a statement hook on cost per landing-page view for product-aware audiences. Metric: cost per LPV by `utm_content` suffix `-a` vs `-b` after 7 days.
- Campaign 2: the quiz will produce the cheapest leads, and the two condition-specific logs (blood sugar, blood pressure) will produce the highest unlock-to-panel-click rate. Metrics: cost per `Lead`, and `Lead` to `InitiateCheckout` rate per guide.
