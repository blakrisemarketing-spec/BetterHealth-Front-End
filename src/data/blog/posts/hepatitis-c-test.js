// Patients-led conditions explainer (cluster: "understand your conditions").
// Primary keyword: hepatitis C test (20/mo Ghana, LOW competition, DataForSEO 2026-07-10).
// Secondary: anti-HCV test, hepatitis C symptoms, hepatitis C cure.
// Facts (transmission routes, two-step antibody/RNA testing, spontaneous clearance
// rate, DAA cure rate) checked against WHO hepatitis C fact sheet on 2026-07-10.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept.
export default {
  slug: "hepatitis-c-test",
  title: "Hepatitis C Test: Who Should Screen and What the Result Means",
  description:
    "Hepatitis C is usually silent for years and, unlike hepatitis B, is now usually curable. Learn how the two-step antibody and RNA testing works, who should screen, and what a positive result means.",
  excerpt:
    "A positive hepatitis C antibody test does not always mean you carry the virus today. The two-step test explains why, plus who should get screened and why this hepatitis is the curable one.",
  datePublished: "2026-07-10",
  dateModified: "2026-07-10",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining hepatitis C testing: the two-step screen-and-confirm process and the high cure rate.",
  tags: ["hepatitis C", "HCV", "liver health", "infectious disease", "screening"],
  cluster: "conditions",
  primaryKeyword: "hepatitis C test",
  readingMinutes: 7,
  body: [
    {
      type: "image",
      src: "/blog/hepatitis-c-hero.svg",
      alt: "Hepatitis C explained: a two-step screen-and-confirm test, and a cure rate above 95 percent with modern treatment.",
    },
    {
      type: "p",
      text: "Hepatitis C is a virus that infects the liver and spreads through direct blood-to-blood contact, not through food, water, or casual contact with someone who has it. Most people carrying it have no symptoms for years, which is exactly why testing, rather than waiting for symptoms, is how most cases are found.",
    },
    {
      type: "p",
      text: "The good news is that hepatitis C is no longer the lifelong condition it once was. Modern treatment cures the large majority of people who take it, which changes what a positive result should mean to you.",
    },
    {
      type: "h2",
      id: "what-is-hepatitis-c",
      text: "What hepatitis C is and how it spreads",
    },
    {
      type: "p",
      text: "Hepatitis C virus (HCV) spreads when infected blood enters another person's bloodstream. Historically, unscreened blood transfusions and reused medical injection equipment were major routes, and in many places they remain relevant, since transfusion screening only became reliable and widespread from the 1990s onward. Today, sharing needles or other injecting equipment is the leading route in most countries, with less common transmission through unsterilised tattoo or piercing tools, needle-stick injuries in healthcare settings, and, less frequently, sexual contact or from mother to child during birth.",
    },
    {
      type: "list",
      items: [
        "Blood transfusions or medical procedures before donor and equipment screening was standard practice.",
        "Sharing needles, syringes, or other equipment for injecting drugs.",
        "Unsterilised tools used for tattoos, piercings, or traditional scarification.",
        "Needle-stick injuries among healthcare workers.",
        "Mother-to-child transmission during birth, and less commonly, sexual contact.",
      ],
    },
    {
      type: "h2",
      id: "antibody-screen",
      text: "Anti-HCV antibody test: the screening step",
    },
    {
      type: "p",
      text: "The anti-HCV antibody test is the standard first screening step, and it checks whether your immune system has ever encountered the virus, not whether you currently carry it. A positive antibody result means your body mounted an immune response to HCV at some point, which is why it always needs a second, different test before it means anything about your current health.",
    },
    {
      type: "h2",
      id: "why-a-second-test",
      text: "Why a positive antibody result needs a second test",
    },
    {
      type: "p",
      text: "A positive antibody result needs a follow-up HCV RNA (PCR) test, because 15 to 25 percent of people clear the virus on their own within about six months of infection and would test antibody-positive for life without carrying active infection. The RNA test looks for the virus's genetic material directly, and it is what separates a past, resolved infection from a current, active one that needs treatment.",
    },
    {
      type: "callout",
      title: "Two different questions, two different tests",
      text: "The antibody test asks \"has your immune system ever seen this virus?\" The RNA test asks \"is the virus in your blood right now?\" Only a positive result on both means you have current hepatitis C infection.",
    },
    {
      type: "link-internal",
      to: "/blog/hepatitis-b-test",
      label: "How hepatitis B testing differs: markers, vaccination, and lifelong management",
    },
    {
      type: "h2",
      id: "who-should-screen",
      text: "Who should get screened",
    },
    {
      type: "p",
      text: "People with a history of blood transfusion before donor screening was standard, injection drug use, needle-stick exposure, or long-term dialysis carry the highest risk and should prioritise testing, along with anyone with unexplained, persistently elevated liver enzymes on a routine liver function test.",
    },
    {
      type: "list",
      items: [
        "Anyone who received a blood transfusion, organ transplant, or major medical procedure before their country's blood-screening programme was in place.",
        "Anyone who has ever injected drugs, even once or long ago.",
        "Healthcare workers with a needle-stick or sharps injury.",
        "People on long-term dialysis for kidney disease.",
        "Anyone with unexplained, persistently raised ALT or AST on a liver function test.",
        "Sexual partners and household contacts of someone diagnosed with hepatitis C.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/liver-function-tests-explained",
      label: "Liver function tests explained: what raised ALT and AST can signal",
    },
    {
      type: "h2",
      id: "usually-curable",
      text: "Hepatitis C is usually curable now",
    },
    {
      type: "p",
      text: "Direct-acting antiviral treatment now cures more than 95 percent of hepatitis C infections within 8 to 12 weeks of daily tablets, a major shift from the older interferon-based treatment era, which took up to a year, caused difficult side effects, and cured far fewer people. This is the biggest practical difference between hepatitis C and hepatitis B: hepatitis B is managed long-term, while hepatitis C, once diagnosed, is usually cured outright.",
    },
    {
      type: "callout",
      title: "A late diagnosis is still worth treating",
      text: "Even if hepatitis C has been present for years and caused some liver scarring, curing the infection stops further liver damage and improves long-term outlook. Treatment is worthwhile at almost any stage, which is a conversation to have with a doctor rather than a reason to delay testing.",
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
        "If your antibody test is negative and you had no recent high-risk exposure, no further testing is usually needed for that exposure.",
        "If your antibody test is negative but you had a recent exposure, ask your clinician about the retest timing, since antibodies can take a few weeks to months to develop.",
        "If your antibody test is positive, get an HCV RNA (PCR) test before assuming you have active infection.",
        "If your RNA test is positive, ask about starting direct-acting antiviral treatment. Cure rates are high and the course is usually a matter of weeks, not months.",
        "If your RNA test is negative after a positive antibody result, your body likely cleared a past infection on its own, and no treatment is needed, though your clinician may still note it in your history.",
        "Whatever your result, avoid sharing needles, razors, or other items that could carry blood, and let sexual partners know if you test positive so they can also be screened.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the Infectious Diseases and Liver Health panels BetterHealth Africa offers",
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
          q: "Is hepatitis C the same as hepatitis B?",
          a: "No. Both infect the liver and can spread through blood, but they are different viruses. Hepatitis B is managed long-term with antiviral suppression and prevented with a vaccine. Hepatitis C has no vaccine yet, but modern treatment cures more than 95 percent of cases.",
        },
        {
          q: "Can a positive hepatitis C antibody test mean I do not have an active infection?",
          a: "Yes. About 15 to 25 percent of people clear hepatitis C on their own within roughly six months of infection and stay antibody-positive for life without an active infection. A follow-up HCV RNA (PCR) test is needed to confirm whether the virus is currently present.",
        },
        {
          q: "What are the symptoms of hepatitis C?",
          a: "Most people have no symptoms for years, which is why hepatitis C is often found through screening or an unrelated liver enzyme test rather than symptoms. When symptoms do appear, they are usually non-specific, such as fatigue, and often reflect years of gradual liver damage.",
        },
        {
          q: "Is hepatitis C curable?",
          a: "Yes, in most cases. Direct-acting antiviral treatment cures more than 95 percent of people who take a full 8 to 12 week course, even if the infection has been present for years.",
        },
        {
          q: "Who should get tested for hepatitis C?",
          a: "Anyone with a history of blood transfusion before screening was standard, injection drug use, a needle-stick injury, long-term dialysis, or unexplained raised liver enzymes should prioritise testing, alongside anyone whose partner has been diagnosed with hepatitis C.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, counselling, or treatment by a qualified healthcare professional. Hepatitis C testing sequences and treatment decisions depend on your specific results and circumstances. Always discuss your results and next steps with a doctor or a qualified healthcare professional.",
    },
  ],
};
