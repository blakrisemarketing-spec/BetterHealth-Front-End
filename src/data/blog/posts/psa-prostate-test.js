// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: psa test (480/mo Ghana, LOW competition, DataForSEO, location 2288).
// Secondary: psa normal range (140/mo), prostate cancer screening (40/mo),
// raised psa causes (10/mo), psa (broader term, 1300/mo).
// Sensitive cancer-screening topic: this article deliberately avoids claiming a raised
// PSA equals cancer, and avoids recommending universal unconditional screening. It carries
// the overdiagnosis/overtreatment caveat used in current mainstream guideline caution
// (shared decision-making with a clinician), matching USPSTF-style framing.
// Voice: plain, human, no em dashes (bh-humanizer applied).
export default {
  slug: "psa-prostate-test",
  title: "PSA Test: Prostate Screening for Men, and What a Raised Result Means",
  description:
    "PSA is a protein made by the prostate, and the blood test measures how much is in your blood, not cancer directly. Learn what a normal range looks like, why a raised result usually is not cancer, and how to talk to a doctor about screening.",
  excerpt:
    "A PSA test measures a protein your prostate makes every day, not cancer itself. What a raised result usually means, why prostate cancer risk deserves extra attention for men of African descent, and how doctors decide what to do next.",
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the PSA prostate test and what a raised result means.",
  tags: ["PSA", "prostate", "cancer screening", "men's health", "biomarkers"],
  cluster: "biomarkers",
  primaryKeyword: "psa test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/psa-hero.svg",
      alt: "The PSA test explained: a protein level, not a cancer diagnosis on its own.",
    },
    {
      type: "p",
      text: "A PSA test is one of the most requested and least understood blood tests men ask for. The result is a single number, but what that number means depends heavily on context: your age, your prostate history, and even what you did the day before the test. This article walks through what PSA measures, why it deserves real attention for men of African descent, and why a raised result is a starting point for a conversation with a doctor, not a verdict.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What a PSA test measures",
    },
    {
      type: "p",
      text: "PSA, or prostate-specific antigen, is a protein made by the prostate gland, and the blood test measures how much of it is circulating in your blood, not cancer directly.",
    },
    {
      type: "p",
      text: "Every man with a prostate has some PSA in his blood. The prostate makes this protein as part of its normal job, which is producing part of the fluid in semen. A small, steady amount leaks into the bloodstream, and the test measures that amount. A higher level means more PSA is leaking out, which can happen for several reasons, cancer being only one of them.",
    },
    {
      type: "h2",
      id: "african-descent-risk",
      text: "Why PSA matters more for men of African descent",
    },
    {
      type: "p",
      text: "Prostate cancer incidence and mortality are widely reported in the epidemiological literature as disproportionately high in men of African descent, which is a major reason this test is worth understanding rather than ignoring.",
    },
    {
      type: "p",
      text: "This pattern shows up across multiple countries and populations, and it is one of the most consistent findings in prostate cancer research. It does not mean every man of African descent will develop prostate cancer, and it is not a reason to panic. It is a reason for men across Ghana and the wider continent to know their family history, understand what this test can and cannot tell them, and have an informed conversation with a doctor about their personal risk rather than encountering this information for the first time after a diagnosis.",
    },
    {
      type: "h2",
      id: "raised-psa-causes",
      text: "Why a raised PSA does not mean cancer",
    },
    {
      type: "p",
      text: "A raised PSA is common and has several everyday, non-cancer causes, including an enlarged prostate, a prostate infection, a recent ejaculation, urinary catheterisation, and vigorous exercise shortly before the test.",
    },
    {
      type: "list",
      items: [
        "Benign prostatic hyperplasia (BPH): a non-cancerous enlargement of the prostate that becomes more common with age and is one of the most frequent causes of a raised PSA.",
        "Prostatitis: inflammation or infection of the prostate, which can push PSA up temporarily until it is treated.",
        "Recent ejaculation: can raise PSA for a day or two, which is why some clinics ask men to avoid it briefly before testing.",
        "Urinary catheterisation or a recent prostate exam: physical irritation of the prostate can raise the reading for a short period.",
        "Vigorous exercise, particularly cycling, shortly before the blood draw.",
      ],
    },
    {
      type: "image",
      src: "/blog/psa-causes.svg",
      alt: "Five everyday causes of a raised PSA besides cancer: BPH, prostatitis, recent ejaculation, catheterisation or recent exam, and vigorous exercise.",
      caption:
        "A raised PSA is a signal to look closer with a clinician, not a diagnosis by itself.",
    },
    {
      type: "callout",
      title: "A raised PSA is not a cancer diagnosis",
      text: "Most men with a raised PSA do not have prostate cancer. The test cannot tell the difference between PSA raised by cancer and PSA raised by BPH, infection, or recent activity on its own. That is exactly why a raised result leads to more questions and sometimes more tests, not straight to a diagnosis.",
    },
    {
      type: "h2",
      id: "normal-range",
      text: "PSA normal range",
    },
    {
      type: "p",
      text: "PSA is reported in nanograms per millilitre (ng/mL), and what counts as typical shifts upward with age rather than sitting at one fixed cutoff for every man.",
    },
    {
      type: "list",
      items: [
        "Under 40: typically below 2.5 ng/mL",
        "40s: typically below 2.5 to 3.5 ng/mL",
        "50s: typically below 3.5 to 4.5 ng/mL",
        "60s and above: typically below 4.5 to 6.5 ng/mL",
      ],
    },
    {
      type: "p",
      text: "These bands are general guides, not hard lines. Labs and clinicians use them alongside your personal history, your previous PSA readings, and how the number has changed over time. A steady, gradually rising trend across repeat tests often matters more to a clinician than any single reading against a cutoff.",
    },
    {
      type: "h2",
      id: "screening-guidance",
      text: "Should every man get a PSA test?",
    },
    {
      type: "p",
      text: "Major clinical guidelines do not recommend automatic, population-wide PSA screening for all men, because the test can lead to overdiagnosis and overtreatment of slow-growing cancers that may never have caused harm in a man's lifetime.",
    },
    {
      type: "p",
      text: "This is one of the more nuanced points in cancer screening. PSA testing can catch aggressive prostate cancer early, when treatment works best. It can also flag slow-growing cancers that would never have caused symptoms or shortened a man's life, leading to biopsies, treatment, and side effects for a condition that may not have needed intervention at all. Because of this tradeoff, current mainstream guidance generally frames PSA testing as a decision to make together with a doctor, weighing personal risk factors, family history, and personal preference, rather than a test every man should get automatically at a set age.",
    },
    {
      type: "callout",
      title: "This is a shared decision, not a default",
      text: "If you are considering a PSA test, the most useful step is a conversation with a doctor about your individual risk, not a blanket decision to test or not test. Bring your family history and any urinary symptoms to that conversation.",
    },
    {
      type: "h2",
      id: "risk-factors",
      text: "Age and family history: the two risk factors that matter most",
    },
    {
      type: "p",
      text: "Prostate cancer risk rises with age past the mid-40s to 50s, and having a father or brother with prostate cancer roughly doubles a man's own risk.",
    },
    {
      type: "p",
      text: "Age is the single strongest risk factor for prostate cancer, and prostate cancer is uncommon in men under 40. Family history is the second major factor: a first-degree relative, meaning a father or brother, with prostate cancer meaningfully raises a man's own risk, and having more than one affected relative raises it further. These are the two questions a doctor will usually ask first when discussing whether and when PSA testing makes sense for you.",
    },
    {
      type: "h2",
      id: "after-raised-result",
      text: "What happens after a raised PSA result",
    },
    {
      type: "p",
      text: "A raised PSA result is usually followed by a repeat test, a free-to-total PSA ratio, or a referral to a urologist, not an automatic biopsy.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Repeat the test. A single raised reading is often rechecked after a few weeks, since temporary causes like infection or recent activity can resolve on their own.",
        "Free-to-total PSA ratio. This compares the free-floating PSA in your blood to the total amount, and can help a clinician judge how likely a raised result is to reflect cancer versus a benign cause.",
        "Digital rectal exam and clinical history. A doctor will usually examine the prostate and ask about urinary symptoms, family history, and recent activity that could explain the result.",
        "Urology referral. If the picture still looks concerning after these steps, a urologist may recommend further imaging or, in some cases, a biopsy, which remains the only way to confirm a cancer diagnosis.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/preventive-health-screening-ghana",
      label: "See how PSA fits into a broader preventive screening plan by age",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your PSA result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Talk to a doctor before and after testing, so the result is read alongside your age, family history, and symptoms rather than in isolation.",
        "Avoid ejaculation, vigorous exercise, and cycling for a day or two before the test where possible, since these can temporarily raise the reading.",
        "If your result is raised, ask what caused it before assuming the worst. A repeat test or a free-to-total PSA ratio often clarifies the picture.",
        "Know your family history. A father or brother with prostate cancer is worth mentioning to a doctor before deciding on a testing schedule.",
        "Track your PSA over time if you do test. A trend across repeat readings tells a clinician more than any single number.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the tests BetterHealth Africa offers",
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
          q: "Does a high PSA mean I have cancer?",
          a: "No. Most men with a raised PSA do not have prostate cancer. Common non-cancer causes include an enlarged prostate (BPH), a prostate infection, recent ejaculation, a recent urinary catheter or exam, and vigorous exercise shortly before the test. A raised result usually leads to a repeat test or further evaluation, not a cancer diagnosis on its own.",
        },
        {
          q: "At what age should men start thinking about PSA testing?",
          a: "There is no single age that applies to every man. Prostate cancer risk rises with age past the mid-40s to 50s, and men with a father or brother who had prostate cancer are generally advised to have this conversation earlier than men without that history. The right starting point depends on your individual risk, which is why doctors recommend discussing it rather than following a fixed rule.",
        },
        {
          q: "Do I need to prepare for a PSA test?",
          a: "Some clinics advise avoiding ejaculation and vigorous exercise, particularly cycling, for a day or two before the test, since both can temporarily raise the reading. There is no need to fast. Mention any recent urinary infection, prostate exam, or catheter use to your clinician, since these can also affect the result.",
        },
        {
          q: "What is a normal PSA level?",
          a: "PSA is measured in nanograms per millilitre (ng/mL), and what counts as typical rises with age, roughly under 2.5 ng/mL in a man's 40s up to under 6.5 ng/mL in his 60s and beyond, depending on the lab's reference range. A clinician also looks at how your PSA changes over repeat tests, not just where a single result falls against a cutoff.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. PSA testing involves real tradeoffs between early detection and the risk of overdiagnosis and overtreatment, and the right decision depends on your individual risk factors. Always discuss whether and when to test, and how to interpret your result, with your doctor.",
    },
  ],
};
