// Lead magnet 2 (middle of funnel): a 7-question quiz that maps answers to one
// of the nine panels in content.js. Scoring: each option adds points to
// panels; the highest total wins; any tie for first place resolves to
// panorama. Result "why" copy names only the tests each panel actually
// includes (see testPanels) and positions price relatively rather than with a
// number, because the page shows the live catalogue price separately.
export default {
  slug: "which-test",
  kind: "quiz",
  title: "Which Health Test Do I Actually Need?",
  shortTitle: "Which Test Quiz",
  eyebrow: "Free 2-minute quiz",
  promise:
    "Seven quick questions about your age, your history and what is on your mind. At the end: one best-fit panel, what it includes, and what it costs.",
  description:
    "Seven quick questions, one best-fit test panel. See which BetterHealth check matches your age, history and budget, with its tests and price. Free, 2 minutes.",
  stage: "middle",
  panelSlugs: ["panorama", "dialics", "cardion", "metabolix", "privara", "alpha", "empress", "spark", "shield"],
  format: "2-minute quiz",
  bullets: [
    "Seven questions, one screen at a time",
    "One best-fit panel, with every test it includes",
    "A second option if the first is not quite right",
    "No diagnosis, no pressure, no jargon",
  ],
  sections: [
    {
      heading: "How the quiz works",
      paragraphs: [
        "Nine panels cover most reasons people book a test in Ghana, from a full head-to-toe check to a confidential STI screen. The quiz matches what you tell us, your age band, your family history, anything you are already managing, and your budget, to the panel that usually fits best.",
        "It is a starting point, not a diagnosis. If something specific is worrying you, or a clinician has asked you to check a particular result, take that instruction over anything the quiz suggests.",
      ],
    },
  ],
  sources: [],
  cta: { panelSlug: "panorama", label: "See all nine panels" },
  quiz: {
    intro:
      "Seven questions. There are no wrong answers, and nothing here is a diagnosis. It matches what you tell us to the panel that usually fits best.",
    questions: [
      {
        id: "age",
        text: "How old are you?",
        options: [
          { label: "Under 30", scores: { metabolix: 1 } },
          { label: "30 to 39", scores: { panorama: 1, metabolix: 1 } },
          { label: "40 to 49", scores: { panorama: 2, cardion: 1 } },
          { label: "50 or over", scores: { panorama: 2, cardion: 2 } },
        ],
      },
      {
        id: "sex",
        text: "Which best describes you?",
        options: [
          { label: "Male", scores: { alpha: 1 } },
          { label: "Female", scores: { empress: 1 } },
          { label: "Prefer not to say", scores: {} },
        ],
      },
      {
        id: "lastCheck",
        text: "When was your last full check-up?",
        options: [
          { label: "Within the last year", scores: { dialics: 1, metabolix: 1 } },
          { label: "One to two years ago", scores: { panorama: 1, metabolix: 1 } },
          { label: "More than two years ago", scores: { panorama: 2 } },
          { label: "I have never had one", scores: { panorama: 3 } },
        ],
      },
      {
        id: "familyHistory",
        text: "Does any of these run in your family? Pick the one that concerns you most.",
        options: [
          { label: "Diabetes", scores: { dialics: 3, panorama: 1 } },
          { label: "High blood pressure, stroke or heart disease", scores: { cardion: 3, panorama: 1 } },
          { label: "Kidney or liver disease", scores: { metabolix: 3, panorama: 1 } },
          { label: "None that I know of", scores: { panorama: 1 } },
          { label: "I am not sure", scores: { panorama: 1 } },
        ],
      },
      {
        id: "condition",
        text: "Are you already managing something with a clinician?",
        options: [
          { label: "Nothing at the moment", scores: {} },
          { label: "Blood sugar", scores: { dialics: 4 } },
          { label: "Blood pressure or heart", scores: { cardion: 4 } },
          { label: "Kidney or liver", scores: { metabolix: 4 } },
          { label: "Hormones or thyroid", scores: { empress: 3, spark: 1 } },
          { label: "Something not listed here", scores: { panorama: 2 } },
        ],
      },
      {
        id: "reason",
        text: "What is the main reason you are thinking about a test?",
        options: [
          { label: "A general check", scores: { panorama: 3, metabolix: 1 } },
          { label: "A fever that will not go", scores: { shield: 6 } },
          { label: "Planning a family or trying to conceive", scores: { spark: 6 } },
          { label: "A private sexual-health check", scores: { privara: 6 } },
          { label: "A men's or women's specific check", scores: { alpha: 4, empress: 4 } },
          { label: "Something specific I was told to check", scores: { panorama: 2, metabolix: 1 } },
        ],
      },
      {
        id: "budget",
        text: "What feels comfortable on budget?",
        options: [
          { label: "A single test", scores: { dialics: 2, cardion: 1, shield: 1 } },
          { label: "A focused panel", scores: { metabolix: 2, cardion: 1, dialics: 1 } },
          { label: "A complete check", scores: { panorama: 3 } },
        ],
      },
    ],
    results: {
      panorama: {
        headline: "Your best fit: the Complete Health Check",
        why: "You asked for the widest view, and this is the most complete screen we offer: full blood count, HbA1c, fasting or random blood sugar, kidney function, liver function, a urine test, lipid profile and uric acid in one visit. It covers the numbers that most often drift quietly in adults, which makes it the right starting point when it has been a while or you want a baseline.",
        alsoConsider: {
          panelSlug: "metabolix",
          text: "If the budget is tighter, the Core Health Check covers kidneys, liver, blood count and HbA1c for less.",
        },
      },
      dialics: {
        headline: "Your best fit: the Blood Sugar Check",
        why: "Your answers point to blood sugar, and this panel is built for exactly that: HbA1c for the three-month average, a fasting or random glucose for today, and a urine test that shows whether sugar or protein is spilling through. It is the most affordable of our nine panels and just as useful for keeping track when you already live with diabetes.",
        alsoConsider: {
          panelSlug: "panorama",
          text: "If you also want cholesterol, kidney and liver numbers in the same visit, the Complete Health Check includes all three.",
        },
      },
      cardion: {
        headline: "Your best fit: the Heart Health Check",
        why: "Your answers point to heart and circulation, and this panel checks markers that travel with cardiovascular risk: fasting or random blood sugar, uric acid, CRP for inflammation and a full blood count. Read alongside the blood pressure reading taken at every visit, it gives a clear picture of where you stand.",
        alsoConsider: {
          panelSlug: "panorama",
          text: "For a cholesterol (lipid) profile and kidney function in the same visit, choose the Complete Health Check.",
        },
      },
      metabolix: {
        headline: "Your best fit: the Core Health Check",
        why: "Your answers point to the organs doing the heavy lifting. This panel checks kidney function, liver function, a full blood count and HbA1c, which makes it a dependable routine check and a simple way to keep tabs on a condition you are already managing. On price it sits between the focused panels and the full screen.",
        alsoConsider: {
          panelSlug: "panorama",
          text: "Add cholesterol, uric acid and a urine test with the Complete Health Check.",
        },
      },
      privara: {
        headline: "Your best fit: the Private STI Check",
        why: "You asked for a confidential sexual-health check. This panel screens for HIV, syphilis, hepatitis B, hepatitis C, chlamydia and gonorrhoea, and results show only in your own dashboard. Several of these infections have no symptoms at all, and most can be treated or managed once found.",
        alsoConsider: {
          panelSlug: "panorama",
          text: "For a general check on top, the Complete Health Check covers blood sugar, heart, liver, kidneys and blood count.",
        },
      },
      alpha: {
        headline: "Your best fit: the Men's Health Check",
        why: "Your answers point to a men's check, and this panel covers the ground: PSA for the prostate, testosterone, a lipid profile, full blood count, HbA1c, a urine test, ESR and calcium. PSA is a screening tool rather than a diagnosis, and the screening conversation often starts earlier for men of African descent.",
        alsoConsider: {
          panelSlug: "panorama",
          text: "For kidney and liver function as well, the Complete Health Check.",
        },
      },
      empress: {
        headline: "Your best fit: the Women's Health Check",
        why: "Your answers point to a women's check. This panel covers a full blood count, HbA1c, a urine test, thyroid function, calcium and a lipid profile, which reaches the areas that most often need watching in women: anaemia, thyroid, blood sugar and heart risk. None of the tests depend on your cycle, so you can book any time.",
        alsoConsider: {
          panelSlug: "spark",
          text: "If conceiving is the goal, the Him/Her Fertility Test is the better fit.",
        },
      },
      spark: {
        headline: "Your best fit: the Him/Her Fertility Test",
        why: "You said family planning or trying to conceive. This is our couples' fertility check: thyroid function, progesterone, a pelvic ultrasound, sperm analysis and testosterone, covering the main hormones and reproductive markers for both partners. Timing matters for some of these tests, and your clinician will guide it.",
        alsoConsider: {
          panelSlug: "empress",
          text: "For a general women's check without the fertility focus, the Women's Health Check.",
        },
      },
      shield: {
        headline: "Your best fit: the Wellness Check",
        why: "You mentioned a fever that will not go. This panel checks for the common causes: a malaria rapid test with a blood film, typhoid antibodies, CRP for inflammation and a full blood count. Malaria and typhoid share symptoms, so testing both helps steer the right treatment.",
        alsoConsider: {
          panelSlug: "panorama",
          text: "Once you are well again, the Complete Health Check gives you a baseline.",
        },
      },
    },
  },
};
