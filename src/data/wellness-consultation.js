// Content for the wellness-consultation paid campaign — four condition-specific
// landing variants (A/B/C/D). The cells are AUDIENCES, not copywriting styles:
// the campaign is testing whether there is traffic and whether there is felt
// need, so each cell has to be a different person, not a different technique.
//
// Full audience briefs, ad copy and the Meta personal-attributes constraint live
// in artifacts/wellness-consultation/ABCD_TEST.md. Every headline here has a
// matching ad; changing one without the other breaks message match, which is the
// most common cause of a healthy CTR with no bookings.
//
// Claims language follows .agents/skills/bh-social-visual-system/references/
// copy-rules.md — "can help", "useful clues", "needs context"; never "reveals",
// "proves" or "diagnoses".

// Section-two photography — what used to sit in the hero, before the hero slot
// was given over to the promo video.
import bloodSugarPhoto from "../assets/foundation/hero-screening.webp";
import bloodPressurePhoto from "../assets/foundation/what-we-do.webp";
import wellnessPhoto from "../assets/how-it-works/step-1-choose-test.jpg";
import fertilityPhoto from "../assets/how-it-works/step-4-next-steps.jpg";
// Hero video poster frames. PLACEHOLDERS: replace each with a still lifted from
// that cell's actual promo video, or the hero shows a photo of something the
// video isn't about.
import screeningPoster from "../assets/foundation/proof-screening.webp";
import dashboardPoster from "../assets/how-it-works/step-3-dashboard.jpg";
import involvedPoster from "../assets/foundation/get-involved.webp";
import planPhoto from "../assets/about/community-intake.jpg";
import consultPhoto from "../assets/about/community-conversation.jpg";

export const CONSULT_MINUTES = 20;
export const WHATSAPP_URL =
  "https://wa.me/233268596410?text=" +
  encodeURIComponent("Hi, I'd like to book a wellness consultation.");

// Shared imagery, used across every variant.
export const SHARED_IMAGES = {
  plan: { src: planPhoto, alt: "A BetterHealth consultant writing up notes at a community health session in Ghana." },
  consult: { src: consultPhoto, alt: "A BetterHealth consultant greeting a member at a community health screening in Accra." },
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED CONVERSION FURNITURE
//
// Everything in this block is identical across all four cells, on purpose. The
// test attributes differences to the AUDIENCE, so objection-handling, proof and
// trust have to be constants — if the reassurance differs between cells, a
// difference in bookings stops meaning anything.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The three objections that stop a booking. These used to sit in the hero; the
 * hero now leads with the promise instead, so they do their work at the point of
 * commitment, beside the picker.
 */
export const HERO_CHECKS = [
  "Paid for by the BetterHealth Foundation — the call and your plan cost you nothing",
  `${CONSULT_MINUTES} minutes, on Google Meet or an ordinary phone call`,
  "The written plan is yours to keep, either way",
];

/**
 * Sub-CTA microcopy. The hero copy says "free" nowhere else — not in the
 * headline, not in the sub, not in the button — and this is a free offer whose
 * single biggest objection is price. This line is what carries it above the fold.
 *
 * "No test required" was removed from here and from the rest of the page
 * furniture on Damzi's call. It sits badly with the problem-aware positioning:
 * these plans usually DO start with a baseline test, so leading on "no test
 * required" undersells the plan and sets up a jarring moment on the call. The
 * FAQ still answers "Do I have to do a test?" honestly — that's answering a
 * question the reader asked, not a promise the page volunteered.
 */
export const HERO_CTA_NOTE = `Free · ${CONSULT_MINUTES} minutes`;

/** Institutional trust, compressed into a strip, directly under the hero. */
export const TRUST_POINTS = [
  { icon: "flask", label: "Accredited partner labs" },
  { icon: "badge", label: "Licensed professionals" },
  { icon: "shield", label: "Ghana Data Protection certified" },
  { icon: "science", label: "Science-backed techniques" },
];

/**
 * Heading for the second section. Shared across cells: it names the offer, not
 * the condition, so the condition-specific argument underneath stays the only
 * thing that varies.
 */
export const PLAN_SECTION_HEADING = "A plan for wellness";

/**
 * Qualifying questions, asked AFTER the booking is confirmed — never before.
 *
 * This placement is the whole design and it is deliberate. The booking is the
 * conversion the campaign is measured on (landing→booking, and the Meta
 * `Schedule` event that ad delivery optimises against). Every field added ahead
 * of that button costs bookings, and it costs them from the people who are least
 * certain — which is exactly the group the campaign exists to find out about.
 *
 * Asked after the slot is taken, the same questions cost nothing. The person is
 * committed, they are looking at a confirmation screen with nothing else to do,
 * and there is at least a day before the call for a consultant to read the
 * answers.
 *
 * Content is Damzi's, taken from what the consultants actually want to know
 * walking into a call. Do not edit it to taste — if a question changes, it
 * changes because a consultant asked for it.
 *
 * `type`:
 *   choice  one-tap chips; `other: true` reveals a text field on "Other"
 *   text    single-line input
 *   longText textarea
 * `required` gates the Send button only. The whole form is still skippable —
 * the booking stands either way.
 *
 * `stage` splits them either side of the booking:
 *
 *   pre   asked BEFORE the picker. Three one-tap questions, no typing. They ride
 *         along in the booking POST, so they are saved at the same instant the
 *         slot is — there is no window in which someone has a booking and we
 *         have lost their answers.
 *   post  asked on the confirmation screen, best-effort. These are the ones with
 *         typing in them, which is exactly why they sit after the commitment.
 *
 * Moving a question between stages is a one-word edit here. Keep `pre` to three
 * and keep it tap-only: it sits in front of the conversion, and every question
 * added there is paid for in bookings.
 */
export const INTAKE_QUESTIONS = [
  {
    id: "condition",
    stage: "pre",
    type: "choice",
    label: "What is your condition?",
    options: ["Hypertension", "Diabetes", "Other"],
    other: true,
    otherPlaceholder: "Tell us what it is",
  },
  {
    id: "duration",
    stage: "pre",
    type: "choice",
    label: "How long have you been dealing with this?",
    help: "This helps us understand how the condition might have progressed.",
    options: [
      "Just diagnosed",
      "Under a year",
      "One to five years",
      "More than five years",
      "I haven't been diagnosed",
    ],
  },
  {
    id: "medication",
    stage: "post",
    type: "text",
    label: "Are you on any medication for it?",
    help: "Knowing what drugs you take helps in our preparation for the call.",
    // "None" has to be answerable in a free-text field, or the person not on
    // medication has nothing to type and skips the question entirely — which
    // reads identically to no answer at all.
    placeholder: "e.g. Amlodipine 5mg — or write “none”",
  },
  {
    id: "lastTest",
    stage: "post",
    type: "choice",
    label: "When did you last have a blood test done?",
    options: [
      "In the last 3 months",
      "3 to 12 months ago",
      "Over a year ago",
      "I'm not sure",
    ],
  },
  {
    id: "goal",
    stage: "post",
    type: "longText",
    label: "What would make this call worth your time?",
    help: "One line is plenty. This is the single most useful thing you can tell us.",
    placeholder: "e.g. I want to know whether I can come off the tablets eventually",
  },
  {
    id: "callPreference",
    stage: "post",
    type: "choice",
    label: "Would you prefer a video call or a phone call?",
    options: [
      "Video call me through the Google Meet invitation",
      "Call me on my phone number",
    ],
  },
  {
    id: "ageBracket",
    stage: "pre",
    type: "choice",
    label: "What age bracket is most applicable to you?",
    required: true,
    options: ["18-30", "31-40", "41-50", "51-59", "60+"],
  },
];

export const PRE_QUESTIONS = INTAKE_QUESTIONS.filter((q) => q.stage === "pre");
export const POST_QUESTIONS = INTAKE_QUESTIONS.filter((q) => q.stage === "post");

/**
 * Us-vs-them. The middle column is BetterHealth's own book-a-test funnel, which
 * is the honest comparison to draw — the campaign exists because picking a panel
 * off a price list is a decision most people aren't equipped to make. Stated
 * fairly rather than strawmanned, because the reader has met that column.
 */
export const COMPARISON = {
  columns: ["Carry on as you are", "Manage it on your own", "Start with a call"],
  rows: [
    { label: "Costs to start", cells: ["Nothing", "The price of whatever you pick", "Nothing"] },
    { label: "What it's based on", cells: ["What you were told once", "Guesswork", "Your numbers and your history"] },
    { label: "What you leave with", cells: ["The same uncertainty", "Scattered readings", "A written plan"] },
    { label: "How you know it's working", cells: ["You don't", "You hope", "A 90-day checkpoint"] },
    { label: "Who's watching it with you", cells: ["Nobody", "You, alone", "A consultant — and a doctor on any results"] },
  ],
  // Index of the column we're recommending — highlighted in the table.
  recommend: 2,
};

/**
 * Real member stories. These are members who TESTED with BetterHealth, not
 * consultation attendees — the consultation is new and has no testimonials yet,
 * and inventing them for a health brand is not on the table. The section frames
 * them for what they actually are: evidence that finding out early changes the
 * decision.
 *
 * Copied from `testimonials` in src/data/content.js rather than imported. The
 * import pulled that entire 24KB-gzipped module into this route's chunk for
 * three quotes, and this is a page bought by the click and opened on Ghanaian
 * mobile data. Keep the two in sync by hand if the published set changes.
 */
export const MEMBER_STORIES = [
  {
    name: "Ama K.",
    age: 34,
    location: "Accra",
    quote:
      "My doctor tested glucose. BetterHealth tested HbA1c and caught what she missed. I’m glad I checked.",
    discovery: "Pre-diabetes",
  },
  {
    name: "Kofi A.",
    age: 45,
    location: "Tema",
    quote:
      "My father had a stroke before he turned 63. I was on the same path and didn’t know it. The test caught me in time.",
    discovery: "Hypertension",
  },
  {
    name: "Maxwell A.",
    age: 34,
    location: "Cape Coast",
    quote:
      "My cholesterol number was fine. It just wasn’t the right number to be looking at. ApoB caught what nobody had thought to check.",
    discovery: "Cardiovascular risk",
  },
];

/**
 * Founder's own story, excerpted from the About page. Held identical across all
 * four cells, so the excerpt avoids naming a single condition.
 */
export const FOUNDER_QUOTE = {
  quote:
    "I watched my family lose people, one after another, to diseases the world already knows how to prevent. The science wasn't missing. The infrastructure was — the knowledge that saved my life had never reached the people I came from.",
  name: "Damzi",
  title: "Founder, BetterHealth Africa",
};

/** What every consultation produces, regardless of which door someone came in. */
export const PROMISE = [
  {
    title: "Where you actually stand",
    body: "What your numbers mean in plain English, which ones are worth tracking and which aren't — not test codes.",
  },
  {
    title: "Three things to work on",
    body: "Yours, from your call, not from a template. At least one you can start this week without spending anything.",
  },
  {
    title: "A 90-day checkpoint",
    body: "A date and a number to measure against, so you find out whether what you're doing is working rather than hoping it is.",
  },
];

/**
 * Every step is written as [what happens] + [so you …]. Lifted from One Medical,
 * whose benefit list never states a feature without the consequence attached —
 * "longer appointments so you don't feel rushed" rather than "45-minute
 * appointments". The reader doesn't have to do the translation, which is the
 * step where most of them stop reading.
 */
export const HOW_IT_WORKS = [
  { title: "Book a time", body: "Twenty minutes, on Google Meet or an ordinary phone call, so you don't have to travel or take a day off." },
  { title: "Talk it through", body: "What you've been told, what you've tried, and what's actually happening week to week — so the plan fits your life rather than a template." },
  { title: "Get your plan", body: "Written up and sent on WhatsApp within a day, so you can read it again, and show it to your doctor or your family." },
  { title: "Work the 90 days", body: "Most plans start with a baseline blood test, so you and your doctor can see where you're starting from — and so there's something to measure against later." },
];

/**
 * What the plan actually contains, as a scannable list rather than prose.
 *
 * Adapted from One Medical's "Get care today for …" block, which lists forty
 * conditions in one sight-line. The device works because the reader scans until
 * they find themselves, and the sheer length does the persuading. Ours answers
 * the question that decides a free-call booking — "twenty minutes on what,
 * exactly?" — and its length is the argument that this is more substantial than
 * a sales call.
 *
 * Keep every entry to something a consultant genuinely covers; the whole effect
 * collapses if a reader books expecting an item that never comes up.
 */
export const PLAN_COVERS = [
  "what you eat",
  "when you eat it",
  "your medication routine",
  "sleep",
  "movement that fits your week",
  "what to track at home",
  "which numbers to re-check",
  "how often to check them",
  "what to ask your doctor",
  "what to do if a number moves",
  "when to look again",
];

// Held identical across all four cells on purpose: if the reassurance differs,
// a difference in results stops being attributable to the audience.
export const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. The call and your written plan are paid for by the BetterHealth Foundation, not by you. Lab tests are charged separately, and only if you decide to do one.",
  },
  {
    q: "I'm already on medication. Is this for me?",
    a: "Yes — that's exactly who it's for. We don't start, stop or change any medication; that is between you and your doctor. What we do is build the system around it: what to track, what to change, and how to tell whether it's working.",
  },
  {
    q: "Do I have to do a test?",
    a: "No. The plan is yours either way. Most plans start with a baseline blood test, because that's how you stop guessing about whether anything is moving — but it's your call and it will keep.",
  },
  {
    q: "Is this a sales call?",
    a: "It's a health conversation that ends with a recommendation. We'll tell you what we think is worth checking and why, then leave you to decide. No pressure, and no chasing unless you ask us to.",
  },
  {
    q: "What will the tests cost if I do them?",
    a: "Most people start somewhere between GHS 350 and GHS 700, depending on what they need. Your consultant will give you the exact figure on the call and put it in writing.",
  },
  {
    q: "Who am I speaking to?",
    a: "A BetterHealth Wellness Consultant. They are not doctors and won't diagnose anything — if something needs a doctor, they'll say so. A doctor reviews any results you do have done.",
  },
];

export const CONSULTANTS = [
  { name: "Great Damzi" },
  { name: "Esther Forson" },
  { name: "Maame Esi" },
  { name: "Mawusi Clairette" },
];

export const DISCLAIMER =
  "General education only. This is not a diagnosis and does not replace advice from your own doctor. For severe or urgent symptoms, seek medical care.";

/**
 * The four cells. `variant` is written to `wellness_consultations.landing_variant`
 * so results can be split by page; `concern` pre-fills the booking form so the
 * consultant opens the call already knowing why the person came.
 *
 * Per-cell conversion fields, in the order they appear on the page:
 *
 *   heroSub    Short paragraphs, two at most. The hero has to be read on a phone
 *              in three seconds.
 *   hero       The promo video and its poster frame. `video.src` is null until
 *              that cell's video is recorded, and the poster carries the hero on
 *              its own until then — see HeroMedia.
 *   photo      The photograph that used to be the hero, now placed in the plan
 *              section where it breaks the argument at its emotional turn.
 *   agitate    lead → turn → paras → stats → cost. `turn` is the pivot from
 *              "the fear is reasonable" to "it needn't be your reality", and is
 *              optional: cells that argue their way there in prose omit it.
 *              `stats` are the site's published figures — no new numbers are
 *              invented here, and nothing is asserted about the reader.
 *   checklist  Self-qualification. The reader diagnoses themselves by ticking,
 *              which is both the highest-intent interaction on the page and the
 *              only policy-safe way to get specific about symptoms.
 *   belief     The false belief that has to die before a booking is possible,
 *              paired with what's actually true.
 */
export const VARIANTS = {
  "blood-sugar": {
    variant: "blood-sugar",
    concern: "Blood sugar / diabetes",
    eyebrow: "Get your health plan",
    h1: "Diabetes is not a death sentence",
    heroSub: [
      "Early detection and effective management can help you take back control of your blood sugar and live a long, healthy life. Our founder was told his own diabetes was in reversal within 18 months of his diagnosis.",
      "We will help you create a customised health plan that gives you back control over your health within 90 days.",
    ],
    hero: {
      vimeoId: null,
      poster: screeningPoster,
      alt: "A BetterHealth consultant running a free blood sugar screening in Ghana.",
    },
    photo: {
      src: bloodSugarPhoto,
      alt: "A man smiling during a free blood sugar screening at a BetterHealth community event in Ghana.",
    },
    agitate: {
      lead: "For most people, a diabetes diagnosis feels like a sentence being read out. Because they have watched it happen to somebody in their own family — the eyes, the kidneys, the foot that didn't heal — and they assume they are simply next in the queue.",
      turn: [
        "The fear is logical and understandable.",
        "But it doesn't have to be your reality.",
      ],
      paras: [
        "You do not have to spend the rest of your life waiting for complications if you have the right tools and systems to manage your blood sugar effectively.",
      ],
      stats: [
        { value: "3 months", label: "what an HbA1c reflects. A finger-prick reflects one minute." },
        { value: "18 months", label: "from our founder's own diagnosis to his doctors calling it reversal" },
      ],
      cost: "The damage from diabetes is done quietly, over years, by numbers nobody was watching. Waiting until you can feel it is waiting too long.",
    },
    checklist: {
      heading: "Does any of this sound familiar?",
      items: [
        "I've been diagnosed with diabetes, or told my blood sugar is high",
        "I was told to avoid sugar and starchy food, and not much more than that",
        "I don't know what my HbA1c is, or what it should be",
        "I check my sugar sometimes, and the numbers jump around without me knowing why",
        "Somebody in my family has lost their sight, a limb or their kidneys to this",
        "The diet advice I was given doesn't fit the food I actually eat",
      ],
    },
    belief: {
      myth: "“Once you have diabetes, you have it for life.”",
      truth:
        "Type 2 diabetes is not always permanent, and being told otherwise costs people years of effort they never saw the point of making. Our founder's own diabetes was in reversal within 18 months of his diagnosis. That is one person's outcome and we won't dress it up as a promise to you — what it shows is that the numbers move, and that they move in response to things you can act on. Whether yours do is a question for your doctor and your own results, not for a landing page.",
    },
    body: [
      {
        heading: "You were told what not to eat, in a country where that food is the food",
        paras: [
          "Avoid sugar. Cut down on starch. Ten seconds of advice given to somebody whose kitchen runs on banku, kenkey, rice and fufu — which is why it usually survives about a week.",
          "The useful version is specific: which of the things you already eat, how much of them, at what time of day, and what to put on the plate alongside them. That takes a conversation, and almost nobody is given twenty minutes to have one.",
        ],
      },
      {
        heading: "What we'd track, and why",
        paras: [
          "A finger-prick tells you what your blood sugar is doing this minute, which is why the readings jump around and why they're so easy to dismiss. An HbA1c gives a three-month average — the number that actually reflects where things have been sitting, and the one most people have never been shown.",
          "It needs context, read alongside your history and anything else that's going on, and a doctor reads it that way rather than on its own. But it is the difference between managing this and guessing at it.",
          "Your consultant will explain what each one looks at before you decide anything, and what it costs.",
        ],
      },
    ],
    panel: { name: "Dialics", displayName: "Blood Sugar Check", price: "GHS 350" },
  },

  "blood-pressure": {
    variant: "blood-pressure",
    concern: "Blood pressure / heart",
    eyebrow: "Get your health plan",
    h1: "High blood pressure is not a death sentence",
    heroSub: [
      "Early detection and effective management can help you reverse high blood pressure and live a long, healthy life.",
      "We will help you create a customised health plan that gives you back control over your health within 90 days.",
    ],
    hero: {
      // TO ADD THE PROMO VIDEO: paste the Vimeo ID here (the digits in
      // vimeo.com/123456789). Nothing else changes — the play button and the
      // player appear on their own, and the poster carries the hero until the
      // visitor presses play. Swap `poster` for a still from the video at the
      // same time, or the hero advertises a photo of something else.
      vimeoId: null,
      poster: screeningPoster,
      alt: "A BetterHealth consultant taking a blood pressure reading at a community screening in Ghana.",
    },
    photo: {
      src: bloodPressurePhoto,
      alt: "A BetterHealth nurse running a free health screening for a woman at a community event in Ghana.",
    },
    agitate: {
      lead: "For most people, being diagnosed with something like high blood pressure or high cholesterol feels like a death sentence. Because they have seen others diagnosed with the same thing go on to have a stroke or a heart attack, and die shortly after.",
      turn: [
        "The fear is logical and understandable.",
        "But it doesn't have to be your reality.",
      ],
      paras: [
        "You do not have to live with high blood pressure for the rest of your life if you have the right tools and systems to manage your health effectively.",
      ],
      stats: [
        { value: "1 in 3", label: "Ghanaian adults has high blood pressure" },
        { value: "No symptoms", label: "High blood pressure is often silent until it gets worse" },
      ],
      cost: "Waiting to feel sick before you act is a strategy that only works for conditions that can be felt. High blood pressure isn't one of them.",
    },
    checklist: {
      heading: "Does any of this sound familiar?",
      items: [
        "I've been told my blood pressure is high",
        "I was given tablets and not much else",
        "Nobody has explained what my numbers should be, or how often to check them",
        "Some days I take my medication, some days I forget",
        "I've cut salt and tried herbal remedies without knowing whether they helped",
        "I couldn't tell you whether my pressure is better or worse than a year ago",
      ],
    },
    belief: {
      myth: "“Once you're on pressure tablets, that's you for life.”",
      truth:
        "For some people it is, and we won't pretend otherwise — that is your doctor's call, and it depends on what your numbers actually do. What's true for almost everyone is that those numbers respond to what happens between appointments, and most people were never given a way to see it. Whether your dose ever changes is up to your doctor. Whether you walk into that appointment with three months of evidence is up to you.",
    },
    body: [
      {
        heading: "You were given a diagnosis, not a plan",
        paras: [
          "The diagnosis took ten minutes. A prescription, a word about salt, and a follow-up in three months. The management is the rest of your life, and nobody handed you a system for it.",
          "That gap isn't medical. The treatment exists, and your doctor wasn't wrong. It's that nobody is paid to sit with you for twenty minutes and turn “watch your pressure” into something you could actually do on a Tuesday.",
        ],
      },
      {
        heading: "What we'd track, and why",
        paras: [
          "A single reading is one moment on one morning. What tells you something is the pattern — the same measurement, taken the same way, often enough to show a direction. That is the part almost nobody is doing, and starting costs nothing.",
          "Alongside it, cholesterol and the related markers give useful clues about cardiovascular risk that a pressure cuff can't. A reading outside the reference range needs context before anyone draws a conclusion, which is why a doctor reads your results alongside your history rather than on their own.",
          "Your consultant will explain what each one looks at before you decide anything, and what it costs.",
        ],
      },
    ],
    panel: { name: "Cardion", displayName: "Heart Health Check", price: "GHS 475" },
  },

  wellness: {
    variant: "wellness",
    concern: "General wellness / low energy",
    eyebrow: "Get your health plan",
    h1: "Being tired all the time is not normal",
    heroSub: [
      "Constant tiredness, poor sleep and weight that won't shift usually have causes that can be measured. Most people get treated for what it looked like, without anyone testing for what it actually is.",
      "We will help you create a customised health plan that gives you back control over your health within 90 days.",
    ],
    hero: {
      vimeoId: null,
      poster: dashboardPoster,
      alt: "The BetterHealth dashboard showing a member's health results over time.",
    },
    photo: {
      src: wellnessPhoto,
      alt: "A woman in Ghana booking a health consultation on her phone at home.",
    },
    agitate: {
      lead: "For most people, feeling run down for months on end turns into a routine. Another course of antimalarials. Another box of supplements bought on somebody's advice. Another week of promising yourself an early night. Nobody measures anything, so nothing ever changes.",
      turn: [
        "The tiredness is real, and it isn't laziness.",
        "But it doesn't have to be your normal.",
      ],
      paras: [
        "You do not have to spend another year guessing if you have the right tools and systems to find out what is actually going on.",
      ],
      stats: [
        { value: "70%", label: "of diabetes cases in Africa are undiagnosed" },
        { value: "25%", label: "of adults globally have fatty liver disease, and most don't know" },
      ],
      cost: "Another year of being told it's stress is another year of not knowing. The tiredness will still be there — you will just be twelve months further into whatever is causing it.",
    },
    checklist: {
      heading: "Does any of this sound familiar?",
      items: [
        "I'm tired most days, no matter how much I sleep",
        "I've been treated for malaria or typhoid more than once for the same tiredness",
        "I was told my tests were “normal”, but nobody explained what was actually checked",
        "I've gained weight I can't shift, or lost weight I can't explain",
        "I've bought supplements without knowing whether I needed them",
        "I couldn't name a single one of my health numbers",
      ],
    },
    belief: {
      myth: "“The doctor said I'm fine, so there's nothing to find.”",
      truth:
        "“Fine” usually means nothing showed up on what was tested — which is a narrower statement than it sounds, because the commonest reason for a normal result is a test that was never ordered. Persistent tiredness has a long list of measurable causes and a short consultation gets through two or three of them. Knowing which have actually been ruled out, and which have simply never been looked at, is where this starts.",
    },
    body: [
      {
        heading: "You were treated for what it looked like, not tested for what it is",
        paras: [
          "In Ghana, persistent tiredness has a well-worn path: treated as malaria, then as typhoid, then as stress. Sometimes that is exactly right. When it isn't, the cycle repeats for years — and each round costs money and buys no information.",
          "The alternative isn't exotic. It's ordering the ordinary blood work that would separate those possibilities, and reading it against how you actually live.",
        ],
      },
      {
        heading: "What we'd look at, and why",
        paras: [
          "Kidney function, liver function, a full blood count and an HbA1c — the unglamorous markers a doctor would want in front of them before putting months of tiredness down to stress. None of them is a diagnosis on its own; each gives useful clues that need context, read alongside your history.",
          "Your consultant will explain what each one looks at before you decide anything, and what it costs.",
        ],
      },
    ],
    // Was Shield (GHS 497) — which the catalogue displays as "Wellness Check" but
    // is actually a fever/infection screen: malaria RDT, typhoid Widal, CRP, FBC.
    // Right for somebody with a fever this week, wrong for somebody tired for six
    // months, and the display name is what made it look correct. Metabolix is the
    // panel whose contents match what this page argues for.
    panel: { name: "Metabolix", displayName: "Core Health Check", price: "GHS 697" },
  },

  fertility: {
    variant: "fertility",
    concern: "Trying to conceive",
    eyebrow: "Trying to conceive",
    h1: "Fertility testing usually starts with the woman. It doesn't have to.",
    heroSub: [
      "In around half of cases there's a male factor involved, and it's one of the more straightforward things to check. Twenty minutes on the phone, for both of you, and you'll know what's worth checking and in what order.",
    ],
    hero: {
      vimeoId: null,
      poster: involvedPoster,
      alt: "A BetterHealth consultant talking with a couple at a community health session in Ghana.",
    },
    photo: {
      src: fertilityPhoto,
      alt: "A BetterHealth consultant going through a health plan with a member on a tablet in Ghana.",
    },
    agitate: {
      lead: "In around half of cases there's a male factor involved, and it's one of the more straightforward things to check. Starting with both of you gets to a clearer picture, sooner.",
      paras: [
        "The questions land on the woman. The advice nobody asked for lands on the woman. The tests, when they finally happen, land on the woman. And one of the simplest, quickest things to check gets left until last, or never gets checked at all.",
        "Meanwhile the months go by in a cycle you've stopped describing to anyone, and the herbal preparations and the timing apps and the waiting have not produced a single piece of information you can act on.",
      ],
      stats: [
        { value: "~50%", label: "of cases involve a male factor" },
        { value: "1 test", label: "a semen analysis — simple, quick, and usually left until last" },
      ],
      cost: "Another year of not knowing is the one outcome that's guaranteed if nothing gets checked.",
    },
    checklist: {
      heading: "Does any of this sound familiar?",
      items: [
        "We've been trying for a year or more",
        "Only one of us has been tested — or neither of us",
        "We've tried timing, herbs, prayer, or all three",
        "Nobody has explained what's actually worth checking, or in what order",
        "We'd rather have a shorter list of possibilities than no list at all",
      ],
    },
    belief: {
      myth: "“Is it me?”",
      truth:
        "Nobody can answer that from the outside, and anyone offering to is guessing. What testing does is narrow it down — and it narrows down considerably faster when both people are checked rather than one. That's the whole reason we suggest starting together. We won't tell you a test produces a baby, because it doesn't.",
    },
    body: [
      {
        heading: "What the plan covers for a couple",
        paras: [
          "Your consultant will talk through where things stand and put together a written plan covering what's worth checking, in what order, and what each part costs. For most couples that includes a semen analysis early rather than last, because it's simple, quick and answers a large question.",
          "You can book the call together or separately — whichever is easier.",
        ],
      },
      {
        heading: "What we can't tell you",
        paras: [
          "We can't tell you why it hasn't happened yet, and we won't pretend a test will. What tests give are useful clues that need reading in context, by a doctor, alongside everything else about your health. Some couples get a clear answer. Some get a shorter list of possibilities. Both are more than you have now, and neither is a promise.",
        ],
      },
    ],
    panel: { name: "Spark", displayName: "Fertility Test", price: "GHS 1,500" },
  },
};

export const VARIANT_SLUGS = Object.keys(VARIANTS);
