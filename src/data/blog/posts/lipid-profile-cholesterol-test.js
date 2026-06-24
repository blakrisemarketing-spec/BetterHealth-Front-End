// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Voice: plain, human, no em dashes. Ranges cite ACC/AHA 2018; mmol/L is
// standard in Ghanaian labs. Ghana CVD burden noted where relevant.
export default {
  slug: "lipid-profile-cholesterol-test",
  title: "Lipid Profile (Cholesterol) Test: How to Read Your Results",
  description:
    "A lipid profile test measures total cholesterol, LDL, HDL, and triglycerides. Find out what each number means, the normal ranges in mmol/L, and what to do if yours is out of range.",
  excerpt:
    "A lipid profile gives you four numbers that together show your cardiovascular risk: what each one means, the normal ranges to know, and why the test requires fasting.",
  datePublished: "2026-06-24",
  dateModified: "2026-06-24",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "A lipid profile lab report showing total cholesterol, LDL, HDL, and triglycerides with normal ranges.",
  tags: ["cholesterol", "lipid profile", "LDL", "HDL", "triglycerides", "biomarkers", "heart health"],
  cluster: "biomarkers",
  primaryKeyword: "lipid profile test",
  readingMinutes: 7,
  body: [
    {
      type: "image",
      src: "/blog/lipid-profile-hero.svg",
      alt: "Lipid profile report card showing total cholesterol, LDL, HDL, and triglycerides with their normal ranges.",
    },
    {
      type: "p",
      text: "A lipid profile test measures four fats in your blood: total cholesterol, LDL cholesterol, HDL cholesterol, and triglycerides. Together, these four numbers tell your doctor how much strain your arteries are under and how likely you are to develop heart disease or a stroke over time. It is one of the most requested blood tests in Ghana, and one of the easiest to misread if you only look at one number.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What a lipid profile test measures",
    },
    {
      type: "p",
      text: "A lipid profile is a blood test that measures four fats circulating in your bloodstream. Each one plays a different role:",
    },
    {
      type: "list",
      items: [
        "Total cholesterol: the combined amount of all cholesterol types in your blood.",
        "LDL (low-density lipoprotein): often called 'bad' cholesterol because it deposits fat into artery walls.",
        "HDL (high-density lipoprotein): often called 'good' cholesterol because it carries fat away from arteries back to the liver.",
        "Triglycerides: a separate fat that your body stores from calories you do not immediately use, including calories from refined carbohydrates and alcohol.",
      ],
    },
    {
      type: "p",
      text: "Most labs in Ghana report results in millimoles per litre (mmol/L). Some international reports use milligrams per decilitre (mg/dL). To convert mmol/L to mg/dL for cholesterol, multiply by 38.7. For triglycerides, multiply by 88.6.",
    },
    {
      type: "h2",
      id: "normal-ranges",
      text: "Lipid profile normal ranges",
    },
    {
      type: "p",
      text: "The American College of Cardiology and American Heart Association (ACC/AHA) 2018 guidelines set the thresholds most commonly used by Ghanaian labs. The ranges below apply to adults without established heart disease. People with diabetes, existing cardiovascular disease, or other risk factors may have tighter targets set by their doctor.",
    },
    {
      type: "image",
      src: "/blog/lipid-profile-ranges.svg",
      alt: "Lipid profile normal ranges for total cholesterol, LDL, HDL, and triglycerides in mmol/L.",
      caption: "Normal ranges for all four lipid components. ACC/AHA 2018 thresholds.",
    },
    {
      type: "list",
      items: [
        "Total cholesterol: below 5.2 mmol/L (200 mg/dL) is desirable; 5.2 to 6.1 mmol/L (200 to 239 mg/dL) is borderline high; 6.2 mmol/L (240 mg/dL) or above is high.",
        "LDL: below 2.6 mmol/L (100 mg/dL) is optimal; 2.6 to 4.0 mmol/L (100 to 159 mg/dL) is near-optimal to borderline high; 4.1 mmol/L (160 mg/dL) or above is high.",
        "HDL: 1.0 mmol/L (40 mg/dL) or above for men and 1.3 mmol/L (50 mg/dL) or above for women is considered adequate; 1.6 mmol/L (60 mg/dL) or above is protective.",
        "Triglycerides: below 1.7 mmol/L (150 mg/dL) is normal; 1.7 to 5.5 mmol/L (150 to 499 mg/dL) is borderline to high; 5.6 mmol/L (500 mg/dL) or above is very high.",
      ],
    },
    {
      type: "callout",
      title: "A raised number is a starting point for a conversation",
      text: "A single out-of-range result is not a diagnosis of heart disease. These ranges are population-level thresholds. A clinician needs to read your results alongside your age, weight, blood pressure, smoking history, diabetes status, and family history before deciding what action is right for you.",
    },
    {
      type: "h2",
      id: "ldl-vs-hdl",
      text: "LDL vs HDL: what 'bad' and 'good' actually mean",
    },
    {
      type: "p",
      text: "LDL and HDL are both transport proteins that carry the same cholesterol molecule, but in opposite directions. LDL carries cholesterol from the liver out to the rest of the body, including artery walls, where it can accumulate as plaques. HDL carries cholesterol from tissues back to the liver to be broken down. Higher LDL means more cholesterol being deposited; higher HDL means more cholesterol being cleared.",
    },
    {
      type: "p",
      text: "The pattern that most closely predicts cardiovascular risk is high LDL combined with low HDL. High triglycerides often travel alongside that pattern. If your LDL is 4.5 mmol/L and your HDL is 0.8 mmol/L, that is a different picture from someone whose total cholesterol is the same but whose HDL is 1.8 mmol/L. The ratio of total cholesterol to HDL is one calculation clinicians use to assess overall risk.",
    },
    {
      type: "h2",
      id: "why-fasting",
      text: "Why the test requires fasting",
    },
    {
      type: "p",
      text: "A lipid profile requires 9 to 12 hours of fasting before the blood draw because triglycerides rise sharply after a meal. Eating can roughly double your triglyceride reading within a few hours, which would make the result unusable for diagnosis. Total cholesterol and HDL are less affected by food, but most labs collect a fasting sample so they can calculate LDL using the standard Friedewald formula, which requires an accurate triglyceride figure.",
    },
    {
      type: "p",
      text: "Water is fine to drink during the fast. Take your usual morning medications unless your doctor tells you to hold any, and let the lab know what you are taking. The most practical approach is to book an early-morning appointment and do the fast overnight.",
    },
    {
      type: "h2",
      id: "what-results-mean",
      text: "What a high or low result means",
    },
    {
      type: "p",
      text: "No single lipid number tells the whole story. What matters is the pattern across all four values and how that pattern sits alongside the rest of your health picture.",
    },
    {
      type: "list",
      items: [
        "High LDL with low HDL: the most concerning combination. Raises the risk of plaque build-up in arteries, which can lead to heart attack and stroke.",
        "High triglycerides alone: often linked to a diet high in refined carbohydrates, sugary drinks, or alcohol, and can also indicate insulin resistance. Very high triglycerides (above 5.6 mmol/L) carry a risk of pancreatitis.",
        "Low HDL alone: less common as an isolated finding; can be improved with regular physical activity and dietary changes.",
        "High total cholesterol with normal LDL and HDL: sometimes caused by a high HDL level, which is actually protective. Context matters.",
      ],
    },
    {
      type: "p",
      text: "In Ghana, non-communicable diseases including heart disease and stroke now account for a significant and growing share of adult deaths. Many of the people who die from a first heart attack had no previous diagnosis. A lipid profile is one of the cheapest, most actionable tests you can take to catch a problem before it shows up as symptoms.",
    },
    {
      type: "link-internal",
      to: "/blog/fatty-liver-disease-explained",
      label: "Fatty liver disease and its connection to high triglycerides",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your results",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Keep the printout. Trend data over one to three years is more useful than any single result.",
        "If LDL or triglycerides are high, ask your doctor whether lifestyle changes alone are enough or whether medication is appropriate given your overall risk.",
        "Pair the lipid profile with a fasting blood sugar or HbA1c test. High cholesterol and raised blood sugar often appear together and reinforce each other's risk.",
        "Retest in three to six months if your result was out of range, or annually if everything is normal.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/hba1c-explained",
      label: "HbA1c: why it pairs well with a lipid panel",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the full lipid and metabolic panel BetterHealth offers",
    },
    {
      type: "link-internal",
      to: "/pricing",
      label: "View BetterHealth test pricing",
    },
    {
      type: "faq",
      items: [
        {
          q: "Do I need to fast before a lipid profile test?",
          a: "Yes. Most labs require 9 to 12 hours of fasting before the blood draw because food, especially a fatty or sugary meal, can raise your triglycerides significantly and make the result unreliable. Water is fine to drink. Early-morning appointments make the overnight fast straightforward.",
        },
        {
          q: "What is a normal cholesterol level in Ghana?",
          a: "Using the ACC/AHA 2018 thresholds, a desirable total cholesterol is below 5.2 mmol/L (200 mg/dL). LDL should ideally be below 2.6 mmol/L (100 mg/dL), HDL above 1.0 mmol/L for men and 1.3 mmol/L for women, and triglycerides below 1.7 mmol/L (150 mg/dL). These are the ranges Ghanaian labs typically use.",
        },
        {
          q: "Can high cholesterol be reversed without medication?",
          a: "Moderately raised LDL can often be reduced through changes to diet (less saturated fat, more fibre and plant sterols), regular aerobic exercise, stopping smoking, and reducing alcohol. How much improvement is possible depends on your starting level and any genetic factors. Some people need medication even with good lifestyle habits. Your doctor can assess which approach is right for your level of risk.",
        },
        {
          q: "How often should I have a lipid profile test?",
          a: "For adults with no risk factors and a normal result, every three to five years is the standard recommendation. If you have diabetes, high blood pressure, a family history of early heart disease, or a previous raised result, annual testing is common. Your clinician will set the right interval for your situation.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Always discuss your own results with your doctor.",
    },
  ],
};
