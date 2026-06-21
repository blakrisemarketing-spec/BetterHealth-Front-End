---
name: bh-humanizer
description: >
  Make BetterHealth Africa SEO/blog content read like a human wrote it, not an AI.
  Use this on EVERY piece of campaign copy before it ships — new blog articles,
  programmatic pages, meta descriptions, rewrites. Trigger on: "humanise this",
  "remove the AI tells", "this sounds too AI", "de-slop", "em dashes", "make it
  sound human", or any time you draft or edit public marketing/SEO copy. Strips the
  em-dash tell and AI phrasing patterns while keeping medical accuracy and the
  caution health content needs.
---

# BetterHealth Humanizer

Campaign copy should read like a careful Ghanaian health writer wrote it, not a
language model. This skill is the editorial pass every piece of SEO/blog content
passes before publishing. It builds on the `stop-slop` skill (run that first for the
full pattern list); the rules below are the BetterHealth-specific layer.

## The non-negotiables

1. **No em dashes.** Never use the spaced em dash (` — `) as a dramatic pause. Use a
   full stop, a comma, a colon, or parentheses. This is the single most obvious AI
   tell and the reason this skill exists.
2. **No en-dash number ranges in prose.** Write "two to three months", "8 to 12
   hours", "ages 18 to 39", not "2–3 months". (Inside data graphics/tables a normal
   hyphen is fine.)
3. **Cut the AI phrasing patterns** from `stop-slop`: throat-clearing openers
   ("Here's what…", "It turns out…"), the "not X, it's Y" / "isn't X, it's Y"
   contrast, empty adverbs ("actually", "simply", "really"), false agency ("the data
   tells us", "the complaint becomes a fix"), vague declaratives ("the implications
   are significant"), and metronomic rhythm. State the point directly.
4. **Active voice, named actors.** "A clinician should confirm it" beats "it should
   be confirmed". "You" beats "people".
5. **Vary the rhythm.** Mix short and long sentences. Do not stack three
   same-length sentences or end every paragraph on a punchy one-liner.

## Health-content guardrails (where this differs from generic de-slopping)

These are NOT AI slop and must stay. Do not "humanise" them away:

- **Clinical caution.** Words like "may", "can", "often", "usually", "in some
  people", "talk to your doctor", "guided by a clinician" are correct medical
  hedging, not weak writing. Keep them.
- **The disclaimer block.** Every health article keeps its educational disclaimer.
- **Factual lists.** A list of seven screening tests or three HbA1c bands is data,
  not a rhetorical tricolon. `stop-slop`'s "two beats three" rule does NOT apply to
  factual enumerations. Keep them complete and accurate.
- **Numbers, ranges, units, citations.** Never change a statistic, threshold, unit,
  or source to fit the prose. Accuracy outranks style every time. If a sentence
  can't be smoothed without bending a fact, leave the fact and smooth around it.
- **Formal research reports** (e.g. the preventable-diseases report authored by named
  clinicians) keep their academic voice. Remove em dashes there too, but do not make
  a cited research report sound casual.

## Procedure

1. Run the `stop-slop` checklist over the draft.
2. Search the text for ` — ` and `–` and remove/replace every one.
3. Re-read for the BetterHealth guardrails above: did the de-slop pass strip any
   clinical caution, factual list item, number, or disclaimer? Put it back.
4. Read it aloud in your head. If a sentence sounds like a pull-quote or a LinkedIn
   post, rewrite it plainly.
5. Quick self-score (`stop-slop` rubric). Below 35/50, revise again.

## Fast check before shipping any article

- `grep` the article file for em dashes: there should be zero ` — ` in prose.
- No "Here's what / it turns out / the truth is" openers.
- No "not X, it's Y" reversals.
- Adverbs like "actually / simply / really / genuinely" gone.
- Medical hedging and the disclaimer intact.
- Sentence lengths vary.
