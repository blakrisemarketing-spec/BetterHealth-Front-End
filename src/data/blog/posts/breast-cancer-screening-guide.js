// Patients-led screening explainer (cluster: "screening"). Pan-African framing,
// broad overview article covering all three arms of breast cancer screening:
// self-awareness/self-exam, clinical breast exam, and mammography at a summary
// level only. The mammogram procedure itself is deliberately kept shallow here
// and handed off to the batch-mate deep-dive (mammogram-breast-cancer-screening)
// via link-internal, to avoid duplicating content within the same nightly batch.
// Primary keyword: breast cancer screening (70/mo Ghana, DataForSEO). No invented
// precise statistic for the Africa breast cancer burden, sourced qualitatively to
// WHO and global cancer registries, matching the pap-smear article's approach.
// Family-history hedge included deliberately: most people who develop breast
// cancer have no strong family history, so its absence should not be read as
// reassurance. Voice: plain, human, no em dashes (bh-humanizer pass applied).
export default {
  slug: "breast-cancer-screening-guide",
  title: "Breast Cancer Screening: Self-Checks, Clinical Exams, and Mammograms",
  description:
    "Breast cancer screening works best as three habits: knowing your body, a clinical exam, and mammograms at the right age. What each covers and when to see a doctor.",
  excerpt:
    "No single check catches everything on its own. Here is how breast self-awareness, a clinical breast exam, and mammography work together, and what changes actually warrant a doctor's visit.",
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the three approaches to breast cancer screening: self-exam, clinical exam, and mammogram.",
  tags: [
    "breast cancer screening",
    "breast self-exam",
    "clinical breast exam",
    "women's health",
    "screening",
  ],
  cluster: "screening",
  primaryKeyword: "breast cancer screening",
  readingMinutes: 9,
  body: [
    {
      type: "image",
      src: "/blog/breast-cancer-screening-guide-hero.svg",
      alt: "Breast cancer screening explained: self-exam, clinical exam, and mammogram working together to catch changes early.",
    },
    {
      type: "p",
      text: "Breast cancer screening is not one test. It is three habits that work together: knowing what is normal for your own body, a clinical breast exam by a trained provider, and a mammogram once you reach the age or risk category where one is recommended. Each catches something the others might not, which is why relying on just one leaves gaps.",
    },
    {
      type: "p",
      text: "Breast cancer is one of the most common cancers among African women, and across the continent it is often detected at a later, harder-to-treat stage than in countries with wider screening coverage. That gap is not about biology. It is largely about access, awareness, and how early a change gets noticed and checked, which is exactly what this article is about.",
    },
    {
      type: "h2",
      id: "three-approaches",
      text: "Breast cancer screening rests on three approaches, not one test",
    },
    {
      type: "p",
      text: "Self-awareness tells you when something has changed in your own body. A clinical breast exam adds a trained hand that has felt hundreds of normal and abnormal breast tissue patterns and knows what to look for. A mammogram can sometimes pick up a change years before it is large enough to feel at all. None of the three is a replacement for the others, and none of them guarantees an early catch on its own. Together, they cover far more ground than any single check.",
    },
    {
      type: "image",
      src: "/blog/breast-cancer-screening-guide-comparison.svg",
      alt: "Comparison of the three breast cancer screening approaches: self-awareness, clinical breast exam, and mammogram, showing who each is for, how often, and what it catches.",
      caption: "Three approaches, three different strengths. None of them replaces the others.",
    },
    {
      type: "h2",
      id: "self-awareness",
      text: "Breast self-awareness means knowing what is normal for you, not hunting for problems",
    },
    {
      type: "p",
      text: "Breast tissue is not uniform or static. It normally feels lumpy, ropy, or uneven in texture, and that texture can shift with your menstrual cycle, pregnancy, breastfeeding, weight change, and age. The goal of self-awareness is not to memorise a diagram or search for a single \"correct\" way your breasts should feel. It is to get familiar enough with your own normal that a genuine change stands out.",
    },
    {
      type: "p",
      text: "A simple way to build that familiarity is to look and feel your breasts and underarms once a month, at roughly the same point in your cycle if you still menstruate, since breast tissue is usually least tender in the days right after a period ends. Look in a mirror for any visible change in size, shape, or skin. Then, using the flat pads of your fingers, feel across the whole breast and up into the underarm in a pattern you can repeat, checking gently rather than pressing hard enough to bruise. There is no single correct method backed by strong evidence over another. What matters is repetition, so you notice a genuine change rather than normal variation.",
    },
    {
      type: "h3",
      id: "changes-to-watch-for",
      text: "Changes worth a doctor's visit",
    },
    {
      type: "list",
      items: [
        "A new lump or thickened area that feels different from the surrounding tissue and does not go away after your next cycle",
        "Dimpling, puckering, or an orange-peel texture on the skin of the breast",
        "A nipple that turns inward when it did not before, or changes shape",
        "Unusual discharge from the nipple, especially if it is bloody or comes from only one breast without squeezing",
        "Persistent redness, scaling, or swelling of the breast or nipple skin that does not settle",
        "A new lump or swelling in the underarm area",
      ],
    },
    {
      type: "callout",
      title: "Most breast changes are not cancer",
      text: "Cysts, fibroadenomas, and normal hormonal lumpiness are far more common than cancer, and most lumps women find turn out to be benign. That is not a reason to skip a check. It is a reason to get any new or persistent change looked at without panicking about what it might mean before a clinician has even examined it.",
    },
    {
      type: "h2",
      id: "clinical-breast-exam",
      text: "A clinical breast exam adds a trained hand to what you already notice",
    },
    {
      type: "p",
      text: "A clinical breast exam is a physical examination of the breasts and underarms performed by a doctor or nurse, usually as part of a routine check-up or a women's health visit. The provider looks for the same kinds of changes covered above, plus subtler ones that come from having examined many patients, and can compare what they feel against what you report noticing yourself.",
    },
    {
      type: "p",
      text: "The exam itself is quick and does not require any special preparation. If a provider finds something worth a closer look, the next step is usually imaging, such as an ultrasound or a mammogram, rather than an immediate biopsy, since most findings on a clinical exam turn out to need nothing more than monitoring. How often a clinical breast exam is recommended varies by guideline and by your own risk profile, so it is worth asking your own doctor how it fits into your routine care rather than assuming a fixed schedule applies to everyone.",
    },
    {
      type: "h2",
      id: "mammograms-briefly",
      text: "A mammogram is a low-dose breast X-ray recommended from a certain age or risk level, and it deserves its own deep dive",
    },
    {
      type: "p",
      text: "A mammogram uses a low-dose X-ray to image breast tissue and can flag changes long before they would ever be large enough to feel by hand, which is why it becomes part of the picture once you reach the age or risk category where organisations like the World Health Organization recommend it. Guidelines differ on the exact starting age and interval, and your own family history and risk factors can shift where you fall on that schedule, so this is a conversation to have with a doctor rather than a fixed rule to look up once.",
    },
    {
      type: "p",
      text: "This article deliberately keeps mammography at that summary level. If you want the full walkthrough of what a mammogram actually involves, including what happens during the appointment, what the compression feels like, and how results are read, the dedicated article below covers that in depth.",
    },
    {
      type: "link-internal",
      to: "/blog/mammogram-breast-cancer-screening",
      label: "Read the full mammogram walkthrough: what to expect, step by step",
    },
    {
      type: "h2",
      id: "risk-factors",
      text: "Age and family history raise risk, but most people who develop breast cancer have neither",
    },
    {
      type: "p",
      text: "Risk rises with age, and having a close relative, a mother, sister, or daughter, who has had breast cancer does increase your own risk, which is why family history is part of how clinicians decide when screening should start for a given person. But most people who develop breast cancer have no strong family history at all. A clean family tree lowers the odds somewhat. It does not remove the risk, and it is not a reason to skip self-awareness or delay a check when something changes.",
    },
    {
      type: "p",
      text: "Other factors that can raise risk include starting periods early, reaching menopause late, never having had a full-term pregnancy, hormone use over long periods, and, more modestly, alcohol use and excess weight after menopause. None of these factors work in isolation, and having one or more does not mean cancer is inevitable any more than having none means you are exempt from paying attention to your own body.",
    },
    {
      type: "h2",
      id: "why-africa",
      text: "Breast cancer is often caught later across Africa, and that gap is closing unevenly",
    },
    {
      type: "p",
      text: "WHO and global cancer registry data describe breast cancer as one of the most common cancers among African women, and across much of the continent it tends to be diagnosed at a later stage than in countries with well-established screening programmes. That later diagnosis is driven mainly by lower screening coverage, uneven access to mammography, and lower general awareness of what to watch for, rather than by any difference in how the disease behaves biologically.",
    },
    {
      type: "p",
      text: "A later-stage diagnosis is harder to treat and generally comes with a worse outlook than the same cancer caught early, which is the single strongest argument for building self-awareness and a habit of regular checks now rather than waiting for symptoms to force the issue. More countries are expanding access to clinical breast exams and mammography each year, but coverage still varies widely by country and by facility, so knowing your own body remains the one check available to everyone regardless of where formal screening infrastructure currently reaches.",
    },
    {
      type: "link-internal",
      to: "/blog/pap-smear-cervical-screening",
      label: "Another women's cancer screening worth knowing: Pap smear and HPV testing explained",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "Put the three approaches into a routine you can actually keep",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Build a monthly habit of looking at and feeling your breasts and underarms, so you know your own normal well enough to notice a genuine change.",
        "See a doctor promptly for any new lump, skin dimpling, nipple change, or unusual discharge, rather than waiting to see if it resolves on its own.",
        "Ask about a clinical breast exam at your next routine health visit if you have not had one recently.",
        "Ask your doctor when mammography makes sense for you specifically, since the right starting age and interval depend on your own history and risk factors, not a single number that applies to everyone.",
        "Do not treat a lack of family history as reassurance that rules anything out. Screen and self-check regardless.",
        "Keep a simple record of when you last had a clinical exam or mammogram, so you and your doctor can track what is due.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "BetterHealth does not perform mammograms or breast exams, see the other health markers we do test",
    },
    {
      type: "faq",
      items: [
        {
          q: "Is self-checking my breasts enough on its own?",
          a: "No. Self-awareness helps you notice a genuine change, but it cannot replace a clinical breast exam or a mammogram, both of which can pick up changes that are too small or too deep to feel by hand. The three approaches work best as a set, not as alternatives to each other.",
        },
        {
          q: "What is the difference between this article and BetterHealth's mammogram article?",
          a: "This article is the broad overview of all three screening approaches. The separate mammogram article is a step-by-step walkthrough of what a mammogram appointment actually involves, including what to expect during the scan and how results are read. Read this one first for the full picture, then go there for mammogram specifics.",
        },
        {
          q: "Does BetterHealth Africa offer mammograms or breast exams?",
          a: "No. BetterHealth Africa books blood, urine, and stool lab tests with doctor-reviewed results, and does not perform imaging or physical examinations. For a mammogram or a clinical breast exam, see a doctor or a breast imaging centre. This article is educational, to help you know what to ask for and when.",
        },
        {
          q: "Does a lack of family history mean I am not at risk?",
          a: "No. Most people who develop breast cancer have no strong family history of the disease. Family history raises risk when it is present, but its absence does not remove your risk, so self-awareness and any recommended screening still apply to you.",
        },
        {
          q: "What breast changes should send me to a doctor right away?",
          a: "A new lump that does not resolve after your next cycle, skin dimpling or puckering, a nipple that has changed shape or turned inward, unusual or bloody nipple discharge, or persistent redness or swelling. Most such changes are not cancer, but all of them deserve a clinical check rather than a wait-and-see approach.",
        },
        {
          q: "At what age should mammograms start?",
          a: "Guidelines vary by country and by individual risk, generally starting somewhere in the forties to fifties for average-risk women and earlier for those with higher risk or a strong family history. There is no single number that fits everyone, so ask your own doctor what applies to you. The dedicated mammogram article covers the guideline detail further.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. BetterHealth Africa does not perform mammograms, clinical breast exams, or breast imaging of any kind. Always discuss any breast change, and your own screening schedule, with a doctor.",
    },
  ],
};
