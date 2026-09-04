// Patients-led conditions explainer (cluster: "conditions"). Kenya-first,
// Lake Victoria region / freshwater framing, pan-African disease so not over-narrowed.
// Primary keyword: bilharzia (880/mo Kenya, LOW competition, DataForSEO 2026-07-17).
// Secondary, DataForSEO-confirmed, Kenya: bilharzia symptoms (720/mo), bilharzia
// treatment (320/mo), bilharzia causes (170/mo), what are 5 symptoms of bilharzia
// (110/mo), prevention of bilharzia (70/mo), how is bilharzia transmitted (50/mo).
// Also covers "schistosomiasis test" / "schistosomiasis symptoms" as the WHO/clinical
// name, for AI-citation, leading with "bilharzia" since that is what people search.
// BetterHealth Africa does not list bilharzia as a named catalogue test, so this links
// generically to /what-we-test and cross-links the existing urinalysis and stool test
// explainers, since routine urinalysis and a stool ova-and-parasites exam are exactly
// how bilharzia is detected. Same pattern as h-pylori-test.js and stool-test-explained.js.
// WHO schistosomiasis fact sheet is the source for epidemiology and treatment claims;
// no fabricated Kenya-specific prevalence number, no specific drug dosing.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution maintained.
export default {
  slug: "bilharzia-schistosomiasis-test",
  title: "Bilharzia (Schistosomiasis): Symptoms, Testing, and Treatment",
  description:
    "Bilharzia, also called schistosomiasis, spreads through contact with contaminated fresh water. Learn the symptoms, how urine and stool tests detect it, and what WHO-recommended treatment involves.",
  excerpt:
    "Blood in urine after wading in a lake, dam, or river could be bilharzia, known to doctors as schistosomiasis. What causes it, the symptoms to watch for, how it is tested, and what treatment looks like.",
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining bilharzia (schistosomiasis): how it spreads, its symptoms, and how it is tested and treated.",
  tags: ["bilharzia", "schistosomiasis", "parasitic infection", "conditions"],
  cluster: "conditions",
  primaryKeyword: "bilharzia",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/bilharzia-schistosomiasis-test-hero.svg",
      alt: "Bilharzia (schistosomiasis) explained: symptoms, testing, and treatment.",
    },
    {
      type: "p",
      text: "Bilharzia is one of the most common reasons someone in a lakeside or riverside community ends up with blood in their urine, and one of the least understood, because it does not look or feel like an infection at first. Doctors and laboratories call the same disease schistosomiasis. Around Lake Victoria and other freshwater bodies across Kenya, contact with untreated fresh water is part of daily life for many people, which is exactly why it is worth knowing what causes bilharzia, what it looks like, and how a test settles the question.",
    },
    {
      type: "h2",
      id: "what-is-bilharzia",
      text: "Bilharzia, widely known in East and Southern Africa by that name and as schistosomiasis elsewhere, is caused by parasitic flatworms called Schistosoma that infect people through contact with contaminated fresh water.",
    },
    {
      type: "p",
      text: "Schistosoma worms are small, thread-like parasites with a life cycle that depends on freshwater snails. Adult worms live inside a person's blood vessels, where they lay eggs. The body sheds many of those eggs through urine or stool. If the eggs reach fresh water, they hatch, and the larvae seek out a particular species of snail to develop inside. After a few weeks in the snail, a different larval stage, called cercariae, is released back into the water, ready to infect the next person who wades, swims, or works in it.",
    },
    {
      type: "p",
      text: "Bilharzia cannot pass directly from one person to another. It needs the snail step in between, and it spreads only through fresh water, never seawater or a properly chlorinated pool, since neither supports the snail host the parasite relies on.",
    },
    {
      type: "h2",
      id: "how-bilharzia-spreads",
      text: "Bilharzia is transmitted when skin touches fresh water, such as a lake, river, dam, or irrigation canal, carrying larvae released by infected freshwater snails, not through seawater or a properly chlorinated pool.",
    },
    {
      type: "p",
      text: "Cercariae swim near the surface of lakes, rivers, dams, and irrigation canals, and they can penetrate intact human skin within minutes of contact. Wading, swimming, bathing, washing clothes, fishing, or working in irrigated fields are all common ways people in the Lake Victoria region and other freshwater areas of Kenya come into contact with the parasite. Once through the skin, the larvae travel through the bloodstream, mature over several weeks, and settle in blood vessels around the bladder or the intestine, depending on the species involved.",
    },
    {
      type: "list",
      items: [
        "Swimming or bathing in lake or river water, including parts of Lake Victoria where snail populations are established",
        "Wading through irrigation canals or dam water while farming",
        "Washing clothes, cooking utensils, or fetching water at an untreated water source",
        "Children playing or fishing in shallow water near the shoreline",
      ],
    },
    {
      type: "callout",
      title: "An itchy rash after freshwater contact is a clue, not a diagnosis",
      text: "Some people develop a mild, itchy rash, sometimes called swimmer's itch, within hours to days of wading or swimming in contaminated water. It usually settles on its own and does not confirm infection by itself. If it happens after contact with a lake, river, dam, or irrigation canal, mention it to a clinician alongside a bilharzia test.",
    },
    {
      type: "image",
      src: "/blog/bilharzia-schistosomiasis-test-data.svg",
      alt: "How bilharzia spreads: from freshwater contact, to larvae penetrating the skin, to maturing in blood vessels, to eggs shed in urine or stool.",
      caption:
        "The Schistosoma life cycle needs a freshwater snail host. Avoiding contact with untreated fresh water in affected areas breaks the cycle.",
    },
    {
      type: "h2",
      id: "symptoms",
      text: "Bilharzia often causes no symptoms at first, and when signs do appear the most recognised are blood in urine, abdominal pain, blood in stool, fatigue, and an itchy rash where the larvae entered the skin.",
    },
    {
      type: "p",
      text: "Many people infected with Schistosoma feel nothing unusual for weeks or months, and mild early symptoms are easy to put down to something else entirely. This is part of why bilharzia can go unrecognised in areas where freshwater contact is routine.",
    },
    {
      type: "list",
      items: [
        "Blood in urine (haematuria), the classic sign linked to S. haematobium, sometimes visible and sometimes only picked up on a urine test",
        "Abdominal pain and cramping",
        "Diarrhoea or blood in the stool, more typical of S. mansoni",
        "Persistent tiredness or fatigue",
        "An itchy rash at the point where the larvae entered the skin, appearing soon after exposure",
      ],
    },
    {
      type: "p",
      text: "Left untreated for years, chronic infection can damage the bladder or liver over time. The World Health Organization lists organ damage among the long-term effects of untreated schistosomiasis. That is not a reason to panic over a mild symptom, but it is a reason to get tested rather than wait it out, particularly if you live in or have visited an area where the parasite is present.",
    },
    {
      type: "h2",
      id: "urinary-vs-intestinal",
      text: "Two Schistosoma species cause most bilharzia in Africa: S. haematobium, which settles around the bladder and causes blood in urine, and S. mansoni, which settles around the intestine and causes abdominal pain and blood in stool.",
    },
    {
      type: "p",
      text: "S. haematobium is the species most often responsible for the urinary form of bilharzia across East and West Africa. Adult worms settle in blood vessels around the bladder and genital tract, which is why blood in urine is such a strong signal of this form. S. mansoni causes the intestinal form instead, with adult worms settling in blood vessels around the intestine, producing abdominal pain, diarrhoea, and blood in the stool rather than urinary symptoms.",
    },
    {
      type: "p",
      text: "Because the two species live in different parts of the body, the test a clinician orders depends on which form is suspected, and sometimes both are checked together, particularly if the history or symptoms do not clearly point to one.",
    },
    {
      type: "h2",
      id: "testing",
      text: "Bilharzia is confirmed with a laboratory test, usually urine microscopy for S. haematobium eggs, stool microscopy for S. mansoni eggs, or a blood antibody test that screens for past exposure.",
    },
    {
      type: "list",
      items: [
        "Urine microscopy: checks a urine sample for S. haematobium eggs, often collected around midday, when egg output tends to be highest",
        "Stool microscopy (ova and parasites exam): checks a stool sample for S. mansoni eggs, sometimes on more than one sample, since eggs can be shed inconsistently",
        "Blood antibody (serology) test: checks for the immune response to Schistosoma exposure, useful for travellers or when egg counts are too low for microscopy to detect reliably",
      ],
    },
    {
      type: "p",
      text: "Routine urinalysis and a stool ova-and-parasites exam are general laboratory tests that pick up bilharzia among other things they are used for, which is why a clinician may order one of these broader tests rather than a bilharzia-specific one.",
    },
    {
      type: "link-internal",
      to: "/blog/urinalysis-explained",
      label: "Urinalysis explained: what a urine test checks for and how it's read",
    },
    {
      type: "link-internal",
      to: "/blog/stool-test-explained",
      label: "Stool test explained: what a stool ova and parasites exam looks for",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the full range of tests BetterHealth Africa offers",
    },
    {
      type: "h2",
      id: "treatment",
      text: "Praziquantel is the WHO-recommended standard treatment for bilharzia, and a clinician determines the correct dose and course for the individual and the type of infection.",
    },
    {
      type: "p",
      text: "Praziquantel acts against the adult worms and is normally given as a short, effective course, rather than a long-term medication schedule. It is generally well tolerated. The exact dose and regimen depend on factors a clinician assesses directly, including body weight, the species involved, and the person's overall health, so it should always be prescribed rather than taken from what worked for someone else.",
    },
    {
      type: "p",
      text: "Treatment does not protect against reinfection. Anyone who continues to wade, swim, bathe, or work in untreated fresh water in an area where bilharzia is present can pick up the parasite again after successful treatment. A clinician may recommend retesting after treatment, particularly if symptoms continue or freshwater exposure is ongoing.",
    },
    {
      type: "h2",
      id: "prevention",
      text: "Preventing bilharzia means limiting skin contact with untreated fresh water in areas where the parasite circulates, since removing that contact removes the main route of infection.",
    },
    {
      type: "list",
      items: [
        "Avoid wading, swimming, or bathing in lakes, rivers, dams, or irrigation canals known to carry the parasite, particularly around Lake Victoria and other affected freshwater sites",
        "Wear protective footwear, and protective clothing where possible, when farming, fishing, or working near untreated fresh water",
        "Avoid urinating or defecating near water bodies, since this is how eggs reach the water and reach the snail host in the first place",
        "Use treated or boiled water for washing and drinking where the source is uncertain",
        "Seek testing after known exposure rather than waiting for symptoms, since earlier treatment avoids years of chronic, low-grade infection",
      ],
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "Acting on a suspected or confirmed bilharzia infection mainly means getting the right test, completing treatment, and reducing future freshwater exposure, rather than guessing from symptoms alone.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "If you notice blood in urine, blood in stool, or unexplained abdominal pain after freshwater contact, ask a clinician about bilharzia testing rather than assuming it is something else.",
        "Mention any recent swimming, wading, bathing, or farming contact with lake, river, dam, or canal water when you see a clinician, since that history helps guide which test is used.",
        "Complete the full course of treatment your clinician prescribes, even once symptoms improve.",
        "If you continue to have contact with untreated fresh water in an area where bilharzia is present, know that reinfection is possible, and repeat testing may be needed later.",
        "Combine bilharzia testing with a broader check-up if you have ongoing, unexplained symptoms, since a routine urinalysis or stool exam can also catch other common conditions along the way.",
      ],
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
          q: "What are 5 symptoms of bilharzia?",
          a: "The five most recognised symptoms are blood in urine, abdominal pain, blood in stool or diarrhoea, persistent fatigue, and an itchy rash at the spot where the larvae entered the skin. Many people have no symptoms at all in the early stages, so a negative feeling day does not rule out infection after known freshwater exposure.",
        },
        {
          q: "How is bilharzia transmitted?",
          a: "Bilharzia spreads when skin touches fresh water, such as a lake, river, dam, or irrigation canal, that carries larvae (cercariae) released by infected freshwater snails. The larvae penetrate intact skin within minutes. It does not spread through seawater, properly chlorinated pools, or directly from person to person.",
        },
        {
          q: "What causes bilharzia?",
          a: "Bilharzia is caused by parasitic flatworms called Schistosoma. Their eggs leave an infected person's body in urine or stool, hatch in fresh water, develop inside a specific freshwater snail species, and are released back into the water as larvae that infect the next person who has skin contact with that water.",
        },
        {
          q: "What is the treatment for bilharzia?",
          a: "The World Health Organization recommends praziquantel as the standard treatment. It is normally given as a short, effective course, and a clinician determines the correct dose based on the individual and the type of infection. It should always be prescribed by a clinician rather than self-administered.",
        },
        {
          q: "Can bilharzia be cured?",
          a: "Yes, in the large majority of cases praziquantel clears the infection effectively. Reinfection is possible if freshwater contact in an affected area continues, and organ damage from years of untreated chronic infection may not fully reverse, which is why earlier testing and treatment give the best outcome.",
        },
        {
          q: "How can bilharzia be prevented?",
          a: "Prevention centres on limiting skin contact with untreated fresh water in areas where the parasite is present: avoid wading or swimming in affected lakes, rivers, dams, or canals, wear protective footwear when working near such water, avoid urinating or defecating near water bodies, and use treated or boiled water where the source is uncertain.",
        },
        {
          q: "How is bilharzia different from malaria?",
          a: "Both can cause fever and fatigue, but they spread differently and are tested differently. Malaria is transmitted by mosquito bites and confirmed with a rapid diagnostic test or blood film. Bilharzia is transmitted through skin contact with contaminated fresh water and confirmed with urine microscopy, stool microscopy, or a blood antibody test. The two can occur in the same person, so a clinician may test for both when the cause of symptoms is unclear.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Always discuss your own symptoms, test results, and any recommended treatment with your doctor.",
    },
  ],
};
