// Patients-led screening explainer (cluster: "screening"). South Africa framing,
// procedure-focused deep dive that is the mammogram-specific companion to the
// broader "breast-cancer-screening-guide" article in the same batch (self-checks
// and clinical breast exams live there, not here).
// Primary keyword: mammogram screening (210/mo South Africa, LOW competition,
// DataForSEO confirmed). Secondary: mammogram near me (1000/mo, informational
// framing only, no fabricated locator), do mammograms hurt (140/mo), mammogram
// age (70/mo). "Free mammograms at dischem" seen in keyword ideas but not used
// for any specific factual claim, since BetterHealth cannot verify a named
// retailer's current programme; the article makes one generic, hedged mention of
// pharmacy/NGO screening campaigns instead.
// BetterHealth does not perform, book, or refer for mammograms or any imaging,
// it is a blood/urine/stool testing platform. Every link to /what-we-test or
// /pricing is framed honestly around the panels BetterHealth does test, never as
// if it relates directly to breast imaging. No single global start age asserted,
// guidance is hedged the same way the pap smear article hedges cervical
// screening intervals. Voice: plain, human, no em dashes (bh-humanizer pass
// applied).
export default {
  slug: "mammogram-breast-cancer-screening",
  title: "Mammogram Screening: What to Expect and When to Start",
  description:
    "A mammogram is a quick X-ray of breast tissue that screens for changes too small to feel. Here is what actually happens, how much it can hurt, and when to start.",
  excerpt:
    "What a mammogram actually involves, step by step, honestly covering the discomfort, what your result category means, and when mainstream guidelines say to start.",
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining what to expect during a mammogram and when screening guidelines suggest starting.",
  tags: [
    "mammogram",
    "breast cancer screening",
    "women's health",
    "screening",
  ],
  cluster: "screening",
  primaryKeyword: "mammogram screening",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/mammogram-breast-cancer-screening-hero.svg",
      alt: "Mammogram screening explained: a short, honest walkthrough of the exam and when guidelines say to start.",
    },
    {
      type: "p",
      text: "A mammogram is an X-ray picture of breast tissue, and it remains the main tool doctors use to screen for breast cancer before a lump or any other symptom shows up. If you have never had one, most of the anxiety around it comes from not knowing what actually happens once you are in the room, not from the exam itself.",
    },
    {
      type: "p",
      text: "This article is a walkthrough of the mammogram itself: how it is done, how much it can hurt, what the images actually show, and the age and interval guidance mainstream bodies currently point to. If you want the fuller picture, including breast self-checks and a clinical breast exam done by a doctor, that lives in our broader guide to breast cancer screening.",
    },
    {
      type: "h2",
      id: "what-is-a-mammogram",
      text: "A mammogram is a low-dose X-ray of breast tissue, taken from at least two angles per breast, that looks for changes too small to feel or see.",
    },
    {
      type: "p",
      text: "The images a mammogram produces can pick up a lump years before it would be large enough to notice by touch, along with other early signs such as clusters of tiny calcium deposits, called microcalcifications, or subtle changes in tissue density. There are two versions of the exam. A screening mammogram is done routinely on women with no symptoms. A diagnostic mammogram is done to investigate a specific lump, pain, or change a doctor has already found, and it usually involves more images and sometimes an ultrasound on the same visit.",
    },
    {
      type: "link-internal",
      to: "/blog/breast-cancer-screening-guide",
      label: "Read the fuller guide: breast self-checks, clinical exams and mammograms together",
    },
    {
      type: "h2",
      id: "step-by-step",
      text: "During a mammogram, a radiographer positions one breast at a time on a flat plate and briefly compresses it between two plates to spread the tissue for a clearer image.",
    },
    {
      type: "p",
      text: "You undress from the waist up and stand in front of the machine. The radiographer, almost always a woman, positions your breast on a flat surface and lowers a second plate to flatten and spread the tissue out. The compression lasts only a few seconds while the X-ray is taken, then releases. The same process repeats from a second angle, and then again on the other breast, so a standard screening mammogram produces four images in total, two per side. The whole appointment, including changing and waiting, usually takes about twenty minutes.",
    },
    {
      type: "image",
      src: "/blog/mammogram-breast-cancer-screening-steps.svg",
      alt: "What happens during a mammogram, step by step: positioning, compression, X-ray from two angles, then review by a radiologist.",
      caption: "Four steps, about twenty minutes in total. Compression itself lasts only seconds per image.",
    },
    {
      type: "h3",
      id: "before-your-appointment",
      text: "A few small things make the appointment go more smoothly",
    },
    {
      type: "list",
      items: [
        "Skip deodorant, antiperspirant, powder, or lotion on the day, since traces of aluminium and other minerals can show up as white spots on the image and confuse the reading.",
        "Wear a two-piece outfit so you only need to undress from the waist up.",
        "Where you can choose, book the week right after your period, when breast tissue tends to be least tender.",
        "Mention if you are pregnant, breastfeeding, or have breast implants, since the technique is adjusted in each case.",
        "Ask for your previous mammogram images if you are switching to a new facility, since a radiologist compares new images against your history whenever possible.",
      ],
    },
    {
      type: "h2",
      id: "does-it-hurt",
      text: "Mammogram compression can feel uncomfortable or briefly painful for some women, but the pressure lasts only a few seconds per view and eases as soon as the image is taken.",
    },
    {
      type: "p",
      text: "How much it hurts varies a lot by person, by breast sensitivity, and by where you are in your menstrual cycle. Compression that flattens the tissue is what makes the image clear enough to read, so a radiographer cannot simply skip it, but pressure can be adjusted if it becomes too much to bear, so say something in the moment rather than gritting through it silently. The discomfort typically fades within minutes of finishing, and it is not a reason to skip or delay a mammogram you are due for.",
    },
    {
      type: "callout",
      title: "The discomfort is real but brief",
      text: "Compression itself takes only a few seconds per image. Most women describe a mammogram as uncomfortable rather than unbearable, and any soreness afterward is usually gone within a day.",
    },
    {
      type: "h2",
      id: "mammogram-age",
      text: "Guidelines on when to start mammograms vary by country and by organisation, generally clustering somewhere in the 40s to 50s, with rescreening every one to three years after that.",
    },
    {
      type: "p",
      text: "The World Health Organization, the US Preventive Services Task Force, and the UK's NHS breast screening programme do not all draw the line at the same age, and none of them is simply wrong. Some point to starting around 40 to 45 for women at average risk, others set the default screening age at 50, and the repeat interval ranges from every year to every three years depending on the guideline body, your age band, and your personal risk factors. In South Africa, private and public guidance can differ, so the number that matters is the one your own doctor or medical aid scheme recommends, not a single figure quoted online.",
    },
    {
      type: "p",
      text: "A family history of breast cancer, a known genetic mutation such as BRCA1 or BRCA2, dense breast tissue, or a previous breast biopsy can all shift when screening should start and how often it should repeat, sometimes by a decade or more. That conversation belongs with your own doctor, not with a search result.",
    },
    {
      type: "h2",
      id: "reading-your-result",
      text: "Mammogram results are generally grouped into a small number of plain-language categories, such as normal, needs more views, or needs a biopsy, rather than a single pass or fail verdict.",
    },
    {
      type: "p",
      text: "Radiologists in many countries use a standardised reporting scale, often based on the BI-RADS system, that sorts findings into categories from clearly normal through to highly suspicious. Translated into plain language, most results fall into one of three broad buckets.",
    },
    {
      type: "list",
      items: [
        "Normal or benign: nothing concerning was seen, or a finding is confidently non-cancerous. Return for your next routine mammogram on schedule.",
        "Needs more views or extra imaging: something was not clear enough on the first images, often because of dense tissue or an awkward angle. You will usually be called back for additional mammogram views or an ultrasound, not because something is necessarily wrong.",
        "Needs a biopsy: a finding looks suspicious enough that only a tissue sample can settle the question. A biopsy result, not the mammogram itself, is what confirms or rules out cancer.",
      ],
    },
    {
      type: "callout",
      title: "A callback is not a cancer diagnosis",
      text: "Most women called back for extra images after a screening mammogram do not have cancer. Dense breast tissue, benign cysts, and simple positioning issues are common, non-cancerous reasons for a second look.",
    },
    {
      type: "h2",
      id: "access-in-south-africa",
      text: "Mammograms in South Africa are usually done at dedicated radiology or breast-imaging centres, some private hospitals, and selected public academic hospitals, not at a GP's consulting rooms.",
    },
    {
      type: "p",
      text: "If you are searching for where to have one done, the honest starting point is your own doctor or gynaecologist, who can refer you to a radiology practice or breast clinic near you and confirm whether your medical aid plan covers screening mammograms as a preventive benefit or requires a co-payment. Provincial public hospitals in major centres also offer mammography, though demand and waiting times vary by facility and region.",
    },
    {
      type: "p",
      text: "Some pharmacy chains and non-profit organisations in South Africa periodically run free or subsidised breast-screening campaigns, often timed around October's Breast Cancer Awareness Month. Availability, eligibility, and which facilities take part change from year to year and campaign to campaign, so confirm current details directly with the organiser rather than assuming a specific offer is running. BetterHealth Africa is a blood, urine, and stool testing platform. We do not perform, book, or refer patients for mammograms ourselves, but the panels we do test, including hormone and general wellness markers, are worth knowing about as part of the same preventive-health habit.",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the health markers and panels BetterHealth Africa does test",
    },
    {
      type: "h2",
      id: "what-to-do-next",
      text: "Acting on a mammogram you are due for is simpler than the anxiety around it suggests, and a short checklist covers most of what actually matters.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "If you are in the age range your doctor or local guideline recommends, book the appointment rather than waiting for a symptom, since early changes usually cause none.",
        "Skip deodorant, antiperspirant, and powder on the day, and wear a two-piece outfit.",
        "Where possible, schedule the week after your period, when breast tissue is typically least tender.",
        "Bring or request access to any previous mammogram images if you are testing at a new facility.",
        "If you are called back for more views, keep the appointment and ask what specifically prompted it. A callback is common and usually not cancer.",
        "Ask your medical aid scheme in advance what it covers for screening mammograms, including any co-payment, so there are no surprises on the day.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/pap-smear-cervical-screening",
      label: "Another women's cancer screening worth knowing about: Pap smear and HPV testing explained",
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
          q: "Do mammograms hurt?",
          a: "For some women, yes, at least briefly. The compression needed to flatten breast tissue for a clear image can feel uncomfortable or momentarily painful, but it lasts only a few seconds per view and eases immediately after. Scheduling the week after your period can make it more comfortable for some women.",
        },
        {
          q: "What age should I start having mammograms?",
          a: "There is no single universal age. Major guideline bodies generally suggest starting somewhere between 40 and 50 for women at average risk, with the exact age and rescreening interval depending on the guideline body and your own risk factors. Ask your doctor what applies to you.",
        },
        {
          q: "Where can I get a mammogram near me?",
          a: "Mammograms in South Africa are typically done at dedicated radiology or breast-imaging centres, some private hospitals, and selected public academic hospitals. Your own doctor or gynaecologist can refer you to a facility near you and confirm what your medical aid plan covers. BetterHealth Africa does not perform or book mammograms.",
        },
        {
          q: "What do mammogram results actually mean?",
          a: "Results are generally grouped into plain-language categories such as normal, needs more views, or needs a biopsy, based on a standardised radiology scale. Being called back for more images is common and does not mean cancer. Only a biopsy confirms or rules out a cancer diagnosis.",
        },
        {
          q: "How long does a mammogram appointment take?",
          a: "A standard screening mammogram usually takes about twenty minutes from check-in to done, including changing. The X-ray part itself, four images in total across both breasts, takes only a few minutes.",
        },
        {
          q: "Are there free or subsidised mammograms in South Africa?",
          a: "Some pharmacy chains and non-profit organisations periodically run free or subsidised breast-screening campaigns, often around Breast Cancer Awareness Month in October. Availability and participating facilities change year to year, so confirm current details directly with the organiser rather than assuming an offer is running.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, counselling, or treatment by a qualified healthcare professional. Screening age, interval, and follow-up after an unclear result depend on your own history, risk factors, and local guidelines. BetterHealth Africa is a blood, urine, and stool testing platform and does not perform, book, or refer patients for mammograms or other imaging. Always discuss your own results and next steps with a doctor or a qualified healthcare professional.",
    },
  ],
};
