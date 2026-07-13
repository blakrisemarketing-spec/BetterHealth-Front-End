import { singleTests, testPanels } from "./content";

const details = {
  fbc: {
    subtitle: "The base of any health check",
    description:
      "A Full Blood Count is the most basic blood test in medicine. It measures your red blood cells, white blood cells, platelets, and haemoglobin, giving a broad view of your overall health in one go. Doctors often order it first because it shows so much.",
    whatItMeasures: [
      { marker: "Red blood cells (RBC)", meaning: "Carry oxygen around your body. Low levels point to anaemia." },
      { marker: "Haemoglobin (Hb)", meaning: "The protein in red cells that holds oxygen. Low haemoglobin means your organs aren't getting enough." },
      { marker: "White blood cells (WBC)", meaning: "Your immune system's defenders. High levels suggest infection or inflammation." },
      { marker: "Platelets", meaning: "Help your blood clot. Too few raises bleeding risk; too many can cause clots." },
      { marker: "MCV & MCH", meaning: "The size and colour of your red cells, which help pinpoint the type of anaemia (iron deficiency, B12 deficiency, etc.)." },
    ],
    whoShouldTest: [
      "Feeling tired, weak, or short of breath",
      "Before surgery or a medical procedure",
      "Monitoring an existing blood condition",
      "General health check-up (everyone should know their FBC)",
    ],
    preparation: "No fasting required. Can be done at any time of day.",
    sampleType: "Blood",
    turnaround: "24-48 hours",
    faqs: [
      { q: "What does a low haemoglobin mean?", a: "Low haemoglobin usually means anaemia, where your blood isn't carrying enough oxygen. Common causes include iron deficiency, heavy periods, chronic disease, or inherited conditions like sickle cell trait. Your results will point to the next steps." },
      { q: "Can FBC detect cancer?", a: "FBC alone doesn't diagnose cancer, but certain patterns, like unexplained high or low white cell counts, can be early signals that call for more tests." },
      { q: "How often should I do an FBC?", a: "Once a year as part of a routine check-up, or more often if you have a known blood condition or take medication that affects blood cells." },
    ],
  },

  "fasting-blood-sugar": {
    subtitle: "Your current blood sugar level",
    description:
      "A fasting blood sugar test measures the glucose in your blood after you've gone at least 8 hours without eating. It's the simplest way to screen for diabetes and pre-diabetes, conditions that affect millions of Ghanaians, many without knowing.",
    whatItMeasures: [
      { marker: "Fasting glucose", meaning: "Your blood sugar level after an overnight fast. Normal is below 5.6 mmol/L (100 mg/dL)." },
    ],
    whoShouldTest: [
      "Family history of diabetes",
      "Overweight or physically inactive",
      "Often thirsty, passing urine often, or losing weight without trying",
      "Over 35 years old (risk increases with age)",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Water is fine. Skip food, juice, tea, and coffee.",
    sampleType: "Blood",
    turnaround: "24-48 hours",
    faqs: [
      { q: "What's the difference between fasting blood sugar and HbA1c?", a: "Fasting blood sugar is a snapshot of your sugar right now. HbA1c shows your average over three months. Together they give the most complete picture, since one can be normal while the other is raised." },
      { q: "What if my result is borderline?", a: "A result between 5.6 and 6.9 mmol/L means pre-diabetes. That's good news in a way: you've caught it early enough to turn around with diet and exercise." },
      { q: "Can I drink water before the test?", a: "Yes, plain water is fine. Skip anything with calories: food, juice, milk, sweetened drinks, or coffee." },
    ],
  },

  hba1c: {
    subtitle: "Your 3-month blood sugar average",
    description:
      "HbA1c, or glycated haemoglobin, measures the share of your red blood cells that have sugar stuck to them. Since red blood cells live for about three months, this test shows your average blood sugar over that whole stretch. No single good or bad day can fool it.",
    whatItMeasures: [
      { marker: "HbA1c percentage", meaning: "Below 5.7% is normal. 5.7-6.4% indicates pre-diabetes. 6.5% or above suggests diabetes." },
    ],
    whoShouldTest: [
      "Family history of diabetes (very common in Ghana)",
      "Already diagnosed with diabetes, to monitor control",
      "Borderline fasting blood sugar in a previous test",
      "Overweight, high blood pressure, or metabolic syndrome",
    ],
    preparation: "No fasting required, which is the nice part of this test. Eat normally and come any time.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    faqs: [
      { q: "Why is HbA1c better than fasting blood sugar alone?", a: "Your fasting blood sugar can read normal in the morning even when your sugar spikes during the day. HbA1c catches those hidden spikes by showing the full three-month average." },
      { q: "Can HbA1c be wrong?", a: "In rare cases, yes. Sickle cell trait, which is common in Ghana, recent blood loss, or pregnancy can all affect the reading. Your clinician will take these into account." },
      { q: "If I'm diabetic, what HbA1c should I aim for?", a: "Most guidelines suggest below 7% (53 mmol/mol) for good diabetes control, but your target may differ. Your clinician will set a personal goal based on your situation." },
    ],
  },

  "lipid-panel": {
    subtitle: "Your full cholesterol and heart risk profile",
    description:
      "A lipid panel measures the fats in your blood: total cholesterol, LDL (the 'bad' one), HDL (the 'good' one), and triglycerides. These numbers point to your risk of heart attack and stroke years before symptoms show. Heart disease is Ghana's leading cause of death, and this test is your early warning.",
    whatItMeasures: [
      { marker: "Total cholesterol", meaning: "The overall amount of cholesterol in your blood." },
      { marker: "LDL cholesterol", meaning: "The 'bad' cholesterol that builds up in artery walls and causes blockages." },
      { marker: "HDL cholesterol", meaning: "The 'good' cholesterol that helps clear LDL from your arteries." },
      { marker: "Triglycerides", meaning: "A type of fat linked to heart disease, especially alongside high LDL." },
    ],
    whoShouldTest: [
      "Family history of heart disease, stroke, or high cholesterol",
      "Over 40 years old (or over 30 with risk factors)",
      "Overweight, smoker, or high blood pressure",
      "On cholesterol medication, to monitor how well it's working",
    ],
    preparation: "Fast for 9 to 12 hours before the test for the most accurate triglyceride reading. Water is fine.",
    sampleType: "Blood",
    turnaround: "24-48 hours",
    faqs: [
      { q: "What's a good cholesterol level?", a: "Total cholesterol below 5.2 mmol/L (200 mg/dL), LDL below 3.4 mmol/L (130 mg/dL), HDL above 1.0 mmol/L (40 mg/dL), and triglycerides below 1.7 mmol/L (150 mg/dL). Context still matters, and your clinician reads these alongside your other risk factors." },
      { q: "Can I improve my cholesterol without medication?", a: "Often, yes, especially with diet changes like less fried food and more fibre, regular exercise, weight loss, and quitting smoking. Medication is added when lifestyle changes aren't enough." },
      { q: "I'm young and fit. Do I need this?", a: "High cholesterol has no symptoms and can run in families. Young, fit people get heart attacks too. Knowing your baseline early is one of the smartest things you can do." },
    ],
  },

  "liver-function": {
    subtitle: "How healthy is your liver?",
    description:
      "A liver function test measures the enzymes, proteins, and bilirubin your liver makes. Your liver handles everything you eat, drink, and breathe, plus every medication you take. It rarely complains until the damage is serious, so testing is the only way to catch problems early.",
    whatItMeasures: [
      { marker: "ALT (Alanine Aminotransferase)", meaning: "The most specific liver enzyme. Raised ALT strongly suggests liver cell damage." },
      { marker: "AST (Aspartate Aminotransferase)", meaning: "Found in the liver and other tissues. High levels alongside ALT confirm the liver is involved." },
      { marker: "ALP (Alkaline Phosphatase)", meaning: "Raised in bile duct blockage, bone disease, or liver disease." },
      { marker: "Bilirubin", meaning: "A yellow pigment from red blood cell breakdown. High bilirubin causes jaundice, the yellowing of the eyes and skin." },
      { marker: "Albumin & Total Protein", meaning: "Made by the liver. Low levels suggest it isn't working properly." },
    ],
    whoShouldTest: [
      "Regular alcohol consumption (even moderate)",
      "Taking long-term medications (painkillers, antibiotics, supplements, herbal remedies)",
      "Family history of liver disease or hepatitis",
      "Overweight or diagnosed with fatty liver",
    ],
    preparation: "No special fasting required, though some clinicians prefer a morning sample. Avoid alcohol for 24 hours before.",
    sampleType: "Blood",
    turnaround: "24-48 hours",
    faqs: [
      { q: "Can herbal supplements damage my liver?", a: "Yes. Many herbal remedies are processed by the liver and some are directly toxic. It's a common and often overlooked cause of liver damage in Ghana. If you take herbal medicines, regular liver function testing matters even more." },
      { q: "Can the liver repair itself?", a: "The liver can heal remarkably well. If the damage is caught early and the cause is removed, whether it's alcohol, a medication, or an infection, it can often recover fully. That's why early testing matters so much." },
      { q: "What does jaundice mean?", a: "Yellow eyes or skin mean bilirubin is building up because your liver can't process it properly. It's a late sign, and this test catches liver problems long before jaundice shows." },
    ],
  },

  "kidney-function": {
    subtitle: "Are your kidneys keeping up?",
    description:
      "Your kidneys filter about 180 litres of blood every day, clearing waste and balancing your body's water and minerals. A kidney function test shows how well they're doing that job, and it catches problems that build up quietly for years before symptoms show.",
    whatItMeasures: [
      { marker: "Creatinine", meaning: "A waste product from muscle activity. High creatinine means your kidneys aren't filtering well." },
      { marker: "Urea (BUN)", meaning: "Another waste product. Raised urea confirms reduced kidney function." },
      { marker: "eGFR", meaning: "Estimated Glomerular Filtration Rate. Worked out from creatinine, it grades kidney function from normal to severe impairment." },
      { marker: "Electrolytes (Na, K, Cl)", meaning: "Sodium, potassium, and chloride. Your kidneys keep these in balance, and abnormal levels can cause dangerous heart rhythm problems." },
    ],
    whoShouldTest: [
      "Diabetic or pre-diabetic (diabetes is the leading cause of kidney failure)",
      "High blood pressure (the second leading cause of kidney failure)",
      "Taking NSAIDs or other medications long-term",
      "Family history of kidney disease",
    ],
    preparation: "No fasting required. Stay well hydrated and drink water as normal before the test.",
    sampleType: "Blood",
    turnaround: "24-48 hours",
    faqs: [
      { q: "Can kidney damage be reversed?", a: "Early kidney disease (stages 1 to 2) can often be slowed or even reversed by treating the cause: controlling blood sugar and blood pressure, and stopping harmful medications. Late-stage damage is permanent, which is why catching it early is so important." },
      { q: "What is eGFR?", a: "It estimates how many millilitres of blood your kidneys filter per minute. Above 90 is normal. Below 60 held for three months means chronic kidney disease. Below 15 may call for dialysis." },
      { q: "I drink a lot of water. Does that protect my kidneys?", a: "Staying hydrated helps, but it won't stop kidney damage from diabetes, high blood pressure, or toxic medications. Testing is the only reliable way to know your kidney health." },
    ],
  },

  "thyroid-function": {
    subtitle: "The gland that controls your metabolism",
    description:
      "Your thyroid is a small butterfly-shaped gland in your neck, yet it controls your metabolism, energy, mood, weight, heart rate, and body temperature. When it's even a little off, everything can feel wrong. This test measures the hormones that tell the full story.",
    whatItMeasures: [
      { marker: "TSH (Thyroid Stimulating Hormone)", meaning: "The main signal from your brain to your thyroid. High TSH means your thyroid is underactive (hypothyroid). Low TSH means it's overactive (hyperthyroid)." },
      { marker: "Free T4 (Thyroxine)", meaning: "The main hormone your thyroid produces. Low T4 with high TSH confirms hypothyroidism." },
      { marker: "Free T3 (Triiodothyronine)", meaning: "The most active thyroid hormone. It helps make sense of symptoms when TSH and T4 are borderline." },
    ],
    whoShouldTest: [
      "Unexplained weight gain or weight loss",
      "Lasting fatigue, brain fog, or mood changes",
      "Family history of thyroid disease",
      "Women planning pregnancy or with irregular periods",
    ],
    preparation: "No fasting required. Best done in the morning. If you take thyroid medication, do the test before your morning dose.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    faqs: [
      { q: "What are the symptoms of thyroid problems?", a: "When underactive: fatigue, weight gain, feeling cold, constipation, dry skin, thinning hair, low mood. When overactive: weight loss, anxiety, tremors, fast heartbeat, sweating, trouble sleeping. Many people live with mild symptoms for years." },
      { q: "Are thyroid problems treatable?", a: "Yes. An underactive thyroid is treated with a daily tablet, levothyroxine, that replaces the missing hormone. An overactive thyroid has several treatment options. Both are very manageable once diagnosed." },
      { q: "Is thyroid disease common in Ghana?", a: "Thyroid disorders go underdiagnosed in Ghana because the symptoms look like stress and fatigue. Many people live with thyroid problems for years without knowing, and a simple blood test can change that." },
    ],
  },

  "urine-re": {
    subtitle: "A simple sample that reveals a lot",
    description:
      "A urine routine examination checks your urine for sugar, protein, blood, bacteria, and other markers. It's one of the simplest and cheapest tests in medicine, yet it can reveal kidney disease, urinary tract infections, diabetes spilling into the urine, and more, often before you feel anything.",
    whatItMeasures: [
      { marker: "Protein (albumin)", meaning: "Protein in urine is an early sign of kidney damage, especially from diabetes or high blood pressure." },
      { marker: "Glucose", meaning: "Sugar in urine suggests your blood sugar is steadily very high, a sign of uncontrolled diabetes." },
      { marker: "Blood", meaning: "Blood in urine can point to infection, kidney stones, or other urinary tract conditions." },
      { marker: "Bacteria & white cells", meaning: "Signs of a urinary tract infection (UTI), which is common, especially in women." },
      { marker: "Casts & crystals", meaning: "Tiny structures, seen under the microscope, that point to specific kidney conditions." },
    ],
    whoShouldTest: [
      "Pain or burning during urination",
      "Frequent or urgent urination",
      "Diabetic or hypertensive (routine kidney monitoring)",
      "Pregnant women (routine prenatal screening)",
    ],
    preparation: "No fasting needed. A midstream, clean-catch sample is best, and your lab will show you how.",
    sampleType: "Urine",
    turnaround: "24-48 hours",
    faqs: [
      { q: "What is a 'midstream clean-catch' sample?", a: "Start urinating, then catch the middle part in the container. This keeps skin bacteria out and gives the most accurate results." },
      { q: "Can a urine test detect pregnancy?", a: "A standard urine R/E doesn't test for pregnancy on its own, though some labs include it. If you need a pregnancy test, ask for it directly." },
      { q: "Why is protein in urine important?", a: "Even small amounts of protein, called microalbuminuria, mean your kidneys' filters are leaking. This is often the very first sign of kidney damage from diabetes or high blood pressure, and catching it now means treatment can prevent more harm." },
    ],
  },

  "malaria-rdt": {
    subtitle: "Fast, accurate malaria detection",
    description:
      "A malaria rapid diagnostic test picks up malaria parasites in your blood within 15 to 20 minutes. Malaria is still one of the biggest health threats in Ghana, and getting the diagnosis right matters. Treating the wrong infection wastes time and money, and delaying malaria treatment can be dangerous.",
    whatItMeasures: [
      { marker: "Plasmodium antigens", meaning: "Proteins made by malaria parasites. The RDT picks these up from a drop of blood." },
      { marker: "Species identification", meaning: "Tells whether it's P. falciparum, the most dangerous type and common in Ghana, or another species." },
    ],
    whoShouldTest: [
      "Fever, chills, or headache lasting more than a day",
      "Recently visited a high-malaria area",
      "Recurring episodes of fever and body aches",
      "Before starting antimalarial treatment (to confirm diagnosis)",
    ],
    preparation: "No preparation needed. Best done during or soon after a fever episode for the most accurate result.",
    sampleType: "Blood (finger prick)",
    turnaround: "15-20 minutes (rapid result)",
    faqs: [
      { q: "How accurate is the rapid test?", a: "Malaria RDTs are over 95% accurate for P. falciparum when parasite levels are high enough to detect. For very early infections with low parasite loads, blood film microscopy may pick up more, so consider the Shield panel if you want both." },
      { q: "Can I have malaria without fever?", a: "People who've had malaria many times, which is common in Ghana, can build partial immunity and carry parasites with mild or no symptoms. If you feel generally unwell, testing is still worth it." },
      { q: "Why not just take antimalarials when I feel sick?", a: "Many fevers in Ghana are not malaria. Typhoid, viral infections, and other conditions share the same symptoms. Taking antimalarials for a fever that isn't malaria delays the right treatment and feeds drug resistance." },
    ],
  },

  hiv: {
    subtitle: "Know your status, fully confidential",
    description:
      "An HIV screening test looks for antibodies and antigens that show HIV infection. Knowing your status puts you in control. If you're negative, you can take steps to stay that way. If you're positive, early treatment means a normal life expectancy. All results are fully confidential and go only to your personal dashboard.",
    whatItMeasures: [
      { marker: "HIV-1 & HIV-2 antibodies", meaning: "Antibodies your body makes in response to HIV. In most cases they can be detected 2 to 4 weeks after exposure." },
      { marker: "p24 antigen", meaning: "A protein from the virus itself. It shows up earlier than antibodies, which shortens the window period." },
    ],
    whoShouldTest: [
      "Everyone should know their HIV status, at least once",
      "New sexual relationship",
      "Planning to start a family",
      "Healthcare workers or anyone with occupational exposure risk",
    ],
    preparation: "No fasting or preparation needed. Walk in any time.",
    sampleType: "Blood",
    turnaround: "Same-day rapid result available; confirmatory test within 48 hours",
    faqs: [
      { q: "Is this confidential?", a: "Yes. Your results show only in your personal BetterHealth dashboard, protected by your login. We don't share them with partners, employers, family, or anyone else without your permission." },
      { q: "How soon after exposure can I test?", a: "Fourth-generation tests, which detect both antibodies and antigens, can pick up HIV as early as 2 to 4 weeks after exposure. To be fully sure, test again at three months if the first result is negative." },
      { q: "What if I test positive?", a: "Today's HIV treatment, called ART, works very well. People who start early and take it consistently have a normal life expectancy and can reach 'undetectable' status, which means they cannot pass the virus to partners." },
    ],
  },

  "hepatitis-b": {
    subtitle: "One of Ghana's most common infections",
    description:
      "Hepatitis B is a viral infection that attacks the liver. Ghana has one of the highest rates in the world. Roughly 1 in 8 Ghanaians carry the virus, most without knowing. It spreads through blood, sex, and from mother to child. The good news is that a vaccine prevents it and monitoring keeps it in check.",
    whatItMeasures: [
      { marker: "HBsAg (Hepatitis B Surface Antigen)", meaning: "The main marker of current hepatitis B infection. If it's positive, the virus is present in your blood." },
    ],
    whoShouldTest: [
      "Everyone born in Ghana (high-prevalence region)",
      "Never been vaccinated for Hepatitis B",
      "Healthcare workers or anyone with blood contact risk",
      "Pregnant women (to prevent mother-to-child transmission)",
    ],
    preparation: "No fasting or preparation needed.",
    sampleType: "Blood",
    turnaround: "24-48 hours",
    faqs: [
      { q: "Is Hepatitis B curable?", a: "Acute Hep B, a new infection, often clears on its own. Chronic Hep B can't be fully cured yet, but it's manageable with monitoring and, if needed, antiviral medication. Many people with chronic Hep B live full, healthy lives." },
      { q: "Should I get vaccinated?", a: "If you've never been infected and never vaccinated, yes. The Hep B vaccine is one of the most effective ever made, with over 95% protection. It's given as three doses over six months." },
      { q: "Can I spread Hep B without knowing?", a: "Yes. Most carriers have no symptoms for years or even decades while the virus quietly damages their liver and can still be passed on. That's why testing matters so much, especially in Ghana where it's common." },
      { q: "What happens if I'm positive?", a: "Your clinician will suggest more tests, like viral load and liver function, to see what stage you're at and decide whether you need treatment now or monitoring for now." },
    ],
  },

  "uric-acid": {
    subtitle: "Gout, kidney health, and metabolic stress",
    description:
      "Uric acid is a waste product your body makes when it breaks down purines, which are found in certain foods and in your own cells. Normally your kidneys clear it out, but when it builds up it can form crystals in your joints, causing gout, or damage your kidneys. It also says something about your overall metabolic health.",
    whatItMeasures: [
      { marker: "Serum uric acid", meaning: "The level of uric acid in your blood. High levels (hyperuricaemia) raise the risk of gout, kidney stones, and cardiovascular disease." },
    ],
    whoShouldTest: [
      "Joint pain, especially in the big toe (classic gout symptom)",
      "History of kidney stones",
      "High blood pressure or metabolic syndrome",
      "Diet high in red meat, organ meats, or beer",
    ],
    preparation: "No fasting required, though some clinicians prefer a morning sample. Skip high-purine foods the day before for the most accurate reading.",
    sampleType: "Blood",
    turnaround: "24-48 hours",
    faqs: [
      { q: "What is gout?", a: "Gout is a very painful form of arthritis caused by uric acid crystals settling in your joints. It usually hits the big toe first but can affect any joint. Once diagnosed, it can be treated and prevented." },
      { q: "Can diet affect uric acid levels?", a: "Yes. Red meat, organ meats like liver and kidney, shellfish, beer, and sugary drinks all raise uric acid. Cutting back on these, drinking more water, and eating more vegetables can lower your levels a lot." },
      { q: "Is high uric acid dangerous even without gout?", a: "Yes. High uric acid is linked on its own to kidney disease, high blood pressure, and cardiovascular risk, even if you've never had a gout attack. It's worth keeping an eye on." },
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
