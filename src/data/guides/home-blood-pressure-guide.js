// Lead magnet 5 (middle of funnel). Categories, the crisis threshold, the
// "average of at least two readings on two occasions" rule, the lifestyle
// figures and the recheck intervals are all from
// high-blood-pressure-silent-killer.js (AHA/ACC 2017; WHO 2023).
export default {
  slug: "home-blood-pressure-guide",
  kind: "guide",
  title: "Home Blood Pressure: The 7-Day Reading Guide",
  shortTitle: "7-Day Blood Pressure Guide",
  eyebrow: "Free guide",
  promise:
    "How to take a proper reading at home, a 7-day morning and evening log, the categories, and what to bring to your clinician.",
  description:
    "How to take a proper home blood pressure reading, a 7-day morning and evening log, the categories, and what to bring to your clinician. Free 2-page PDF.",
  stage: "middle",
  panelSlugs: ["cardion"],
  format: "2-page PDF",
  pdf: "/guides/home-blood-pressure-guide.pdf",
  bullets: [
    "The seven steps to a reading you can trust",
    "A 7-day log: two readings morning and evening",
    "The categories, from normal to crisis, with the sources",
    "Why one raised reading is not a diagnosis",
    "What to bring to your clinician",
  ],
  sections: [
    {
      heading: "Why seven days",
      paragraphs: [
        "Blood pressure moves through the day. Stress, caffeine, activity and even sitting in a clinic can push it up for a while. That is why one reading, high or low, tells you little, and why a diagnosis of hypertension rests on the average of at least two readings taken on two separate occasions.",
        "Seven days of morning and evening readings, done the same way each time, give you and your clinician a pattern rather than a single number.",
      ],
    },
    {
      heading: "How to take a proper reading",
      ordered: true,
      list: [
        "Sit quietly for five minutes first. No talking, no phone.",
        "No caffeine, smoking or exercise in the 30 minutes before.",
        "Sit with your back supported and both feet flat on the floor, legs uncrossed.",
        "Rest your arm on a table so the cuff sits at the level of your heart, on a bare arm rather than over a sleeve.",
        "Take two readings, a minute apart, and write down both.",
        "Do this in the morning, before medicines and food, and again in the evening.",
        "Use the same arm and the same monitor all week.",
      ],
    },
    {
      heading: "The categories",
      paragraphs: [
        "Write each reading as top number over bottom number, for example 128/82. The top number (systolic) is the pressure during a heartbeat; the bottom (diastolic) is the pressure between beats.",
      ],
      table: {
        caption: "Blood pressure categories (AHA/ACC 2017; WHO Global Hypertension Report 2023)",
        headers: ["Category", "Reading (mmHg)"],
        rows: [
          ["Normal", "Below 120/80"],
          ["Elevated", "Systolic 120 to 129 and diastolic below 80"],
          ["Stage 1 hypertension", "Systolic 130 to 139 or diastolic 80 to 89"],
          ["Stage 2 hypertension", "Systolic 140 or above, or diastolic 90 or above"],
          ["Hypertensive crisis", "Above 180/120: seek emergency care immediately"],
        ],
      },
      callout:
        "One raised reading is not a diagnosis. If a reading is high, sit for a few more minutes and repeat it. If readings on two separate days average 140/90 or above, see a doctor who can assess your overall risk. A reading above 180/120, especially with a sudden severe headache, blurred vision, chest pain, difficulty breathing, confusion or weakness on one side of the body, is an emergency: seek care immediately.",
    },
    {
      heading: "Your 7-day log",
      paragraphs: [
        "Two readings each morning and each evening. At the end of the week, add up all your top numbers and divide by the count, then do the same for the bottom numbers. That average is the number to discuss.",
      ],
      table: {
        fillIn: true,
        caption: "Seven days, morning and evening",
        headers: ["Day / date", "Morning 1", "Morning 2", "Evening 1", "Evening 2", "Notes"],
        rows: [
          ["Day 1", "", "", "", "", ""],
          ["Day 2", "", "", "", "", ""],
          ["Day 3", "", "", "", "", ""],
          ["Day 4", "", "", "", "", ""],
          ["Day 5", "", "", "", "", ""],
          ["Day 6", "", "", "", "", ""],
          ["Day 7", "", "", "", "", ""],
          ["Week average", "", "", "", "", ""],
        ],
      },
    },
    {
      heading: "What the numbers can mean",
      paragraphs: [
        "Stage 1 readings are often managed with lifestyle change alone for people at low cardiovascular risk, while stage 2 almost always calls for medication alongside those changes. Which applies to you is a decision for a clinician who knows your full picture. Many Ghanaian facilities still use 140/90 as the diagnosis threshold, so a stage 1 average is worth raising even if it is not labelled hypertension.",
        "Lifestyle changes that the evidence supports, each able to lower blood pressure by around 5 to 10 mmHg:",
      ],
      list: [
        "Reduce salt to under 5 g a day, roughly one teaspoon. Stock cubes, processed food and preserved fish are the big sources in a typical Ghanaian diet.",
        "Thirty minutes of brisk walking, swimming or cycling five days a week.",
        "Lose excess weight if you carry it. Each kilogram lost typically lowers systolic pressure by about 1 mmHg.",
        "Limit alcohol to one drink a day or less.",
        "Eat more potassium: bananas, plantain, tomatoes, beans and leafy vegetables.",
      ],
    },
    {
      heading: "What to bring to your clinician",
      list: [
        "This log, with both readings each time, not just the better one",
        "The make and model of your monitor, or the monitor itself",
        "Every medicine and supplement you take, including herbal remedies",
        "A note of anything that affected a reading: illness, a stressful day, a missed dose",
        "Your other numbers if you have them: blood sugar, cholesterol, kidney function. These conditions travel together.",
        "Your questions, written down",
      ],
    },
    {
      heading: "How often to check once you know your number",
      paragraphs: [
        "Adults over 30 without a known blood pressure problem benefit from a check at least once a year. With a reading in the elevated or stage 1 range, every three to six months is reasonable. People on blood pressure medicine usually check more often, guided by their doctor.",
      ],
    },
  ],
  sources: [
    { label: "AHA/ACC 2017 hypertension guideline" },
    { label: "WHO Global Hypertension Report 2023" },
    { label: "Ghana Health Service national surveys" },
    { label: "High blood pressure in Ghana: the silent killer", url: "/blog/high-blood-pressure-silent-killer" },
  ],
  cta: { panelSlug: "cardion", label: "Book the Heart Health Check" },
};
