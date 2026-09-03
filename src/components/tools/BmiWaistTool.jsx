import { Link } from "react-router-dom";
import { bmiShareSpec } from "../../data/tools/share-card";
import ToolCta from "./ToolCta";
import ShareResult from "./ShareResult";
import PlateSummary, { Cite, LifestyleNote } from "./PlateSummary";
import { CountUp, ResultCard, RevealAfter } from "./ResultReveal";

/** Centimetres with a decimal only when there is one, so 85 does not print as 85.0. */
function cm(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "";
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

/** One of the numbers: the figure, the band it falls in, and what it is a clue for. */
function NumberRow({ label, value, unit, band, clue }) {
  return (
    <li className="py-3.5">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className="text-[14.5px] font-semibold text-text-primary">{label}</span>
        <span className="text-[20px] font-extrabold text-primary font-heading tabular-nums shrink-0">
          {value}
          {unit && <span className="text-[13px] font-bold text-text-secondary ml-1">{unit}</span>}
        </span>
      </div>
      <span
        className={`inline-block text-[11.5px] font-bold uppercase tracking-[0.08em] rounded-pill px-2.5 py-1 mb-1.5 ${
          band.healthy ? "bg-primary-bg text-primary" : "bg-section-alt text-text-primary"
        }`}
      >
        {band.label}
      </span>
      <p className="text-[13px] text-text-secondary leading-snug">{clue}</p>
    </li>
  );
}

/** Shown in place of the waist-to-height row above the BMI at which NICE stops using it. */
function WhtrOutOfScope() {
  return (
    <li className="py-3.5">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className="text-[14.5px] font-semibold text-text-primary">Waist to height</span>
        <span className="text-[15px] font-bold text-text-secondary font-heading shrink-0">Not shown</span>
      </div>
      <p className="text-[13px] text-text-secondary leading-snug">
        NICE uses waist-to-height ratio only in adults with a BMI under 35, on the reasoning that above that it adds
        nothing to what BMI has already told you. We could print the number anyway. It would not mean anything, so we
        have left it out.
      </p>
    </li>
  );
}

/** Why the BMI band on this page is not the 25 and 30 everyone has seen. */
function WhyTheseThresholds({ bmi, bmiBand, bmiBandGeneral }) {
  const differs = bmiBand.id !== bmiBandGeneral.id;
  return (
    <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
      <h3 className="text-[1.05rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        Why your BMI thresholds are lower here
      </h3>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
        Most calculators band BMI at 25 for overweight and 30 for obesity. NICE, which writes clinical guidance for the
        NHS, tells clinicians to use lower thresholds for people of Black African or African-Caribbean background,
        alongside South Asian, Chinese, other Asian and Middle Eastern backgrounds: overweight from 23.0, obesity from
        27.5. Its stated reason is that these groups are prone to central adiposity and reach cardiometabolic risk at a
        lower BMI. This is not a Ghana-specific finding, and we are not presenting it as one.
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
        {differs ? (
          <>
            Your BMI of <strong className="text-text-primary">{bmi.toFixed(1)}</strong> reads as{" "}
            <strong className="text-text-primary">{bmiBand.label.toLowerCase()}</strong> on those thresholds, and as{" "}
            <strong className="text-text-primary">{bmiBandGeneral.label.toLowerCase()}</strong> on the
            general-population figures of 25 and 30. Both readings are of the same number, and we lead with the first
            because it is the one NICE applies to this readership.
          </>
        ) : (
          <>
            Your BMI of <strong className="text-text-primary">{bmi.toFixed(1)}</strong> reads the same way on both
            sets: <strong className="text-text-primary">{bmiBand.label.toLowerCase()}</strong> on NICE&rsquo;s
            thresholds of 23 and 27.5, and on the general-population figures of 25 and 30.
          </>
        )}
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed">
        Here is the contrast worth carrying away. NICE moves the BMI thresholds for Black African and several other
        backgrounds, and it does not move the waist-to-height boundary: the same bands apply to both sexes and all
        ethnicities, including people with high muscle mass. The number that needs adjusting for your background is the
        weaker one. NICE is open about the limits of this, and made a research recommendation in 2025 asking what
        actually works for identifying overweight, obesity and central adiposity in people from ethnic minority
        backgrounds. WHO has not endorsed waist-to-height ratio at all: its 2011 waist report said there was not enough
        data on it to give it any priority.
      </p>
    </div>
  );
}

/** What BMI cannot do. On the page for every result, because it is the point of the tool. */
function WhatBmiMisses() {
  return (
    <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
      <h3 className="text-[1.05rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        What BMI cannot tell you
      </h3>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
        BMI is your weight divided by your height squared, and nothing else goes into it. WHO&rsquo;s own technical
        report on obesity says BMI does not distinguish between weight associated with muscle and weight associated
        with fat, and does not account for the wide variation in body fat distribution. So a heavily built or very
        muscular person can read as overweight while carrying little fat, and two people with the same BMI can be
        storing very different amounts around the middle. That is the gap your waist measurement fills.
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
        The cut-points have a second limit. They were derived largely from populations of European origin. WHO&rsquo;s
        2011 report traces the waist thresholds back to two studies published in 1995, one in Glasgow and one in
        Amsterdam and Maastricht, and on sub-Saharan Africa it is blunt: only one analysis had ever reported waist
        cut-off points in Africans, and there is, in its words, insufficient evidence for recommending specific
        cut-offs for sub-Saharan Africans. IDF lists 94cm for men and 80cm for women as Europid values and tells
        sub-Saharan African populations to use the European data until specific data are available, which is a
        placeholder rather than a finding.
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed">
        African studies have not landed in the same place either. A pooled analysis of 24,181 adults across eight
        sub-Saharan African countries, Ghana not among them, put the best threshold for men near 81cm, well below the
        94cm in use, while published optima for women run from roughly 72cm to roughly 92cm depending on the population
        and on what was being predicted. No expert body has adopted any of them, and WHO has noted body-composition
        data pointing the other way, towards African populations possibly needing higher waist cut-offs rather than
        lower ones. Nobody knows, and saying so is more useful than picking a side.
      </p>
    </div>
  );
}

/** The reassuring path. Track C treats this as a deliberate non-pitch: no panel, no upsell. */
function NothingToActOn() {
  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-6">
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-text-secondary mb-1">Next step</p>
      <p className="text-[1.05rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        Nothing here needs acting on today.
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
        Every number you gave us sits inside its healthy band, on the stricter thresholds rather than the general ones,
        so we are not going to sell you a test on the back of them. Keep measuring now and again, and screen on the
        ordinary schedule for your age.
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-text-secondary leading-relaxed mb-3">
        <li>Ages 18 to 39 with no risk factors: a baseline screen, then every two to three years.</li>
        <li>Ages 40 and above: a fuller screen every one to two years.</li>
        <li>
          A family history of diabetes, high blood pressure, kidney or heart disease: earlier and more often, guided by
          a doctor.
        </li>
      </ul>
      <p className="text-[15px] text-text-secondary leading-relaxed">
        Blood pressure is the exception. It is worth checking at least once a year whatever these numbers say, because
        it is the one that gives no warning of its own.
      </p>
    </div>
  );
}

/** Part 2, shown back as logged and read against the guidance: a normal day, the last year, the short plate. */
function LifestyleSection({ lifestyle }) {
  if (!lifestyle) return null;
  const { activity, activityGuidance, weightChange, weightChangeNote, plate } = lifestyle;
  return (
    <>
      {(activity || weightChange) && (
        <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
          <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
            Part 2: a normal day and the last year
          </span>
          <h3 className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-text-primary font-heading leading-snug mb-3">
            What you told us about a normal day
          </h3>
          <LifestyleNote scoreName="BMI and waist result" />
          <ul className="divide-y divide-border border-y border-border">
            {activity && (
              <li className="py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[14px] font-semibold text-text-primary">A normal day</span>
                  <span className="text-[15px] font-extrabold text-primary font-heading text-right">{activity.label}</span>
                </div>
                {activityGuidance && (
                  <>
                    <p className="text-[13px] text-text-secondary leading-relaxed mt-1.5">{activityGuidance.text}</p>
                    <Cite>{activityGuidance.cite}</Cite>
                  </>
                )}
              </li>
            )}
            {weightChange && (
              <li className="py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[14px] font-semibold text-text-primary">Weight over the last twelve months</span>
                  <span className="text-[15px] font-extrabold text-primary font-heading text-right">
                    {weightChange.label}
                  </span>
                </div>
                {weightChangeNote && (
                  <p className="text-[13px] text-text-secondary leading-relaxed mt-1.5">{weightChangeNote}</p>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
      <PlateSummary plate={plate} scoreName="BMI and waist result" short eyebrow="Part 2: a week on your plate" />
    </>
  );
}

/** The result screen, rendered only after a successful lead submit. */
export default function BmiWaistResult({ result, tool, panel }) {
  const {
    bmi,
    bmiBand,
    bmiBandGeneral,
    sex,
    waistCm,
    waistBand,
    whtr,
    whtrBand,
    whtrApplies,
    hipCm,
    whr,
    whrBand,
    halfHeightCm,
    raised,
    lifestyle,
  } = result;

  let headline;
  if (!whtrApplies) {
    headline = `Your BMI of ${bmi.toFixed(1)} is in the ${bmiBand.label.toLowerCase()} band.`;
  } else if (whtrBand.healthy) {
    headline = "Your waist measures less than half your height.";
  } else {
    headline = "Your waist measures more than half your height.";
  }

  return (
    <div>
      <ResultCard>
        <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
          Part 1: your numbers
        </span>
        <RevealAfter delay={0.85}>
          <h2 className="text-[1.3rem] sm:text-[1.6rem] font-extrabold text-text-primary font-heading leading-tight mb-2">
            {headline}
          </h2>
          {whtrApplies && (
            <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
              Your waist is {cm(waistCm)}cm and half your height is {cm(halfHeightCm)}cm. You can redo that comparison
              any time with a tape measure and no calculator.
            </p>
          )}
        </RevealAfter>

        <ul className="divide-y divide-border border-y border-border mb-4">
          <NumberRow
            label="BMI"
            value={<CountUp value={bmi} decimals={1} />}
            band={bmiBand}
            clue={
              bmiBand.id === bmiBandGeneral.id
                ? `NICE's ${bmiBand.range} band for Black African and several other backgrounds. It reads the same way on the general-population figures of 25 and 30.`
                : `NICE's ${bmiBand.range} band for Black African and several other backgrounds. On the general-population figures of 25 and 30 it would read ${bmiBandGeneral.label.toLowerCase()}.`
            }
          />
          <NumberRow
            label="Waist"
            value={<CountUp value={waistCm} decimals={Number.isInteger(waistCm) ? 0 : 1} />}
            unit="cm"
            band={waistBand}
            clue={`WHO's cut-points for ${sex === "female" ? "women" : "men"} are ${waistBand.increased}cm and ${waistBand.substantial}cm. A clue about how much fat is stored around the organs.`}
          />
          {whtrApplies ? (
            <NumberRow
              label="Waist to height"
              value={<CountUp value={whtr} decimals={2} />}
              band={whtrBand}
              clue="NICE puts 0.4 to 0.49 in the healthy band, 0.5 to 0.59 increased and 0.6 or above high, and applies the same bands to both sexes and all ethnicities."
            />
          ) : (
            <WhtrOutOfScope />
          )}
          {whrBand && (
            <NumberRow
              label="Waist to hip"
              value={<CountUp value={whr} decimals={2} />}
              band={whrBand}
              clue={`Your ${cm(waistCm)}cm waist over your ${cm(hipCm)}cm hips, against a cut-off of ${whrBand.cut.toFixed(2)} worked out in Ghanaians.`}
            />
          )}
        </ul>

        <RevealAfter>
          {whrBand ? (
            <p className="text-[13px] text-text-secondary leading-relaxed mb-4">
              Be careful how much weight you give that last one. A case-control study of 1,221 adults in urban Ghana,
              looking at type 2 diabetes, found waist-to-hip ratio outperformed both BMI and waist circumference, and
              reported its own best values as 0.90 for men and 0.88 for women. Those are study-derived optima against
              one outcome in one sample, and no guideline body has adopted them. They are here because they are the
              only cut-off on this page derived in Ghanaians at all.
            </p>
          ) : (
            <p className="text-[13px] text-text-secondary leading-relaxed mb-4">
              You skipped the hip measurement, which is fine. It is worth coming back for, because waist-to-hip is the
              only number here whose cut-off was worked out in Ghanaians rather than borrowed from Europe.
            </p>
          )}

          <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed">
            {raised
              ? "A raised BMI or waist is a reason to look at the numbers underneath, not a diagnosis. It says something may be worth measuring properly, not that anything is wrong."
              : "These are screening measurements, not a clean bill of health. They describe your shape, which is a useful clue and needs context alongside your blood pressure and your blood results."}
          </div>
        </RevealAfter>
      </ResultCard>

      <RevealAfter delay={1.3}>
        <ShareResult spec={bmiShareSpec(result)} />

        <LifestyleSection lifestyle={lifestyle} />

        <WhyTheseThresholds bmi={bmi} bmiBand={bmiBand} bmiBandGeneral={bmiBandGeneral} />

        <WhatBmiMisses />

        {raised ? <ToolCta cta={tool.cta} panel={panel} /> : <NothingToActOn />}

        <p className="mt-4 text-[13px] text-text-secondary leading-relaxed">
          Read more:{" "}
          <Link to="/blog/preventive-health-screening-ghana" className="text-primary font-semibold">
            which tests matter and how often to screen
          </Link>{" "}
          and{" "}
          <Link to="/blog/prediabetes-warning-signs" className="text-primary font-semibold">
            the prediabetes warning window
          </Link>
          .
        </p>
      </RevealAfter>
    </div>
  );
}
