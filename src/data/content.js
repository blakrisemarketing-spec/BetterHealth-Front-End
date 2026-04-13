export const navLinks = ["How It Works", "What We Test", "Pricing", "About", "Stories"];

export const heroStats = [
  { value: "127+", label: "Biomarkers" },
  { value: "Home", label: "Collection" },
  { value: "GHS 2", label: "Per day" },
];

export const trustedPartners = ["Lab Access Ghana", "Banita Laboratory", "Paystack"];

export const conditions = [
  "Diabetes", "Hypertension", "Sickle Cell Trait", "Hepatitis B", "Thyroid Disorders",
  "Kidney Disease", "Liver Disease", "Anemia", "PCOS", "Prostate Cancer",
  "High Cholesterol", "Vitamin D Deficiency", "Gout", "HIV Monitoring",
  "Iron Deficiency", "Malaria Aftermath", "Fatty Liver", "Insulin Resistance",
  "Hormonal Imbalance", "Chronic Inflammation", "Autoimmune Markers", "Celiac Disease",
];

export const conditions2 = [
  "Testosterone Levels", "Estrogen Levels", "B12 Deficiency", "Folate Deficiency",
  "Cortisol Imbalance", "Uric Acid", "Calcium Disorders", "Potassium Imbalance",
  "Hemochromatosis", "Lupus Markers", "Rheumatoid Markers", "Pancreatic Function",
  "Metabolic Syndrome", "Pre-eclampsia Risk", "Fertility Markers", "Bone Health",
];

export const howItWorksSteps = [
  { num: "01", icon: "Smartphone", title: "Sign Up", desc: "Create your account, choose your package, and pay with Mobile Money or card." },
  { num: "02", icon: "Home", title: "Book Collection", desc: "Choose in-lab visit or book home collection and get tested in the comfort of your home." },
  { num: "03", icon: "FlaskConical", title: "Get Results", desc: "Comprehensive results in your health dashboard within 48\u201372 hours. Every biomarker explained." },
  { num: "04", icon: "BarChart3", title: "Take Action", desc: "Personalized insights and recommendations. Track changes over time." },
];

export const showcaseFeatures = [
  { title: "Organ System Health View", desc: "See your heart, liver, kidney, and metabolic health at a glance with intuitive scores." },
  { title: "Biomarker Trend Tracking", desc: "Watch how your markers change over months and years. Spot patterns before problems emerge." },
  { title: "Plain-Language Explanations", desc: "Every result comes with clear explanations." },
];

export const testCategories = [
  { name: "Heart & Cardiovascular", short: "Heart", count: 12, markers: ["Total Cholesterol", "LDL / HDL", "Triglycerides", "ApoB", "Lp(a)", "hs-CRP", "Homocysteine", "Chol/HDL Ratio"] },
  { name: "Liver Function", short: "Liver", count: 6, markers: ["ALT", "AST", "ALP", "GGT", "Bilirubin", "Albumin"] },
  { name: "Kidney Function", short: "Kidney", count: 8, markers: ["Creatinine", "BUN", "eGFR", "Uric Acid", "Electrolytes (Na, K, Cl)", "Calcium", "Phosphate", "CO2"] },
  { name: "Metabolic & Diabetes", short: "Metabolic", count: 6, markers: ["Fasting Glucose", "HbA1c", "Insulin", "HOMA-IR", "C-Peptide", "Fructosamine"] },
  { name: "Hormones", short: "Hormones", count: 10, markers: ["Testosterone (Total & Free)", "Estradiol", "Progesterone", "DHEA-S", "Cortisol", "FSH / LH", "Prolactin", "SHBG"] },
  { name: "Nutrients & Vitamins", short: "Nutrients", count: 8, markers: ["Vitamin D", "Vitamin B12", "Folate", "Iron / Ferritin", "TIBC", "Zinc", "Magnesium", "Selenium"] },
  { name: "Blood Health", short: "Blood", count: 14, markers: ["CBC (Full Blood Count)", "Hemoglobin", "Hematocrit", "WBC Differential", "Platelet Count", "ESR", "Reticulocytes", "Sickle Cell Screen"] },
  { name: "Thyroid", short: "Thyroid", count: 5, markers: ["TSH", "Free T3", "Free T4", "TPO Antibodies", "Thyroglobulin Ab"] },
];

export const comparisonRows = [
  { feature: "100+ biomarkers in one visit", bh: true, hosp: false },
  { feature: "Home sample collection", bh: true, hosp: false },
  { feature: "Plain-language explanations", bh: true, hosp: false },
  { feature: "Detect and prevent diseases", bh: true, hosp: false },
  { feature: "Track biomarkers over your life time", bh: true, hosp: false },
  { feature: "Digital health dashboard", bh: true, hosp: false },
  { feature: "Personalized recommendations", bh: true, hosp: false },
  { feature: "No referral needed", bh: true, hosp: false },
  { feature: "Fixed transparent pricing", bh: true, hosp: false },
  { feature: "Own your health data in one place", bh: true, hosp: false },
  { feature: "Detailed nutritional plan", bh: true, hosp: false },
];

export const testimonials = [
  { name: "Ama K.", age: 34, location: "Accra", quote: "I discovered I was pre-diabetic at 34. My HbA1c was 6.1% \u2014 my doctor at the polyclinic had never tested for it. Three months of lifestyle changes later, I\u2019m back in the normal range.", discovery: "Pre-diabetes" },
  { name: "Kwame M.", age: 28, location: "Kumasi", quote: "My Vitamin D was critically low at 11 ng/mL. I had no idea that was causing my chronic fatigue and muscle pain. No doctor had ever checked this.", discovery: "Vitamin D deficiency" },
  { name: "Efua & Kofi A.", age: null, location: "Tema", quote: "We both found out we carry the sickle cell trait. We had no idea. Now we can make informed decisions about our family planning. This test may have saved our future child\u2019s life.", discovery: "Sickle cell trait" },
];

export const plans = [
  {
    name: "Essential",
    price: "61",
    annual: "730",
    daily: "2",
    popular: false,
    categories: [
      {
        name: "Physical Health",
        tests: [
          "Height",
          "Weight",
          "Body Mass Index (BMI)",
          "Waist-to-height ratio",
          "Blood Pressure",
        ],
      },
      {
        name: "Biological Health",
        tests: [
          "Full blood count",
          "Blood sugar",
          "Kidney function test",
          "Liver function test",
          "Urine routine examination",
          "Lipid profile",
          "Biological Age*",
        ],
      },
    ],
  },
  {
    name: "Complete",
    price: "163",
    annual: "1,953",
    daily: "5",
    popular: true,
    categories: [
      {
        name: "Physical Health",
        tests: [
          "Height",
          "Weight",
          "Body Mass Index (BMI)",
          "Waist-to-height ratio",
          "Blood Pressure",
        ],
      },
      {
        name: "Biological Health",
        tests: [
          "Full blood count",
          "Blood sugar",
          "Kidney function test",
          "Liver function test",
          "Urine routine examination",
          "Lipid Profile",
          "Uric acid",
          "Biological Age*",
          "Doctor's written report",
          "Standard nutritional plan",
        ],
      },
    ],
  },
  {
    name: "Premium",
    price: "414",
    annual: "4,957",
    daily: "19",
    popular: false,
    categories: [
      {
        name: "Physical Health",
        tests: [
          "Height",
          "Weight",
          "Body Mass Index (BMI)",
          "Waist-to-height ratio",
          "Blood Pressure",
        ],
      },
      {
        name: "Biological Health",
        tests: [
          "Full blood count",
          "Blood sugar",
          "Kidney function test",
          "Liver Function Test",
          "Urine routine examination",
          "Lipid profile",
          "Uric acid",
          "Cardiac troponins I & T",
          "C-Reactive Protein",
          "Additional tests worth GHC 300",
          "Free home or office sample collection",
          "Biological Age*",
          "Virtual Dr. Consultation",
          "Customised nutritional plan",
        ],
      },
    ],
  },
];

export const faqs = [
  { q: "How does home sample collection work?", a: "A certified phlebotomist from our partner Lab Access Ghana comes to your home at your scheduled time. The entire process takes about 15 minutes. You\u2019ll receive a confirmation SMS with your collector\u2019s name and estimated arrival time." },
  { q: "How do I pay?", a: "We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit/credit cards, and bank transfers. All payments are processed securely through Paystack, Ghana\u2019s leading payment platform." },
  { q: "How long until I get my results?", a: "Most results are available within 48\u201372 hours after your sample is collected. You\u2019ll receive an SMS and email notification when your results are ready to view in your health dashboard." },
  { q: "Is my health data private and secure?", a: "Absolutely. Your data is encrypted at rest and in transit. We follow international healthcare data protection standards. Only you and your authorized healthcare providers can access your results." },
  { q: "Do I need a doctor\u2019s referral?", a: "No referral needed. BetterHealth Africa is a direct-to-consumer health platform. You can sign up, choose your package, and book your collection independently." },
  { q: "What if my results show something concerning?", a: "Our platform flags any results outside the normal range. For critical findings, you\u2019ll receive immediate notification. We recommend discussing any concerning results with a healthcare provider, and our Premium plan includes a doctor consultation." },
];

export const founderQuote = "After watching diabetes and kidney disease kill all my beloved Aunties and Uncles, when it finally came for my parents - I knew things needed to change";

export const founderStory = [
  "In Ghana, comprehensive health screening has been a privilege of the rich few; it\u2019s expensive, fragmented, and available only in a few facilities. Most people only see a doctor when something is already wrong. We\u2019re changing that.",
  "BetterHealth Africa makes proactive health monitoring accessible, affordable, and beautifully simple. Because your health shouldn\u2019t be a mystery. What you don\u2019t know about your health can kill you, so start knowing.",
];

export const footerColumns = [
  { title: "Product", links: ["How It Works", "What We Test", "Pricing", "Download App"] },
  { title: "Company", links: ["About Us", "Stories", "Blog", "Careers"] },
  { title: "Support", links: ["FAQ", "Contact", "WhatsApp", "Privacy Policy"] },
];

export const phoneScreens = [
  {
    title: "Health Score",
    score: "87",
    label: "Overall Health",
    items: [
      { name: "Heart", val: "92", color: "#22c55e" },
      { name: "Liver", val: "88", color: "#22c55e" },
      { name: "Kidney", val: "76", color: "#f59e0b" },
      { name: "Metabolic", val: "84", color: "#22c55e" },
    ],
  },
  {
    title: "Lab Results",
    score: null,
    label: null,
    items: [
      { name: "HbA1c", val: "5.2%", color: "#22c55e", ref: "< 5.7%" },
      { name: "Total Cholesterol", val: "198", color: "#22c55e", ref: "< 200 mg/dL" },
      { name: "Vitamin D", val: "18 ng/mL", color: "#ef4444", ref: "> 30 ng/mL" },
      { name: "TSH", val: "2.4", color: "#22c55e", ref: "0.4 - 4.0 mIU/L" },
    ],
  },
  {
    title: "Biomarker Trends",
    score: null,
    label: null,
    items: [],
  },
];

// ─── How It Works Page ───────────────────────────────────────────────────────

export const howItWorksPage = {
  hero: {
    eyebrow: "How It Works",
    headline: "From sign-up to results in 72 hours.",
    subheadline: "No referrals. No long queues. No confusing lab reports. BetterHealth makes comprehensive health testing as simple as ordering a ride — and just as convenient.",
    cta: "Get Started",
  },
  steps: [
    {
      num: "01",
      heading: "Sign up in under 3 minutes",
      body: "Create your BetterHealth account with your email or phone number. Tell us a few basics — age, sex, and any health concerns you would like to focus on. Then choose the plan that fits your needs.",
      expects: [
        "Account creation takes less than 3 minutes",
        "Choose from Essential, Complete, or Premium packages",
        "Pay securely with Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit/credit card, or bank transfer via Paystack",
        "You will receive a confirmation email and SMS immediately",
      ],
    },
    {
      num: "02",
      heading: "Choose how and where you test",
      body: "You decide what works for you. Visit one of our accredited partner labs across Ghana, or book home collection and get tested in the comfort of your home. Either way, the blood draw takes about 10 minutes.",
      expects: [
        "In-lab option: Walk into any BetterHealth partner lab during opening hours. No appointment needed for Essential plans.",
        "Home collection: Pick a date and time that works for you, and our phlebotomist will be at your doorstep.",
        "You will receive an SMS confirmation with your collector's name and expected arrival time",
        "The blood draw takes 5–10 minutes",
        "Fasting required for some tests — such tests will be pre-informed when booking",
      ],
      subSection: {
        heading: "Home collection — how it works",
        body: "Our home collection service is provided through our partnership with Lab Access Ghana, one of the most established phlebotomy networks in the country. Every collector is certified, trained in venipuncture, and follows strict sample handling protocols.",
        details: [
          "Available in Greater Accra, Kumasi, and Tema (expanding to more cities)",
          "Collection window: Monday–Saturday, 6:00 AM – 12:00 PM (fasting-friendly morning slots)",
          "The collector brings everything — tubes, labels, cold chain packaging",
          "Your sample is transported to the lab within 2 hours of collection",
          "Home collection is included free with Premium plans",
          "Available as an add-on for Essential and Complete plan members",
        ],
      },
    },
    {
      num: "03",
      heading: "Clear, visual results in 48–72 hours",
      body: "No more waiting weeks. No more illegible printouts. Your results appear in your personal health dashboard — organised by organ system, colour-coded for clarity, and explained in language you actually understand.",
      expects: [
        "Results are typically available within 48–72 hours (Priority members: 48 hours)",
        "You will receive an SMS and email notification the moment your results are ready",
        "Log into your dashboard to see results organised by: Heart, Liver, Kidneys, Thyroid, Metabolic, Hormones, Blood Health, and Nutrients",
        "Every biomarker shows: your value, the reference range, a colour-coded status (green/amber/red), and a plain-language explanation",
        "Download a complete PDF report for your records or to share with your doctor",
        "Standard and Premium members receive a doctor's written report interpreting your results",
      ],
      subSection: {
        heading: "Your results, explained like a human",
        body: "Most lab reports give you a wall of numbers and abbreviations. BetterHealth translates every result into something you can actually understand and act on. Here is what you will see:",
        details: [
          "Organ System Scores — an at-a-glance view of how each body system is performing",
          "Colour-Coded Indicators — green (healthy), amber (watch), red (needs attention)",
          "Trend Charts — see how each biomarker has changed since your last test",
          "Personalised Insights — specific recommendations based on your results, age, sex, and health goals",
          "Critical Alerts — immediate notification if any result requires urgent attention",
        ],
      },
    },
    {
      num: "04",
      heading: "Know what to do next",
      body: "Results without guidance are just numbers. BetterHealth gives you clear, actionable recommendations — what to change, what to monitor, and when to test again. Track your progress over time and watch your health improve.",
      expects: [
        "Personalized recommendations based on your specific results",
        "Dietary and lifestyle suggestions tailored to your biomarker profile",
        "Alerts for any markers that need medical attention",
        "Premium members: schedule a consultation call with a doctor or nutritionist to discuss your results",
        "Set a reminder for your next screening (recommended every 6 months)",
        "Compare results across screenings to see improvement over time",
      ],
    },
  ],
  safetyCards: [
    { icon: "FlaskConical", title: "Accredited Partner Labs", body: "Every sample is processed at labs that meet Ghana Health Service standards. We do not run our own labs — we partner with established, accredited facilities so you get the same quality as a hospital without the hospital experience." },
    { icon: "UserCheck", title: "Certified Phlebotomists", body: "Every home collector is trained, certified, and background-checked through our partnership with Lab Access Ghana. They follow strict venipuncture and cold-chain protocols to ensure sample integrity." },
    { icon: "ShieldCheck", title: "Data Encryption & Privacy", body: "Your health data is encrypted at rest and in transit using industry-standard protocols. We never sell your data. Only you and healthcare providers you explicitly authorize can access your results." },
    { icon: "PackageCheck", title: "Chain of Custody", body: "Every sample is tracked from collection to result — timestamped, labelled with a unique accession number, and transported in temperature-controlled packaging. You can see the status of your sample in your dashboard." },
  ],
  faqs: [
    { q: "Do I need to fast before my blood test?", a: "Some biomarkers require fasting (no food or drink except water for 8–12 hours before collection). When you book your collection, we will tell you exactly which tests require fasting and give you clear preparation instructions via SMS." },
    { q: "How much blood is taken?", a: "A comprehensive panel typically requires 3–5 tubes of blood, totalling about 15–25 mL. That is roughly 1–2 tablespoons. Most people feel no effects afterward." },
    { q: "What if I am afraid of needles?", a: "Our phlebotomists are experienced and gentle — many patients tell us it is the most comfortable blood draw they have had. If you are particularly anxious, let us know when you book and we will pair you with a collector experienced in working with needle-shy patients." },
    { q: "Can I use my results to visit my doctor?", a: "Absolutely. You can download a complete PDF report with all your results, reference ranges, and interpretations. Many of our members share their BetterHealth reports with their doctors as part of their ongoing care." },
    { q: "What happens if a result is critically abnormal?", a: "If any result falls into a critical range, you will receive an immediate notification via SMS and in-app alert. Our system flags these results for priority review, and we recommend you consult a healthcare provider promptly. Premium members can use their included doctor consultation for this." },
  ],
  bottomCta: {
    headline: "Ready to know your health?",
    body: "The process takes less than 3 minutes to start. Choose your plan, book your collection, and get results in 48–72 hours.",
    cta: "Start Your Health Check",
  },
};

// ─── What We Test Page ────────────────────────────────────────────────────────

export const whatWeTestPage = {
  hero: {
    eyebrow: "What We Test",
    headline: "127+ biomarkers. 8 body systems. One clear picture.",
    subheadline: "A typical hospital checkup tests 10–15 markers. BetterHealth tests over 127 — covering your heart, liver, kidneys, thyroid, metabolism, hormones, blood health, and nutrition. Every result is explained in plain language and tracked over time.",
    cta: "Start Testing",
    intro: "Below you will find every body system we test, why it matters for your health, and the specific biomarkers included. Each plan covers a different depth — see the plan comparison at the bottom to understand which markers are included in your package.",
  },
  systems: [
    {
      icon: "Heart",
      name: "Heart & Cardiovascular",
      count: 12,
      why: "Heart disease is the leading cause of death in Ghana — and it is almost entirely preventable when caught early. Most people do not know their cardiovascular risk until they are in a hospital bed. These 12 markers give you the complete picture of your heart health, far beyond the basic cholesterol test you might get at a hospital.",
      markers: [
        { name: "Total Cholesterol", note: "the headline number, but not the full story" },
        { name: "LDL Cholesterol", note: "the 'bad' cholesterol — the one that clogs arteries" },
        { name: "HDL Cholesterol", note: "the 'good' cholesterol — the one that protects them" },
        { name: "Triglycerides", note: "fat in your blood, often elevated by diet and lifestyle" },
        { name: "ApoB", note: "the single best predictor of heart attack risk (most hospitals do not test this)" },
        { name: "Lp(a)", note: "a genetic risk marker that does not change with diet or exercise" },
        { name: "hs-CRP", note: "measures inflammation, a hidden driver of heart disease" },
        { name: "Homocysteine", note: "elevated levels damage blood vessel walls" },
        { name: "Total Cholesterol / HDL Ratio", note: "more predictive than cholesterol alone" },
        { name: "LDL / HDL Ratio", note: "helps assess the balance of protective vs. harmful cholesterol" },
        { name: "Non-HDL Cholesterol", note: "captures all the cholesterol types that contribute to plaque" },
        { name: "ApoB / ApoA1 Ratio", note: "the most advanced cardiovascular risk ratio available" },
      ],
      callout: "ApoB is considered a more accurate predictor of heart disease than LDL cholesterol, yet most hospitals in Ghana do not test for it. Every BetterHealth panel includes it.",
    },
    {
      icon: "Activity",
      name: "Liver Function",
      count: 6,
      why: "Your liver filters toxins, processes medications, produces bile, stores energy, and performs over 500 functions. Liver disease is often called the 'silent killer' because it can progress to advanced stages without any symptoms. By the time you feel something, significant damage may already be done. Regular monitoring catches problems when they are still reversible.",
      markers: [
        { name: "ALT", note: "the most specific marker of liver cell damage" },
        { name: "AST", note: "elevated in liver damage, also indicates heart or muscle injury" },
        { name: "ALP", note: "signals bile duct problems or bone disorders" },
        { name: "GGT", note: "sensitive to alcohol use, fatty liver, and bile flow issues" },
        { name: "Bilirubin (Total)", note: "a waste product from red blood cell breakdown; elevated levels cause jaundice" },
        { name: "Albumin", note: "produced by the liver; low levels indicate chronic liver disease or malnutrition" },
      ],
      callout: "Fatty liver disease affects an estimated 25% of adults globally, often without any symptoms. The ALT/AST ratio can detect it early — before irreversible scarring begins.",
    },
    {
      icon: "Droplets",
      name: "Kidney Function",
      count: 8,
      why: "Your kidneys filter 200 litres of blood every day, removing waste and regulating fluid balance. Chronic kidney disease develops silently over years — most people lose 50% of kidney function before they notice anything. In Ghana, where hypertension and diabetes are rising, kidney screening is critical. Early detection means early intervention.",
      markers: [
        { name: "Creatinine", note: "waste product filtered by kidneys; elevated levels signal impaired function" },
        { name: "BUN (Blood Urea Nitrogen)", note: "another kidney filtration marker" },
        { name: "eGFR", note: "the gold standard measure of how well your kidneys are working" },
        { name: "Uric Acid", note: "high levels cause gout and can indicate kidney stress" },
        { name: "Electrolytes: Sodium, Potassium, Chloride", note: "imbalances can signal kidney problems" },
        { name: "Calcium", note: "regulated by kidneys; abnormalities affect bones, muscles, and nerves" },
        { name: "Phosphate", note: "managed by kidneys; important for bone health" },
        { name: "CO2 (Bicarbonate)", note: "measures acid-base balance, regulated by kidneys" },
      ],
      callout: "High blood pressure — affecting 1 in 3 Ghanaian adults — is the leading cause of kidney disease. If you have hypertension, regular kidney monitoring is not optional. It is essential.",
    },
    {
      icon: "Gauge",
      name: "Metabolic & Diabetes",
      count: 6,
      why: "Ghana's diabetes prevalence has tripled in the last 20 years, and an estimated 70% of people with diabetes in Africa are undiagnosed. Pre-diabetes is completely reversible with lifestyle changes — but only if you know you have it. A standard fasting glucose test misses most cases of pre-diabetes. Our panel catches what standard tests miss.",
      markers: [
        { name: "Fasting Glucose", note: "your blood sugar level after overnight fasting" },
        { name: "HbA1c", note: "your average blood sugar over the past 2–3 months; the most reliable diabetes marker" },
        { name: "Insulin", note: "elevated levels signal insulin resistance years before blood sugar rises" },
        { name: "HOMA-IR", note: "the best measure of insulin resistance" },
        { name: "C-Peptide", note: "indicates how much insulin your pancreas is actually producing" },
        { name: "Fructosamine", note: "blood sugar average over the past 2–3 weeks; useful for tracking short-term changes" },
      ],
      callout: "Most doctors only test fasting glucose. But insulin resistance — the precursor to diabetes — shows up in insulin and HOMA-IR years before glucose rises. BetterHealth catches this window when lifestyle changes are most effective.",
    },
    {
      icon: "Waves",
      name: "Hormones",
      count: 10,
      why: "Hormones regulate energy, mood, sleep, weight, fertility, and muscle mass. Imbalances cause fatigue, weight changes, low mood, hair loss, irregular periods, reduced libido, and dozens of other symptoms that are frequently dismissed as 'just stress.' A full hormone panel reveals what is actually happening inside — and whether your symptoms have a treatable cause.",
      markers: [
        { name: "Testosterone (Total & Free)", note: "essential for both men and women; affects energy, mood, and muscle" },
        { name: "Estradiol", note: "the primary estrogen; critical for female reproductive health and bone density" },
        { name: "Progesterone", note: "regulates menstrual cycle and supports pregnancy" },
        { name: "DHEA-S", note: "a precursor hormone; low levels are associated with fatigue and ageing" },
        { name: "Cortisol", note: "the stress hormone; chronically elevated levels damage nearly every system" },
        { name: "FSH", note: "essential for fertility in both sexes" },
        { name: "LH", note: "works with FSH to regulate reproduction" },
        { name: "Prolactin", note: "elevated levels can indicate pituitary issues or affect fertility" },
        { name: "SHBG", note: "determines how much of your hormones are actually available for use" },
        { name: "Anti-Müllerian Hormone (AMH)", note: "the best marker of ovarian reserve (female fertility potential)" },
      ],
      callout: "Testosterone levels in men begin declining from age 30 at roughly 1% per year. Many symptoms blamed on 'getting older' — fatigue, weight gain, low mood — are actually treatable hormonal imbalances.",
    },
    {
      icon: "Sun",
      name: "Nutrients & Vitamins",
      count: 8,
      why: "Nutrient deficiencies are the silent saboteurs of health. They cause fatigue, weak immunity, poor concentration, hair loss, muscle cramps, and depression — symptoms that are often treated with medications when the real fix is nutritional. In West Africa, Vitamin D deficiency, iron deficiency, and B12 deficiency are more common than most people realize.",
      markers: [
        { name: "Vitamin D", note: "critical for immune function, bone health, and mood; deficiency is widespread even in sunny climates" },
        { name: "Vitamin B12", note: "essential for nerve function and red blood cell production; deficiency causes fatigue and neurological symptoms" },
        { name: "Folate (Vitamin B9)", note: "crucial for cell division; especially important for women of childbearing age" },
        { name: "Iron", note: "carries oxygen in your blood; deficiency is the world's most common nutritional disorder" },
        { name: "Ferritin", note: "your body's iron reserves; low ferritin causes fatigue even when haemoglobin is normal" },
        { name: "TIBC", note: "helps differentiate types of anaemia" },
        { name: "Zinc", note: "supports immune function, wound healing, and taste/smell" },
        { name: "Magnesium", note: "involved in over 300 enzyme reactions; deficiency causes muscle cramps, anxiety, and poor sleep" },
      ],
      callout: "Ferritin can be critically low even when your haemoglobin (the standard anaemia test) is normal. If you have been told 'you are not anaemic' but still feel exhausted, ferritin is the test that reveals the real picture.",
    },
    {
      icon: "Droplet",
      name: "Blood Health",
      count: 14,
      why: "Your blood is a living tissue that carries oxygen, fights infection, and heals wounds. A full blood count reveals anaemia, infection, blood disorders, and immune system function — all from a single tube. In Ghana, where sickle cell trait affects approximately 25% of the population, a complete blood analysis is essential baseline knowledge.",
      markers: [
        { name: "CBC (Full Blood Count)", note: "the most comprehensive single blood test" },
        { name: "Haemoglobin", note: "oxygen-carrying protein; low levels indicate anaemia" },
        { name: "Haematocrit", note: "percentage of blood volume occupied by red cells" },
        { name: "WBC (White Blood Cell Count)", note: "your immune army; high or low counts signal infection or immune issues" },
        { name: "WBC Differential", note: "breaks down white blood cells by type" },
        { name: "Platelet Count", note: "essential for blood clotting" },
        { name: "MCV, MCH, MCHC", note: "red blood cell size and haemoglobin content; helps classify types of anaemia" },
        { name: "RDW", note: "variation in red blood cell size; elevated in iron deficiency and other conditions" },
        { name: "ESR", note: "a general marker of inflammation in the body" },
        { name: "Reticulocyte Count", note: "measures new red blood cell production; helps diagnose bone marrow function" },
        { name: "Sickle Cell Screen", note: "tests for sickle cell trait and sickle cell disease" },
      ],
      callout: "Approximately 1 in 4 Ghanaians carries the sickle cell trait. Most do not know. If two carriers have children together, each child has a 25% chance of sickle cell disease. Knowing your status is one of the most impactful health decisions you can make.",
    },
    {
      icon: "Radio",
      name: "Thyroid",
      count: 5,
      why: "Your thyroid controls your metabolism — the speed at which every cell in your body operates. An underactive thyroid causes weight gain, fatigue, depression, and cold intolerance. An overactive thyroid causes weight loss, anxiety, rapid heartbeat, and insomnia. Thyroid dysfunction is frequently undiagnosed in Africa because many doctors only test TSH. Our full panel tests five markers to catch what TSH alone misses.",
      markers: [
        { name: "TSH", note: "the first-line screening test; but it is not enough on its own" },
        { name: "Free T3 (Triiodothyronine)", note: "the active thyroid hormone; low levels cause symptoms even when TSH is normal" },
        { name: "Free T4 (Thyroxine)", note: "the storage form of thyroid hormone; converted to T3 in the body" },
        { name: "TPO Antibodies", note: "detects Hashimoto's thyroiditis, the most common autoimmune thyroid disease" },
        { name: "Thyroglobulin Antibodies", note: "another autoimmune marker; helps diagnose chronic thyroid inflammation" },
      ],
      callout: "Up to 15% of people with thyroid symptoms have a 'normal' TSH. Free T3, Free T4, and antibody tests reveal the full picture — which is why BetterHealth tests all five, not just TSH.",
    },
  ],
  planTable: {
    headline: "Which biomarkers are included in each plan?",
    subheadline: "Every plan gives you meaningful insight. Higher tiers go deeper.",
    rows: [
      { system: "Heart & Cardiovascular", essential: "6 core markers", complete: "All 12", premium: "All 12" },
      { system: "Liver Function", essential: "All 6", complete: "All 6", premium: "All 6" },
      { system: "Kidney Function", essential: "5 core markers", complete: "All 8", premium: "All 8" },
      { system: "Metabolic & Diabetes", essential: "3 markers", complete: "All 6", premium: "All 6" },
      { system: "Hormones", essential: "4 markers", complete: "8 markers", premium: "All 10" },
      { system: "Nutrients & Vitamins", essential: "4 markers", complete: "All 8", premium: "All 8 + Selenium" },
      { system: "Blood Health", essential: "CBC + Sickle Cell Screen", complete: "All 14", premium: "All 14" },
      { system: "Thyroid", essential: "TSH only", complete: "TSH + Free T3 + Free T4", premium: "All 5 incl. antibodies" },
    ],
    cta: "Choose Your Plan",
  },
  bottomCta: {
    headline: "See the full picture. Not just a glimpse.",
    body: "A hospital checkup tests 10–15 markers and calls it comprehensive. BetterHealth tests 127+ because your body deserves better than a sample.",
    cta: "Start Your Health Check",
  },
};

// ─── Stories Page ──────────────────────────────────────────────────────────────────

export const storiesPage = {
  hero: {
    eyebrow: "BetterHealth Stories",
    headline: "The tests their doctors never ordered.",
    subheadline: "Real people. Real discoveries. These are the stories of Ghanaians who found something important in their BetterHealth results — conditions no doctor had tested for, imbalances no one had explained, and risks no one had flagged.",
  },
  stories: [
    {
      tag: "Pre-diabetes",
      tagColor: "amber",
      name: "Ama",
      age: 34,
      city: "Accra",
      headline: "\u201cI was 34 and pre-diabetic. No doctor had ever tested my HbA1c.\u201d",
      narrative: [
        "Ama is a 34-year-old marketing manager in Accra. She exercises three times a week, eats well, and considered herself healthy. She signed up for BetterHealth out of curiosity — \u201cI just wanted to see my numbers,\u201d she says.",
        "Her results came back mostly green. Heart health: excellent. Liver: normal. Kidneys: normal. But one marker was amber: HbA1c at 6.1%.",
        "\u201cI didn\u2019t even know what HbA1c was,\u201d Ama recalls. \u201cWhen I read the explanation in the dashboard, I felt my stomach drop. It said I was pre-diabetic. That my average blood sugar over the past three months was elevated. That if I didn\u2019t change something, I was on a path to Type 2 diabetes.\u201d",
        "Ama had been to her doctor twice that year for routine checkups. Both times, the only blood test ordered was a fasting glucose — which came back normal at 5.4 mmol/L. What no one had told her was that fasting glucose can remain normal for years while HbA1c slowly creeps upward.",
        "Ama made changes. She reduced refined carbohydrates, increased her fibre intake, and added a 20-minute walk after dinner. Three months later, she retested. Her HbA1c had dropped to 5.5% — firmly in the normal range.",
      ],
      numbers: [
        { label: "HbA1c", before: "6.1%", after: "5.5%", status: "pre-diabetic \u2192 normal" },
        { label: "Fasting Glucose", before: "5.4 mmol/L", after: null, status: "\u201cnormal\u201d — missed the full picture" },
        { label: "Insulin", before: "14.2 mIU/L", after: null, status: "elevated — a missed signal" },
        { label: "HOMA-IR", before: "3.4", after: null, status: "insulin resistant" },
      ],
      quote: "\u201cMy doctor tested my glucose twice and said I was fine. BetterHealth tested my HbA1c once and caught what she missed.\u201d",
    },
    {
      tag: "Vitamin D deficiency",
      tagColor: "orange",
      name: "Kwame",
      age: 28,
      city: "Kumasi",
      headline: "\u201cI thought I was just tired. My Vitamin D was at 11 ng/mL.\u201d",
      narrative: [
        "Kwame is a 28-year-old software developer in Kumasi. For over a year, he\u2019d been dealing with persistent fatigue, muscle aches, and poor concentration. He blamed it on long hours and screen time.",
        "\u201cI told myself it was burnout,\u201d Kwame says. \u201cI even started drinking more coffee to push through. I never imagined it was a nutritional deficiency.\u201d",
        "Kwame\u2019s BetterHealth results flagged his Vitamin D at 11 ng/mL — critically low. The optimal range is 30\u201350 ng/mL. His ferritin was also low at 18 ng/mL, indicating depleted iron stores.",
        "\u201cI was shocked. I live in one of the sunniest countries on earth. How could I be Vitamin D deficient?\u201d The answer: Vitamin D synthesis depends on direct sun exposure to bare skin, and Kwame spent most daylight hours indoors.",
        "With targeted supplementation, Kwame felt a difference within three weeks. After two months, his energy, focus, and muscle pain had improved significantly.",
      ],
      numbers: [
        { label: "Vitamin D", before: "11 ng/mL", after: "38 ng/mL", status: "critically low \u2192 optimal" },
        { label: "Ferritin", before: "18 ng/mL", after: "52 ng/mL", status: "depleted \u2192 healthy" },
        { label: "Haemoglobin", before: "13.2 g/dL", after: null, status: "normal — standard test showed nothing" },
      ],
      quote: "\u201cNo doctor had ever checked my Vitamin D or ferritin. I spent a year exhausted because of tests that cost GHS 20 each.\u201d",
    },
    {
      tag: "Sickle cell trait",
      tagColor: "red",
      name: "Efua & Kofi",
      age: null,
      city: "Tema",
      headline: "\u201cWe both carry the sickle cell trait. We had no idea.\u201d",
      narrative: [
        "Efua and Kofi are a married couple in Tema, both in their early 30s. They were planning to start a family. Neither had ever been tested for sickle cell — \u201cIt\u2019s not something anyone brought up,\u201d Efua says.",
        "As part of their BetterHealth screening, both received sickle cell screening results. Both came back positive for sickle cell trait (AS genotype).",
        "\u201cWhen I saw the result, I didn\u2019t fully understand what it meant,\u201d Kofi admits. \u201cThen I saw Efua\u2019s result was the same. That\u2019s when it hit us.\u201d",
        "When two sickle cell carriers have children together, each child has a 25% chance of having sickle cell disease — a serious, lifelong condition. In Ghana, approximately 2% of all newborns have sickle cell disease.",
        "Efua and Kofi consulted a genetic counsellor and are now exploring their family planning options with full knowledge of the risks.",
      ],
      numbers: [
        { label: "Efua genotype", before: "AS", after: null, status: "sickle cell trait carrier" },
        { label: "Kofi genotype", before: "AS", after: null, status: "sickle cell trait carrier" },
        { label: "Risk per pregnancy", before: "25% SS", after: null, status: "50% AS carrier, 25% AA unaffected" },
      ],
      quote: "\u201cEvery couple planning a family in Ghana should know their sickle cell status. This is the most important test we\u2019ve ever taken.\u201d",
    },
    {
      tag: "Elevated liver enzymes",
      tagColor: "yellow",
      name: "Nana",
      age: 42,
      city: "Accra",
      headline: "\u201cMy liver was sending signals for years. Nobody was listening.\u201d",
      narrative: [
        "Nana is a 42-year-old business owner in Accra. He doesn\u2019t drink alcohol, exercises regularly, and would describe himself as health-conscious. He signed up for BetterHealth\u2019s Complete plan as what he called \u201ca tune-up.\u201d",
        "His results flagged elevated ALT (68 U/L) and GGT (85 U/L). His liver function was in the amber zone.",
        "\u201cI thought liver problems only happened to heavy drinkers,\u201d Nana says. \u201cBut the dashboard taught me about non-alcoholic fatty liver disease. It affects 25% of adults globally and is usually caused by diet and metabolic factors, not alcohol.\u201d",
        "An ultrasound confirmed mild hepatic steatosis. Nana\u2019s doctor recommended dietary changes. Six months later, his BetterHealth retest showed ALT at 32 U/L and GGT at 44 U/L — both normal.",
        "\u201cThe scariest part is that I had zero symptoms. No pain, no jaundice, nothing. If I hadn\u2019t done this test, the fatty liver would have progressed silently for years.\u201d",
      ],
      numbers: [
        { label: "ALT", before: "68 U/L", after: "32 U/L", status: "elevated \u2192 normal" },
        { label: "GGT", before: "85 U/L", after: "44 U/L", status: "elevated \u2192 normal" },
        { label: "AST", before: "42 U/L", after: "28 U/L", status: "elevated \u2192 normal" },
      ],
      quote: "\u201cI had zero symptoms. No pain, no warning. My liver was deteriorating silently, and the only reason I know is because I tested.\u201d",
    },
    {
      tag: "Thyroid dysfunction",
      tagColor: "blue",
      name: "Adwoa",
      age: 38,
      city: "Cape Coast",
      headline: "\u201cThey said it was depression. It was my thyroid.\u201d",
      narrative: [
        "Adwoa is a 38-year-old teacher in Cape Coast. For two years, she struggled with fatigue, weight gain, hair thinning, and low mood. She saw two doctors. Both diagnosed her with depression and prescribed antidepressants.",
        "\u201cThe medication didn\u2019t help. If anything, I felt worse — more tired, more foggy. I started wondering if something else was going on.\u201d",
        "Adwoa\u2019s BetterHealth Premium screening included a full thyroid panel. Her TSH was 4.8 mIU/L — technically within the \u201cnormal\u201d range that most hospitals use, but elevated. More importantly, her Free T3 was low at 2.1 pg/mL, and her TPO antibodies were elevated at 312 IU/mL — confirming Hashimoto\u2019s thyroiditis.",
        "\u201cNo doctor had ever tested my T3 or antibodies. They tested TSH, said it was borderline, and moved on. BetterHealth tested five thyroid markers and found the real cause.\u201d",
        "Adwoa is now working with an endocrinologist. Her energy is returning, and she\u2019s been able to stop the antidepressants.",
      ],
      numbers: [
        { label: "TSH", before: "4.8 mIU/L", after: null, status: "borderline — often dismissed as normal" },
        { label: "Free T3", before: "2.1 pg/mL", after: null, status: "low — the actual cause of symptoms" },
        { label: "TPO Antibodies", before: "312 IU/mL", after: null, status: "elevated — confirmed Hashimoto\u2019s" },
        { label: "Thyroglobulin Ab", before: "88 IU/mL", after: null, status: "elevated" },
      ],
      quote: "\u201cTwo doctors said I was depressed. BetterHealth said it was my thyroid. They were both looking — but only one was testing the right things.\u201d",
    },
  ],
  callForStories: {
    headline: "Have a BetterHealth story?",
    body: "If BetterHealth revealed something important about your health, we\u2019d love to hear about it. Your story could help someone else take the step to get tested. All stories are shared with your explicit consent, and you can choose to remain anonymous.",
    cta: "Share Your Story",
  },
  bottomCta: {
    headline: "Your story starts with a test.",
    body: "Every discovery above started the same way — someone decided to check. Don\u2019t wait for symptoms. Don\u2019t assume you\u2019re fine. Know for sure.",
    cta: "Start Your Health Check",
  },
};

// ─── About Page ───────────────────────────────────────────────────────────────────────

export const aboutPage = {
  hero: {
    eyebrow: "About BetterHealth",
    headline: "We believe Africans deserve to know their health — not after illness strikes, but before.",
    subheadline: "BetterHealth Africa is a health technology company on a mission to make proactive health monitoring accessible, affordable, and beautifully simple for every African.",
  },
  problem: {
    headline: "Healthcare in Africa is built for treatment. We\u2019re building it for prevention.",
    body: [
      "In Ghana, most people only see a doctor when something is wrong. A headache that will not go away, unexplained weight loss, fatigue that does not lift. By then, conditions that were treatable have often progressed. Prevention is not part of the culture \u2014 not because Africans do not value their health, but because the infrastructure for proactive screening barely exists.",
      "Comprehensive health screening has been a privilege reserved for the wealthy few who can afford private hospitals charging GHS 6,250 or more. For everyone else, healthcare means waiting until you\u2019re sick, queuing at an overcrowded facility, and hoping for the best.",
      "We\u2019re changing that equation.",
    ],
    stats: [
      { value: "70%", label: "of diabetes cases in Africa are undiagnosed" },
      { value: "1 in 3", label: "Ghanaian adults has hypertension" },
      { value: "1 in 4", label: "Ghanaians carries the sickle cell trait" },
      { value: "25%", label: "of adults globally have fatty liver disease \u2014 most don\u2019t know" },
      { value: "12x", label: "the cost of managing diabetes vs. preventing it" },
    ],
  },
  founder: {
    sectionLabel: "Why I Built This",
    narrative: [
      "I grew up in Ghana watching people I love deal with health problems that could have been caught earlier. My family member was diagnosed with a condition at a stage where treatment options were limited. If a simple blood test had been done two years earlier, the outcome could have been completely different.",
      "That experience stayed with me. When I looked at the healthcare landscape in Ghana, I saw a system optimised for crisis \u2014 not for prevention. I saw Ghanaians who cared deeply about their families\u2019 health but had no accessible way to monitor it proactively. I saw a gap between what technology could deliver and what was available to the people who needed it most.",
      "BetterHealth was born from that gap.",
      "Our platform gives every Ghanaian access to the same depth of health screening that was previously reserved for patients at expensive private hospitals or foreign clinics. 127+ biomarkers. Organised by organ system. Explained in plain language. Tracked over time. Delivered to your phone within 48 hours.",
      "This isn\u2019t a charity. It\u2019s a company built on the conviction that prevention is the most valuable product in healthcare \u2014 and that Africans shouldn\u2019t have to fly to London or Johannesburg to access it.",
      "We\u2019re just getting started.",
    ],
    attribution: "Damzi",
    title: "Founder & CEO, BetterHealth Africa",
  },
  values: {
    headline: "What we stand for",
    items: [
      {
        icon: "ShieldCheck",
        title: "Prevention Over Treatment",
        body: "The healthcare system waits for you to get sick. We do not. BetterHealth exists to shift the paradigm from reactive treatment to proactive prevention \u2014 giving you the information to act before symptoms appear.",
      },
      {
        icon: "Eye",
        title: "Transparency Over Complexity",
        body: "No confusing lab reports. No hidden fees. Everything we do is designed to be understood \u2014 from your biomarker results to your subscription price. If it is not clear, we have not done our job.",
      },
      {
        icon: "Globe",
        title: "Access Over Exclusivity",
        body: "Comprehensive health screening should not cost GHS 6,250 and require a referral. We have built a platform that makes world-class lab testing accessible to every Ghanaian \u2014 not just the privileged few.",
      },
    ],
  },
  howWeWork: {
    headline: "We are a health technology company \u2014 not a lab.",
    body: [
      "BetterHealth does not run laboratories. We partner with accredited, established labs across Ghana to process your samples. Our role is the technology, the experience, and the intelligence layer on top.",
      "We build the dashboard that organises your results by organ system. We write the explanations that make your numbers meaningful. We track your biomarkers over time so you can see trends. And we connect you with doctors and nutritionists who can help you act on what the data reveals.",
      "Think of us as the bridge between the lab and your understanding.",
    ],
  },
  partners: {
    headline: "Built on trusted partnerships",
    items: [
      {
        name: "Lab Access Ghana",
        description: "Our sample collection and laboratory processing partner. Lab Access Ghana operates one of the most established phlebotomy and diagnostic networks in the country, with certified collectors and accredited labs.",
      },
      {
        name: "Paystack",
        description: "All payments \u2014 Mobile Money, cards, and bank transfers \u2014 are processed through Paystack, Ghana\u2019s leading payment infrastructure provider. Your financial data never touches our servers.",
      },
      {
        name: "Supabase",
        description: "Our data infrastructure is built on Supabase, providing enterprise-grade database security, row-level access control, and encrypted data storage that meets international healthcare data standards.",
      },
    ],
  },
  advisory: {
    headline: "Guided by experts",
    body: "BetterHealth\u2019s testing protocols, reference ranges, and health recommendations are developed in consultation with doctors and laboratory scientists who understand both international standards and the specific health landscape of West Africa.",
    advisors: [
      {
        name: "Dr. [Name], MBChB, FWACP",
        title: "Consultant Physician & Internist",
        institution: "[Hospital/Institution], Accra",
        bio: "Specialises in metabolic disease and preventive medicine in West Africa.",
      },
      {
        name: "[Name], BSc, MSc",
        title: "Senior Laboratory Scientist",
        institution: "Lab Access Ghana",
        bio: "15+ years in clinical biochemistry and haematology across Ghana.",
      },
      {
        name: "[Name], PhD",
        title: "Public Health Researcher",
        institution: "[University/Institution]",
        bio: "Research focus on non-communicable disease prevention in sub-Saharan Africa.",
      },
    ],
  },
  roadmap: {
    headline: "Where we\u2019re headed",
    intro: "BetterHealth launched in Ghana in 2026 , and this is just the beginning. Here is what we are building toward:",
    milestones: [
      { year: "2026", text: "Launch in Greater Accra, Kumasi, Tema" },
      { year: "2026", text: "Expand home collection to all major Ghanaian cities" },
      { year: "2026", text: "Launch mobile app (iOS & Android)" },
      { year: "2027", text: "Expand to Nigeria and Kenya" },
      { year: "2027", text: "Add disease-specific panels (Diabetes, Cardiovascular, Fertility)" },
      { year: "2027", text: "Introduce AI-powered health insights" },
      { year: "2028", text: "Pan-African availability across 10+ countries" },
    ],
    closing: "Our goal is to make BetterHealth the default health screening platform for Africa \u2014 the way Africans take control of their own health data and their own health outcomes.",
  },
  joinUs: {
    headline: "Help us build the future of African healthcare",
    body: "We\u2019re a small, ambitious team solving one of the most important problems on the continent. We don\u2019t have a fixed list of open roles \u2014 but if you believe in what we\u2019re building and know how you\u2019d contribute, we want to hear from you. Tell us the role you\u2019d love to own.",
    cta: "Pitch Your Role",
    fallback: "Email us at careers@betterhealth.africa with your CV and the position you\u2019d love to fill.",
  },
  bottomCta: {
    headline: "We started BetterHealth for the people who never get tested.",
    body: "If that\u2019s you \u2014 or someone you love \u2014 start here.",
    cta: "Start Your Health Check",
  },
};

// ─── Pricing Page ───────────────────────────────────────────────────────────────────

export const pricingPage = {
  hero: {
    eyebrow: "Transparent Pricing",
    headline: "Invest in knowing \u2014 not in guessing.",
    subheadline: "What would cost GHS 6,250+ at a private hospital is a fraction of that with BetterHealth. No referrals, no hidden fees, no surprises. All plans include your health dashboard, results, and intelligent health insights.",
  },
  valueAnchor: "A comprehensive health screen at a private hospital in Ghana costs between GHS 2,970 and GHS 6,250 - if they even offer all the tests. BetterHealth starts at GHS 2 per day.",
  plans: [
    {
      name: "Essential",
      tagline: "For individuals who want to know where their health stands.",
      monthly: "GHS 61",
      annual: "GHS 730",
      daily: "GHS 2",
      popular: false,
      includes: [
        "Physical Health:",
        "Height",
        "Weight",
        "Body Mass Index (BMI)",
        "Waist-to-height ratio",
        "Blood Pressure",
        "Biological Health:",
        "Full blood count",
        "Blood sugar",
        "Kidney function test",
        "Liver function test",
        "Urine routine examination",
        "Lipid profile",
        "Biological Age*",
      ],
      excludes: [],
      cta: "Get Started \u2014 Essential",
    },
    {
      name: "Complete",
      badge: "MOST POPULAR",
      tagline: "For individuals who want clear medical guidance alongside their results.",
      monthly: "GHS 163",
      annual: "GHS 1,953",
      daily: "GHS 5",
      popular: true,
      includes: [
        "Physical Health:",
        "Height",
        "Weight",
        "Body Mass Index (BMI)",
        "Waist-to-height ratio",
        "Blood Pressure",
        "Biological Health:",
        "Full blood count",
        "Blood sugar",
        "Kidney function test",
        "Liver function test",
        "Urine routine examination",
        "Lipid Profile",
        "Uric acid",
        "Biological Age*",
        "Doctor\u2019s written report",
        "Standard nutritional plan",
      ],
      excludes: [],
      cta: "Get Started \u2014 Complete",
    },
    {
      name: "Premium",
      tagline: "For individuals with elevated risk, a family history of chronic disease, or who want the most comprehensive monitoring available.",
      monthly: "GHS 414",
      annual: "GHS 4,957",
      daily: "GHS 19",
      popular: false,
      includes: [
        "Physical Health:",
        "Height",
        "Weight",
        "Body Mass Index (BMI)",
        "Waist-to-height ratio",
        "Blood Pressure",
        "Biological Health:",
        "Full blood count",
        "Blood sugar",
        "Kidney function test",
        "Liver function test",
        "Urine routine examination",
        "Lipid profile",
        "Uric acid",
        "Cardiac troponins I & T",
        "C-Reactive Protein",
        "Additional tests worth GHC 300",
        "Free home or office sample collection",
        "Biological Age*",
        "Virtual Dr. Consultation",
        "Customised nutritional plan",
      ],
      excludes: [],
      cta: "Get Started \u2014 Premium",
    },
  ],
  trustBadges: [
    "Mobile Money Accepted (MTN MoMo, Vodafone Cash, AirtelTigo)",
    "Card Payments via Paystack (Visa, Mastercard)",
    "14-Day Satisfaction Guarantee",
    "Cancel Anytime Before Renewal",
  ],
  finePrint: "All plans are billed annually. Your subscription begins the day you sign up and renews automatically after 12 months. You can cancel at any time before renewal \u2014 no penalties, no questions. If you\u2019re not satisfied within the first 14 days (before your first test), we\u2019ll refund you in full.",
  comparison: {
    headline: "Compare plans at a glance",
    rows: [
      { feature: "Biomarkers tested", essential: "67+", complete: "100+", premium: "127+" },
      { feature: "Screenings per year", essential: "2", complete: "2", premium: "3" },
      { feature: "Home collection", essential: "Add-on", complete: "Add-on", premium: "Included" },
      { feature: "Organ system dashboard", essential: true, complete: true, premium: true },
      { feature: "Plain-language explanations", essential: true, complete: true, premium: true },
      { feature: "PDF report", essential: true, complete: true, premium: true },
      { feature: "Biomarker trend tracking", essential: false, complete: true, premium: true },
      { feature: "Personalized recommendations", essential: false, complete: true, premium: true },
      { feature: "Doctor\u2019s written report", essential: false, complete: true, premium: true },
      { feature: "Priority results (48hr)", essential: false, complete: true, premium: true },
      { feature: "Advanced cardio markers (ApoB, Lp(a))", essential: false, complete: true, premium: true },
      { feature: "Doctor consultation call", essential: false, complete: false, premium: true },
      { feature: "Nutritionist consultation", essential: false, complete: false, premium: true },
      { feature: "Customised screening", essential: false, complete: false, premium: "1/year" },
      { feature: "Family discount", essential: false, complete: false, premium: "20% off" },
      { feature: "Support level", essential: "Standard", complete: "Standard", premium: "Priority + dedicated" },
    ],
  },
  hospitalComparison: {
    headline: "What this would cost you elsewhere",
    body: "We surveyed private hospitals and diagnostic centres across Accra. Here\u2019s what comprehensive blood testing costs without BetterHealth:",
    rows: [
      { test: "Full Blood Count (CBC)", hospital: "GHS 200\u2013300", bh: "Included x2" },
      { test: "Lipid Panel (Cholesterol)", hospital: "GHS 200\u2013400", bh: "Included x2" },
      { test: "Liver Function Tests", hospital: "GHS 250\u2013500", bh: "Included x2" },
      { test: "Kidney Function Tests", hospital: "GHS 200\u2013450", bh: "Included x2" },
      { test: "HbA1c + Fasting Glucose", hospital: "GHS 150\u2013350", bh: "Included x2" },
      { test: "Urine routine examination", hospital: "GHS 170\u2013250", bh: "Included x2" },
      { test: "Biological Age*", hospital: "Not Offered", bh: "Included x2" },
      { test: "Body Mass Index (BMI)", hospital: "Not Offered", bh: "Included x2" },
      { test: "Waist-to-height ratio", hospital: "Not Offered", bh: "Included x2" },
      { test: "Personalised health insights", hospital: "Not Offered", bh: "Included x2" },
      { test: "Doctor\u2019s result review", hospital: "GHS 300\u2013500", bh: "Included x2" },
      { test: "Nutritional plan", hospital: "GHS 1,500\u20133,500", bh: "Included x2" },
      { test: "Estimated total", hospital: "GHS 2,970\u20136,250", bh: "GHS 1,953/year", isTotals: true },
    ],
    footnote: "BetterHealth gives you more health insights for a fraction of the cost from traditional hospitals.",
  },
  singleTests: {
    headline: "Not ready for a subscription? Start with a disease panel.",
    body: "Track a specific organ system and your chances of getting a disease. This package is built for those with a family history of a specific disease and want to prevent it or monitor it. No subscription required. Pay for only what you need to track.",
    examples: [
      { name: "Kidney Disease Tracker", price: "GHS 250" },
      { name: "Diabetes Tracker", price: "from GHS 250" },
      { name: "Liver Disease Tracker", price: "GHS 200" },
      { name: "Cardiovascular Disease Tracker", price: "GHS 300" },
      { name: "Fertility Tracker", price: "Coming soon" },
      { name: "PCOS Tracker", price: "Coming soon" },
    ],
    cta: "Browse All Tests",
    note: "Individual test prices vary by location. Home collection is available as an add-on from GHS 150.",
  },
  faqs: [
    {
      q: "Can I pay with Mobile Money?",
      a: "Yes. We accept MTN MoMo, Vodafone Cash, and AirtelTigo Money. You can also pay with Visa, Mastercard, or bank transfer. All payments are processed securely through Paystack.",
    },
    {
      q: "Can I switch plans later?",
      a: "Yes. You can upgrade to a higher plan at any time \u2014 you\u2019ll only pay the difference for the remainder of your billing cycle. Downgrades take effect at your next renewal.",
    },
    {
      q: "What\u2019s the 14-day satisfaction guarantee?",
      a: "If you sign up and decide BetterHealth isn\u2019t right for you within the first 14 days, we\u2019ll refund your payment in full \u2014 no questions asked. This applies to your first subscription only.",
    },
    {
      q: "Do you offer family or group pricing?",
      a: "Premium plan members receive 20% off for each additional family member they add. For corporate or group enquiries (10+ people), contact us at hello@betterhealth.africa for custom pricing.",
    },
    {
      q: "Is this a recurring charge?",
      a: "Yes. All plans are billed annually and renew automatically. You\u2019ll receive a reminder email 14 days before renewal. You can cancel at any time through your account settings \u2014 no penalties, no questions.",
    },
    {
      q: "Are there any hidden fees?",
      a: "None. Your subscription price covers everything listed in your plan. The only optional add-on is home collection for Essential and Complete plan members. Premium plan includes home collection at no extra charge.",
    },
  ],
  bottomCta: {
    headline: "Your health is worth more than the price of a test.",
    body: "Choose the plan that fits your life. Every plan gives you more insight in one visit than most people get in a decade of doctor visits.",
    cta: "Get Started",
  },
};
