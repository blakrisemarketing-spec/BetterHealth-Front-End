---
name: bh-social-visual-system
description: BetterHealth Africa social visual production system. Use when creating or improving BetterHealth social media images, Instagram feed posts, Instagram stories, carousels, educational explainers, health-test visuals, carousel hero slides, CTA graphics, announcement graphics, or lifestyle/patient-scene social assets. Covers visual-mode selection, brand rules, photorealistic medical imagery, Ghana-market realism, safe zones, copy guardrails, HTML/CSS composition, and render verification.
---

# BetterHealth Social Visual System

## Core Rule

Choose the visual mode before designing. Do not force every BetterHealth image into the dramatic explainer style.

Keep generated imagery and text separate:
- Generate or select bitmap imagery for the scene/background.
- Add all important copy, badges, logos, disclaimers, and CTAs in HTML/CSS.
- Render to final PNG only after checking safe zones and readability.

## Visual Mode Decision

Use **Strict Brand Image** for single-image posts, announcements, CTAs, offer/service promos, trust-building cards, quote cards, and simple educational posts.

Use **Explainer / Educational Carousel** for multi-slide health education, test explainers, biomarker explainers, symptom-to-test education, and "what this result can/cannot show" content.

Use **Real-Life Human Story** for patient moments, phone searches, booking, home testing, results reading, care conversations, and any asset where a human action is the story.

Use **Scroll-Stopping Hero** for first carousel slides or campaign openers whose job is to make someone stop in the feed.

If unsure:
- Single post -> Strict Brand Image.
- First slide of carousel -> Scroll-Stopping Hero.
- Middle explainer slide -> Explainer / Educational Carousel.
- Human behavior or phone scene -> Real-Life Human Story.

## Mode Rules

### Strict Brand Image

Use the clean BetterHealth brand system:
- Warm cream canvas.
- BetterHealth logo prominent.
- Quicksand only.
- Sage as primary accent.
- Minimal visual noise.
- Clear hierarchy and generous safe-zone margins.
- Plain cream or subtle brand texture/pattern is allowed.
- Do not use cinematic medical macro backgrounds unless the concept truly requires it.

### Explainer / Educational Carousel

Use "show, not tell":
- Make the visual explain the concept before the copy is read.
- Use realistic medical visuals for blood, cells, organs, biomarkers, and test domains.
- Background may be full-frame, patterned, or cinematic.
- Slides should feel like one complete image, not icons pasted on cards.
- Use labels, pills, cards, and CTAs sparingly as HTML overlays.
- Keep the logo, Quicksand, safe zones, and medical disclaimer.

### Real-Life Human Story

Use humans to represent humans:
- Use real photography or photorealistic people.
- Never use abstract, line-art, cartoon, vector, or symbolic people.
- For Ghana-market realism, make scenes lived-in: modest rooms, ordinary objects, books/pens/chargers, clothes on a chair, real texture, not luxury-stock interiors.
- When a phone/screen is important, use overhead or over-the-shoulder composition so the screen angle is believable.
- Keep the person and relevant action centered enough that the room supports the story instead of stealing focus.

### Scroll-Stopping Hero

Loosen normal brand restraint for attention:
- The only strict requirements are logo presence, Quicksand text, and safe-zone readability.
- Use dramatic realistic visuals, high contrast, black/red if useful, or strong medical macro scenes.
- Use little text; make the visual metaphor obvious in under five seconds.
- Hero must be shareable as a standalone image.

## Workflow

1. Read the content kit or user-provided copy.
2. Classify the asset type and choose a visual mode.
3. Read only the relevant reference:
   - `references/visual-modes.md` for design rules and layouts.
   - `references/copy-rules.md` for BetterHealth copy guardrails.
   - `references/image-prompts.md` before generating medical or lifestyle imagery.
4. Locate the BetterHealth Media repo when rendering project assets:
   `/Users/greatdamzi/Documents/01. GitHub/BetterHealth-Media`
5. Generate or select background imagery if the mode needs it. Save project-bound assets under the relevant Media `content/social-images/.../assets/` folder.
6. Create or update the HTML source using an existing nearby slide/post as the first pattern, or use `assets/templates/social-slide.html` as a starting template.
7. Render with `scripts/render-bh-social-still.mjs` or the Media renderer directly.
8. Inspect the PNG visually. Check:
   - important text is inside safe zones;
   - text does not overlap cells, people, or UI;
   - humans look human and real;
   - medical visuals are realistic, not flat illustrations;
   - disclaimer and page indicator are readable;
   - rendered dimensions match the target platform.
9. Iterate, then report source and output paths.

## Defaults

Instagram feed/carousel: `1080x1350`.

Instagram story: `1080x1920`; keep key message and CTA away from top/bottom platform UI.

Standard feed safe zone: keep key text roughly `80-100px` from all canvas edges.

Story safe zone: treat top and bottom `~250px` as secondary-only zones.

## Render

Use:

```bash
node /Users/greatdamzi/Documents/01.\ GitHub/BetterHealth-Front-End/.agents/skills/bh-social-visual-system/scripts/render-bh-social-still.mjs <input-html> <output-png> 1080 1350
```

Run from the BetterHealth Media repo unless using absolute paths.

The helper delegates to:
`/Users/greatdamzi/Documents/01. GitHub/BetterHealth-Media/scripts/render-social-still.mjs`

## Medical Safety

Do not imply a test diagnoses everything by itself. Use careful language:
- "can help"
- "useful clues"
- "starting point"
- "needs context"
- "understand your results"
- "with symptoms, history, medicines, and other tests where needed"

Keep severe/urgent symptom disclaimers on health education assets:
`General education only. For severe or urgent symptoms, seek medical care.`
