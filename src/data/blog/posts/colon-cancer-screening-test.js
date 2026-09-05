// Patients-led screening explainer (cluster: "screening"). South Africa market.
// Primary keyword: colon cancer screening (170/mo South Africa, LOW competition,
// DataForSEO confirmed). Secondary, seen in DataForSEO ideas with no confirmed
// volume: colorectal cancer symptoms, stool occult blood test, colonoscopy vs
// stool test, colon cancer screening age.
// Angle: balanced, honest comparison of stool-based tests (FIT/FOBT, stool DNA)
// against colonoscopy, covering symptoms, mainstream age guidance (USPSTF ~45,
// hedged since guidance varies by country and risk), and South African framing
// (medical scheme terms, not NHIS). BetterHealth connection is the Stool &
// Parasites panel's "Hidden bleeding: Stool RBCs" marker (src/data/content.js,
// ~line 317), stated honestly as one data point worth discussing with a doctor,
// not a certified FIT/FOBT colorectal screening test, and BetterHealth does not
// offer colonoscopy, following the same honest service-boundary FAQ pattern used
// in lassa-fever-symptoms-test.js. Voice: plain, human, no em dashes (bh-humanizer
// pass applied). Clinical caution kept throughout.
export default {
  slug: "colon-cancer-screening-test",
  title: "Colon Cancer Screening: Stool Tests, Colonoscopy, and When to Start",
  description:
    "Colon cancer screening works through stool tests or colonoscopy. Learn how each one works, the real tradeoffs, key symptoms, and when screening should start.",
  excerpt:
    "There are two real ways to screen for colon cancer, a stool test or a colonoscopy, and they trade off differently on comfort, frequency, and how much they can actually find. Here is how each one works and when screening typically starts.",
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining colon cancer screening: stool tests, colonoscopy, and when to start.",
  tags: [
    "colon cancer screening",
    "colorectal cancer",
    "stool test",
    "colonoscopy",
    "screening",
  ],
  cluster: "screening",
  primaryKeyword: "colon cancer screening",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/colon-cancer-screening-test-hero.svg",
      alt: "Colon cancer screening explained: stool tests, colonoscopy, and when to start.",
    },
    {
      type: "p",
      text: "Colon cancer screening comes down to two real options, not one. A stool test checks for hidden signs of trouble from home. A colonoscopy looks directly inside the colon and can remove a problem the same day it finds one. Neither is automatically the right answer for everyone, and knowing what each one actually does, and does not do, makes it much easier to have a useful conversation with a doctor rather than putting screening off because the choice feels confusing.",
    },
    {
      type: "h2",
      id: "colorectal-cancer-symptoms",
      text: "Colorectal cancer symptoms include a change in bowel habits, blood in the stool, unexplained weight loss, and persistent abdominal pain, though all of these are far more often caused by something else entirely",
    },
    {
      type: "p",
      text: "A change in bowel habits that lasts more than a couple of weeks, whether that is new constipation, looser stools, or a stool that looks noticeably narrower than usual, is one of the more commonly reported early signs. Visible blood in the stool, or stool that looks dark and tarry, is another. Unexplained weight loss and abdominal pain or cramping that does not settle round out the pattern doctors watch for.",
    },
    {
      type: "p",
      text: "None of these symptoms point specifically to colon cancer. Haemorrhoids, an anal fissure, irritable bowel syndrome, a stomach bug, or a change in diet can all cause the exact same list. That overlap is precisely why a symptom on its own is not something to self-diagnose from, in either direction. It is a reason to see a doctor, not a reason to panic, and also not a reason to wave it off if it persists.",
    },
    {
      type: "callout",
      title: "These symptoms are common and usually not cancer",
      text: "Most people who notice a change in bowel habits or occasional spotting have a benign cause, most often haemorrhoids or a minor irritation. The point of checking it out is to rule out the less common but more serious cause early, while it is still easiest to treat, not to assume the worst.",
    },
    {
      type: "h2",
      id: "why-screening-works",
      text: "Colon cancer usually develops slowly from polyps, small growths on the colon lining that can take years to turn cancerous, which is exactly the window screening is built to catch",
    },
    {
      type: "p",
      text: "Most colon cancers start as a polyp, a small clump of cells growing on the inner lining of the colon or rectum. Not every polyp turns into cancer, and most never do, but the ones that do usually take several years to make that transition. Screening exists to find and deal with polyps or early cancer during that long, symptom-free window, well before a tumour grows large enough to cause the symptoms above.",
    },
    {
      type: "h2",
      id: "stool-based-tests",
      text: "Stool-based tests check a sample you collect at home for hidden blood or altered DNA, and they need to be repeated on a schedule rather than done once and forgotten",
    },
    {
      type: "p",
      text: "The most common stool-based screening tests look for occult (hidden) blood in the stool, using either an older chemical method (FOBT) or the newer, more specific immunochemical version (FIT), which reacts to human blood and is less affected by diet. A separate and newer option, the stool DNA test, checks the sample for both blood and specific DNA changes associated with polyps and early cancer, generally at a higher cost and a longer interval between tests.",
    },
    {
      type: "p",
      text: "The appeal is obvious: no sedation, no time off work, no one else in the room, and a sample you collect in your own bathroom. The tradeoff is that a stool test only reflects what is in that one sample on that one day. A polyp that is not actively bleeding, or bleeding intermittently, can be missed, which is why these tests are repeated every year (for FIT/FOBT) or every one to three years (for stool DNA tests) rather than done as a single check. A positive result also does not end the process. It means a colonoscopy is needed next to find and confirm exactly what caused it.",
    },
    {
      type: "h2",
      id: "colonoscopy",
      text: "Colonoscopy uses a thin, flexible camera to examine the entire colon directly, and it can remove a precancerous polyp in the same procedure it is found in",
    },
    {
      type: "p",
      text: "During a colonoscopy, a doctor passes a thin, flexible tube fitted with a camera through the rectum to examine the full length of the colon on a screen, under sedation. If a polyp turns up, it can usually be removed there and then with a small tool passed through the same scope, and the tissue is sent for lab analysis. That combination, finding and treating in one visit, is what makes colonoscopy the more thorough option of the two.",
    },
    {
      type: "p",
      text: "It is also the more involved one. A full bowel prep the day before, drinking a laxative solution to clear the colon completely, is required for the images to be readable, and most people need someone to drive them home afterward because of the sedation. In South Africa, a colonoscopy is done by a gastroenterologist or surgeon at a hospital or an endoscopy unit, usually needs a specialist referral, and typically requires pre-authorisation from your medical scheme, so it is worth checking your benefit and any co-payment before booking one electively. Access to gastroenterology services also varies a great deal between the major metros and smaller towns, which is a real, practical factor in which screening route makes sense for a given person.",
    },
    {
      type: "image",
      src: "/blog/colon-cancer-screening-test-comparison.svg",
      alt: "Comparison of stool-based colon cancer screening tests and colonoscopy: invasiveness, frequency, prep, sensitivity, and what happens if something is found.",
      caption: "Neither option is wrong. They trade off differently on comfort, frequency, and how thorough a single test is.",
    },
    {
      type: "h2",
      id: "colonoscopy-vs-stool-test",
      text: "Colonoscopy vs stool test comes down to a real tradeoff between thoroughness and convenience, and both are considered legitimate, guideline-recognised ways to screen",
    },
    {
      type: "p",
      text: "A stool test is non-invasive, needs no prep beyond the sample itself, and can be repeated often, but it needs repeating precisely because any single sample can miss a polyp that is not bleeding that week. A colonoscopy is more sensitive and doubles as treatment when it finds a polyp, but it is invasive, needs a full bowel prep, sedation, and time away from work, and depends on access to a specialist and an endoscopy facility that not everyone has nearby or can afford easily. Choosing between them, or moving from one to the other, is a conversation to have with a doctor who knows your risk factors, not a decision to make from a checklist alone.",
    },
    {
      type: "h2",
      id: "colon-cancer-screening-age",
      text: "Colon cancer screening age guidance has shifted younger in recent years, with the US Preventive Services Task Force now recommending average-risk adults start around 45, though the right age for you depends on your own risk profile and where you live",
    },
    {
      type: "p",
      text: "The US Preventive Services Task Force lowered its recommended starting age for average-risk adults from 50 to 45 in 2021, a shift driven by a documented rise in colorectal cancer diagnosed in adults under 50. Several other health bodies have made similar moves. South Africa does not run a single national colorectal screening programme the way it does for some other conditions, so there is no one official local age to point to. CANSA and local clinicians generally point to a similar window, around the mid-40s for people at average risk, with screening starting earlier for anyone with a first-degree relative diagnosed with colorectal cancer or polyps, a personal history of inflammatory bowel disease, or a genetic condition such as Lynch syndrome in the family.",
    },
    {
      type: "p",
      text: "This is the same pattern worth remembering from cervical screening guidance: the age is a general anchor, not a rule that applies identically to everyone, and your own history can move it earlier. Anyone with the symptoms described above, at any age, should see a doctor rather than waiting for a screening-age milestone to arrive.",
    },
    {
      type: "link-internal",
      to: "/blog/pap-smear-cervical-screening",
      label: "Another cancer screening test with the same age-guidance pattern: Pap smear and HPV testing explained",
    },
    {
      type: "h2",
      id: "betterhealth-and-hidden-blood",
      text: "BetterHealth Africa's stool panel checks for hidden blood in stool as one data point worth discussing with your doctor, not a substitute for a validated colorectal screening test",
    },
    {
      type: "p",
      text: "BetterHealth Africa's Stool & Parasites panel includes a marker for hidden bleeding, checking your stool for red blood cells that are not visible to the eye. That is a genuinely useful piece of information, and it sits in the same broad territory as occult blood screening. It is not, however, the same thing as a certified FIT or FOBT colorectal cancer screening test, and a result from it should be treated as one data point to bring to a doctor, not as proof that you are or are not clear of colon cancer.",
    },
    {
      type: "p",
      text: "BetterHealth Africa does not perform colonoscopies or any other endoscopic procedure. The platform books lab-based blood, urine, and stool testing with doctor-reviewed results, and a colonoscopy is an imaging and treatment procedure that needs a specialist, sedation, and a hospital or endoscopy facility, well outside what a home or lab-based sample can do. If your doctor recommends a colonoscopy, that referral goes through your medical scheme and a gastroenterologist directly.",
    },
    {
      type: "link-internal",
      to: "/blog/stool-test-explained",
      label: "How occult blood testing works and what a positive result means",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do about colon cancer screening starts with knowing your own risk and symptoms, since the right first step differs from person to person",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "If you are around 45 or older with no symptoms and no strong family history, ask your doctor whether a stool test or a colonoscopy is the better starting point for you.",
        "If you have a first-degree relative diagnosed with colorectal cancer or polyps, or a condition such as inflammatory bowel disease, ask about starting screening earlier than the general guidance.",
        "If you notice blood in your stool, a lasting change in bowel habits, unexplained weight loss, or persistent abdominal pain, see a doctor regardless of age, rather than waiting for a screening milestone.",
        "If a stool test comes back positive, follow up with the colonoscopy your doctor recommends rather than repeating the stool test alone.",
        "Check your medical scheme benefit and any required pre-authorisation before booking a colonoscopy electively, since this varies by scheme and plan.",
        "Keep a record of your family history around colorectal cancer and polyps. It is one of the details that most changes when screening should start.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the stool panel and hidden-blood marker BetterHealth Africa tests",
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
          q: "What is the difference between a stool test and a colonoscopy for colon cancer screening?",
          a: "A stool test checks a sample you collect at home for hidden blood or DNA changes and needs to be repeated every one to three years. A colonoscopy examines the entire colon directly with a camera under sedation, can remove polyps in the same procedure, and is typically repeated only about every 10 years if the result is normal. Both are recognised, legitimate screening routes.",
        },
        {
          q: "What age should colon cancer screening start?",
          a: "Many guidelines, including the US Preventive Services Task Force, now recommend average-risk adults start around age 45. South Africa has no single national programme setting an official local age, so this is a general anchor rather than a fixed rule, and it should start earlier if you have a family history of colorectal cancer or polyps, or a condition such as inflammatory bowel disease.",
        },
        {
          q: "What are the early symptoms of colorectal cancer?",
          a: "A change in bowel habits lasting more than a couple of weeks, blood in the stool or dark, tarry stool, unexplained weight loss, and persistent abdominal pain are the symptoms typically watched for. All of these are also caused by far more common, benign conditions, so a symptom is a reason to see a doctor, not a reason to assume the worst.",
        },
        {
          q: "Does a positive stool occult blood test mean I have colon cancer?",
          a: "No. A positive result means blood was detected in your stool that is not visible to the eye, and it can come from causes as minor as haemorrhoids. It is a screening signal that needs a follow-up colonoscopy to find the actual cause, not a diagnosis on its own.",
        },
        {
          q: "Does BetterHealth Africa offer colonoscopy?",
          a: "No. BetterHealth Africa books lab-based blood, urine, and stool testing, including a stool panel that checks for hidden blood, but does not perform colonoscopies or any other endoscopic procedure. A colonoscopy needs a specialist, sedation, and a hospital or endoscopy facility, and is arranged through your doctor and medical scheme directly.",
        },
        {
          q: "Can I just repeat a stool test instead of ever having a colonoscopy?",
          a: "A stool test is a reasonable ongoing screening choice for many people, but it is not a substitute for a colonoscopy once a stool test comes back positive, since only a colonoscopy can find and confirm the actual source of the blood or DNA change. Whether stool testing alone is appropriate for your ongoing screening also depends on your personal risk, which is worth confirming with your doctor.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Screening choice, starting age, and follow-up after any result depend on your own risk factors and history. Always discuss your own situation, symptoms, and results with a doctor.",
    },
  ],
};
