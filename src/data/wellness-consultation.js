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

import bloodSugarHero from "../assets/foundation/hero-screening.webp";
import bloodPressureHero from "../assets/foundation/what-we-do.webp";
import wellnessHero from "../assets/how-it-works/step-1-choose-test.jpg";
import fertilityHero from "../assets/how-it-works/step-4-next-steps.jpg";
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

// What every consultation produces, regardless of which door someone came in.
export const PROMISE = [
  {
    title: "Where you are now",
    body: "An honest starting point, including what's worth checking and why — in plain English, not test codes.",
  },
  {
    title: "Three things to work on",
    body: "Yours, from your call, not from a template. At least one you can start this week without spending anything.",
  },
  {
    title: "A date to check back",
    body: "So this is a plan you're following, rather than a document you read once and forget.",
  },
];

export const HOW_IT_WORKS = [
  { title: "Book a time", body: "Pick a slot that suits you. Twenty minutes, on Google Meet or an ordinary phone call." },
  { title: "Talk it through", body: "What's on your mind, what's changed, and what runs in your family." },
  { title: "Get your plan", body: "Written up and sent to you on WhatsApp within a day." },
  { title: "Take the first step", body: "Usually blood work, so a doctor can go through the results with you and we can update the plan around what turns up." },
];

// Held identical across all four cells on purpose: if the reassurance differs,
// a difference in results stops being attributable to the audience.
export const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. The call and your written plan cost nothing. We charge for lab tests, and only if you decide to do one.",
  },
  {
    q: "Do I have to do a test?",
    a: "No. The plan is yours either way. Most plans include blood work because that's how you stop guessing, but it's your call and it will keep.",
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
 */
export const VARIANTS = {
  "blood-sugar": {
    variant: "blood-sugar",
    concern: "Blood sugar / diabetes",
    eyebrow: "Blood sugar",
    h1: "The years before diabetes are the years that matter",
    lede: "Most people find out late, once something has already gone wrong. But there's a long stretch before that, where the numbers are moving and very little has been decided. If you're in it, that's the most useful thing you could know right now.",
    hero: {
      src: bloodSugarHero,
      alt: "A man smiling during a free blood sugar screening at a BetterHealth community event in Ghana.",
    },
    unspoken: {
      q: "Will I have to be on medication for the rest of my life?",
      a: "That's a question for a doctor, and the honest answer is that it depends entirely on what your numbers actually show. What we can tell you is that people who find out early usually have more options than people who find out late — and either way, it starts with knowing where you stand.",
    },
    body: [
      {
        heading: "What we'd look at",
        paras: [
          "An HbA1c gives a three-month average rather than a single morning's reading, which makes it one of the more useful clues about where your blood sugar has actually been sitting. It needs context — read alongside your history and anything else that's going on — but it's a far better starting point than a one-off number taken after breakfast.",
          "Your consultant will explain what each one looks at before you decide anything, and what it costs.",
        ],
      },
      {
        heading: "What actually moves the number",
        paras: [
          "Some of what goes in your plan won't cost anything: what you drink through the day, when you eat, how much walking you do. We'll be specific rather than telling you to eat well, and we'll pick things you could genuinely do on a Tuesday.",
        ],
      },
    ],
    panel: { name: "Dialics", displayName: "Blood Sugar Check", price: "GHS 350" },
  },

  "blood-pressure": {
    variant: "blood-pressure",
    concern: "Blood pressure / heart",
    eyebrow: "Blood pressure",
    h1: "You cannot feel your blood pressure",
    lede: "Which is why “I feel fine” has never been evidence of anything. Plenty of people are walking around with a number they have never seen. The only way to know yours is to look at it.",
    hero: {
      src: bloodPressureHero,
      alt: "A BetterHealth nurse running a free health screening for a woman at a community event in Ghana.",
    },
    unspoken: {
      q: "If they put me on tablets, is that me for life?",
      a: "Knowing your number and being put on medication are two separate events, and people run them together so completely that they avoid the first to avoid the second. Finding out where you stand doesn't commit you to anything. It's information, and what you do with it is a conversation with a doctor — not a foregone conclusion.",
    },
    body: [
      {
        heading: "There are no symptoms to wait for",
        paras: [
          "That's the whole difficulty with pressure. It doesn't announce itself, it doesn't hurt, and by the time it does make itself known it has usually been going on for a while. Waiting to feel something is a strategy that only works for conditions that can be felt.",
        ],
      },
      {
        heading: "What we'd look at",
        paras: [
          "Cholesterol and the related markers give useful clues about cardiovascular risk, and they tend to give them years before anything is noticeable. A single reading outside the reference range needs context before anyone draws a conclusion, which is why a doctor reads your results alongside your history rather than on their own.",
        ],
      },
    ],
    panel: { name: "Cardion", displayName: "Heart Health Check", price: "GHS 475" },
  },

  wellness: {
    variant: "wellness",
    concern: "General check-up",
    eyebrow: "General wellness",
    h1: "The best time to check is when nothing's wrong",
    lede: "A reading taken while you're well becomes the thing every future reading is measured against. Taken when you're already worried, it's just a number on its own, with nothing to compare it to.",
    hero: {
      src: wellnessHero,
      alt: "A woman in Ghana booking a health consultation on her phone at home.",
    },
    unspoken: {
      q: "Is this a waste of money if nothing's wrong?",
      a: "Nothing being wrong is the finding. A baseline while you're well is what turns a future result from an isolated number into a trend somebody can actually read — and if it does turn something up early, that's the whole point of looking. Either way you leave with a plan, and the call itself costs nothing.",
    },
    body: [
      {
        heading: "What a baseline is actually for",
        paras: [
          "Most health decisions are easier with a before. Whether a number has moved matters more than where it sits on any given morning, and you can only know it moved if you looked once while things were quiet.",
        ],
      },
      {
        heading: "It isn't only about tests",
        paras: [
          "Your plan will cover sleep, movement and what you eat as specifically as it covers anything we'd check — and at least one thing on it will be something you can start this week without spending anything.",
        ],
      },
    ],
    panel: { name: "Shield", displayName: "Wellness Check", price: "GHS 497" },
  },

  fertility: {
    variant: "fertility",
    concern: "Trying to conceive",
    eyebrow: "Trying to conceive",
    h1: "Fertility testing usually starts with the woman. It doesn't have to.",
    lede: "In around half of cases there's a male factor involved, and it's one of the more straightforward things to check. Starting with both of you gets to a clearer picture, sooner.",
    hero: {
      src: fertilityHero,
      alt: "A BetterHealth consultant going through a health plan with a member on a tablet in Ghana.",
    },
    unspoken: {
      q: "Is it me?",
      a: "Nobody can answer that from the outside, and anyone offering to is guessing. What testing does is narrow it down — and it narrows down considerably faster when both people are checked rather than one. That's the whole reason we suggest starting together.",
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
