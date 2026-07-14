// Pillar / hub article (cluster: "screening"), Nigeria market. Nigeria's
// equivalent of preventive-health-screening-ghana.js: same "what to test, how
// often, where" hub structure, rebuilt with Nigerian disease burden and health
// system context rather than reused Ghana content. Primary keyword "health
// screening Nigeria" has no confirmed DataForSEO volume (checked 2026-07-12,
// null/low data) but strong commercial intent and AI-citation value as a
// market-entry hub. Cross-links to the genotype article and the Lagos-specific
// local article in the same batch. Voice: plain, human, no em dashes
// (bh-humanizer applied). Clinical caution kept, no invented statistics.
export default {
  slug: "health-screening-nigeria",
  title: "Health Screening in Nigeria: What to Test and How Often",
  description:
    "A plain-language guide to health screening in Nigeria. The core tests to get, how often by age and risk, and how screening actually works through hospitals, HMOs and home collection.",
  excerpt:
    "Hypertension, diabetes, sickle cell disease and hepatitis B are among the biggest health burdens in Nigeria, and all four can build up for years without symptoms. Here is the short list of tests that catches them early, and how often to run it.",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "A guide to health screening in Nigeria: which tests to get and how often, based on Nigeria's disease burden.",
  tags: [
    "health screening",
    "Nigeria",
    "preventive care",
    "checkup",
    "NHIS",
  ],
  cluster: "screening",
  primaryKeyword: "health screening Nigeria",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/nigeria-screening-hero.svg",
      alt: "Health screening in Nigeria: what to test and how often, based on Nigeria's own disease burden.",
    },
    {
      type: "p",
      text: "Health screening means testing for a condition before it announces itself with symptoms, while it is still cheap and simple to manage. In Nigeria, that matters more than in most places, because several of the conditions doing the most damage nationally, high blood pressure, diabetes, sickle cell disease and hepatitis B, tend to sit quietly for years before anyone notices something is wrong. A short, well-chosen list of tests is what closes that gap.",
    },
    {
      type: "h2",
      id: "why",
      text: "Why routine screening matters in Nigeria",
    },
    {
      type: "p",
      text: "Several of the conditions responsible for the most illness and early death in Nigeria produce few or no symptoms until they have already caused damage. High blood pressure rarely feels like anything until it has strained the heart, kidneys or eyes. Type 2 diabetes can run for years before thirst, fatigue or blurred vision become obvious. Chronic hepatitis B infection can sit in the liver for decades without a single symptom while it slowly scars the organ. None of these conditions send a warning before the damage starts. Testing is the only way to catch them early.",
    },
    {
      type: "p",
      text: "That silent pattern is also why screening gets skipped so often. People who feel fine reasonably assume they are fine, and a hospital visit tends to happen only once something already hurts. By then, a condition that would have been simple to manage a few years earlier is harder and more expensive to treat. Regular screening flips that order: it looks for trouble before trouble looks for you.",
    },
    {
      type: "h2",
      id: "disease-burden",
      text: "Nigeria's disease burden shapes what to test",
    },
    {
      type: "p",
      text: "Nigeria has the highest number of children born with sickle cell disease of any country in the world, a burden tied directly to how common the sickle gene is across the population. Roughly 1 in 4 Nigerians carries the sickle cell trait, which is why a genotype test belongs on this list in a way it would not in most other parts of the world.",
    },
    {
      type: "p",
      text: "Hypertension and diabetes are common across Nigeria and, as in much of the world, are rising with urbanisation, changing diets and less physically active work. National surveys have found a large share of Nigerian adults living with high blood pressure without knowing it, since it causes no symptoms until it has already affected the heart or kidneys.",
    },
    {
      type: "p",
      text: "Infectious disease adds another layer. Malaria remains endemic across most of the country and is still one of the most common reasons for a fever visit to a clinic. Typhoid fever circulates wherever water and sanitation are inconsistent, and its symptoms overlap heavily with malaria, which is why a fever should be tested rather than guessed at. Hepatitis B carriage in Nigeria is also among the highest in the world by most national survey estimates, spread mainly through birth and early childhood rather than the routes people usually assume, which is part of why it goes undiagnosed for so long. HIV also remains a significant part of the national health picture, and routine testing is a normal, low-drama part of adult healthcare rather than something reserved for high-risk situations.",
    },
    {
      type: "callout",
      title: "Genotype testing is not optional context in Nigeria",
      text: "Given how common the sickle cell trait is nationally, a genotype test matters even for people who feel completely healthy, particularly before marriage or starting a family. It changes nothing about your day-to-day health on its own, but it changes what you and a partner need to know about your children's risk.",
    },
    {
      type: "link-internal",
      to: "/blog/genotype-test-aa-as-ss",
      label: "Read more: what your genotype test result (AA, AS, SS) means for family planning",
    },
    {
      type: "h2",
      id: "core-tests",
      text: "The core screening panel for adults",
    },
    {
      type: "p",
      text: "A sensible baseline panel for most Nigerian adults covers blood pressure, blood sugar, cholesterol, full blood count, genotype and sickle cell status, hepatitis B, and HIV, with a few extras added by sex and age. None of these tests are exotic or hard to find. What matters is doing them on a schedule, rather than only after symptoms show up.",
    },
    {
      type: "list",
      items: [
        "Blood pressure: the simplest, highest-value check available, and worth doing at least once a year for every adult.",
        "Fasting blood sugar and HbA1c: catches prediabetes and diabetes early, often years before symptoms appear.",
        "Lipid profile (cholesterol and triglycerides): the main marker of heart and stroke risk.",
        "Full blood count: picks up anaemia, infection and a range of blood disorders in one test.",
        "Genotype and sickle cell status (AA, AS, SS and related results): a one-time test with lifelong relevance, especially before marriage or pregnancy.",
        "Hepatitis B surface antigen: identifies chronic infection that can otherwise go unnoticed for decades.",
        "HIV test: routine, confidential, and a normal part of adult healthcare rather than a last resort.",
        "Malaria and typhoid testing when there is fever: not a routine annual test, but the right way to confirm either illness instead of guessing.",
      ],
    },
    {
      type: "image",
      src: "/blog/nigeria-screening-panel.svg",
      alt: "Core health screening panel for Nigerian adults: blood pressure, blood sugar (HbA1c), cholesterol, full blood count, genotype and sickle cell status, hepatitis B, HIV, and fever testing for malaria and typhoid when needed.",
      caption: "A starting panel shaped by Nigeria's own disease burden, not a generic import.",
    },
    {
      type: "h2",
      id: "by-sex-and-age",
      text: "Extra tests by sex and age",
    },
    {
      type: "p",
      text: "Women benefit from regular cervical screening (a Pap smear or HPV test) from their mid-20s, since cervical cancer is one of the more preventable cancers when it is caught at a precancerous stage. Men from around age 40, particularly those with a family history of prostate cancer or urinary symptoms, should discuss a PSA test with a doctor rather than requesting it as a routine annual default, since PSA results need clinical interpretation and are not a stand-alone diagnostic test.",
    },
    {
      type: "p",
      text: "Anyone planning a pregnancy or already pregnant should also confirm genotype, blood group and hepatitis B status as part of antenatal care if this has not already been done, since these results shape decisions that are far easier to plan for early than to react to later.",
    },
    {
      type: "h2",
      id: "how-often",
      text: "How often should you screen?",
    },
    {
      type: "p",
      text: "Healthy adults in their 20s and 30s with no known risk factors can generally screen every two to three years, while adults 40 and older benefit from a fuller check every one to two years as risk for hypertension, diabetes and heart disease rises with age. Blood pressure is worth checking at least once a year regardless of age, since it is quick, cheap and the single highest-value early warning available.",
    },
    {
      type: "list",
      items: [
        "Ages 18 to 39, no known risk factors: a baseline panel, then a repeat every two to three years.",
        "Ages 40 and above: a fuller panel every one to two years, including lipids, blood sugar and, for men, a PSA discussion.",
        "Anyone with a family history of hypertension, diabetes, sickle cell disease or kidney disease: screen earlier and more often, on a schedule a doctor sets for your specific risk.",
        "Genotype and blood group: typically a one-time, lifelong result, best confirmed before marriage or a first pregnancy if it has not been done already.",
      ],
    },
    {
      type: "callout",
      title: "A screening result is a starting point, not a diagnosis",
      text: "An out-of-range screening result means a clinician should look closer, sometimes with a repeat test or a more specific one. It is not, by itself, a diagnosis. Use this list to start a conversation with a doctor about your own age, history and risk, not as a fixed prescription.",
    },
    {
      type: "h2",
      id: "where",
      text: "Where and how screening happens in Nigeria",
    },
    {
      type: "p",
      text: "Screening in Nigeria happens through several different routes, and most people end up using more than one over a lifetime. Government and teaching hospitals offer laboratory testing, often at lower cost than private facilities, though waiting times can be longer. Private hospitals and standalone diagnostic labs offer faster turnaround and a wider test menu, generally at a higher price paid out of pocket. Some employers run periodic health checks for staff, and NHIS or NHIA enrollees and private HMO members may have some preventive services included, though exactly what is covered varies a great deal by plan, employer and provider, so it is worth checking your own policy rather than assuming a particular test is included.",
    },
    {
      type: "p",
      text: "Out-of-pocket payment still covers a large share of healthcare spending in Nigeria, which is part of why routine screening gets deferred so often even when people know it matters. Home-collection services, including BetterHealth Africa, are a newer route: a trained phlebotomist draws the sample at your home or workplace and results are reviewed and returned digitally, which removes the travel and waiting-room time that keeps many people from testing at all.",
    },
    {
      type: "link-internal",
      to: "/blog/blood-test-lagos",
      label: "See health screening options in Lagos specifically",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the full biomarker panel BetterHealth Africa tests",
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
          q: "What health tests should Nigerians get regularly?",
          a: "A sensible baseline for most adults covers blood pressure, fasting blood sugar or HbA1c, a lipid profile, a full blood count, genotype and sickle cell status, hepatitis B, and HIV, with cervical screening added for women and a PSA discussion added for men from around age 40. Your own list should be adjusted for age, family history and any existing symptoms.",
        },
        {
          q: "How often should I get a health screening in Nigeria?",
          a: "Healthy adults under 40 with no known risk factors can generally screen every two to three years, while adults 40 and older benefit from a fuller check every one to two years. Blood pressure is worth checking at least once a year for everyone. Anyone with a family history of hypertension, diabetes or sickle cell disease should screen earlier and more often, on a schedule a doctor sets.",
        },
        {
          q: "How much does a full health checkup cost in Nigeria?",
          a: "Cost varies widely depending on where you go and how many tests are included, from a handful of basic tests at a government facility to a comprehensive panel at a private hospital or lab. Rather than quote a single figure that would be misleading, compare the specific tests included in a package and check what your employer, NHIS or NHIA enrollment, or HMO plan already covers before paying out of pocket.",
        },
        {
          q: "Does NHIS or my HMO cover health screening?",
          a: "It depends entirely on your specific plan. Some NHIS or NHIA enrollees and HMO members have preventive checks included, while others only have coverage for treatment once a condition is diagnosed. Check your own policy documents or ask your provider directly what preventive screening is included before assuming a test is covered.",
        },
        {
          q: "Which tests matter most given Nigeria's disease burden?",
          a: "Given how common hypertension, diabetes, sickle cell disease and hepatitis B are nationally, blood pressure, blood sugar, genotype and sickle cell status, and hepatitis B testing carry outsized value in Nigeria specifically. Malaria and typhoid testing matter whenever there is a fever, since the two are easy to confuse without a test.",
        },
        {
          q: "Can I get screened at home in Nigeria instead of visiting a hospital?",
          a: "Yes, home-collection services including BetterHealth Africa send a trained phlebotomist to draw your sample at home or work, with results reviewed and returned digitally. This does not replace a doctor's visit when something is already wrong, but it makes routine screening far easier to actually keep up with.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Screening recommendations, intervals and coverage vary by individual and by insurance plan. Always confirm your own screening schedule with a doctor and your specific NHIS, NHIA or HMO coverage with your provider.",
    },
  ],
};
