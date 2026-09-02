// Lead magnet 4 (middle of funnel), for people living with diabetes or
// prediabetes. Bands are the ADA/WHO laboratory classification bands from
// hba1c-explained.js, prediabetes-warning-signs.js and
// diabetes-test-types-explained.js. Those articles give the HbA1c recheck
// interval for prediabetes/diabetes as "every three to six months" (not a
// flat three), so that is what this guide says. No home glucometer target is
// given anywhere in the articles, so none is given here.

const WEEK_HEADERS = ["Day", "Date", "Fasting (mmol/L)", "2h after meal (mmol/L)", "Notes"];
const weekTable = (n) => ({
  fillIn: true,
  caption: `Week ${n}`,
  headers: WEEK_HEADERS,
  rows: [1, 2, 3, 4, 5, 6, 7].map((d) => [`Day ${d}`, "", "", "", ""]),
});

export default {
  slug: "blood-sugar-log",
  kind: "guide",
  title: "The 90-Day Blood Sugar Log",
  shortTitle: "90-Day Blood Sugar Log",
  eyebrow: "Free guide",
  promise:
    "A 12-week log for fasting and after-meal readings, the reference bands, when HbA1c is due, and a checklist to bring to your next review.",
  description:
    "A 12-week log for fasting and after-meal readings, the reference bands, when HbA1c is due, and a checklist for your next review. Free 4-page PDF.",
  stage: "middle",
  panelSlugs: ["dialics"],
  format: "4-page PDF",
  pdf: "/guides/blood-sugar-log.pdf",
  bullets: [
    "How to take a fasting reading and an after-meal reading",
    "A 12-week log grid: date, fasting, 2 hours after a meal, notes",
    "The ADA / WHO bands, and why your personal target may differ",
    "When your next HbA1c is due",
    "A 'bring this to your next review' checklist",
  ],
  sections: [
    {
      heading: "Who this log is for",
      paragraphs: [
        "This log is for people living with diabetes or prediabetes, and for anyone whose clinician has asked them to keep an eye on their sugar between visits. A home glucometer is good at one job: showing how a meal, a walk or a missed dose moves your sugar through the day. It is not a diagnostic test, and a single finger-prick reading never confirms or rules out diabetes on its own.",
        "The value is in the pattern: twelve weeks of readings, written down, tell your clinician far more than any one number.",
      ],
    },
    {
      heading: "How to take a fasting reading",
      list: [
        "Take it in the morning after at least eight hours without food. Water is fine.",
        "Wash and dry your hands first. Sugar or lotion on the skin can change the result.",
        "Use a fresh strip and the side of a fingertip.",
        "Write the number down straight away, with the date.",
      ],
    },
    {
      heading: "How to take an after-meal reading",
      list: [
        "Start the clock at the first bite, not the last.",
        "Test two hours after that first bite.",
        "Note what the meal was in the notes column, especially anything new.",
        "If a reading surprises you, repeat it once before you draw a conclusion.",
      ],
    },
    {
      heading: "The reference bands, and why your target may differ",
      paragraphs: [
        "The bands below are the ones labs use to classify a laboratory test, drawn from ADA and WHO criteria. They are not home targets. Personal targets, for fasting readings, after-meal readings and HbA1c, come from your clinician and depend on your age, your medicines and any other conditions. Ask for the target that applies to you and write it at the top of your log.",
      ],
      table: {
        caption: "Laboratory classification bands (ADA Standards of Care 2024; WHO)",
        headers: ["Test", "Normal", "Prediabetes", "Diabetes"],
        rows: [
          ["HbA1c", "Below 5.7%", "5.7% to 6.4%", "6.5% or above"],
          ["Fasting glucose", "Below 5.6 mmol/L", "5.6 to 6.9 mmol/L", "7.0 mmol/L or above"],
          [
            "2-hour glucose (OGTT, a lab test)",
            "Below 7.8 mmol/L",
            "7.8 to 11.0 mmol/L",
            "11.1 mmol/L or above",
          ],
        ],
      },
      after: [
        "WHO sets the start of impaired fasting glucose at 6.1 mmol/L rather than 5.6. A laboratory diagnosis is usually confirmed on a second test.",
      ],
      callout:
        "A glucometer reads capillary blood from a finger-prick; the lab reads venous blood. Home readings can shift with the device, the strip batch and even room temperature, which is fine for tracking a trend and not precise enough to hang a diagnosis on. If a home reading looks unusually high or low, that is a reason to book a lab test.",
    },
    {
      heading: "When HbA1c is due",
      paragraphs: [
        "HbA1c shows your average blood sugar over roughly the past two to three months, so it needs time to change. For people living with prediabetes or diabetes it is usually checked every three to six months, on the interval the clinician sets. You do not need to fast for it. Write your last result, and the date the next one is due, here.",
      ],
      table: {
        fillIn: true,
        caption: "My HbA1c and my targets",
        headers: ["Last HbA1c date", "Result", "Next HbA1c due", "My clinician's targets (fasting / after meal / HbA1c)"],
        rows: [["", "", "", ""]],
      },
      callout:
        "Sickle cell trait, which around one in four Ghanaians carries, and iron-deficiency anaemia can make HbA1c read falsely high or low. If either applies to you, tell the clinician reading the result. A fasting glucose test or an oral glucose tolerance test can stand in.",
    },
    {
      heading: "The 90-day log",
      paragraphs: [
        "One line a day. Leave a gap rather than guessing. A gap is honest information too.",
      ],
      tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(weekTable),
    },
    {
      heading: "Bring this to your next review",
      list: [
        "This log, all twelve weeks, including the gaps",
        "Your glucometer, in case the clinician wants to compare it with the lab",
        "Every medicine and supplement you take, with doses, including herbal remedies",
        "Your last HbA1c result and its date",
        "Any readings that surprised you, circled, with a note of what happened that day",
        "Symptoms you noticed: unusual thirst, passing urine more often, tingling in the feet, blurred vision, cuts that heal slowly",
        "Two or three questions you want answered",
      ],
    },
    {
      heading: "If a reading is far outside the usual",
      paragraphs: [
        "One unusual reading needs context: what you ate, whether you were unwell, whether a dose was missed. Repeat it. If readings stay well outside the target your clinician gave you, or you feel unwell, contact your clinician rather than waiting for the next review.",
      ],
    },
  ],
  sources: [
    { label: "ADA Standards of Care 2024" },
    { label: "WHO 2006 diabetes criteria; WHO / ADA HbA1c thresholds" },
    { label: "What is HbA1c?", url: "/blog/hba1c-explained" },
    { label: "Prediabetes: the warning window", url: "/blog/prediabetes-warning-signs" },
    { label: "Diabetes tests explained: fasting glucose, HbA1c and OGTT", url: "/blog/diabetes-test-types-explained" },
  ],
  cta: { panelSlug: "dialics", label: "Book your next HbA1c" },
};
