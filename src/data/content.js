export const navLinks = ["How It Works", "What We Test", "Pricing", "About", "Stories"];

export const heroStats = [
  { value: "127+", label: "Biomarkers" },
  { value: "Home", label: "Collection" },
  { value: "GHS 8", label: "Per day" },
];

export const trustedPartners = ["Lab Access Ghana", "Paystack", "Ghana Health Service"];

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
  { num: "02", icon: "Home", title: "Book Collection", desc: "Choose in-lab visit or home collection. A certified phlebotomist comes to your door." },
  { num: "03", icon: "FlaskConical", title: "Get Results", desc: "Comprehensive results in your health dashboard within 48\u201372 hours. Every biomarker explained." },
  { num: "04", icon: "BarChart3", title: "Take Action", desc: "Personalized insights and recommendations. Track changes over time." },
];

export const showcaseFeatures = [
  { title: "Organ System Health View", desc: "See your heart, liver, kidney, and metabolic health at a glance with intuitive scores." },
  { title: "Biomarker Trend Tracking", desc: "Watch how your markers change over months and years. Spot patterns before problems emerge." },
  { title: "Plain-Language Explanations", desc: "Every result comes with clear explanations \u2014 no medical jargon, no confusion." },
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
  { feature: "Results in 48\u201372 hours", bh: true, hosp: false },
  { feature: "Plain-language explanations", bh: true, hosp: false },
  { feature: "Track biomarkers over time", bh: true, hosp: false },
  { feature: "Digital health dashboard", bh: true, hosp: false },
  { feature: "Personalized recommendations", bh: true, hosp: false },
  { feature: "Mobile Money payment", bh: true, hosp: false },
  { feature: "No referral needed", bh: true, hosp: false },
  { feature: "Fixed transparent pricing", bh: true, hosp: false },
];

export const testimonials = [
  { name: "Ama K.", age: 34, location: "Accra", quote: "I discovered I was pre-diabetic at 34. My HbA1c was 6.1% \u2014 my doctor at the polyclinic had never tested for it. Three months of lifestyle changes later, I\u2019m back in the normal range.", discovery: "Pre-diabetes" },
  { name: "Kwame M.", age: 28, location: "Kumasi", quote: "My Vitamin D was critically low at 11 ng/mL. I had no idea that was causing my chronic fatigue and muscle pain. No doctor had ever checked this.", discovery: "Vitamin D deficiency" },
  { name: "Efua & Kofi A.", age: null, location: "Tema", quote: "We both found out we carry the sickle cell trait. We had no idea. Now we can make informed decisions about our family planning. This test may have saved our future child\u2019s life.", discovery: "Sickle cell trait" },
];

export const plans = [
  { name: "Essential", price: "247", annual: "2,957", daily: "8", features: ["60+ core biomarkers", "In-lab collection", "Digital dashboard", "PDF report", "Email results notification"], popular: false },
  { name: "Complete", price: "413", annual: "4,957", daily: "13", features: ["100+ biomarkers", "Home collection included", "Organ system health view", "Biomarker trend tracking", "Personalized recommendations", "Priority results (48hr)"], popular: true },
  { name: "Premium", price: "580", annual: "6,957", daily: "19", features: ["127+ biomarkers", "Home collection included", "Everything in Complete", "Doctor consultation call", "Quarterly re-testing", "Family member discount"], popular: false },
];

export const faqs = [
  { q: "How does home sample collection work?", a: "A certified phlebotomist from our partner Lab Access Ghana comes to your home at your scheduled time. The entire process takes about 15 minutes. You\u2019ll receive a confirmation SMS with your collector\u2019s name and estimated arrival time." },
  { q: "How do I pay?", a: "We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit/credit cards, and bank transfers. All payments are processed securely through Paystack, Ghana\u2019s leading payment platform." },
  { q: "How long until I get my results?", a: "Most results are available within 48\u201372 hours after your sample is collected. You\u2019ll receive an SMS and email notification when your results are ready to view in your health dashboard." },
  { q: "Is my health data private and secure?", a: "Absolutely. Your data is encrypted at rest and in transit. We follow international healthcare data protection standards. Only you and your authorized healthcare providers can access your results." },
  { q: "Do I need a doctor\u2019s referral?", a: "No referral needed. BetterHealth Africa is a direct-to-consumer health platform. You can sign up, choose your package, and book your collection independently." },
  { q: "What if my results show something concerning?", a: "Our platform flags any results outside the normal range. For critical findings, you\u2019ll receive immediate notification. We recommend discussing any concerning results with a healthcare provider, and our Premium plan includes a doctor consultation." },
];

export const founderQuote = "I built BetterHealth because Africans deserve to know their health \u2014 not after illness strikes, but before.";

export const founderStory = [
  "In Ghana, comprehensive health screening has been a privilege \u2014 expensive, fragmented, and available only in a few facilities. Most people only see a doctor when something is already wrong. We\u2019re changing that.",
  "BetterHealth Africa makes proactive health monitoring accessible, affordable, and beautifully simple. Because your health shouldn\u2019t be a mystery.",
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
