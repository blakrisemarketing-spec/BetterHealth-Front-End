// Patients-led conditions explainer (cluster: "understand your conditions").
// Primary keyword: hiv test (320/mo Ghana, LOW competition, DataForSEO 2026-07-05).
// Secondary: hiv test kit, hiv window period, hiv self test, hiv viral load.
// Handled with dignity throughout: no assumptions about risk groups, no
// stigmatising language, confidentiality emphasised. Facts (window periods, WHO
// sequential testing strategy, Ghana prevalence) checked against WHO/aidsmap/
// UNAIDS/Ghana AIDS Commission sources on 2026-07-05.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept.
export default {
  slug: "hiv-test-explained",
  title: "HIV Testing: Window Period, Test Types, and Reading Your Result",
  description:
    "HIV tests differ in how soon after exposure they become reliable, from 10 days to about 3 months. Learn the three test types, why one reactive result always needs confirmation, and what self-testing can and cannot tell you.",
  excerpt:
    "Not every HIV test is reliable the day after a possible exposure. Here is how the three test types differ, why a single reactive result is never the final word, and what to do next.",
  datePublished: "2026-07-05",
  dateModified: "2026-07-05",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining HIV testing: test types, window periods, and confidential results.",
  tags: ["HIV", "HIV testing", "infectious disease", "self-testing", "sexual health"],
  cluster: "conditions",
  primaryKeyword: "hiv test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/hiv-test-hero.svg",
      alt: "HIV testing explained: window periods, test types, and reading your result. Pill badges read Confidential, Private and Free to Choose, No Wrong Time to Test.",
    },
    {
      type: "p",
      text: "An HIV test looks for one of three things in a blood or oral fluid sample: HIV antibodies, the p24 viral antigen, or the virus's own genetic material. Which one a test looks for decides how soon after a possible exposure it can be trusted, and that timing question is where most confusion about HIV testing comes from.",
    },
    {
      type: "p",
      text: "Testing your status is a private decision you can make at any point, whether or not you think you have been exposed. There is no wrong reason to test and no group of people the test is reserved for.",
    },
    {
      type: "h2",
      id: "what-a-test-checks-for",
      text: "What an HIV test checks for",
    },
    {
      type: "p",
      text: "When HIV enters the body, three things happen in sequence. The virus starts copying its genetic material (RNA) within days. A protein on its surface, called p24 antigen, becomes detectable a little later. Then, over several weeks, the immune system builds antibodies against the virus. Each of the three main test types is built to catch one of these signals, and that is why they do not all become reliable on the same day.",
    },
    {
      type: "list",
      items: [
        "Nucleic acid test (NAT or RNA/PCR test): detects the virus's genetic material directly.",
        "Fourth-generation antigen/antibody (Ag/Ab) combo test: detects the p24 antigen and antibodies together, from a lab sample or a rapid finger-prick device.",
        "Antibody-only test (third-generation or older rapid tests): detects only the antibodies your immune system produces in response.",
      ],
    },
    {
      type: "h2",
      id: "window-period",
      text: "Window period: how soon after exposure a test is reliable",
    },
    {
      type: "p",
      text: "The window period, the stretch of time between a possible exposure and the point a test can be trusted, ranges from about 10 days for the most sensitive lab test to about 3 months for an antibody-only test, so the right test to rely on depends on how recently the exposure happened.",
    },
    {
      type: "image",
      src: "/blog/hiv-window-period.svg",
      alt: "Chart comparing HIV test window periods: NAT (RNA) test reliable from 10 to 33 days, 4th-generation antigen/antibody test reliable from 18 to 45 days, antibody-only rapid test reliable at about 3 months.",
      caption: "Window periods by test type. A test taken before its window closes can still miss a recent infection.",
    },
    {
      type: "list",
      items: [
        "NAT (RNA) test: reliable from about 10 to 33 days after exposure. The earliest option, but not the test most clinics use for routine screening.",
        "4th-generation Ag/Ab combo test: reliable from about 18 to 45 days after exposure. This is the test most labs and rapid-testing programmes use today.",
        "Antibody-only rapid test: needs about 3 months to be conclusively reliable, since it depends entirely on antibodies the body has not yet finished building earlier than that.",
      ],
    },
    {
      type: "callout",
      title: "A negative result inside the window period is not final",
      text: "If you test before your test type's window period has closed, a negative result does not rule out infection. The standard advice is to repeat the test once the window period for whichever test you used has passed.",
    },
    {
      type: "h2",
      id: "one-result-is-not-a-diagnosis",
      text: "Why a single reactive result is not a diagnosis",
    },
    {
      type: "p",
      text: "A reactive rapid or lab test is a preliminary result, not a diagnosis, and the World Health Organization's testing strategy requires it to be confirmed with one or two additional, different tests in sequence before anyone is told they are HIV-positive.",
    },
    {
      type: "p",
      text: "This sequential approach exists because no single test, however good, has a perfect positive predictive value on its own, especially in places where fewer people are living with HIV. Running a second, differently designed test on the same reactive sample, and a third if the first two disagree, is what national HIV programmes across Africa, including Ghana, use to reach a confirmed result before starting anyone on treatment.",
    },
    {
      type: "callout",
      title: "What \"reactive\" means",
      text: "A rapid test result of \"reactive\" or \"preliminary positive\" means the sample reacted to the test. It is a signal to get confirmatory testing at a clinic or lab, not a confirmed diagnosis on its own.",
    },
    {
      type: "h2",
      id: "self-testing",
      text: "HIV self-testing: what it can and cannot tell you",
    },
    {
      type: "p",
      text: "HIV self-testing, recommended by the World Health Organization and available in Ghana as an oral-fluid or finger-prick kit you can use privately at home, gives a result in about 10 to 20 minutes without a clinic visit.",
    },
    {
      type: "p",
      text: "A self-test screens for antibodies, so the same window period rules apply as for any antibody-only test. If your self-test is reactive, the next step is confirmatory testing at a clinic or lab, following the same sequential process described above, not a phone call or a repeat self-test.",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the Infectious Diseases panel, including HIV testing, BetterHealth Africa offers",
    },
    {
      type: "h2",
      id: "viral-load",
      text: "HIV viral load: a different test, for a different purpose",
    },
    {
      type: "p",
      text: "HIV viral load testing measures how much virus is in the blood of someone already diagnosed with HIV, and it is a monitoring tool for people on treatment, not a way to diagnose a new infection.",
    },
    {
      type: "p",
      text: "A falling viral load shows that antiretroviral treatment is working. Many people on consistent treatment reach an undetectable viral load, meaning the amount of virus in their blood is too low for standard tests to measure and, sustained over time, too low to transmit the virus sexually. Viral load is checked periodically after starting or adjusting treatment, on a schedule set by the treating clinician.",
    },
    {
      type: "h2",
      id: "ghana-and-africa-context",
      text: "HIV testing in Ghana and across Africa",
    },
    {
      type: "p",
      text: "Sub-Saharan Africa carries the largest share of people living with HIV worldwide, and in Ghana an estimated 1.49% of adults aged 15 to 49 were living with HIV as of the 2024 National HIV Estimates, with about 334,721 people living with HIV overall and roughly 15,290 new infections recorded that year.",
    },
    {
      type: "p",
      text: "Testing rates still vary widely by region and by gender, and many people who test positive find out later than they could have, since HIV often causes no symptoms for years. Wider access to rapid and self-testing has been a deliberate part of Ghana's and the wider region's push to close that gap, alongside routine antenatal testing and testing offered as part of premarital and pre-family-planning screening.",
    },
    {
      type: "link-internal",
      to: "/blog/sickle-cell-trait-testing",
      label: "Premarital and pre-family-planning screening: what a genotype test adds alongside HIV testing",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "If it has been less than 3 months since a possible exposure, note the date and test with whichever test type matches your timing, or plan to retest once the window period for your test has passed.",
        "If your result is non-reactive (negative) and it is outside the window period for the test you used, you can trust that result for that exposure.",
        "If your result is reactive on a rapid test or self-test, get confirmatory testing at a clinic or lab as soon as you reasonably can. It is a preliminary signal, not a diagnosis.",
        "If a confirmatory result is positive, ask about starting antiretroviral treatment promptly. Starting early is linked to better long-term health and, over time, to an undetectable viral load.",
        "If you are already diagnosed and on treatment, keep your viral load checks on the schedule your clinician sets, since that number, not a repeat HIV test, is what tracks how well treatment is working.",
        "However your result comes back, your status is confidential. You decide who else you tell.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/full-blood-count-explained",
      label: "Full blood count explained: routine blood work alongside an HIV panel",
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
          q: "How soon after exposure can I get an accurate HIV test?",
          a: "It depends on the test type. A nucleic acid (RNA) test can be reliable from about 10 to 33 days after exposure. A 4th-generation antigen/antibody combo test, the type most clinics and labs use, needs about 18 to 45 days. An antibody-only rapid or self-test needs about 3 months to be conclusively reliable.",
        },
        {
          q: "Is a reactive HIV test result the same as a diagnosis?",
          a: "No. A reactive result on a rapid test or self-test is preliminary. The World Health Organization's testing strategy requires it to be confirmed with one or two additional, different tests before an HIV-positive diagnosis is given.",
        },
        {
          q: "Can I use an HIV self-test instead of going to a clinic?",
          a: "A self-test is a valid, WHO-recommended way to screen your own status privately, and kits are available in Ghana. It detects antibodies, so the same window period applies as for any antibody-only test. A reactive self-test still needs confirmatory testing at a clinic or lab.",
        },
        {
          q: "What is the difference between an HIV test and a viral load test?",
          a: "An HIV test tells you whether you have HIV. A viral load test measures how much virus is in the blood of someone already diagnosed, and is used to monitor how well antiretroviral treatment is working, not to diagnose a new infection.",
        },
        {
          q: "How common is HIV in Ghana?",
          a: "According to Ghana's 2024 National HIV Estimates, an estimated 1.49% of adults aged 15 to 49 were living with HIV, with about 334,721 people living with HIV overall. Rates vary by region.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, counselling, or treatment by a qualified healthcare professional. HIV testing algorithms and treatment decisions depend on your specific results, testing history, and circumstances. Always discuss your results and next steps with a doctor, a trained HIV counsellor, or a qualified healthcare professional, and remember that your test results are confidential.",
    },
  ],
};
