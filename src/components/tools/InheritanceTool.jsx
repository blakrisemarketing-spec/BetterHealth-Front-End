import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Ban, Check, Info } from "lucide-react";
import {
  ABO_ANY_GROUP_NOTE,
  ABO_EXCEPTIONS_NOTE,
  ABO_GROUPS,
  ABO_HALF_CERTAIN_NOTE,
  ABO_HIDDEN_ALLELE_NOTE,
  ABO_ONLY_TWO_SETTLE_NOTE,
  CANNOT_PREDICT,
  EXPECTED_CAVEAT,
  EXPECTED_LABEL,
  G6PD_DAUGHTERS_NOTE,
  G6PD_GHANA_NOTE,
  G6PD_SONS_NOTE,
  G6PD_STATUS,
  G6PD_TRIGGERS_NOTE,
  RH_ANTI_D_NOTE,
  RH_ANTI_D_SCHEDULE_NOTE,
  RH_GHANA_NOTE,
  RH_LABEL,
  RUNS_IN_FAMILIES,
} from "../../data/tools/inheritance";
import { shareSpecFor } from "../../data/tools/share-card";
import ToolCta from "./ToolCta";
import ShareResult from "./ShareResult";
import { CountUp, ResultCard, RevealAfter } from "./ResultReveal";
import { GenotypeAdvice, GenotypeBody, GenotypeCounselling, GenotypeHeadline } from "./GenotypeTool";

/**
 * The family inheritance result: one section per trait the couple picked, in
 * the order the data module lists them, with genotype first and the two
 * "this cannot be predicted" sections last.
 *
 * Every figure on this screen was counted by src/data/tools/inheritance.js or
 * by the Punnett square in genotype-compatibility.js. Nothing is computed here.
 */

function Section({ eyebrow, title, children }) {
  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
      <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">{eyebrow}</span>
      <h3 className="text-[1.15rem] sm:text-[1.4rem] font-extrabold text-text-primary font-heading leading-snug mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Note({ children, tone = "plain" }) {
  const cls =
    tone === "accent"
      ? "rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed mb-4"
      : "rounded-card border border-border bg-section-alt px-4 py-3 text-[13.5px] text-text-secondary leading-relaxed mb-4";
  return <div className={cls}>{children}</div>;
}

/**
 * The possible-and-impossible strip. Every outcome the trait has, with the ones
 * this pairing rules out struck through, so the eye reads the exclusions first.
 */
function OutcomeStrip({ all, possible, labelFor }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4" role="list">
      {all.map((v) => {
        const on = possible.includes(v);
        return (
          <span
            key={v}
            role="listitem"
            className={`inline-flex items-center gap-1.5 rounded-pill border px-3.5 py-2 text-[14px] font-bold ${
              on ? "border-primary bg-primary-bg text-text-primary" : "border-border bg-section-alt text-text-muted"
            }`}
          >
            {on ? <Check size={14} className="text-primary" /> : <Ban size={14} />}
            <span className={on ? "" : "line-through decoration-2"}>{labelFor ? labelFor(v) : v}</span>
          </span>
        );
      })}
    </div>
  );
}

/** Exact percentages, only ever rendered where the data module returned some. */
function PercentRows({ rows, labelFor }) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-4">
      {rows.map((r) => {
        const key = r.group || r.value || r.status;
        return (
          <div key={key} className="mb-3 last:mb-0">
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="text-[14px] font-bold text-text-primary font-heading">{labelFor(key)}</span>
              <span className="text-[15px] font-extrabold text-text-primary font-heading tabular-nums">
                <CountUp value={r.percent} />%
              </span>
            </div>
            <div className="h-2 w-full rounded-pill bg-section-alt overflow-hidden" aria-hidden="true">
              <motion.div
                className="h-2 rounded-pill bg-primary"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${r.percent}%` }}
                transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The population-average layer, kept visibly apart from every exact figure on
 * the page: dashed border, smaller type, no bars, and the caveat attached
 * rather than footnoted. It answers a different question from the one above it
 * and says so in its own heading.
 */
const showPercent = (n) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

function ExpectedRows({ rows, labelFor }) {
  return (
    <div className="rounded-card border border-dashed border-border bg-section-alt px-4 py-3 mb-4">
      <p className="text-[11.5px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">{EXPECTED_LABEL}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mb-2.5" role="list">
        {rows.map((r) => (
          <li key={r.group || r.value} className="text-[13.5px] text-text-secondary leading-snug">
            <span className="font-extrabold text-text-primary font-heading tabular-nums">{showPercent(r.percent)}%</span>{" "}
            {labelFor(r.group || r.value)}
          </li>
        ))}
      </ul>
      <p className="text-[12.5px] text-text-muted leading-relaxed">{EXPECTED_CAVEAT}</p>
    </div>
  );
}

// --------------------------------------------------------------------------
// Blood group. What the two letters settle leads, because that is the exact
// part and the part nobody expects: which groups are off the table, and for
// A with AB or B with AB, one share that holds whichever gene is hidden.
// --------------------------------------------------------------------------

function aboTitle({ certain, impossible, determinable }) {
  if (impossible.length === 0) {
    return "Your children could be any blood group, including one that matches neither of you.";
  }
  const ruledOut = `no child of yours can be group ${impossible.join(" or ")}`;
  if (!determinable && certain.length === 1) {
    return `Group ${certain[0].group} is exactly ${showPercent(certain[0].percent)}%, and ${ruledOut}.`;
  }
  return `No child of yours can be group ${impossible.join(" or ")}.`;
}

function AboSection({ result }) {
  if (result.kind === "unknown") {
    return (
      <Section eyebrow="Blood group" title="One blood group test settles this, for both of you.">
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          ABO typing is a small blood sample with no fasting, and the result does not change over a lifetime, so you
          establish it once and keep it. The lab reads how your red cells react to known anti-A and anti-B reagents and
          reports the letter.
        </p>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          It is useful beyond this page: one less thing to work out in an emergency, and the first step towards
          donating blood.
        </p>
      </Section>
    );
  }

  const { possible, impossible, determinable, certain, undecided, percentages, expected } = result;
  const halfExact = !determinable && certain.length > 0;

  return (
    <Section eyebrow={`Blood group: ${result.you} and ${result.partner}`} title={aboTitle(result)}>
      <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
        {impossible.length > 0 ? "Possible, and ruled out" : "All four possible"}
      </p>
      <OutcomeStrip all={ABO_GROUPS} possible={possible} />

      {impossible.length === 0 && (
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{ABO_ANY_GROUP_NOTE}</p>
      )}

      {determinable && (
        <>
          <Note tone="accent">
            Both of your groups say outright which pair of genes is behind them, so this pairing has an exact split
            rather than a range.
          </Note>
          <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">Per pregnancy</p>
          <PercentRows rows={percentages} labelFor={(g) => `Group ${g}`} />
        </>
      )}

      {halfExact && (
        <>
          <Note tone="accent">
            Group {certain[0].group} is the one figure here that holds whichever gene is hidden, so it is exact rather
            than an estimate.
          </Note>
          <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
            Exact, per pregnancy
          </p>
          <PercentRows rows={certain} labelFor={(g) => `Group ${g}`} />
          <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
            The other {showPercent(100 - result.certainTotal)}%, undecided
          </p>
          <OutcomeStrip all={undecided} possible={undecided} labelFor={(g) => `Group ${g}`} />
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{ABO_HALF_CERTAIN_NOTE}</p>
        </>
      )}

      {!determinable && (
        <>
          {!halfExact && (
            <Note tone="accent">
              There is no exact percentage to give you here, and any tool that shows one has invented it.
            </Note>
          )}
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{ABO_HIDDEN_ALLELE_NOTE}</p>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">{ABO_ONLY_TWO_SETTLE_NOTE}</p>
          <ExpectedRows rows={expected} labelFor={(g) => `group ${g}`} />
        </>
      )}

      <p className="text-[13.5px] text-text-secondary leading-relaxed">{ABO_EXCEPTIONS_NOTE}</p>
    </Section>
  );
}

// --------------------------------------------------------------------------
// Rh factor.
// --------------------------------------------------------------------------

const RH_PREGNANCY_COPY = {
  plan: {
    title: "An Rh negative mother is the part worth telling an antenatal team.",
    body:
      "The risk runs in one direction only. It needs an Rh negative mother carrying an Rh positive baby, which is what the first antenatal blood test looks for. An Rh negative father creates none of it, so this is a fact about one of you rather than about the two of you together.",
  },
  cleared: {
    title: "Two Rh negative partners have nothing to plan around here.",
    body:
      "Rh incompatibility in pregnancy needs an Rh negative mother and an Rh positive baby. Two Rh negative partners cannot produce an Rh positive child, so that particular situation does not arise.",
  },
  unknown: {
    title: "The mother-to-be is Rh negative, and the other half is still open.",
    body:
      "An Rh negative mother is the half that matters most, and it is worth mentioning at a first antenatal visit whatever the father's status turns out to be. A blood group test settles the rest.",
  },
};

function RhSection({ result }) {
  if (result.kind === "unknown") {
    const flag = result.pregnancy ? RH_PREGNANCY_COPY[result.pregnancy] : null;
    return (
      <Section eyebrow="Rh factor" title={flag ? flag.title : "The Rh factor comes back on the same report as the blood group."}>
        {flag && <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{flag.body}</p>}
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          Rh positive or Rh negative is the plus or minus after the letter, and it is reported by the same test at no
          extra step. Being Rh negative causes no symptoms and needs no treatment on its own. It matters in two places:
          matching blood for a transfusion, and planning antenatal care.
        </p>
        <p className="text-[15px] text-text-secondary leading-relaxed">{RH_GHANA_NOTE}</p>
      </Section>
    );
  }

  const flag = result.pregnancy ? RH_PREGNANCY_COPY[result.pregnancy] : null;
  const title = result.determinable
    ? "Every child of yours would be Rh negative."
    : "A child could be Rh positive or Rh negative.";

  return (
    <Section eyebrow={`Rh factor: ${RH_LABEL[result.you]} and ${RH_LABEL[result.partner]}`} title={title}>
      <OutcomeStrip all={["pos", "neg"]} possible={result.possible} labelFor={(v) => RH_LABEL[v]} />

      {result.determinable ? (
        <Note tone="accent">
          Rh negative is the one Rh result that says what the pair of genes is: two copies of the version that makes no
          D antigen. Neither of you has a positive copy to pass on, so this pairing has an exact answer.
        </Note>
      ) : (
        <>
          <Note tone="accent">
            There is no exact percentage here. Rh positive covers two different pairs of genes, and a blood group report
            does not say which one you have, so both outcomes stay possible without a split we can put a number on.
          </Note>
          <ExpectedRows rows={result.expected} labelFor={(v) => RH_LABEL[v]} />
        </>
      )}

      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{RH_GHANA_NOTE}</p>

      {flag && (
        <>
          <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">In pregnancy</p>
          <h4 className="text-[15.5px] font-bold text-text-primary font-heading leading-snug mb-1.5">{flag.title}</h4>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{flag.body}</p>
          {result.pregnancy !== "cleared" && (
            <>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{RH_ANTI_D_NOTE}</p>
              <p className="text-[15px] text-text-secondary leading-relaxed">{RH_ANTI_D_SCHEDULE_NOTE}</p>
            </>
          )}
        </>
      )}
      {!flag && (
        <p className="text-[15px] text-text-secondary leading-relaxed">
          The pregnancy risk needs an Rh negative mother, so it does not apply here. Both of your results are still
          worth keeping for transfusion matching.
        </p>
      )}
    </Section>
  );
}

// --------------------------------------------------------------------------
// G6PD. The sons and daughters split is the whole point of the section, so it
// gets two visibly separate blocks rather than one merged table.
// --------------------------------------------------------------------------

function G6pdColumn({ heading, sub, rows, tone }) {
  return (
    <div className={`rounded-card border p-4 ${tone === "sons" ? "border-primary/40 bg-primary-bg" : "border-border bg-section-alt"}`}>
      <p className="text-[12px] font-bold text-primary uppercase tracking-[0.1em] mb-0.5">{heading}</p>
      <p className="text-[12.5px] text-text-secondary leading-snug mb-3">{sub}</p>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.status} className="flex items-baseline justify-between gap-3">
            <span className="text-[14px] text-text-primary leading-snug">{G6PD_STATUS[r.status]}</span>
            <span className="text-[17px] font-extrabold text-text-primary font-heading tabular-nums shrink-0">
              <CountUp value={r.percent} />%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function G6pdSection({ result }) {
  if (result.kind === "unknown") {
    return (
      <Section eyebrow="G6PD" title="G6PD is the one on this page that changes what is safe to prescribe.">
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          G6PD deficiency is an inherited enzyme condition, and one of the most common in the world: it affects roughly 400
          million people. It usually causes nothing until a trigger arrives, and then red cells break down faster than
          the body replaces them.
        </p>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{G6PD_TRIGGERS_NOTE}</p>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{G6PD_GHANA_NOTE}</p>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          The gene sits on the X chromosome, so the answer for a son and the answer for a daughter are two different
          answers, and neither can be worked out without both of your results.
        </p>
        <Note>
          A quantitative G6PD test is a small blood sample with no fasting. It is most accurate outside an active
          haemolytic episode, since levels can read falsely normal just after one.
        </Note>
      </Section>
    );
  }

  return (
    <Section
      eyebrow="G6PD, on the X chromosome"
      title="Sons and daughters get two different answers here."
    >
      <div className="grid gap-3 mb-4">
        <G6pdColumn
          tone="sons"
          heading="If you have a son"
          sub="One X, from his mother. His father's G6PD status cannot reach him."
          rows={result.sons}
        />
        <G6pdColumn
          tone="daughters"
          heading="If you have a daughter"
          sub="One X from each parent, so one affected copy makes her a carrier."
          rows={result.daughters}
        />
      </div>

      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{G6PD_SONS_NOTE}</p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{G6PD_DAUGHTERS_NOTE}</p>

      {result.reading && (
        <Note>
          <span className="inline-flex items-start gap-2">
            <Info size={15} className="text-primary shrink-0 mt-[2px]" />
            <span>{result.reading}</span>
          </span>
        </Note>
      )}

      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{G6PD_GHANA_NOTE}</p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{G6PD_TRIGGERS_NOTE}</p>

      <p className="text-[13.5px] text-text-secondary leading-relaxed">
        Whatever the table says, one habit does most of the protective work: tell every doctor, pharmacist and antenatal
        provider your status before they prescribe anything.
      </p>
    </Section>
  );
}

// --------------------------------------------------------------------------
// Sex of the child. Deliberately not written up as a finding.
// --------------------------------------------------------------------------

function SexSection({ result, showsG6pd }) {
  return (
    <Section eyebrow="Boy or girl" title={result.headline}>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{result.body}</p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{result.perPregnancy}</p>
      <Note tone="accent">
        {showsG6pd
          ? "This is where the G6PD maths above starts. G6PD sits on the X chromosome, so which chromosome arrives changes that answer and no other on this page."
          : result.whyItMatters}
      </Note>
    </Section>
  );
}

// --------------------------------------------------------------------------
// The two closing sections.
// --------------------------------------------------------------------------

function RunsInFamilies() {
  return (
    <Section eyebrow="Family history" title={RUNS_IN_FAMILIES.heading}>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{RUNS_IN_FAMILIES.intro}</p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{RUNS_IN_FAMILIES.handoff}</p>
      <Note tone="accent">{RUNS_IN_FAMILIES.scored}</Note>
      <p className="text-[14.5px] text-text-secondary leading-relaxed mb-3">{RUNS_IN_FAMILIES.mody}</p>
      <ul className="space-y-1.5">
        {RUNS_IN_FAMILIES.links.map((l) => (
          <li key={l.to} className="text-[14.5px] leading-snug">
            <Link to={l.to} className="text-primary font-semibold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CannotPredict() {
  return (
    <Section eyebrow="The honest limits" title={CANNOT_PREDICT.heading}>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-4">{CANNOT_PREDICT.intro}</p>
      <dl className="mb-4">
        {CANNOT_PREDICT.items.map((item) => (
          <div key={item.label} className="mb-3.5 last:mb-0">
            <dt className="text-[15px] font-bold text-text-primary font-heading leading-snug mb-1">{item.label}</dt>
            <dd className="text-[14.5px] text-text-secondary leading-relaxed m-0">{item.text}</dd>
          </div>
        ))}
      </dl>
      <p className="text-[15px] text-text-secondary leading-relaxed">{CANNOT_PREDICT.close}</p>
    </Section>
  );
}

// --------------------------------------------------------------------------

function NextStep({ cta }) {
  if (cta.kind === "none") {
    return (
      <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-text-secondary mb-1">Next step</p>
        <p className="text-[1.05rem] font-extrabold font-heading leading-snug mb-1 text-text-primary">{cta.label}</p>
        <p className="text-[14px] text-text-secondary">{cta.body}</p>
      </div>
    );
  }
  return <ToolCta cta={cta} />;
}

export default function InheritanceResult({ result, tool }) {
  const spec = shareSpecFor(tool.slug, result);
  const showsG6pd = Boolean(result.g6pd);

  return (
    <div>
      {result.genotype && (
        <ResultCard>
          <GenotypeHeadline result={result.genotype} />
          <GenotypeBody result={result.genotype} />
        </ResultCard>
      )}

      <RevealAfter delay={result.genotype ? 1.3 : 0.2}>
        {result.abo && <AboSection result={result.abo} />}
        {result.rh && <RhSection result={result.rh} />}
        {result.g6pd && <G6pdSection result={result.g6pd} />}
        {result.sex && <SexSection result={result.sex} showsG6pd={showsG6pd} />}

        {spec && <ShareResult spec={spec} />}

        {result.genotype && (
          <>
            <GenotypeCounselling result={result.genotype} />
            <GenotypeAdvice advice={result.genotype.advice} />
          </>
        )}

        <NextStep cta={result.cta} />

        <div className="mt-4">
          <RunsInFamilies />
          <CannotPredict />
        </div>

        <p className="mt-2 text-[13px] text-text-secondary leading-relaxed">
          Read more:{" "}
          <Link to="/blog/genotype-test-aa-as-ss" className="text-primary font-semibold">
            what AA, AS and SS mean for family planning
          </Link>
          ,{" "}
          <Link to="/blog/blood-group-test" className="text-primary font-semibold">
            blood group and Rhesus factor
          </Link>{" "}
          and{" "}
          <Link to="/blog/g6pd-deficiency-test" className="text-primary font-semibold">
            why a G6PD test matters before some medications
          </Link>
          .
        </p>
      </RevealAfter>
    </div>
  );
}
