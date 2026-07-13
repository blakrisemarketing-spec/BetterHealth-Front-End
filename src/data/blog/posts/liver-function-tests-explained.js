// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: liver function test results explained (10/mo Ghana); secondary
// ALT test (20/mo) and AST test (30/mo) carry more of the standalone volume.
// Low standalone demand; most is absorbed by the existing fatty-liver-disease
// article, so this is the dedicated ALT/AST/GGT explainer, cross-linked both ways.
// Ranges are typical adult lab reference intervals; exact cutoffs vary by lab/method.
// Africa context: hepatitis B and fatty liver as leading causes of raised enzymes.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution maintained.
export default {
  slug: "liver-function-tests-explained",
  title: "Liver Function Tests (ALT, AST): What the Numbers Mean",
  description:
    "ALT and AST are the two enzymes most liver function tests lead with. Learn what each one measures, the normal ranges, what a raised result usually means, and why hepatitis B and fatty liver are common causes across Africa.",
  excerpt:
    "A liver function test result is mostly two numbers: ALT and AST. What each one measures, what counts as normal, and what it means when one rises faster than the other.",
  datePublished: "2026-07-03",
  dateModified: "2026-07-03",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining ALT and AST liver function test results and what a raised reading means.",
  tags: ["liver function test", "ALT", "AST", "biomarkers", "blood test"],
  cluster: "biomarkers",
  primaryKeyword: "liver function test results explained",
  readingMinutes: 6,
  body: [
    {
      type: "image",
      src: "/blog/liver-function-hero.svg",
      alt: "Liver function tests explained: what ALT and AST results mean.",
    },
    {
      type: "p",
      text: "A liver function test result usually leads with two enzymes: ALT and AST. Both are shorthand most people never get explained to them, even though a raised result is one of the most common reasons a doctor asks for a follow-up appointment.",
    },
    {
      type: "h2",
      id: "what-they-measure",
      text: "What ALT and AST measure, and why they are read together",
    },
    {
      type: "p",
      text: "ALT and AST are enzymes that leak out of damaged liver cells into the blood, so both usually rise together when the liver is under strain.",
    },
    {
      type: "p",
      text: "In a healthy liver, these enzymes stay mostly inside liver cells, where they help the cell process amino acids. When liver cells are inflamed, injured, or dying off faster than normal, whatever the cause, they leak their contents into the bloodstream, and a blood test can pick up the rise. Neither enzyme tells you what caused the damage on its own. They tell you that something is straining the liver and that it is worth finding out what.",
    },
    {
      type: "h2",
      id: "normal-ranges",
      text: "Normal ranges for ALT and AST",
    },
    {
      type: "p",
      text: "Typical reference ranges run about 7 to 56 U/L for ALT and 10 to 40 U/L for AST, though exact cutoffs vary by lab.",
    },
    {
      type: "list",
      items: [
        "ALT (alanine aminotransferase): roughly 7 to 56 U/L in most adult reference ranges",
        "AST (aspartate aminotransferase): roughly 10 to 40 U/L in most adult reference ranges",
        "GGT (gamma-glutamyl transferase): often reported alongside ALT/AST, typically under about 50 U/L",
      ],
    },
    {
      type: "image",
      src: "/blog/liver-function-ranges.svg",
      alt: "Typical ALT and AST reference ranges, and how the AST:ALT ratio can point toward the underlying cause of raised liver enzymes.",
      caption:
        "Typical adult ALT/AST reference ranges. Check the exact interval on your own lab report; methods and cutoffs vary.",
    },
    {
      type: "h2",
      id: "what-raised-means",
      text: "What a raised ALT or AST usually means",
    },
    {
      type: "p",
      text: "ALT is more liver-specific than AST, because AST is also found in muscle and heart tissue.",
    },
    {
      type: "p",
      text: "Because ALT lives almost entirely in liver cells, a raised ALT points fairly specifically at the liver. AST is less specific, since it is also released by damaged muscle, including after intense exercise, an injury, or a heart problem. This is one reason clinicians rarely interpret a single enzyme in isolation. Common causes of raised liver enzymes include fatty liver disease, viral hepatitis (particularly hepatitis B in this region), alcohol use, certain medications and herbal remedies, and, less often, a blocked bile duct.",
    },
    {
      type: "link-internal",
      to: "/blog/fatty-liver-disease-explained",
      label: "Fatty liver disease: symptoms, causes, and the tests that catch it",
    },
    {
      type: "h2",
      id: "ast-alt-ratio",
      text: "The AST:ALT ratio, and what it can suggest",
    },
    {
      type: "p",
      text: "An AST:ALT ratio above 2 can suggest alcohol-related liver damage, though the ratio alone never confirms a diagnosis.",
    },
    {
      type: "p",
      text: "Most non-alcohol causes of liver strain, including fatty liver disease and most cases of viral hepatitis, tend to raise ALT more than AST. Alcohol-related liver injury tends to do the opposite, often pushing AST notably higher than ALT. A clinician uses this ratio as one clue among several, alongside your history, other blood results, and sometimes a liver ultrasound, rather than as a stand-alone answer.",
    },
    {
      type: "callout",
      title: "A mildly raised result is common and often temporary",
      text: "Enzyme levels can rise temporarily after intense exercise, a viral illness, or starting a new medication or supplement, including some herbal products. A single mildly raised ALT or AST is often repeated in a few weeks rather than acted on immediately, unless a clinician sees a reason for concern in the rest of the picture.",
    },
    {
      type: "h2",
      id: "ggt-and-the-rest",
      text: "GGT and the rest of the panel",
    },
    {
      type: "p",
      text: "GGT is often added to the panel because it rises with alcohol use and bile duct problems that ALT and AST can miss.",
    },
    {
      type: "p",
      text: "A fuller liver panel usually adds GGT, alkaline phosphatase, bilirubin, and albumin. GGT is particularly sensitive to alcohol intake and to bile duct obstruction. Alkaline phosphatase rises with bile duct problems and some bone conditions. Bilirubin and albumin reflect the liver's actual working function, how well it clears waste products and produces proteins, rather than just cell damage, which is why some clinicians distinguish these from ALT/AST as the truer \"function\" tests.",
    },
    {
      type: "h2",
      id: "africa-context",
      text: "Why hepatitis B and fatty liver are common causes in Africa",
    },
    {
      type: "p",
      text: "Hepatitis B and fatty liver disease are two of the most common causes of raised liver enzymes across sub-Saharan Africa.",
    },
    {
      type: "p",
      text: "Hepatitis B remains highly prevalent across the region, and it is often silent, so a raised ALT can be the first clue that leads to a hepatitis B screen. Fatty liver disease, once considered mainly a problem of high-income countries, has become increasingly common alongside rising rates of obesity and type 2 diabetes in African cities. This is why a raised liver enzyme result is usually followed up with a hepatitis B and C screen alongside a look at metabolic risk factors, rather than assumed to be one or the other.",
    },
    {
      type: "link-internal",
      to: "/blog/hepatitis-b-test",
      label: "Hepatitis B test (HBsAg): screening, results, and next steps",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your liver function result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Read your ALT and AST against your own lab's reference range, since exact cutoffs vary by method.",
        "If either is raised, ask whether GGT, bilirubin, and albumin were tested alongside them for a fuller picture.",
        "Mention any recent heavy exercise, new medications, supplements, or herbal remedies. All three can temporarily raise the numbers.",
        "If you have not had a hepatitis B and C screen, ask for one, especially with any raised liver enzyme result.",
        "A single mildly raised result is often repeated in a few weeks. A significantly raised result, or one paired with symptoms such as jaundice, dark urine, or abdominal pain, needs prompt medical attention.",
        "Track your results over time. Liver enzymes are read as a trend more usefully than as a single value.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the liver panel BetterHealth Africa offers",
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
          q: "Do I need to fast before a liver function test?",
          a: "Usually not for ALT and AST alone. If the test is combined with a lipid panel or fasting blood sugar, follow the fasting instructions given for the combined panel.",
        },
        {
          q: "What does it mean if ALT is high but AST is normal?",
          a: "This pattern often points toward a liver-specific cause, since ALT is more liver-specific than AST. Fatty liver disease and early viral hepatitis commonly raise ALT before AST. A clinician still needs the full picture, including a hepatitis screen, before concluding a cause.",
        },
        {
          q: "Can raised liver enzymes go back to normal?",
          a: "Often, yes, if the underlying cause is addressed. Fatty liver related enzyme rises can improve with weight loss and better blood sugar control. Enzyme rises from a medication or supplement usually resolve once it is stopped. Viral hepatitis and more advanced liver disease need specific medical management, and outcomes vary by cause and how early it is caught.",
        },
        {
          q: "Is a raised liver enzyme result an emergency?",
          a: "A mildly raised result on its own usually is not. Seek prompt medical attention if a raised result comes with yellowing of the eyes or skin, dark urine, pale stools, severe abdominal pain, or confusion, since these can signal more serious liver dysfunction.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Liver enzyme results depend on the testing method, recent activity, medications, and underlying health conditions. Always discuss your own results with your doctor.",
    },
  ],
};
