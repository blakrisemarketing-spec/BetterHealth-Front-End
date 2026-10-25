import { Link } from "react-router-dom";
import { AlertTriangle, Droplet, Info, TestTube } from "lucide-react";
import {
  A_BOUNDARY_NOTE,
  A_STAGES,
  BOTH_TESTS_PRACTICE_POINT,
  CKD_EPI_2021,
  EGFR_CAVEAT,
  EGFR_CAVEAT_LOW,
  EKFC,
  G1_G2_FOOTNOTE,
  G_STAGES,
  NO_INTERVAL_NOTE,
  NO_RISK_FACTORS_NOTE,
  NO_SCORE_NOTE,
  UNRELIABLE_NOTE,
} from "../../data/tools/kidney-check";
import { kidneyShareSpec } from "../../data/tools/share-card";
import ToolCta from "./ToolCta";
import ShareResult from "./ShareResult";
import { BandMeter, CountUp, ResultCard, RevealAfter } from "./ResultReveal";

const round1 = (n) => Math.round(n * 10) / 10;

/** "a, b and c" */
function listOf(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const UNKNOWN_LABELS = {
  bloodPressure: "blood pressure",
  diabetes: "diabetes",
  familyKidney: "kidney disease in the family",
};

const unitLabel = (unit) => (unit === "mgdl" ? "mg/dL" : "micromol/L");
const acrUnitLabel = (unit) => (unit === "mgg" ? "mg/g" : "mg/mmol");

/**
 * Part 1. Whether a check is indicated, and why.
 *
 * A guideline risk-factor list rather than a score, so this screen shows the
 * factors it counted and never a percentage.
 */
function ScreeningCard({ screening, signs }) {
  const { indicated, reasons, priority, unknowns, interval } = screening;

  const headline = indicated
    ? priority.length > 0
      ? `Yes. ${listOf(priority.map((r) => r.label.toLowerCase()))} ${
          priority.length > 1 ? "are among the three conditions" : "is one of the three conditions"
        } KDIGO puts at the top of its list for kidney testing.`
      : "Yes, this is worth checking."
    : "Nothing you told us puts you on the list today.";

  return (
    <ResultCard>
      <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
        Part 1: should your kidneys be checked?
      </span>
      <h2 className="text-[1.3rem] sm:text-[1.65rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
        {headline}
      </h2>

      <RevealAfter delay={0.5}>
        {reasons.length > 0 ? (
          <>
            <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
              What put you on the list
            </p>
            <ul className="mb-4 divide-y divide-border border-y border-border">
              {reasons.map((r) => (
                <li key={r.id} className="py-2.5">
                  <span className="block text-[14.5px] font-bold text-text-primary">{r.label}</span>
                  <span className="block text-[13px] text-text-secondary leading-snug mt-0.5">{r.why}</span>
                </li>
              ))}
            </ul>
            {interval ? (
              <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 mb-4">
                <p className="text-[12px] font-bold text-primary uppercase tracking-[0.1em] mb-1">How often</p>
                <p className="text-[14.5px] text-text-primary leading-relaxed mb-1">{interval.text}</p>
                <p className="text-[12.5px] text-text-primary/70 leading-relaxed">{interval.source}</p>
              </div>
            ) : (
              <p className="text-[14px] text-text-secondary leading-relaxed mb-4">{NO_INTERVAL_NOTE}</p>
            )}
            <p className="text-[13px] text-text-muted leading-relaxed mb-4">{NO_SCORE_NOTE}</p>
          </>
        ) : (
          <>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
              That does not mean your kidneys are fine. It means none of the risk factors on KDIGO&rsquo;s list applies
              to you today. High blood pressure and diabetes, the two most commonly recorded causes of kidney failure
              in Ghana, both build for years without a symptom, so this answer changes the day either one appears.
            </p>
            <p className="text-[14px] text-text-secondary leading-relaxed mb-4">{NO_RISK_FACTORS_NOTE}</p>
          </>
        )}

        {unknowns.length > 0 && (
          <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
            You answered &ldquo;not sure&rdquo; on {listOf(unknowns.map((u) => UNKNOWN_LABELS[u]))}. That is not
            counted against you, because a guess is not a risk factor. It is worth closing though:{" "}
            <Link to="/guides/home-blood-pressure-guide" className="text-primary font-semibold">
              a blood pressure reading takes about two minutes
            </Link>
            , and a fasting sugar or HbA1c settles the other one.
          </p>
        )}

        {signs.picked.length > 0 ? (
          <>
            <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
              What you noticed
            </p>
            <ul className="mb-2 space-y-1">
              {signs.picked.map((s) => (
                <li key={s.id} className="text-[14.5px] text-text-primary leading-snug">
                  {s.label}
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-text-muted leading-relaxed">
              None of these is specific to the kidneys on its own, and early kidney trouble usually causes no symptom
              at all, so a test finds it before you would. Mention what you ticked at your next appointment.
            </p>
          </>
        ) : (
          <p className="text-[13px] text-text-muted leading-relaxed">
            You noticed none of the signs on the list, which is the usual answer and settles nothing either way. By the
            time swelling, fatigue or nausea from reduced kidney function are noticeable, a significant amount of
            function has often already gone.
          </p>
        )}
      </RevealAfter>
    </ResultCard>
  );
}

/** The blood half: filtering, estimated, with the caveat that has to travel with it. */
function EgfrBlock({ numbers }) {
  const { creatinine, egfr, egfrLow, unreliable, g } = numbers;
  if (!creatinine) return null;

  const typed = unitLabel(creatinine.unit);
  const other = unitLabel(creatinine.unit === "mgdl" ? "umol" : "mgdl");
  const otherValue = creatinine.unit === "mgdl" ? Math.round(creatinine.umol) : round1(creatinine.mgdl);

  return (
    <div className="mb-6">
      <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
        <TestTube size={13} className="inline-block -mt-0.5 mr-1 text-primary" />
        From the blood: filtering
      </p>

      {egfr === null ? (
        <>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[38px] leading-none font-extrabold text-primary font-heading tabular-nums">
              {creatinine.typed}
            </span>
            <span className="text-[15px] text-text-secondary font-heading font-bold">{typed}</span>
          </div>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-3">
            The same result is{" "}
            <strong className="text-text-primary">
              {otherValue} {other}
            </strong>
            . The two units differ by a factor of about 88, which is the commonest reason an ordinary creatinine gets
            read as an alarming one.
          </p>
          <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed">
            <strong>No eGFR from this one.</strong> You ticked{" "}
            {listOf(unreliable.map((c) => c.label.toLowerCase()))}. Creatinine is a waste product of muscle, so an eGFR
            worked out from it assumes an ordinary amount of muscle, turning over at an ordinary rate. KDIGO names
            these as situations where that assumption fails, and a number printed next to a warning is worse than no
            number at all. {UNRELIABLE_NOTE}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-2 mb-1">
            <CountUp
              value={egfr.low}
              className="text-[44px] leading-none font-extrabold text-primary font-heading tabular-nums"
            />
            {egfr.high !== egfr.low && (
              <>
                <span className="text-[26px] leading-none font-extrabold text-primary/60 font-heading">to</span>
                <CountUp
                  value={egfr.high}
                  className="text-[44px] leading-none font-extrabold text-primary font-heading tabular-nums"
                />
              </>
            )}
            <span className="text-[14px] text-text-secondary font-heading font-bold">mL/min/1.73m&sup2;</span>
          </div>
          {g && (
            <RevealAfter delay={0.85}>
              <h3 className="text-[1.2rem] sm:text-[1.4rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
                Stage {g.label}: {g.name.toLowerCase()}.
              </h3>
            </RevealAfter>
          )}
          <BandMeter bands={G_STAGES} activeId={g?.id} leftLabel="G1, not reduced" rightLabel="G5, kidney failure" />

          <p className="text-[14px] text-text-secondary leading-relaxed mb-3">
            This page works out two published equations rather than one. {CKD_EPI_2021.name} gives{" "}
            <strong className="text-text-primary">{egfr.ckdEpi}</strong>, which is the figure this page reports because
            it is what most laboratories use, so it is the number least likely to conflict with your own lab.{" "}
            {EKFC.name} gives <strong className="text-text-primary">{egfr.ekfc}</strong>. KDIGO&rsquo;s own
            implementation guidance names that second one for use within African countries, and the span between them
            is the honest width of the estimate.
          </p>

          {egfr.equationsDisagree && (
            <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed mb-3">
              The two equations do not agree on which band you are in. Neither is wrong. The estimate is wide enough
              to straddle a boundary, which is the clearest reason to have filtering measured rather than estimated.
            </div>
          )}

          {g && <p className="text-[14px] text-text-secondary leading-relaxed mb-3">{g.meaning}</p>}

          <p className="text-[13px] text-text-muted leading-relaxed mb-2">
            Your creatinine of {creatinine.typed} {typed} is {otherValue} {other} in the other unit.
          </p>
          <p className="text-[13px] text-text-secondary leading-relaxed">{EGFR_CAVEAT}</p>
          {egfrLow && <p className="text-[13px] text-text-secondary leading-relaxed mt-2">{EGFR_CAVEAT_LOW}</p>}
        </>
      )}
    </div>
  );
}

/** The urine half: leaking, which often shows first. */
function AcrBlock({ numbers }) {
  const { acr, a } = numbers;
  if (!acr) return null;

  const typed = acrUnitLabel(acr.unit);
  const other = acrUnitLabel(acr.unit === "mgg" ? "mgmmol" : "mgg");
  const otherValue = acr.unit === "mgg" ? round1(acr.mgmmol) : round1(acr.mgg);

  return (
    <div className="mb-6">
      <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
        <Droplet size={13} className="inline-block -mt-0.5 mr-1 text-primary" />
        From the urine: leaking
      </p>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[38px] leading-none font-extrabold text-primary font-heading tabular-nums">
          {acr.typed}
        </span>
        <span className="text-[15px] text-text-secondary font-heading font-bold">{typed}</span>
      </div>
      {a && (
        <>
          <h3 className="text-[1.2rem] sm:text-[1.4rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
            Stage {a.label}: {a.name.toLowerCase()}.
          </h3>
          <BandMeter
            bands={A_STAGES}
            activeId={a.id}
            leftLabel="A1, not increased"
            rightLabel="A3, severely increased"
          />
          <p className="text-[14px] text-text-secondary leading-relaxed mb-3">{a.meaning}</p>
        </>
      )}
      <p className="text-[13px] text-text-muted leading-relaxed mb-2">
        The same result is about {otherValue} {other}, though it was banded in {typed}, the unit your report used.{" "}
        {A_BOUNDARY_NOTE}
      </p>
    </div>
  );
}

/** The KDIGO grid cell, where both halves are in. */
function GridBlock({ numbers }) {
  const { g, a, grid } = numbers;
  if (!g || !a || !grid) return null;
  return (
    <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 mb-4">
      <p className="text-[12px] font-bold text-primary uppercase tracking-[0.1em] mb-1">
        Both numbers, on KDIGO&rsquo;s grid
      </p>
      <p className="text-[1.15rem] font-extrabold text-text-primary font-heading leading-snug mb-1">
        {g.label} {a.label}: {grid.label.toLowerCase()}.
      </p>
      <p className="text-[14.5px] text-text-primary leading-relaxed mb-2">{grid.meaning}</p>
      <p className="text-[13px] text-text-primary/80 leading-relaxed">
        The same grid suggests {grid.testsPerYear} {grid.testsPerYear === "1" ? "test" : "tests"} a year for this cell.
        That figure is guidance for people already under care rather than a screening interval, so treat it as
        something to raise with a clinician instead of a date to put in your phone.
      </p>
    </div>
  );
}

/** The point of the whole tool: which half of the picture is missing. */
function MissingHalf({ missingHalf, have }) {
  if (!missingHalf) return null;
  return (
    <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
      <p className="text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
        {have === "none" ? "Why two tests and not one" : "Half the picture"}
      </p>
      <h3 className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        {missingHalf.heading}
      </h3>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{missingHalf.body}</p>
      <p className="text-[13px] text-text-muted leading-relaxed">
        KDIGO&rsquo;s own detection practice point: &ldquo;{BOTH_TESTS_PRACTICE_POINT}&rdquo; A check that measures
        only one of the two is not doing what that asks.
      </p>
    </div>
  );
}

/** A hard stop: the tool refuses to compute, and says why. */
function ExclusionCard({ exclusion }) {
  if (!exclusion) return null;
  return (
    <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
      <p className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
        <Info size={14} /> No number from this page
      </p>
      <h3 className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        {exclusion.headline}
      </h3>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-2">{exclusion.body}</p>
      <p className="text-[12.5px] text-text-muted leading-relaxed">{exclusion.source}</p>
    </div>
  );
}

/** Rule 3: prompt clinical attention, said plainly, and the selling stops. */
function UrgentBlock({ urgent }) {
  if (!urgent) return null;
  return (
    <div className="rounded-card border-2 border-red-600 bg-red-50 p-5 sm:p-6 mb-4" role="alert">
      <p className="inline-flex items-center gap-1.5 text-[12px] font-bold text-red-700 uppercase tracking-[0.12em] mb-1">
        <AlertTriangle size={14} /> See a clinician about this
      </p>
      <h3 className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-red-900 font-heading leading-snug mb-2">
        {urgent.headline}
      </h3>
      <p className="text-[15px] text-red-900/90 leading-relaxed mb-2">{urgent.body}</p>
      <p className="text-[12.5px] text-red-900/70 leading-relaxed">{urgent.source}</p>
    </div>
  );
}

/** The next-step card, or the plain statement when there is nothing to book. */
function NextStep({ cta, panel }) {
  if (!cta) return null;
  if (cta.kind === "none") {
    return (
      <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-text-secondary mb-1">Next step</p>
        <p className="text-[1.05rem] font-extrabold font-heading leading-snug mb-1 text-text-primary">{cta.label}</p>
        <p className="text-[14px] text-text-secondary leading-relaxed">{cta.body}</p>
      </div>
    );
  }
  return <ToolCta cta={cta} panel={panel} />;
}

/** The result screen, rendered only after a successful lead submit. */
export default function KidneyCheckResult({ result, tool, panel }) {
  const { screening, signs, numbers, missingHalf, urgent, exclusion, cta } = result;
  const hasAnyNumber = numbers.have !== "none";
  // Rule 3: when a result needs prompt clinical attention, or when the tool
  // has refused to compute, the secondary panel card goes with the primary.
  const showSecondary = !urgent && !exclusion && screening.priority.length > 0;
  const showG1G2Footnote = numbers.g?.id === "G1" || numbers.g?.id === "G2";

  return (
    <div>
      <ScreeningCard screening={screening} signs={signs} />

      <RevealAfter delay={1.15}>
        {hasAnyNumber && (
          <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
            <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-3">
              Part 2: your numbers
            </span>
            <EgfrBlock numbers={numbers} />
            <AcrBlock numbers={numbers} />
            <GridBlock numbers={numbers} />
            {showG1G2Footnote && !numbers.a && (
              <div className="rounded-card border border-border bg-section-alt px-4 py-3 text-[14px] text-text-secondary leading-relaxed mb-4">
                KDIGO&rsquo;s own footnote to this table: &ldquo;{G1_G2_FOOTNOTE}&rdquo; Read the other way round, in
                the presence of kidney damage they do. Damage is what the urine test looks for, and you have not had
                that one.
              </div>
            )}
            <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed">
              Whatever these say, one set of results is not a diagnosis. KDIGO defines chronic kidney disease by an
              abnormality present for a minimum of three months, and its own guidance is not to assume chronicity from
              a single abnormal result, because it could be a recent acute kidney injury instead. Creatinine also moves
              on its own with hydration, a heavy protein meal, intense exercise and some medicines. A first abnormal
              result is still a reason to be seen. It is just not an answer.
            </div>
          </div>
        )}

        <ExclusionCard exclusion={exclusion} />
        <UrgentBlock urgent={urgent} />
        <MissingHalf missingHalf={missingHalf} have={numbers.have} />

        <ShareResult spec={kidneyShareSpec(result)} />

        <NextStep cta={cta} />
        {showSecondary && (
          <div className="mt-4">
            <ToolCta cta={tool.cta} panel={panel} tone="muted" />
          </div>
        )}

        <p className="mt-4 text-[13px] text-text-secondary leading-relaxed">
          Read more:{" "}
          <Link to="/blog/creatinine-egfr-kidney-function" className="text-primary font-semibold">
            how to read a creatinine and eGFR result
          </Link>{" "}
          and{" "}
          <Link to="/blog/urinalysis-explained" className="text-primary font-semibold">
            what a routine urine test checks
          </Link>
          .
        </p>
      </RevealAfter>
    </div>
  );
}
