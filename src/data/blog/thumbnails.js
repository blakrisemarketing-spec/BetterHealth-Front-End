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

export function articleThumbnail(slug) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `/blog/photos/${articleTopic(slug)}-${(h % 3) + 1}.webp`;
}
