# Wellness Consultation — Hero Video Scripts

**For:** the promo video in the hero slot of each landing page
**On camera:** Damzi, founder
**Runtime:** 1:50–2:00 per cut
**Companion docs:** `ABCD_TEST.md` · `CONSULTATION_SCRIPT.md`

---

## How this is built: shoot the middle once

All three videos share the same middle. Only the **hook** and the **tail** name a
condition — the fear, the UK contrast and why BetterHealth exists work on every
page.

So this isn't three scripts. It's **one core, three hooks, three tails.**

| | Blood pressure | Diabetes | Tiredness |
|---|---|---|---|
| Hook | own | own | own |
| **Block A** — the fear | shared | shared, one line swapped | **not used** |
| **Block B** — the UK contrast | shared | shared + caveat | own variant |
| **Block C** — why BetterHealth | shared | shared | shared |
| Tail | own | own | own |

Shoot Blocks A, B and C first, while you're warm, and get them right once. Then
three hooks and three tails. Three edits, one core performance — and the
performance improves with each retake instead of getting tired.

**Timings assume 140 words a minute**, natural and unhurried. If a take runs
long, cut Block C. Never cut the last fifteen seconds.

---

## Rules that apply to every cut

**You are not a doctor on camera.** Never imply the plan treats or replaces
medical care, and never suggest anyone change, stop or delay medication. The line
"we won't touch your medication — that stays between you and your doctor" is in
every tail on purpose. Keep it.

**"Can help", never "will".** The pages hedge these claims carefully and the
video has to match.

**Never promise a life free of the condition.** "A plan to live a life not
defined by hypertension" is about agency and is fine. "A path to a life free of
hypertension" is a cure claim and is not. The difference is one word and it's the
difference between a campaign and a disabled ad account.

**The Foundation line is confirmed for the consultation only.** "The call is paid
for by the BetterHealth Foundation" is in every tail. Do **not** extend it to lab
tests on camera — the same pages quote GHS 350–697 panel prices and the FAQ says
most people start between GHS 350 and GHS 700. If that's changing, the pages have
to change first.

**If you re-cut any of this as an ad creative, the hook must change.** Meta's
personal-attributes policy bars ads that assert or imply the viewer's health
condition. On the landing page "if you've been told your blood pressure is high"
is fine — they clicked an ad about it. In the ad itself, open on the group.
Ad-safe alternates are given under each hook.

**Shoot for muted viewing.** Burn in captions.

---

## Production notes

| | |
|---|---|
| **Aspect** | 16:9 landscape — the hero slot is `aspect-video`. Shoot vertical separately if you want it; don't crop this. |
| **Framing** | Mid-shot, eyes to camera, natural light. The page argues nobody gives you twenty minutes of attention — a corporate-looking film undercuts it. |
| **Wardrobe** | What you'd wear to the call itself. Not a lab coat: consultants aren't clinicians and the page says so. Same outfit for all three, or the shared core won't cut together. |
| **Continuity** | Same shirt, same location, same time of day across all takes. The core is reused across three videos and any change of light or wardrobe makes that obvious. |
| **Audio** | Lapel mic. Phone camera is fine; phone audio is not. |
| **First frame** | Two seconds of stillness at the top of every take. That frame becomes the poster image — currently a placeholder photo. |
| **Delivery** | Learn the beats, not the words. Say it your own way. |

**Files:** `public/videos/blood-pressure.mp4`, `diabetes.mp4`, `wellness.mp4`.
Then in `src/data/wellness-consultation.js` set that cell's
`video: { src: "/videos/<name>.mp4" }` and swap `poster` for the still. Nothing
else changes.

---

# THE SHARED CORE

## Block A — the fear, and why it's universal · ~33s

*Used on blood pressure and diabetes. Not on the tiredness cut — there's no
diagnosis moment there.*

> My name is Damzi. I founded BetterHealth Africa.
>
> A few years ago I was diagnosed with type 2 diabetes. So I know what that room
> feels like. The moment somebody tells you your body will never quite be the
> same again.
>
> You walk out wondering what the next ten years look like. And your mind goes
> straight to the worst of it.
>
> **[blood pressure]** I've been there. The diagnosis differs. The fear is identical.
> **[diabetes]** I've been there. So I'm not going to pretend I can imagine what you're feeling. I know exactly what you're feeling.

*This is the heart of the video. Slow down. Don't perform it.*

## Block B — the decision, and the UK contrast · ~27s

> I decided it wasn't going to define me. I didn't want to just manage it. I
> wanted to reverse it. And for that, I needed a plan.
>
> I was in the UK when I was diagnosed, and the system there was built for exactly
> that. Within eighteen months my doctors told me my diabetes was in reversal.
> It's still in remission today.
>
> **[diabetes only — do not cut this]** I want to be careful here, because this is
> exactly where people get sold things that aren't true. That is my outcome. It is
> not a promise to you. What it does show is that these numbers move — and that
> they move in response to things you can actually do something about.
>
> If you're watching this in Ghana, that system doesn't exist. Nobody hands you one.

## Block C — why BetterHealth exists · ~16s ⟨cut first if long⟩

> That's why I built BetterHealth Africa. For people like us. People who won't be
> defined by a disease, and won't hand their life to the fear of it.
>
> For people who have something to live for.

---

# 1 · Blood pressure

**Page:** `/wellness-consultation/blood-pressure` · **1:50** · 258 words

### Hook · 0:00–0:12

> If you've been told your blood pressure is high, you were probably handed a
> prescription and a warning about salt. And that was more or less it.

**Ad-safe alternate:** *Most people diagnosed with high blood pressure are given
tablets and a warning about salt, and not much else.*

### Blocks A → B → C

### Tail · ~1:26–1:50

> On your wellness call, one of our trained consultants helps you build a plan to
> live a life not defined by hypertension — what to track, what to change, and a
> date ninety days out to measure against.
>
> We're not doctors, and we won't touch your medication. That stays between you
> and your doctor. What we give you is the system nobody gave you.
>
> The call is paid for by the BetterHealth Foundation. All you have to do is show
> up and give us twenty minutes.
>
> Pick a time on this page.

---

# 2 · Diabetes

**Page:** `/wellness-consultation/blood-sugar` · **2:00** · 285 words

> On this page your story stops being a bridge and becomes the direct evidence.
> That's why Block B carries the "not a promise" caveat here and nowhere else. If
> a take runs long, cut Block C.

### Hook · 0:00–0:12

> If you've been diagnosed with diabetes, somebody in your family has probably had
> it too. And you've watched how that went.

**Ad-safe alternate:** *Most people diagnosed with diabetes in Ghana have watched
a relative go through it first. That's what makes it frightening.*

### Blocks A → B → C

*Use the **[diabetes]** variant line in Block A, and keep the caveat in Block B.*

### Tail · ~1:34–2:00

> On your wellness call, one of our trained consultants helps you build a plan to
> live a life not defined by diabetes. And I mean specific — not "avoid sugar".
> Which of the things you already eat, how much of them, what time of day. What to
> track. And a number that tells you whether any of it is working, because most
> people have never even been shown their HbA1c.
>
> We're not doctors, and we won't touch your medication. That stays between you
> and your doctor.
>
> The call is paid for by the BetterHealth Foundation. All you have to do is show
> up and give us twenty minutes.
>
> Pick a time on this page.

---

# 3 · General wellness / constant tiredness

**Page:** `/wellness-consultation/wellness` · **1:52** · 262 words

> Different audience: no diagnosis, just a symptom nobody has taken seriously.
> Block A doesn't apply — there was no appointment and no diagnosis moment. The
> emotional job here is **permission**, and Block B gets its own opening so the
> UK contrast still lands.

### Hook · 0:00–0:12

> If you're tired all the time — and you've been treated for malaria more than
> once for the same tiredness — I want to tell you something nobody told me.

**Ad-safe alternate:** *In Ghana, being tired all the time usually gets treated as
malaria. Then as typhoid. Then as stress.*

### Permission · 0:12–0:28 *(replaces Block A)*

> Being tired every day is not normal. It isn't laziness, and it isn't just
> stress, or traffic, or getting older. It usually has a cause. And the cause can
> be measured.

*Slow right down. This is the line the whole video exists to deliver.*

### Block B — variant opening · 0:28–0:55

> My name is Damzi, I founded BetterHealth Africa. A few years ago I was
> diagnosed with type 2 diabetes. I was in the UK at the time, and the system
> there was built to actually find things — and then to help you do something
> about them. Within eighteen months my doctors told me my diabetes was in
> reversal. It's still in remission today.
>
> If you're watching this in Ghana, that system doesn't exist. Which is why, when
> you've been tired for months, it gets treated as malaria, then as typhoid, then
> as stress — and nobody ever measures anything.

### Block C · 0:55–1:11

### Tail · ~1:11–1:52

> And if you've already been told your tests were normal — normal means nothing
> showed up on what was tested. The most common reason for a normal result is a
> test nobody ordered.
>
> On your wellness call, one of our trained consultants helps you build a plan to
> find out what's actually going on — what's worth checking, what it costs, and a
> date ninety days out to measure against.
>
> We're not doctors, and nothing on that call replaces yours.
>
> The call is paid for by the BetterHealth Foundation. All you have to do is show
> up and give us twenty minutes.
>
> Pick a time on this page.

---

## Not written yet

**Fertility** (`/wellness-consultation/fertility`) has no script: the page is
still on the old early-detection positioning and hasn't been decided on. It also
needs the most careful handling of the four — that audience has been sold hope by
people with no business selling it, so the script must promise nothing and must
never imply testing produces a baby. Don't shoot it on the same day; it wants a
different register entirely.

---

## Open question before the shoot

You said the Foundation pays for **the tests as well as the consultations**. Only
the consultation half is in these scripts and on the pages, because the same
pages quote GHS 350 / 475 / 697 panel prices and the FAQ says most people start
between GHS 350 and GHS 700.

If tests really are Foundation-funded, the pricing on all four pages is wrong and
needs to change before anything mentions it — and it would change the campaign
economics in `WELLNESS_CONSULTATION_CAMPAIGN_PLAN.md`, which is built on panel
contribution margin. Worth settling before you're on camera saying it.
