import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import {
  GENOTYPE_OPTIONS,
  GENOTYPE_MEANING,
  GENOTYPE_BASIS_OPTIONS,
  FAMILY_SCD_OPTIONS,
  FOLLOW_UP_NOTE,
  PROBABILITY_FRAMING,
  PER_PREGNANCY_FRAMING,
} from "../../data/tools/genotype-compatibility";
import { computeGenotypeFull } from "../../data/tools/compose";
import { genotypeShareSpec } from "../../data/tools/share-card";
import ToolCta from "./ToolCta";
import ShareResult from "./ShareResult";
import { CountUp, ResultCard, RevealAfter } from "./ResultReveal";

const GROUP_TONE = {
  clear: "bg-primary",
  trait: "bg-primary-light",
  disease: "bg-accent-dark",
  hbc: "bg-accent",
};

function GenotypePicker({ label, value, onChange, name }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-[14px] font-bold text-text-primary font-heading mb-2">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {GENOTYPE_OPTIONS.map((opt) => {
          const active = value === opt.value;
          const wide = opt.value === "unknown";
          return (
            <button
              key={opt.value}
              type="button"
              name={name}
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={`${wide ? "col-span-2" : ""} text-left rounded-btn border px-3 py-3 transition-all cursor-pointer min-h-[56px] ${
                active
                  ? "border-primary bg-primary-bg"
                  : "border-border bg-section-alt hover:border-primary/50"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-[15px] font-bold text-text-primary font-heading">{opt.label}</span>
                {active && <Check size={16} className="text-primary shrink-0" />}
              </span>
              <span className="block text-[11.5px] text-text-secondary leading-snug mt-0.5">{opt.hint}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** A single-column list of options with hints, for the two follow-ups. */
function OptionList({ label, options, value, onChange, name }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-[14px] font-bold text-text-primary font-heading mb-2">{label}</legend>
      <div className="flex flex-col gap-2" role="group" aria-label={label}>
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              name={name}
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={`w-full text-left rounded-btn border px-4 py-3 transition-all cursor-pointer min-h-[48px] flex items-center justify-between gap-3 ${
                active ? "border-primary bg-primary-bg" : "border-border bg-section-alt hover:border-primary/50"
              }`}
            >
              <span>
                <span className="text-[14.5px] font-semibold text-text-primary">{opt.label}</span>
                {opt.hint && <span className="block text-[12px] text-text-secondary leading-snug mt-0.5">{opt.hint}</span>}
              </span>
              {active && <Check size={16} className="text-primary shrink-0" />}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const primaryButton = (enabled) =>
  `mt-6 w-full inline-flex items-center justify-center gap-2 rounded-btn px-6 py-4 text-[16px] font-bold font-heading transition-all ${
    enabled ? "bg-primary hover:bg-primary-dark text-white cursor-pointer" : "bg-section-alt text-text-muted cursor-not-allowed"
  }`;

/**
 * Two screens. The first is the two genotypes, exactly as before. The second
 * is the two follow-ups that sharpen the advice without touching the square.
 * Calls `onFinish(result)` once all four are answered.
 */
export function GenotypeQuestions({ onFinish }) {
  const reduce = useReducedMotion();
  const [screen, setScreen] = useState(0);
  const [you, setYou] = useState("");
  const [partner, setPartner] = useState("");
  const [basis, setBasis] = useState("");
  const [familyScd, setFamilyScd] = useState("");
  const firstReady = Boolean(you && partner);
  const secondReady = Boolean(basis && familyScd);

  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-bold text-primary uppercase tracking-[0.12em]">
          Part {screen + 1} of 2 &middot; {screen === 0 ? "The two genotypes" : "Two follow-ups"}
        </span>
        {screen === 1 ? (
          <button
            type="button"
            onClick={() => setScreen(0)}
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-text-secondary hover:text-text-primary cursor-pointer bg-transparent border-0"
          >
            <ArrowLeft size={14} /> Back
          </button>
        ) : (
          <span />
        )}
      </div>
      <div className="h-1.5 w-full rounded-pill bg-section-alt mb-5" role="progressbar" aria-valuemin={0} aria-valuemax={2} aria-valuenow={screen + 1}>
        <div className="h-1.5 rounded-pill bg-primary transition-all duration-300" style={{ width: screen === 0 ? "50%" : "100%" }} />
      </div>

      {screen === 0 ? (
        <motion.div key="s0" initial={reduce ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          <div className="flex flex-col gap-6">
            <GenotypePicker name="you" label="Your genotype" value={you} onChange={setYou} />
            <GenotypePicker name="partner" label="Your partner's genotype" value={partner} onChange={setPartner} />
          </div>
          <button type="button" disabled={!firstReady} onClick={() => setScreen(1)} className={primaryButton(firstReady)}>
            Next: two follow-ups <ArrowRight size={18} />
          </button>
          <p className="mt-3 text-[12.5px] text-text-secondary leading-relaxed">
            Not sure of your genotype? Pick &ldquo;I don&rsquo;t know yet&rdquo; and we will show you what to do about
            it.
          </p>
        </motion.div>
      ) : (
        <motion.div key="s1" initial={reduce ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          <div className="mb-4 flex items-start gap-2 rounded-card border-l-4 border-primary bg-primary-bg px-3.5 py-2.5 text-[13.5px] text-text-primary leading-snug" role="status">
            <Sparkles size={15} className="text-primary shrink-0 mt-[2px]" />
            <span>
              {you} and {partner} noted. These two do not change the odds; they change what we suggest doing next.
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <OptionList
              name="basis"
              label="How do you know these genotypes?"
              options={GENOTYPE_BASIS_OPTIONS}
              value={basis}
              onChange={setBasis}
            />
            <OptionList
              name="familyScd"
              label="Does anyone in either family have sickle cell disease?"
              options={FAMILY_SCD_OPTIONS}
              value={familyScd}
              onChange={setFamilyScd}
            />
          </div>
          <button
            type="button"
            disabled={!secondReady}
            onClick={() => onFinish(computeGenotypeFull({ you, partner, basis, familyScd }))}
            className={primaryButton(secondReady)}
          >
            Work out the odds <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </div>
  );
}

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

/** The two follow-ups, turned into the next step. */
function Advice({ advice }) {
  if (!advice) return null;
  const strong = advice.strength === "strong";
  return (
    <div
      className={`rounded-card border p-5 sm:p-6 mb-4 ${
        strong ? "border-primary bg-primary-bg" : "border-border bg-section-alt"
      }`}
    >
      <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
        Part 2: what to do next
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

/** The result screen, rendered only after a successful lead submit. */
export default function GenotypeResult({ result, tool }) {
  const cta = result.advice ? { ...tool.cta, label: result.advice.ctaLabel } : tool.cta;

  if (result.kind === "unknown") {
    const bothUnknown = result.you === "unknown" && result.partner === "unknown";
    return (
      <div>
        <ResultCard>
          <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
            Not enough to calculate yet
          </span>
          <h2 className="text-[1.4rem] sm:text-[1.8rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
            {bothUnknown
              ? "Neither genotype is confirmed yet, so there are no odds to give you."
              : "One genotype is still missing, so there are no odds to give you."}
          </h2>
          <RevealAfter delay={0.5}>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
              A Punnett square needs two confirmed results. With one side unknown, any number we showed you would be
              invented rather than calculated.
            </p>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
              A genotype test identifies which haemoglobin genes you inherited from each parent and reports the result
              as a two-letter code: AA, AS, SS, SC, AC or CC. It needs one small blood sample, no fasting, and the
              sample is analysed by haemoglobin electrophoresis or HPLC.
            </p>
            <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed mb-4">
              A sickling test is not the same test. It comes back positive for both AS and SS, because both contain
              HbS, so it cannot tell a carrier with no disease apart from someone who has sickle cell disease. A
              positive sickling result always needs electrophoresis or HPLC to confirm the actual genotype.
            </div>
            <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
              What the codes mean
            </p>
            <ul className="space-y-1.5 mb-1">
              {Object.entries(GENOTYPE_MEANING).map(([code, meaning]) => (
                <li key={code} className="flex items-start gap-2 text-[14px] text-text-secondary leading-snug">
                  <span className="font-extrabold text-text-primary font-heading w-7 shrink-0">{code}</span>
                  <span>{meaning}</span>
                </li>
              ))}
            </ul>
          </RevealAfter>
        </ResultCard>
        <RevealAfter delay={1.0}>
          <ShareResult spec={genotypeShareSpec(result)} />
          <Advice advice={result.advice} />
          <ToolCta cta={cta} />
          <div className="mt-4">
            <ToolCta cta={tool.secondaryCta} tone="soft" />
          </div>
        </RevealAfter>
      </div>
    );
  }

  const disease = result.groups.find((g) => g.id === "disease");

  return (
    <div>
      <ResultCard>
        <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
          {result.you} and {result.partner}
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
      </ResultCard>

      <RevealAfter delay={1.3}>
        <ShareResult spec={genotypeShareSpec(result)} />

        <Advice advice={result.advice} />

        {disease && (
          <div className="rounded-card border border-border bg-section-alt p-5 mb-4">
            <p className="text-[15px] text-text-secondary leading-relaxed">
              Two AS carriers are sometimes told they are &ldquo;not compatible.&rdquo; That phrase describes a 1 in 4
              chance per pregnancy, not a guarantee, and it does not mean a couple cannot build a life together. It
              means the decision deserves informed input from a genetic counsellor or a doctor experienced in sickle
              cell disease, who can lay out the real odds and the options, including early prenatal testing.
            </p>
          </div>
        )}

        <ToolCta cta={cta} />
        <div className="mt-4">
          <ToolCta cta={tool.secondaryCta} tone="soft" />
        </div>

        <p className="mt-4 text-[13px] text-text-secondary leading-relaxed">
          Read more:{" "}
          <Link to="/blog/genotype-test-aa-as-ss" className="text-primary font-semibold">
            what AA, AS and SS mean for family planning
          </Link>{" "}
          and{" "}
          <Link to="/blog/sickle-cell-trait-testing" className="text-primary font-semibold">
            sickle cell trait explained
          </Link>
          .
        </p>
      </RevealAfter>
    </div>
  );
}
