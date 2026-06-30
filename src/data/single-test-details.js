import { singleTests, testPanels } from "./content";

const details = {
  fbc: {
    subtitle: "The foundation of any health check",
    description:
      "A Full Blood Count is the most fundamental blood test in medicine. It measures your red blood cells, white blood cells, platelets, and haemoglobin — giving a broad overview of your overall health in one go. It's often the first test a doctor orders because it reveals so much.",
    whatItMeasures: [
      { marker: "Red blood cells (RBC)", meaning: "Carry oxygen around your body. Low levels indicate anaemia." },
      { marker: "Haemoglobin (Hb)", meaning: "The protein in red cells that holds oxygen. Low haemoglobin means your organs aren't getting enough oxygen." },
      { marker: "White blood cells (WBC)", meaning: "Your immune system's soldiers. High levels suggest infection or inflammation." },
      { marker: "Platelets", meaning: "Help your blood clot. Too few means bleeding risk; too many can cause clots." },
      { marker: "MCV & MCH", meaning: "Size and colour of your red cells — helps pinpoint the type of anaemia (iron deficiency, B12 deficiency, etc.)." },
    ],
    whoShouldTest: [
      "Feeling tired, weak, or short of breath",
      "Before surgery or a medical procedure",
      "Monitoring an existing blood condition",
      "General health check-up (everyone should know their FBC)",
    ],
    preparation: "No fasting required. Can be done at any time of day.",
    sampleType: "Blood",
    turnaround: "24–48 hours",
    faqs: [
      { q: "What does a low haemoglobin mean?", a: "Low haemoglobin usually means anaemia — your blood isn't carrying enough oxygen. Common causes include iron deficiency, heavy periods, chronic disease, or inherited conditions like sickle cell trait. Your results will guide the next steps." },
      { q: "Can FBC detect cancer?", a: "FBC alone doesn't diagnose cancer, but certain patterns (like unexplained high or low white cell counts) can be early signals that prompt further investigation." },
      { q: "How often should I do an FBC?", a: "Once a year as part of a routine check-up, or more often if you have a known blood condition or are on medication that affects blood cells." },
    ],
  },

  "fasting-blood-sugar": {
    subtitle: "Your current blood sugar level",
    description:
      "A fasting blood sugar test measures the glucose in your blood after you haven't eaten for at least 8 hours. It's the simplest way to screen for diabetes and pre-diabetes — conditions that affect millions of Ghanaians, many without knowing.",
    whatItMeasures: [
      { marker: "Fasting glucose", meaning: "Your blood sugar level after an overnight fast. Normal is below 5.6 mmol/L (100 mg/dL)." },
    ],
    whoShouldTest: [
      "Family history of diabetes",
      "Overweight or physically inactive",
      "Frequently thirsty, urinating often, or losing weight without trying",
      "Over 35 years old (risk increases with age)",
    ],
    preparation: "Fast for 8–12 hours before the test. Water is fine — avoid food, juice, tea, and coffee.",
    sampleType: "Blood",
    turnaround: "24–48 hours",
    faqs: [
      { q: "What's the difference between fasting blood sugar and HbA1c?", a: "Fasting blood sugar is a snapshot of your sugar right now. HbA1c shows your average over 3 months. Together they give the most complete picture — one can be normal while the other is elevated." },
      { q: "What if my result is borderline?", a: "A result between 5.6–6.9 mmol/L means pre-diabetes. This is actually good news — it means you've caught it early enough to reverse with lifestyle changes like diet and exercise." },
      { q: "Can I drink water before the test?", a: "Yes, plain water is fine. Avoid anything with calories — food, juice, milk, sweetened drinks, or coffee." },
    ],
  },

  hba1c: {
    subtitle: "Your 3-month blood sugar average",
    description:
      "HbA1c (glycated haemoglobin) measures the percentage of your red blood cells that have sugar attached to them. Since red blood cells live for about 3 months, this test reveals your average blood sugar over that entire period — no single good or bad day can fool it.",
    whatItMeasures: [
      { marker: "HbA1c percentage", meaning: "Below 5.7% is normal. 5.7–6.4% indicates pre-diabetes. 6.5% or above suggests diabetes." },
    ],
    whoShouldTest: [
      "Family history of diabetes (very common in Ghana)",
      "Already diagnosed with diabetes — to monitor control",
      "Borderline fasting blood sugar in a previous test",
      "Overweight, high blood pressure, or metabolic syndrome",
    ],
    preparation: "No fasting required — that's the beauty of this test. Eat normally, come any time.",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    faqs: [
      { q: "Why is HbA1c better than fasting blood sugar alone?", a: "Fasting blood sugar can be normal in the morning even if your sugar spikes throughout the day. HbA1c catches these hidden spikes by showing the full 3-month average." },
      { q: "Can HbA1c be wrong?", a: "In rare cases — sickle cell trait (common in Ghana), recent blood loss, or pregnancy can affect the reading. Your clinician will take these into account." },
      { q: "If I'm diabetic, what HbA1c should I aim for?", a: "Most guidelines recommend below 7% (53 mmol/mol) for good diabetes control, but your target may vary. Your clinician will set a personalised goal based on your situation." },
    ],
  },

  "lipid-panel": {
    subtitle: "Your complete cholesterol and heart risk profile",
    description:
      "A lipid panel measures the fats in your blood — total cholesterol, LDL ('bad'), HDL ('good'), and triglycerides. These numbers predict your risk of heart attack and stroke years before symptoms appear. Heart disease is Ghana's leading cause of death, and this test is your early warning system.",
    whatItMeasures: [
      { marker: "Total cholesterol", meaning: "The overall amount of cholesterol in your blood." },
      { marker: "LDL cholesterol", meaning: "The 'bad' cholesterol that builds up in artery walls and causes blockages." },
      { marker: "HDL cholesterol", meaning: "The 'good' cholesterol that helps remove LDL from your arteries." },
      { marker: "Triglycerides", meaning: "A type of fat linked to heart disease, especially when combined with high LDL." },
    ],
    whoShouldTest: [
      "Family history of heart disease, stroke, or high cholesterol",
      "Over 40 years old (or over 30 with risk factors)",
      "Overweight, smoker, or high blood pressure",
      "On cholesterol medication — to monitor effectiveness",
    ],
    preparation: "Fast for 9–12 hours before the test for the most accurate triglyceride reading. Water is fine.",
    sampleType: "Blood",
    turnaround: "24–48 hours",
    faqs: [
      { q: "What's a good cholesterol level?", a: "Total cholesterol below 5.2 mmol/L (200 mg/dL), LDL below 3.4 mmol/L (130 mg/dL), HDL above 1.0 mmol/L (40 mg/dL), and triglycerides below 1.7 mmol/L (150 mg/dL). But context matters — your clinician interprets these alongside your other risk factors." },
      { q: "Can I improve my cholesterol without medication?", a: "Often, yes — especially with diet changes (less fried food, more fibre), regular exercise, weight loss, and quitting smoking. Medication is added if lifestyle changes aren't enough." },
      { q: "I'm young and fit — do I need this?", a: "High cholesterol has no symptoms and can be genetic. Young, fit people get heart attacks too. Knowing your baseline early is one of the smartest things you can do." },
    ],
  },

  "liver-function": {
    subtitle: "How healthy is your liver?",
    description:
      "A liver function test measures enzymes, proteins, and bilirubin produced by your liver. Your liver processes everything you eat, drink, and breathe — plus every medication you take. It rarely complains until damage is significant, which makes testing the only way to catch problems early.",
    whatItMeasures: [
      { marker: "ALT (Alanine Aminotransferase)", meaning: "The most specific liver enzyme. Elevated ALT strongly suggests liver cell damage." },
      { marker: "AST (Aspartate Aminotransferase)", meaning: "Found in liver and other tissues. High levels alongside ALT confirm liver involvement." },
      { marker: "ALP (Alkaline Phosphatase)", meaning: "Elevated in bile duct obstruction, bone disease, or liver disease." },
      { marker: "Bilirubin", meaning: "A yellow pigment from red blood cell breakdown. High bilirubin causes jaundice (yellow eyes/skin)." },
      { marker: "Albumin & Total Protein", meaning: "Made by the liver — low levels suggest the liver isn't working properly." },
    ],
    whoShouldTest: [
      "Regular alcohol consumption (even moderate)",
      "Taking long-term medications (painkillers, antibiotics, supplements, herbal remedies)",
      "Family history of liver disease or hepatitis",
      "Overweight or diagnosed with fatty liver",
    ],
    preparation: "No special fasting required, though some clinicians prefer a morning sample. Avoid alcohol 24 hours before.",
    sampleType: "Blood",
    turnaround: "24–48 hours",
    faqs: [
      { q: "Can herbal supplements damage my liver?", a: "Yes — many herbal remedies are processed by the liver and some are directly toxic. This is a common and underappreciated cause of liver damage in Ghana. If you take herbal medicines, regular liver function testing is especially important." },
      { q: "Can the liver repair itself?", a: "The liver has remarkable regenerative ability — if damage is caught early and the cause is removed (alcohol, a medication, infection), it can often recover fully. That's why early testing matters so much." },
      { q: "What does jaundice mean?", a: "Yellow eyes or skin means bilirubin is building up because your liver can't process it properly. It's a late sign — this test catches liver problems long before jaundice appears." },
    ],
  },

  "kidney-function": {
    subtitle: "Are your kidneys keeping up?",
    description:
      "Your kidneys filter about 180 litres of blood every day, removing waste and balancing your body's water and minerals. A kidney function test measures how well they're doing this job — and catches problems that develop silently for years before symptoms appear.",
    whatItMeasures: [
      { marker: "Creatinine", meaning: "A waste product from muscle metabolism. High creatinine means your kidneys aren't filtering effectively." },
      { marker: "Urea (BUN)", meaning: "Another waste product. Elevated urea confirms reduced kidney function." },
      { marker: "eGFR", meaning: "Estimated Glomerular Filtration Rate — calculated from creatinine, it grades kidney function from normal to severe impairment." },
      { marker: "Electrolytes (Na, K, Cl)", meaning: "Sodium, potassium, and chloride — your kidneys maintain these balances. Abnormal levels can cause dangerous heart rhythm problems." },
    ],
    whoShouldTest: [
      "Diabetic or pre-diabetic (diabetes is the #1 cause of kidney failure)",
      "High blood pressure (the #2 cause of kidney failure)",
      "Taking NSAIDs or other medications long-term",
      "Family history of kidney disease",
    ],
    preparation: "No fasting required. Stay well hydrated — drink water normally before the test.",
    sampleType: "Blood",
    turnaround: "24–48 hours",
    faqs: [
      { q: "Can kidney damage be reversed?", a: "Early-stage kidney disease (stages 1–2) can often be slowed or even reversed by treating the underlying cause — controlling blood sugar, blood pressure, and stopping harmful medications. Late-stage damage is permanent, which is why early detection is critical." },
      { q: "What is eGFR?", a: "It estimates how many millilitres of blood your kidneys filter per minute. Above 90 is normal. Below 60 sustained over 3 months means chronic kidney disease. Below 15 may require dialysis." },
      { q: "I drink a lot of water — does that protect my kidneys?", a: "Adequate hydration helps, but it won't prevent kidney damage from diabetes, hypertension, or toxic medications. Testing is the only reliable way to know your kidney health." },
    ],
  },

  "thyroid-function": {
    subtitle: "The gland that controls your metabolism",
    description:
      "Your thyroid is a small butterfly-shaped gland in your neck, but it controls your metabolism, energy, mood, weight, heart rate, and body temperature. When it's even slightly off, everything feels wrong. This test measures the hormones that tell the full story.",
    whatItMeasures: [
      { marker: "TSH (Thyroid Stimulating Hormone)", meaning: "The master signal from your brain to your thyroid. High TSH means your thyroid is underactive (hypothyroid). Low TSH means it's overactive (hyperthyroid)." },
      { marker: "Free T4 (Thyroxine)", meaning: "The main hormone your thyroid produces. Low T4 with high TSH confirms hypothyroidism." },
      { marker: "Free T3 (Triiodothyronine)", meaning: "The most active thyroid hormone. Important for understanding symptoms when TSH and T4 are borderline." },
    ],
    whoShouldTest: [
      "Unexplained weight gain or weight loss",
      "Persistent fatigue, brain fog, or mood changes",
      "Family history of thyroid disease",
      "Women planning pregnancy or experiencing irregular periods",
    ],
    preparation: "No fasting required. Best done in the morning. If you take thyroid medication, do the test before your morning dose.",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    faqs: [
      { q: "What are the symptoms of thyroid problems?", a: "Underactive: fatigue, weight gain, feeling cold, constipation, dry skin, hair thinning, depression. Overactive: weight loss, anxiety, tremors, rapid heartbeat, sweating, difficulty sleeping. Many people have mild symptoms they've been living with for years." },
      { q: "Are thyroid problems treatable?", a: "Yes — underactive thyroid is treated with a daily tablet (levothyroxine) that replaces the missing hormone. Overactive thyroid has several treatment options. Both are very manageable once diagnosed." },
      { q: "Is thyroid disease common in Ghana?", a: "Thyroid disorders are underdiagnosed in Ghana because the symptoms mimic stress and fatigue. Many people live with undiagnosed thyroid problems for years — a simple blood test can change that." },
    ],
  },

  "urine-re": {
    subtitle: "A simple sample that reveals a lot",
    description:
      "A urine routine examination analyses your urine for sugar, protein, blood, bacteria, and other markers. It's one of the simplest and cheapest tests in medicine, yet it can reveal kidney disease, urinary tract infections, diabetes spillover, and other conditions — often before you feel symptoms.",
    whatItMeasures: [
      { marker: "Protein (albumin)", meaning: "Protein in urine is an early sign of kidney damage, especially from diabetes or high blood pressure." },
      { marker: "Glucose", meaning: "Sugar in urine suggests your blood sugar is consistently very high — a sign of uncontrolled diabetes." },
      { marker: "Blood", meaning: "Blood in urine can indicate infection, kidney stones, or other urinary tract conditions." },
      { marker: "Bacteria & white cells", meaning: "Signs of urinary tract infection (UTI) — very common, especially in women." },
      { marker: "Casts & crystals", meaning: "Microscopic structures that indicate specific kidney conditions." },
    ],
    whoShouldTest: [
      "Pain or burning during urination",
      "Frequent or urgent urination",
      "Diabetic or hypertensive (routine kidney monitoring)",
      "Pregnant women (routine prenatal screening)",
    ],
    preparation: "No fasting needed. A midstream, clean-catch sample is preferred — your lab will give you instructions.",
    sampleType: "Urine",
    turnaround: "24–48 hours",
    faqs: [
      { q: "What is a 'midstream clean-catch' sample?", a: "Start urinating, then catch the middle portion in the container. This avoids contamination from skin bacteria and gives the most accurate results." },
      { q: "Can a urine test detect pregnancy?", a: "A standard urine R/E doesn't specifically test for pregnancy, but some labs include it. If you need a pregnancy test, request it specifically." },
      { q: "Why is protein in urine important?", a: "Even small amounts of protein (microalbuminuria) mean your kidneys' filters are leaking — often the very first sign of kidney damage from diabetes or hypertension. Catching it at this stage means treatment can prevent further damage." },
    ],
  },

  "malaria-rdt": {
    subtitle: "Fast, accurate malaria detection",
    description:
      "A malaria rapid diagnostic test detects malaria parasites in your blood within 15–20 minutes. Malaria remains one of the biggest health threats in Ghana, and accurate diagnosis is critical — treating the wrong infection wastes time and money, while delayed malaria treatment can be dangerous.",
    whatItMeasures: [
      { marker: "Plasmodium antigens", meaning: "Proteins produced by malaria parasites. The RDT detects these in a drop of blood." },
      { marker: "Species identification", meaning: "Determines whether it's P. falciparum (the most dangerous type, common in Ghana) or another species." },
    ],
    whoShouldTest: [
      "Fever, chills, or headache lasting more than a day",
      "Recently visited a high-malaria area",
      "Recurring episodes of fever and body aches",
      "Before starting antimalarial treatment (to confirm diagnosis)",
    ],
    preparation: "No preparation needed. Best done during or shortly after a fever episode for the most accurate result.",
    sampleType: "Blood (finger prick)",
    turnaround: "15–20 minutes (rapid result)",
    faqs: [
      { q: "How accurate is the rapid test?", a: "Malaria RDTs are over 95% accurate for P. falciparum when parasite levels are detectable. For very early infections with low parasite loads, a blood film microscopy may be more sensitive — consider the Shield panel if you want both." },
      { q: "Can I have malaria without fever?", a: "In people who've had malaria many times (common in Ghana), some develop partial immunity and can carry parasites with mild or no symptoms. If you feel generally unwell, testing is still worthwhile." },
      { q: "Why not just take antimalarials when I feel sick?", a: "Many fevers in Ghana are not malaria — typhoid, viral infections, and other conditions share similar symptoms. Taking antimalarials for a non-malaria fever delays the right treatment and contributes to drug resistance." },
    ],
  },

  hiv: {
    subtitle: "Know your status — completely confidential",
    description:
      "An HIV screening test detects antibodies and antigens that indicate HIV infection. Knowing your status is powerful — if negative, you can take steps to stay that way; if positive, early treatment means a normal life expectancy. All results are completely confidential and go only to your personal dashboard.",
    whatItMeasures: [
      { marker: "HIV-1 & HIV-2 antibodies", meaning: "Antibodies your body produces in response to HIV infection. Detectable 2–4 weeks after exposure in most cases." },
      { marker: "p24 antigen", meaning: "A protein from the virus itself. Detectable earlier than antibodies — shortens the window period." },
    ],
    whoShouldTest: [
      "Everyone should know their HIV status — at least once",
      "New sexual relationship",
      "Planning to start a family",
      "Healthcare workers or anyone with occupational exposure risk",
    ],
    preparation: "No fasting or preparation needed. Walk in any time.",
    sampleType: "Blood",
    turnaround: "Same-day rapid result available; confirmatory test within 48 hours",
    faqs: [
      { q: "Is this really confidential?", a: "Completely. Your results appear only in your personal BetterHealth dashboard, protected by your login. We don't share results with anyone — not partners, employers, or family members." },
      { q: "How soon after exposure can I test?", a: "4th-generation tests (which detect both antibodies and antigens) can detect HIV as early as 2–4 weeks after exposure. For complete confidence, test again at 3 months if the initial result is negative." },
      { q: "What if I test positive?", a: "Modern HIV treatment (ART) is highly effective. People who start treatment early and take it consistently have a normal life expectancy and can reach 'undetectable' status — meaning they cannot transmit the virus to partners." },
    ],
  },

  "hepatitis-b": {
    subtitle: "One of Ghana's most common infections",
    description:
      "Hepatitis B is a viral infection that attacks the liver. Ghana has one of the highest rates in the world — roughly 1 in 8 Ghanaians carry the virus, most without knowing. It spreads through blood, sex, and from mother to child. The good news: it's preventable with a vaccine and manageable with monitoring.",
    whatItMeasures: [
      { marker: "HBsAg (Hepatitis B Surface Antigen)", meaning: "The primary marker of current hepatitis B infection. If positive, the virus is present in your blood." },
    ],
    whoShouldTest: [
      "Everyone born in Ghana (high-prevalence region)",
      "Never been vaccinated for Hepatitis B",
      "Healthcare workers or anyone with blood contact risk",
      "Pregnant women (to prevent mother-to-child transmission)",
    ],
    preparation: "No fasting or preparation needed.",
    sampleType: "Blood",
    turnaround: "24–48 hours",
    faqs: [
      { q: "Is Hepatitis B curable?", a: "Acute Hep B (new infection) often clears on its own. Chronic Hep B can't be fully cured yet, but it's manageable with monitoring and, if needed, antiviral medication. Many people with chronic Hep B live full, healthy lives." },
      { q: "Should I get vaccinated?", a: "If you've never been infected and never vaccinated — absolutely yes. The Hep B vaccine is one of the most effective vaccines ever made (95%+ protection). It's given as 3 doses over 6 months." },
      { q: "Can I spread Hep B without knowing?", a: "Yes — most carriers have no symptoms for years or decades while the virus silently damages their liver and remains transmissible. That's why testing is so important, especially in Ghana where prevalence is high." },
      { q: "What happens if I'm positive?", a: "Your clinician will recommend additional tests (viral load, liver function) to assess the stage and decide whether treatment is needed now or monitoring is sufficient." },
    ],
  },

  "uric-acid": {
    subtitle: "Gout, kidney health, and metabolic stress",
    description:
      "Uric acid is a waste product created when your body breaks down purines (found in certain foods and your own cells). Normally your kidneys filter it out, but when levels build up, it can crystallise in your joints (causing gout) or damage your kidneys. It's also a marker of overall metabolic health.",
    whatItMeasures: [
      { marker: "Serum uric acid", meaning: "The level of uric acid in your blood. High levels (hyperuricaemia) increase the risk of gout, kidney stones, and cardiovascular disease." },
    ],
    whoShouldTest: [
      "Joint pain, especially in the big toe (classic gout symptom)",
      "History of kidney stones",
      "High blood pressure or metabolic syndrome",
      "Diet high in red meat, organ meats, or beer",
    ],
    preparation: "No fasting required, though some clinicians prefer a morning sample. Avoid high-purine foods the day before for the most accurate reading.",
    sampleType: "Blood",
    turnaround: "24–48 hours",
    faqs: [
      { q: "What is gout?", a: "Gout is an intensely painful form of arthritis caused by uric acid crystals depositing in your joints. It typically attacks the big toe first but can affect any joint. It's treatable and preventable once diagnosed." },
      { q: "Can diet affect uric acid levels?", a: "Yes — red meat, organ meats (liver, kidney), shellfish, beer, and sugary drinks raise uric acid. Reducing these, staying hydrated, and eating more vegetables can significantly lower levels." },
      { q: "Is high uric acid dangerous even without gout?", a: "Yes — high uric acid is independently linked to kidney disease, high blood pressure, and cardiovascular risk, even if you've never had a gout attack. It's worth monitoring." },
    ],
  },
};

export function getSingleTestDetail(slug) {
  const test = singleTests.find((t) => t.slug === slug);
  if (!test) return null;
  const detail = details[slug];
  if (!detail) return null;
  const includedInPanels = testPanels.filter((p) =>
    p.tests.some((t) => test.name.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(test.slug.replace(/-/g, " ")))
  );
  return { ...test, ...detail, includedInPanels };
}

export function getAllSingleTestSlugs() {
  return singleTests.map((t) => t.slug);
}
