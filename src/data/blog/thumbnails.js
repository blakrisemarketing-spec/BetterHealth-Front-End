import { ARTICLES } from "./index";
// Blog thumbnails: each article gets a photo from its topic's set of three,
// picked from the slug so it never changes between builds. New articles from
// the nightly SEO routine get one automatically; an unknown topic falls back
// to the general check-up set. Photos are AI-generated scenes seeded from
// BetterHealth's own community screening photos (public/blog/photos/).

const TOPICS = [
  ["blood-sugar", /diabet|blood-sugar|hba1c|prediabet|glucose/],
  ["heart", /blood-pressure|lipid|cholesterol|crp|heart/],
  ["kidney", /kidney|creatinine|egfr|urinalysis|uric/],
  ["liver", /liver|hepatitis|h-pylori|stool|colon/],
  ["blood", /full-blood|ferritin|anaemia|b12|folate|sickle|genotype|g6pd|blood-group/],
  ["infection", /malaria|typhoid|cholera|lassa|yellow-fever|tuberculosis|bilharzia|hiv|syphilis/],
  ["women", /antenatal|pap-smear|mammogram|breast|menopause|premarital/],
  ["men", /psa|prostate|testosterone|sperm/],
  ["vitamins", /vitamin-d|thyroid|allergy/],
  ["city", /^blood-test-|health-screening-(kenya|nigeria)/],
];

export function articleTopic(slug) {
  const hit = TOPICS.find(([, re]) => re.test(slug));
  return hit ? hit[0] : "checkup";
}

// Photos are picked in the blog's list order (newest first) so that no card
// shares a photo with the card to its left or the card above it in the
// 3-column grid. Slugs not in ARTICLES fall back to a hash.
let ranks;
function rankOf(slug) {
  if (!ranks) {
    ranks = new Map();
    const picked = [];
    const used = {};
    ARTICLES.forEach((a, i) => {
      const t = articleTopic(a.slug);
      const avoid = [i % 3 ? picked[i - 1] : null, picked[i - 3]];
      const n = used[t] || 0;
      let k = [0, 1, 2].map((d) => (n + d) % 3).find((c) => !avoid.includes(`${t}-${c}`));
      if (k === undefined) k = n % 3;
      used[t] = n + 1;
      picked.push(`${t}-${k}`);
      ranks.set(a.slug, k);
    });
  }
  if (ranks.has(slug)) return ranks.get(slug);
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function articleThumbnail(slug) {
  return `/blog/photos/${articleTopic(slug)}-${(rankOf(slug) % 3) + 1}.webp`;
}
