// Patients-led biomarker explainer (cluster: "read your results").
// Primary keyword: psa test (480/mo Ghana, LOW competition, DataForSEO 2026-07-10).
// Secondary: psa test normal range (70/mo), psa test results (20/mo), psa test for
// men (10/mo), prostate cancer screening (40/mo).
// Facts (PSA function, non-cancer causes of elevation, higher prostate cancer
// incidence and earlier/more advanced presentation in men of African descent,
// shared-decision-making framing on screening age) checked against standard
// urology/oncology screening guidance on 2026-07-10. Framed as a screening-age
// conversation, not a blanket recommendation, per guideline consensus.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept.
export default {
  slug: "psa-prostate-test",
  title: "PSA Test: Prostate Screening for Men, and What a Raised Result Means",
  description:
    "PSA is a screening tool, not a cancer diagnosis. Learn what the test measures, what else can raise it besides cancer, and why the screening-age conversation matters more for men of African descent.",
  excerpt:
    "A raised PSA result is common and usually not cancer. This covers what the test measures, what else can push it up, and why the screening conversation should start earlier for some men.",
  datePublished: "2026-07-10",
  dateModified: "2026-07-10",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining PSA testing for prostate screening: a raised result opens a conversation, not a diagnosis.",
  tags: ["PSA test", "prostate cancer", "men's health", "screening", "biomarkers"],
  cluster: "biomarkers",
  primaryKeyword: "psa test",
  readingMinutes: 7,
  body: [
    {
      type: "image",
      src: "/blog/psa-prostate-hero.svg",
      alt: "PSA testing explained: results are read as a range, not a strict cutoff, and a raised result starts a conversation with a doctor.",
    },
    {
      type: "p",
      text: "PSA (prostate-specific antigen) is a protein made almost entirely by the prostate gland, and a blood test measures how much of it is circulating. It is one of the main tools used to screen for prostate cancer, but it is not a yes-or-no cancer test on its own, and understanding why matters before you look at a number on a lab report.",
    },
    {
      type: "h2",
      id: "what-psa-is",
      text: "What PSA is and why the prostate makes it",
    },
    {
      type: "p",
      text: "The prostate is a small gland below the bladder in men, and part of its normal job is producing fluid that supports sperm. PSA is a byproduct of that process, and small amounts normally leak into the bloodstream. A PSA blood test measures that circulating amount, and the number tends to rise when something changes in the prostate, whether that is normal age-related growth, inflammation, or, in some cases, cancer.",
    },
    {
      type: "h2",
      id: "reading-your-result",
      text: "Reading your result: PSA is a range, not a single yes/no cutoff",
    },
    {
      type: "p",
      text: "PSA results are usually read as a rising scale rather than a strict cutoff, with most labs flagging results above roughly 4 ng/mL for further discussion, though the right threshold shifts with age, since PSA naturally creeps up as the prostate enlarges with age even without disease. A result just above the flagged threshold is a prompt to talk with a doctor, not an automatic red flag, and doctors often look at how PSA has changed over time (PSA velocity) rather than a single reading in isolation.",
    },
    {
      type: "p",
      text: "The reverse is also worth knowing: a normal or low PSA does not completely rule out prostate cancer. Some cancers, including certain aggressive ones, do not raise PSA much, which is why a doctor weighs the number alongside symptoms, a physical exam, and personal risk factors rather than treating a single normal reading as an all-clear.",
    },
    {
      type: "h2",
      id: "what-else-raises-psa",
      text: "What else raises PSA besides cancer",
    },
    {
      type: "p",
      text: "An enlarged but non-cancerous prostate (benign prostatic hyperplasia), prostate infection or inflammation, recent ejaculation, and vigorous exercise can all raise PSA, so a high result is not a cancer diagnosis on its own. Benign prostatic hyperplasia in particular is extremely common with age and is, by itself, unrelated to cancer risk, even though it can push PSA into a range that prompts further questions.",
    },
    {
      type: "image",
      src: "/blog/psa-ranges.svg",
      alt: "Common causes of a raised PSA result: benign prostatic hyperplasia, prostatitis or urinary infection, recent ejaculation or exercise, and prostate cancer as one possible cause among several.",
      caption: "Several common, non-cancer causes can raise PSA. Further testing separates them from prostate cancer.",
    },
    {
      type: "list",
      items: [
        "Benign prostatic hyperplasia (BPH): common, non-cancerous prostate enlargement with age.",
        "Prostatitis or a urinary tract infection: inflammation raises PSA temporarily.",
        "Recent ejaculation or vigorous exercise (including cycling): can raise PSA for a day or two before testing.",
        "A recent prostate exam or catheter: can cause a temporary, mild rise.",
        "Prostate cancer: one possible cause among several, needing further testing to confirm or rule out.",
      ],
    },
    {
      type: "h2",
      id: "screening-age-conversation",
      text: "Why the screening-age conversation matters more for men of African descent",
    },
    {
      type: "p",
      text: "Men of African descent have a higher lifetime incidence of prostate cancer and tend to be diagnosed at a younger age and a more advanced stage than men of other ancestries, which is why some guidelines suggest starting the screening conversation earlier for this group. This is a conversation to have with a doctor about your personal risk, family history, and preferences, not a blanket instruction that every man needs annual PSA testing. Screening guidelines generally favour shared decision-making because PSA testing can also lead to overdiagnosis of slow-growing cancers that may never have caused harm, so the decision to start, and how often to repeat it, is one to make with a clinician.",
    },
    {
      type: "callout",
      title: "A family history matters too",
      text: "A father or brother diagnosed with prostate cancer, especially at a younger age, is another reason to start the screening conversation earlier. Mention your family history when you see a doctor, alongside your ancestry, so the discussion reflects your actual risk.",
    },
    {
      type: "h2",
      id: "if-raised",
      text: "If your PSA comes back raised",
    },
    {
      type: "p",
      text: "A raised PSA result opens a conversation with a doctor about repeat testing, a free-to-total PSA ratio, imaging, or biopsy, not an automatic diagnosis or treatment decision. A repeat test after a few weeks, avoiding ejaculation and vigorous exercise beforehand, sometimes shows the number has settled back down on its own. If it stays raised, a doctor may suggest a free PSA ratio, an MRI, or, in some cases, a biopsy to look directly at prostate tissue before any treatment discussion begins.",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do next",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "If you are over 40 to 45 and have not discussed prostate screening with a doctor, especially with a family history or African ancestry, raise it at your next visit.",
        "Avoid ejaculation and vigorous exercise for a day or two before a scheduled PSA test, since both can temporarily raise the result.",
        "If your PSA comes back raised, ask your doctor whether a repeat test, a free PSA ratio, or imaging is the right next step, rather than assuming the worst from one number.",
        "Mention any urinary symptoms, such as difficulty starting urination, a weak stream, or getting up often at night, since these point more toward benign prostate enlargement than cancer, but are worth discussing either way.",
        "If a biopsy or further testing is recommended, ask your doctor to explain what a positive or negative result would mean for your specific case before you go in.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/preventive-health-screening-ghana",
      label: "Preventive health screening in Ghana: what to test and how often",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the men's health and cancer screening panels BetterHealth Africa offers",
    },
    {
      type: "link-internal",
      to: "/book-tests",
      label: "View BetterHealth Africa test pricing",
    },
    {
      type: "faq",
      items: [
        {
          q: "What is a normal PSA test result?",
          a: "Most labs flag results above roughly 4 ng/mL for further discussion, but the appropriate range shifts with age, since PSA naturally rises somewhat as the prostate enlarges over time. A doctor interprets your number alongside your age, symptoms, and trend over time, not as a single fixed cutoff.",
        },
        {
          q: "Does a high PSA mean I have prostate cancer?",
          a: "No. A raised PSA has several common causes besides cancer, including benign prostate enlargement, infection or inflammation, and recent ejaculation or vigorous exercise. Further testing is needed to find the cause.",
        },
        {
          q: "At what age should men start PSA screening?",
          a: "There is no single universal age. Guidelines generally suggest a shared decision-making conversation with a doctor starting around age 50 for average-risk men, and earlier, often around 40 to 45, for men with a family history of prostate cancer or of African descent, given their higher and earlier risk.",
        },
        {
          q: "Why is prostate cancer risk higher for men of African descent?",
          a: "Research consistently shows men of African descent have a higher lifetime incidence of prostate cancer and tend to be diagnosed younger and at a more advanced stage than men of other ancestries. The exact reasons are still studied, but the pattern is well established, which is why some guidelines recommend starting the screening conversation earlier for this group.",
        },
        {
          q: "What happens if my PSA test comes back raised?",
          a: "A raised PSA usually leads to a conversation about a repeat test, a free-to-total PSA ratio, imaging, or in some cases a biopsy. It is a step toward finding the cause, not a diagnosis or treatment decision on its own.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Decisions about prostate cancer screening, including when to start and how to interpret results, depend on your personal risk factors and should be made together with a doctor.",
    },
  ],
};
