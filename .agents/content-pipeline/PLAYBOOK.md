# BetterHealth Social Content Playbook

Use this workflow for every post batch, carousel, Reel concept, static post, story sequence, or campaign asset. The output is a reusable content kit, not just a draft caption.

## 1. Frame the Brief

Create `templates/content-brief.md` first. Decide:

- one audience and one post job: awareness, education, trust, conversion, or engagement;
- one core idea the audience should remember;
- one practical action or CTA;
- the relevant test, process, or service claim;
- evidence available and any clinical boundary.

Do not begin design until the post can be described in one clear sentence.

## 2. Route Through the Council

Read `../copywriting-council/README.md`, then select only the lenses the brief needs. Do not run every agent by habit.

Default social panel:

- `Tested Advertising Methods`: hook strength and first-slide stop power.
- `Breakthrough Advertising`: awareness, desire, and belief gap.
- `Ogilvy on Advertising`: credibility, detail, and trust.
- `The Copywriter's Handbook`: structure, usefulness, and CTA clarity.
- `Made to Stick`: concreteness and memorability.
- `Scientific Advertising`: proof gaps and a measurable next step.

Use `Positioning` when the post makes a category or brand claim. Use `Influence` when it relies on trust, social proof, authority, or an ethical persuasion question. For a small post, three lenses plus the Chair synthesis is enough.

Capture the review in `templates/council-review.md`. Keep disagreements that materially affect the work; the Chair chooses a direction and explains why.

## 3. Write the Content Kit

Use `templates/content-kit.md`. A complete kit includes:

- approved core message and guardrail;
- every slide or frame in reading order;
- caption and platform adaptations;
- CTA, comments/DM prompt, and story sequence where relevant;
- source links for medical or numerical claims;
- visual mode and visual direction;
- production paths and review status.

Save approved kits as `.agents/social-content/day-NNN-posting-kit.md`.

## 4. Pass the Health-Safety Gate

For health education:

- separate symptoms, risk factors, screening, and diagnosis;
- say what a test can help with and where it needs clinical context;
- do not turn a symptom list into a self-diagnosis;
- do not invent prevalence numbers, proof, testimonials, or results;
- include the standard urgent-symptom disclaimer on educational visual assets;
- record the primary sources used.

Read `../skills/bh-social-visual-system/references/copy-rules.md` before finalising the copy. It contains the current banned language and preferred BetterHealth phrasing.

## 5. Choose the Visual Mode

Read `../skills/bh-social-visual-system/SKILL.md` and select the mode before making a visual brief:

| Asset | Mode |
| --- | --- |
| Single image, offer, announcement, or trust message | Strict Brand Image |
| First slide or campaign opener | Scroll-Stopping Hero |
| Middle carousel education | Explainer / Educational Carousel |
| A person, a phone, booking, testing, or real-life moment | Real-Life Human Story |

Use the visual to explain the idea before the copy does. Generate backgrounds without text; add typography, logo, labels, legal copy, and CTA as a composed overlay. For human scenes, use photorealistic Ghana-market realism rather than illustration or luxury-stock settings.

## 6. Produce and Verify

Create the renderable source and final PNG in BetterHealth Media using the visual system. Inspect the rendered PNG, not only the source.

Before approval, verify:

- the hero explains the post in under five seconds;
- key copy and CTA are inside platform safe zones;
- medical visuals are realistic and every decorative object has a clear purpose;
- charts and timelines are internally correct;
- text does not cover the subject or data;
- carousel slides have one idea each and get calmer after the hero;
- the disclaimer, page indicator, logo, and CTA are readable.

## 7. Publish and Learn

Store the source, rendered output path, caption, and posting notes in the kit. After publishing, record saves, shares, comments, DMs, profile visits, link clicks, and booking clicks. Turn real audience questions into the next brief.

## Portable Prompt Starters

Use these with an agent that does not have access to the OpenAI Workspace Agents:

```text
Read .agents/content-pipeline/PLAYBOOK.md and .agents/copywriting-council/README.md.
Create a BetterHealth content brief for [topic]. Route it through the three most relevant book lenses, preserve material disagreement, then produce a Chair synthesis. Do not invent medical claims or sources.
```

```text
Read .agents/skills/bh-social-visual-system/SKILL.md and the relevant references.
Turn this approved BetterHealth content kit into a production brief for [Instagram carousel/story/static post]. Select the visual mode first, keep generated imagery free of text, and include a rendered-asset QA checklist.
```
