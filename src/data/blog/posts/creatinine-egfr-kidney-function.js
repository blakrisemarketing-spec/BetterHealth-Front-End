// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: creatinine test (110/mo Ghana, LOW competition, DataForSEO 2026-07-02).
// Secondary: creatinine test meaning, creatinine test normal range, kidney function test,
// egfr test, normal creatinine levels by age.
// Ranges cite KDIGO 2012 CKD staging and National Kidney Foundation eGFR bands.
// Ghana context: hypertension and diabetes as the two leading CKD drivers.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution maintained.
export default {
  slug: "creatinine-egfr-kidney-function",
  title: "Creatinine and eGFR: How to Read Your Kidney Function Test",
  description:
    "Creatinine and eGFR are usually tested together but reported very differently. Learn what each number measures, the normal ranges, and why high blood pressure and diabetes make this test matter in Ghana.",
  excerpt:
    "A kidney function test reports two numbers that move in opposite directions: creatinine and eGFR. What each one measures, what the ranges mean, and why hypertension and diabetes make this test worth understanding.",
  datePublished: "2026-07-02",
  dateModified: "2026-07-02",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the creatinine and eGFR kidney function test and what the results mean.",
  tags: ["creatinine", "eGFR", "kidney function", "biomarkers", "blood test"],
  cluster: "biomarkers",
  primaryKeyword: "creatinine test",
  readingMinutes: 7,
  body: [
    {
      type: "image",
      src: "/blog/creatinine-egfr-hero.svg",
      alt: "Creatinine and eGFR explained: how to read your kidney function test.",
    },
    {
      type: "p",
      text: "A kidney function test usually reports two numbers side by side: creatinine and eGFR. They describe the same thing from opposite directions, and most people have never had either one explained. Understanding both turns a page of lab jargon into something you can act on.",
    },
    {
      type: "p",
      text: "This test matters more than it might seem. High blood pressure and diabetes, two of the most common conditions in Ghana, are also the two leading causes of kidney damage, and that damage often builds for years without a single symptom.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What creatinine and eGFR measure",
    },
    {
      type: "p",
      text: "Creatinine is a waste product from normal muscle activity that healthy kidneys filter out of the blood; eGFR (estimated glomerular filtration rate) uses your creatinine level, age, and sex to estimate how well your kidneys are filtering.",
    },
    {
      type: "p",
      text: "Your muscles produce creatinine at a fairly steady rate every day. Healthy kidneys clear it from the blood through tiny filtering units called glomeruli and pass it out in urine. When the kidneys filter less effectively, creatinine is cleared more slowly and builds up in the blood, so a raised creatinine level is a signal that filtering has slowed down.",
    },
    {
      type: "p",
      text: "Creatinine on its own is a rough signal, because a naturally muscular person produces more of it than a smaller person with identical kidney function. eGFR corrects for this by feeding your creatinine result, along with your age and sex, into a standard formula, giving a single number that estimates the percentage of normal kidney filtering you have left.",
    },
    {
      type: "h2",
      id: "creatinine-range",
      text: "Creatinine normal range",
    },
    {
      type: "p",
      text: "Typical serum creatinine reference ranges are about 60 to 110 micromol/L for men and 45 to 90 micromol/L for women, though the exact cutoff varies by lab and by muscle mass.",
    },
    {
      type: "p",
      text: "Men generally have higher reference ranges than women because they tend to carry more muscle mass, which produces more creatinine even with identical kidney function. A very muscular person can have a creatinine level above the standard range with completely normal kidneys, while a frail, low-muscle-mass person can have a creatinine level inside the range while their kidney function is already reduced. This is exactly why eGFR, which adjusts for age and sex, is usually the more useful number to track.",
    },
    {
      type: "h2",
      id: "egfr-stages",
      text: "eGFR ranges and what they mean",
    },
    {
      type: "p",
      text: "eGFR is reported in stages, from normal (90 or above) down to kidney failure (below 15), and most labs and clinicians flag anything under 60 for follow-up.",
    },
    {
      type: "list",
      items: [
        "Normal: eGFR 90 or above. Kidney function is not reduced, though this alone does not rule out early kidney damage if protein is present in the urine.",
        "Mild decrease: eGFR 60 to 89. Common with normal ageing and usually not a concern on its own, especially without other signs of kidney damage.",
        "Moderate decrease: eGFR 30 to 59. This range is typically split into 3a (45 to 59) and 3b (30 to 44); clinicians usually start closer monitoring and look for an underlying cause here.",
        "Severe decrease: eGFR 15 to 29. Kidney function is significantly reduced; specialist (nephrology) care is usually recommended at this stage.",
        "Kidney failure: eGFR below 15. This stage often requires dialysis or transplant planning, though the right course depends on the full clinical picture.",
      ],
    },
    {
      type: "image",
      src: "/blog/creatinine-egfr-ranges.svg",
      alt: "eGFR stages from normal (90 and above) to kidney failure (below 15), and typical creatinine reference ranges for men and women.",
      caption:
        "eGFR staging (KDIGO 2012) and typical creatinine reference ranges. Confirm the interval on your own lab report.",
    },
    {
      type: "callout",
      title: "Creatinine and eGFR move in opposite directions",
      text: "As kidney filtering declines, creatinine builds up in the blood and rises, while the calculated eGFR falls. A rising creatinine and a falling eGFR on two different test dates describe the same trend, just from opposite directions. A single result outside the range is not a diagnosis; a clinician usually wants to see the trend over at least two tests, generally three months apart, before concluding that kidney function has changed.",
    },
    {
      type: "h2",
      id: "opposite-directions",
      text: "Why creatinine and eGFR are usually read together",
    },
    {
      type: "p",
      text: "A single creatinine number can be misleading on its own because it depends on muscle mass, age, sex, hydration, and even recent heavy exercise or a high-protein meal. eGFR smooths out some of that variation by building age and sex into the formula, which is why most lab reports now print both numbers rather than creatinine alone.",
    },
    {
      type: "p",
      text: "Neither number captures everything. A urine test for protein (albumin) is usually needed alongside creatinine and eGFR for a complete picture, because kidney damage can sometimes show up as protein leaking into the urine before eGFR drops.",
    },
    {
      type: "link-internal",
      to: "/blog/high-blood-pressure-silent-killer",
      label: "High blood pressure: why it is called the silent killer, and how it damages kidneys",
    },
    {
      type: "h2",
      id: "ghana-context",
      text: "Why hypertension and diabetes make this test matter in Ghana",
    },
    {
      type: "p",
      text: "High blood pressure and diabetes are the two leading causes of chronic kidney disease in Ghana, and kidney damage from either condition often has no symptoms until function has already dropped significantly.",
    },
    {
      type: "p",
      text: "Both conditions damage the kidneys through the same basic mechanism: the tiny blood vessels inside the glomeruli, the kidney's filtering units, are put under sustained pressure or exposed to persistently high blood sugar. Over years, this damages the filtering units faster than the kidneys can repair them. Because the kidneys have significant reserve capacity, a person can lose a large share of their filtering function before noticing anything is wrong.",
    },
    {
      type: "p",
      text: "This is why a kidney function test is usually recommended alongside blood pressure checks and HbA1c testing for anyone managing hypertension or diabetes, not as a stand-alone test after symptoms appear. Catching a falling eGFR early gives more room to slow the decline through blood pressure control, blood sugar control, and medication adjustments.",
    },
    {
      type: "link-internal",
      to: "/blog/hba1c-explained",
      label: "What is HbA1c? Your 3-month blood sugar average, and why it matters for your kidneys",
    },
    {
      type: "h2",
      id: "symptoms",
      text: "Symptoms of reduced kidney function",
    },
    {
      type: "p",
      text: "Early kidney function loss usually causes no symptoms at all, which is why the blood test, not how a person feels, is what catches it.",
    },
    {
      type: "list",
      items: [
        "Swelling in the ankles, feet, or around the eyes, from fluid the kidneys are no longer clearing efficiently",
        "Fatigue and weakness, partly from a build-up of waste products and partly from anaemia that often develops alongside reduced kidney function",
        "Changes in urination: foamy urine, urinating more at night, or noticeably less urine than usual",
        "Persistent itching, nausea, or loss of appetite, which tend to appear only once function has dropped substantially",
        "Poorly controlled blood pressure that becomes harder to manage with the same medications",
      ],
    },
    {
      type: "callout",
      title: "These symptoms usually appear late",
      text: "By the time swelling, fatigue, or nausea from reduced kidney function are noticeable, a significant amount of kidney function has often already been lost. This is exactly why routine testing for people with hypertension, diabetes, or a family history of kidney disease matters more than waiting for symptoms.",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your kidney function result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Check both numbers, not just one. Read your creatinine against your lab's own reference range and your eGFR against the staging table above.",
        "If your eGFR is below 60, or your creatinine is outside your lab's reference range, discuss the result with a doctor rather than interpreting a single value alone.",
        "Ask whether a urine albumin test is needed alongside creatinine and eGFR, since kidney damage can show up in urine before eGFR falls.",
        "If you have high blood pressure or diabetes, ask for a kidney function test as part of your routine monitoring, even without symptoms.",
        "Stay hydrated before the test and avoid an unusually heavy protein meal or intense exercise the day before, since both can temporarily raise creatinine.",
        "Track your results over time. A single test is a snapshot; a trend across two or more tests, generally three months apart, tells a clinician far more.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the kidney function panel BetterHealth Africa offers",
    },
    {
      type: "link-internal",
      to: "/pricing",
      label: "View BetterHealth Africa test pricing",
    },
    {
      type: "faq",
      items: [
        {
          q: "Do I need to fast before a creatinine test?",
          a: "Usually not. A creatinine and eGFR test does not require fasting in most cases. If it is ordered alongside other tests such as fasting blood sugar or a lipid panel, follow the fasting instructions for the combined panel rather than the creatinine test alone.",
        },
        {
          q: "What is a normal eGFR for my age?",
          a: "An eGFR of 90 or above is considered normal. eGFR does tend to decline gradually with age even in healthy people, so an eGFR in the 60s in an older adult with no other signs of kidney damage is not automatically a concern. Your clinician interprets your result alongside your age, symptoms, and any other test findings.",
        },
        {
          q: "What does a low eGFR mean?",
          a: "A low eGFR means your kidneys are filtering less efficiently than expected for your age and sex. An eGFR below 60 on two tests at least three months apart is generally used to diagnose chronic kidney disease. The lower the number, the more significant the reduction in filtering capacity, and the more urgently it needs medical attention.",
        },
        {
          q: "Can a high creatinine level be lowered?",
          a: "It depends on the cause. Creatinine that is temporarily raised by dehydration, heavy exercise, or certain medications can return to normal once the cause is addressed. Creatinine raised by ongoing kidney damage from hypertension or diabetes is managed by controlling those underlying conditions, which can slow or sometimes stabilise further decline, though established kidney damage is not always fully reversible. A doctor needs to determine the cause before treatment.",
        },
        {
          q: "Is a kidney function test the same as a urine test?",
          a: "No. Creatinine and eGFR are measured from a blood sample and estimate how well the kidneys are filtering overall. A urine test, often checking for albumin or protein, looks for early leakage that can signal kidney damage before eGFR falls. A complete kidney health check usually includes both.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Kidney function results depend on individual factors including muscle mass, hydration, medications, and underlying health conditions. Always discuss your blood test results with your doctor.",
    },
  ],
};
