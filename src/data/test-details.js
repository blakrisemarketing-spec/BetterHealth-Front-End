import { testPanels } from "./content";

const details = {
  panorama: {
    description:
      "The most complete health screening we offer. Panorama checks your blood sugar, heart health, liver, kidneys, blood count, uric acid and more in a single visit. If you do only one lab test this year, make it this one.",
    whoShouldTest: [
      "Anyone who wants a full health picture",
      "Haven't had a check-up in over a year",
      "Starting a new health or fitness goal",
      "Over 30 and want a baseline for the future",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Water is fine. A morning appointment works best.",
    sampleType: "Blood + Urine",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Full Blood Count", measures: "Red cells, white cells, platelets, haemoglobin, and more", why: "The base of any health check. Picks up anaemia, infections, and blood disorders." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "The standard for diabetes screening. One reading tells a three-month story." },
      { name: "Fasting/Random Blood Sugar", measures: "Your blood sugar level, taken fasting or at random", why: "A direct reading of your current blood sugar. Paired with HbA1c, it gives a clear picture of diabetes risk or control." },
      { name: "Kidney Function", measures: "Creatinine, urea, and electrolytes", why: "Your kidneys filter waste around the clock. This confirms they're keeping up." },
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, albumin, total protein", why: "Catches liver damage from alcohol, medications, fatty liver, or hepatitis, often with no symptoms at all." },
      { name: "Urine R/E", measures: "Sugar, protein, blood, and bacteria in urine", why: "A simple sample that can reveal kidney problems, UTIs, and diabetes spilling into the urine." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, triglycerides", why: "Checks whether your arteries are healthy and your heart risk is low." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High levels cause gout and point to metabolic stress." },
    ],
    faqs: [
      { q: "Is Panorama worth the cost?", a: "Panorama costs less than booking the same tests one by one. Catching one condition early can also save you a lot in treatment costs, and years of healthier living." },
      { q: "How often should I do Panorama?", a: "Once a year for most adults. If any results need watching, your clinician may suggest every six months." },
      { q: "Can I add extra tests to Panorama?", a: "Yes. You can add individual tests like PSA, testosterone, or thyroid function during booking." },
      { q: "I'm young and feel healthy. Do I need this?", a: "Many conditions, like diabetes and high cholesterol, build up quietly for years before any symptoms show. Testing young gives you a baseline and catches problems before they get serious." },
    ],
  },

  dialics: {
    description:
      "See how well your body is keeping sugar under control. Good for spotting diabetes early, and just as useful when you already have it and want to know your levels are holding steady.",
    whoShouldTest: [
      "Family history of diabetes",
      "Overweight or living an inactive lifestyle",
      "Often thirsty or passing urine more than usual",
      "Already living with diabetes and monitoring your control",
    ],
    preparation: "For a fasting sugar reading, fast 8 to 12 hours beforehand (water is fine). A random reading can be taken any time. Your clinician can advise which fits you.",
    sampleType: "Blood + Urine",
    turnaround: "24-48 hours",
    testDetails: [
      { name: "HbA1c", measures: "Your average blood sugar over the last 3 months", why: "Shows the bigger picture. One good reading can't hide three difficult months, which makes it the key marker for both diagnosis and control." },
      { name: "Fasting/Random Blood Sugar", measures: "Your blood sugar level, taken fasting or at random", why: "A direct snapshot of your sugar right now. Together with HbA1c it confirms diabetes or shows how your management is holding up." },
      { name: "Urine R/E", measures: "Sugar and protein in the urine", why: "Sugar in the urine is a sign blood sugar is running high. Protein is an early warning that it may be starting to affect your kidneys." },
    ],
    faqs: [
      { q: "I already have diabetes. Is this useful for me?", a: "Yes. Beyond spotting diabetes for the first time, this panel is a simple way to keep an eye on your control over time. Your HbA1c shows how well your management has worked over the last three months." },
      { q: "Do I need to fast?", a: "Only for the fasting sugar reading, which needs 8 to 12 hours without food. Water is fine. A random reading and HbA1c don't need fasting." },
    ],
  },

  cardion: {
    description:
      "The key numbers behind your heart and circulation. Whether you're checking your risk or living with a heart condition, it shows you exactly where you stand.",
    whoShouldTest: [
      "Family history of heart disease or stroke",
      "High blood pressure or on BP medication",
      "Smoker, overweight, or often under stress",
      "Managing an existing heart condition",
    ],
    preparation: "Fast for 8 to 12 hours before the test for the most accurate results. Water is fine.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Full Blood Count", measures: "Red cells, white cells, platelets, haemoglobin", why: "Anaemia and other blood problems add strain to the heart. This checks the foundation." },
      { name: "Fasting/Random Blood Sugar", measures: "Your blood sugar level", why: "High blood sugar damages blood vessels and raises your heart attack and stroke risk." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High uric acid is linked to gout and to higher cardiovascular risk." },
      { name: "CRP", measures: "C-reactive protein, a marker of inflammation", why: "Chronic inflammation quietly drives heart disease. CRP helps catch it." },
    ],
    faqs: [
      { q: "I feel fine. Do I still need this?", a: "Heart problems often build quietly with no symptoms. This panel checks the markers that flag rising risk early, while there's still time to act." },
      { q: "How often should I repeat it?", a: "Once a year if your results are normal. If anything is raised, or you're already managing a heart condition, your clinician may suggest checking more often." },
    ],
  },

  metabolix: {
    description:
      "An everyday look at the organs doing the heavy lifting: your kidneys, liver, blood and sugar. A dependable routine check, and a simple way to keep tabs on a condition you're already managing.",
    whoShouldTest: [
      "Anyone wanting a thorough annual check-up",
      "Taking medications that affect the liver or kidneys",
      "Managing an ongoing condition like diabetes or hypertension",
      "Over 30 and haven't tested in a while",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Water is fine. Take any regular medication as normal.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Kidney Function", measures: "Creatinine, urea, and electrolytes", why: "Your kidneys filter waste day and night. This checks whether they're keeping up." },
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, albumin, total protein", why: "Catches liver stress from alcohol, medications, fatty liver, or hepatitis." },
      { name: "Full Blood Count", measures: "Red cells, white cells, platelets, haemoglobin", why: "The most basic blood test. Picks up anaemia, infections, and blood disorders." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "Catches diabetes and pre-diabetes, and tracks how well existing diabetes is controlled." },
    ],
    faqs: [
      { q: "How is this different from Panorama?", a: "Core Health Check (Metabolix) covers the everyday essentials: kidneys, liver, blood count, and blood sugar. Panorama adds cholesterol, uric acid, and urine analysis for a fuller head-to-toe view." },
      { q: "Can I use this to monitor a condition I already have?", a: "Yes. It's a practical way to keep tabs on how an ongoing condition is affecting your kidneys, liver, and blood sugar. A clinician reviews every result." },
    ],
  },

  privara: {
    description:
      "A confidential screen for the most common sexually transmitted infections. Get tested, or confirm you're in the clear after treatment. Private results, no judgment.",
    whoShouldTest: [
      "Sexually active and haven't tested recently",
      "New relationship or multiple partners",
      "Planning to start a family",
      "Experiencing unusual symptoms (discharge, sores, pain)",
    ],
    preparation: "No fasting or special preparation needed. Walk in any time.",
    sampleType: "Blood + Swab",
    turnaround: "48-72 hours (HIV rapid result available same day)",
    testDetails: [
      { name: "HIV", measures: "HIV-1 and HIV-2 antibodies and antigens", why: "Finding it early means starting treatment early, and with today's medicine, a normal life expectancy." },
      { name: "Syphilis (VDRL)", measures: "Antibodies to the syphilis bacterium", why: "Syphilis treats easily with antibiotics when caught early, but it's dangerous if left alone." },
      { name: "Hepatitis B (HBsAg)", measures: "Hepatitis B surface antigen", why: "Hep B is very common in Ghana and often has no symptoms. Knowing your status protects you and your partner." },
      { name: "Hepatitis C", measures: "Hepatitis C antibodies", why: "Hep C damages the liver quietly over years. Today's treatments can cure it when it's found early." },
      { name: "Chlamydia", measures: "Chlamydia trachomatis DNA", why: "The most common STI worldwide. About 70% of infected people have no symptoms, and left untreated it can cause infertility." },
      { name: "Gonorrhoea", measures: "Neisseria gonorrhoeae DNA", why: "Harder to treat as it grows more antibiotic-resistant. Finding it early means treatment can work before complications set in." },
    ],
    faqs: [
      { q: "Is this confidential?", a: "Yes. Your results show only in your personal BetterHealth dashboard. We don't share them with partners, employers, family, or anyone else without your permission. Your login is your key." },
      { q: "What if I test positive for something?", a: "Most STIs can be treated or managed with today's medicine. Your clinician review will lay out clear next steps and treatment recommendations." },
      { q: "Can I do this test at home?", a: "The blood tests can be done with home collection. The swab tests for chlamydia and gonorrhoea are best done at a partner lab for accuracy." },
      { q: "How soon after exposure should I test?", a: "Most infections can be picked up 2 to 4 weeks after exposure. For HIV, the window can be up to three months for the most accurate result." },
    ],
  },

  alpha: {
    description:
      "A full men's screen across prostate, hormones, heart and general wellbeing. Made to catch problems early and to help you stay on top of any you're already treating.",
    whoShouldTest: [
      "Men over 40 (prostate screening recommended)",
      "Low energy, reduced drive, or mood changes",
      "Family history of prostate cancer",
      "Haven't had a health check in over a year",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Avoid hard exercise and ejaculation for 24 hours beforehand, since both can affect PSA accuracy.",
    sampleType: "Blood + Urine",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "PSA", measures: "Prostate-Specific Antigen level", why: "The standard screening marker for prostate health. A raised PSA calls for a closer look, and catching trouble early saves lives." },
      { name: "Testosterone", measures: "Total testosterone level", why: "Drives energy, muscle, mood, and libido. Low testosterone is common after 40 and very treatable." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Heart disease is the number one killer of men. This catches the risk factors." },
      { name: "Full Blood Count", measures: "Red cells, white cells, platelets, haemoglobin", why: "Picks up anaemia, infections, and blood disorders. The most basic blood test there is." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "Diabetes risk climbs with age. Catching pre-diabetes means you can still turn it around." },
      { name: "Urine R/E", measures: "Sugar, protein, blood, and bacteria in urine", why: "Reveals kidney problems, urinary infections, and diabetes spilling into the urine." },
      { name: "ESR", measures: "Erythrocyte Sedimentation Rate, a general inflammation marker", why: "A raised ESR is a broad signal that inflammation or infection may be present somewhere in the body." },
      { name: "Calcium", measures: "Calcium level in your blood", why: "Important for bones, muscles, and nerves. Abnormal levels can point to bone, kidney, or hormone issues." },
    ],
    faqs: [
      { q: "At what age should men start PSA testing?", a: "Usually from age 40, or earlier if prostate cancer runs in your family. Talk to your clinician about your own risk." },
      { q: "What if my testosterone is low?", a: "Low testosterone is common and treatable. Your clinician review will suggest what to do. Lifestyle changes are often enough, and hormone therapy is there if you need it." },
      { q: "Is this panel only for older men?", a: "No. Men of any age gain from knowing their baseline. Testing young gives you a reference point to compare against as you get older." },
    ],
  },

  empress: {
    description:
      "A full women's screen across hormones, thyroid, blood health and general wellbeing, whether you're staying ahead of issues or managing ones you already know about.",
    whoShouldTest: [
      "A routine women's health check-up",
      "Low energy, weight changes, or thyroid concerns",
      "Managing an ongoing condition",
      "Over 30 and due for a baseline",
    ],
    preparation: "Fast for 8 to 12 hours for the most accurate cholesterol reading. Water is fine.",
    sampleType: "Blood + Urine",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Full Blood Count", measures: "Red cells, white cells, platelets, haemoglobin", why: "Picks up anaemia, which is common in women, along with infections and blood disorders." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "Catches diabetes and pre-diabetes, and tracks control if you already have it." },
      { name: "Urine R/E", measures: "Sugar, protein, blood, and bacteria in urine", why: "Reveals urinary infections and early signs of kidney stress." },
      { name: "Thyroid Function", measures: "TSH, Free T3, Free T4", why: "The thyroid controls energy, weight, and mood. Thyroid issues are far more common in women." },
      { name: "Calcium", measures: "Calcium level in your blood", why: "Important for bone health, which matters more for women with age. Also reflects kidney and hormone balance." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Checks your heart risk, which rises for women after menopause." },
    ],
    faqs: [
      { q: "Is this a hormone or fertility test?", a: "No. Women's Health Check (Empress) is a general wellbeing screen covering blood, thyroid, sugar, cholesterol, and more. If you're focused on fertility, the Spark panel is the better fit." },
      { q: "Can I test any time of the month?", a: "Yes. None of these tests depend on your cycle, so you can book whenever suits you." },
    ],
  },

  spark: {
    description:
      "A fertility check for couples, covering the hormones and reproductive markers that matter when you're trying to conceive or tracking treatment along the way.",
    whoShouldTest: [
      "Couples planning or trying to conceive",
      "Trying for 12 months or more without success",
      "Irregular periods or known hormone issues",
      "Tracking progress during fertility treatment",
    ],
    preparation: "Preparation varies by test. For sperm analysis, 2 to 5 days without ejaculation is recommended. Your clinician will time the female hormone tests to the right point in the cycle.",
    sampleType: "Blood + Semen + Ultrasound",
    turnaround: "48-72 hours (ultrasound reviewed same day)",
    testDetails: [
      { name: "Thyroid Function", measures: "TSH, Free T3, Free T4", why: "Thyroid imbalance is a common and treatable cause of trouble conceiving and of irregular cycles." },
      { name: "Progesterone", measures: "Progesterone hormone level", why: "Confirms whether ovulation happened and supports early pregnancy. Low progesterone is a common cause of cycle problems." },
      { name: "Pelvic Ultrasound", measures: "An imaging scan of the womb, ovaries, and pelvic organs", why: "Checks the structure of the reproductive organs for issues like fibroids, cysts, or blockages that can affect fertility." },
      { name: "Sperm Analysis", measures: "Sperm count, movement, and shape", why: "The core test of male fertility. It shows whether enough healthy sperm are present to conceive." },
      { name: "Testosterone", measures: "Total testosterone level", why: "Key to male fertility and drive. Low levels can reduce sperm production." },
    ],
    faqs: [
      { q: "Is this for men, women, or both?", a: "Both. Spark is built for couples, with checks that cover male fertility (sperm analysis, testosterone) and female fertility (progesterone, thyroid, pelvic ultrasound)." },
      { q: "When should we consider a fertility check?", a: "Many clinicians suggest testing after 12 months of trying, or after 6 months if the woman is over 35. If your periods are irregular, it's worth checking sooner." },
    ],
  },

  shield: {
    description:
      "A quick check for the common infections that leave you feeling unwell, like malaria and typhoid, along with your blood count and inflammation markers, so you know what's going on and get treated fast.",
    whoShouldTest: [
      "Fever lasting more than two or three days",
      "Recurring fevers or chills",
      "Recently travelled to a high-malaria area",
      "Feeling unwell with no clear cause",
    ],
    preparation: "No fasting required. Best done during or soon after a fever episode for the most accurate results.",
    sampleType: "Blood",
    turnaround: "24-48 hours (malaria RDT result available same day)",
    testDetails: [
      { name: "Malaria RDT + Blood Film", measures: "Malaria parasites in your blood (rapid test + microscopy confirmation)", why: "The rapid test gives a quick answer. The blood film confirms it, identifies the species, and shows how heavy the infection is, which guides treatment." },
      { name: "Typhoid Antibodies", measures: "Widal test for Salmonella typhi and paratyphi antibodies", why: "Typhoid is common in Ghana and shares symptoms with malaria. Testing both keeps you from getting the wrong treatment." },
      { name: "CRP", measures: "C-reactive protein, a measure of how severe inflammation is", why: "Shows your clinician how serious the infection is and helps track whether treatment is working." },
      { name: "Full Blood Count", measures: "White cells, platelets, haemoglobin", why: "High white cells suggest a bacterial infection. Low platelets can point to dengue or severe malaria. The FBC ties the picture together." },
    ],
    faqs: [
      { q: "Can I test if I'm already on treatment?", a: "Yes, though the results may be affected. A blood film can still pick up parasites during treatment. Let your clinician know what medication you're taking." },
      { q: "Why test for typhoid and malaria together?", a: "Their symptoms overlap: fever, headache, body aches. In Ghana, many people get treated for malaria when they have typhoid, or the other way around. Testing both points to the right treatment." },
      { q: "How quickly can I get results?", a: "The malaria rapid test result is ready the same day. The blood film, typhoid, CRP, and full blood count results come within 24 to 48 hours." },
    ],
  },
};

export function getTestDetail(slug) {
  const panel = testPanels.find((p) => p.slug === slug);
  if (!panel) return null;
  const detail = details[slug];
  if (!detail) return null;
  return { ...panel, ...detail };
}

export function getAllTestSlugs() {
  return testPanels.map((p) => p.slug);
}
