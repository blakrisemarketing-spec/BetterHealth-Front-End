import { motion, useReducedMotion } from "framer-motion";
import {
  GENOTYPE_MEANING,
  FOLLOW_UP_NOTE,
  PROBABILITY_FRAMING,
  PER_PREGNANCY_FRAMING,
} from "../../data/tools/genotype-compatibility";
import { CountUp, RevealAfter } from "./ResultReveal";

/**
 * The genotype half of the family inheritance result.
 *
 * The Punnett square itself lives in src/data/tools/genotype-compatibility.js
 * and is untouched by the other traits. These components only draw what it
 * returned, which is why the odds on screen are the same odds this tool has
 * printed since it was a genotype-only calculator.
 */

const GROUP_TONE = {
  clear: "bg-primary",
  trait: "bg-primary-light",
  disease: "bg-accent-dark",
  hbc: "bg-accent",
};

function OutcomeBar({ group }) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <span className="text-[14px] font-bold text-text-primary font-heading">{group.label}</span>
        <span className="text-[15px] font-extrabold text-text-primary font-heading tabular-nums">
          <CountUp value={group.percent} />%
        </span>
      </div>
      <div className="h-2 w-full rounded-pill bg-section-alt overflow-hidden" aria-hidden="true">
        <motion.div
          className={`h-2 rounded-pill ${GROUP_TONE[group.id]}`}
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${group.percent}%` }}
          transition={{ duration: reduce ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <p className="text-[12.5px] text-text-secondary leading-snug mt-1">
        {group.rows.map((r) => `${r.genotype} ${r.percent}%`).join(" · ")}
      </p>
    </div>
  );
}

/** The eyebrow and headline that open the whole result. */
export function GenotypeHeadline({ result }) {
  if (result.kind === "unknown") {
    const bothUnknown = result.you === "unknown" && result.partner === "unknown";
    return (
      <>
        <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
          Genotype: not enough to calculate yet
        </span>
        <h2 className="text-[1.4rem] sm:text-[1.8rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
          {bothUnknown
            ? "Neither genotype is confirmed yet, so there are no odds to give you."
            : "One genotype is still missing, so there are no odds to give you."}
        </h2>
      </>
    );
  }
  const disease = result.groups.find((g) => g.id === "disease");
  return (
    <>
      <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
        Genotype: {result.you} and {result.partner}
      </span>
      <h2 className="text-[1.4rem] sm:text-[1.8rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
        {disease ? (
          <>
            Each pregnancy carries a <CountUp value={disease.percent} />% chance of a sickle cell condition.
          </>
        ) : (
          "No pregnancy from this pairing can inherit a sickle cell condition."
        )}
      </h2>
    </>
  );
}

/** Everything under the genotype headline. */
export function GenotypeBody({ result }) {
  if (result.kind === "unknown") {
    return (
      <RevealAfter delay={0.5}>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          A Punnett square needs two confirmed results. With one side unknown, any number we showed you would be
          invented rather than calculated.
        </p>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          A genotype test identifies which haemoglobin genes you inherited from each parent and reports the result as a
          two-letter code: AA, AS, SS, SC, AC or CC. It needs one small blood sample, no fasting, and the sample is
          analysed by haemoglobin electrophoresis or HPLC.
        </p>
        <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed mb-4">
          A sickling test is not the same test. It comes back positive for both AS and SS, because both contain HbS, so
          it cannot tell a carrier with no disease apart from someone who has sickle cell disease. A positive sickling
          result always needs electrophoresis or HPLC to confirm the actual genotype.
        </div>
        <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">What the codes mean</p>
        <ul className="space-y-1.5 mb-1">
          {Object.entries(GENOTYPE_MEANING).map(([code, meaning]) => (
            <li key={code} className="flex items-start gap-2 text-[14px] text-text-secondary leading-snug">
              <span className="font-extrabold text-text-primary font-heading w-7 shrink-0">{code}</span>
              <span>{meaning}</span>
            </li>
          ))}
        </ul>
      </RevealAfter>
    );
  }

  return (
    <>
      <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
        Per pregnancy, out of four equally likely combinations
      </p>
      <div className="mb-4">
        {result.groups.map((g) => (
          <OutcomeBar key={g.id} group={g} />
        ))}
      </div>

      <RevealAfter>
        {result.pairingLine && (
          <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed mb-4">
            {result.pairingLine}
          </div>
        )}

        <p className="text-[15px] text-text-secondary leading-relaxed mb-2">{PER_PREGNANCY_FRAMING}</p>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-4">{PROBABILITY_FRAMING}</p>

        <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
          What each outcome means
        </p>
        <ul className="space-y-1.5">
          {result.rows.map((r) => (
            <li key={r.genotype} className="flex items-start gap-2 text-[14px] text-text-secondary leading-snug">
              <span className="font-extrabold text-text-primary font-heading w-7 shrink-0">{r.genotype}</span>
              <span>{GENOTYPE_MEANING[r.genotype]}</span>
            </li>
          ))}
        </ul>
      </RevealAfter>
    </>
  );
}

/** The "not compatible" framing, shown only when a disease outcome is on the table. */
export function GenotypeCounselling({ result }) {
  if (result.kind === "unknown") return null;
  if (!result.groups.some((g) => g.id === "disease")) return null;
  return (
    <div className="rounded-card border border-border bg-section-alt p-5 mb-4">
      <p className="text-[15px] text-text-secondary leading-relaxed">
        Two AS carriers are sometimes told they are &ldquo;not compatible.&rdquo; That phrase describes a 1 in 4 chance
        per pregnancy, not a guarantee, and it does not mean a couple cannot build a life together. It means the
        decision deserves informed input from a genetic counsellor or a doctor experienced in sickle cell disease, who
        can lay out the real odds and the options, including early prenatal testing.
      </p>
    </div>
  );
}

/** The two follow-ups, turned into the next step. */
export function GenotypeAdvice({ advice }) {
  if (!advice) return null;
  const strong = advice.strength === "strong";
  return (
    <div
      className={`rounded-card border p-5 sm:p-6 mb-4 ${
        strong ? "border-primary bg-primary-bg" : "border-border bg-section-alt"
      }`}
    >
      <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
        How much weight the genotype odds can carry
      </span>
      <h3 className="text-[1.1rem] sm:text-[1.25rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        {advice.headline}
      </h3>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{advice.body}</p>
      {advice.familyLine && <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{advice.familyLine}</p>}
      <p className="text-[13px] text-text-secondary leading-relaxed rounded-card bg-card border border-border px-3.5 py-2.5">
        {FOLLOW_UP_NOTE}
      </p>
    </div>
  );
}
