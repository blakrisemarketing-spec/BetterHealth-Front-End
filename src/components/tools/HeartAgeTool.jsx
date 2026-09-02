import { Link } from "react-router-dom";
import {
  AGE_LABELS,
  BMI_LABELS,
  CHART_REGION,
  RISK_BANDS,
} from "../../data/tools/heart-age";
import ToolCta from "./ToolCta";

/** The five published risk bands as a meter, with this person's band picked out. */
function BandMeter({ band }) {
  return (
    <div className="mb-5">
      <div className="flex gap-1" aria-hidden="true">
        {RISK_BANDS.map((b) => (
          <div
            key={b.id}
            className={`h-2 flex-1 rounded-pill ${b.id === band.id ? "bg-primary" : "bg-section-alt"}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[11px] text-text-muted">Under 5%</span>
        <span className="text-[11px] text-text-muted">30% or above</span>
      </div>
    </div>
  );
}

function ChartLimits() {
  return (
    <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
      <h3 className="text-[1.05rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        What this chart openly misses
      </h3>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
        The models behind these charts were built on cohorts that were about two-thirds European and a quarter North
        American. No African cohort contributed to them. The Sub-Saharan African numbers come from recalibrating those
        models to regional data rather than from following people in West Africa.
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed">
        WHO also states that this version, the one without a blood test, substantially underestimates risk in people
        with diabetes, and positions it for referral rather than for treatment decisions. Its own next step for a
        reading of 10% or above is the laboratory chart, once cholesterol and glucose have been measured.
      </p>
    </div>
  );
}

/** The result screen, rendered only after a successful lead submit. */
export default function HeartAgeResult({ result, tool, panel }) {
  if (result.kind === "unknown") {
    return (
      <div>
        <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
          <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
            One number short
          </span>
          <h2 className="text-[1.4rem] sm:text-[1.8rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
            Without a systolic reading there is no cell to read.
          </h2>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
            Blood pressure is one of the four things the chart is built on, and it is the only one you cannot estimate
            from how you feel. Around one in three Ghanaian adults has high blood pressure and most of them do not know
            it, because it rarely causes any symptom until something goes wrong.
          </p>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
            Any pharmacy or clinic will take it in about two minutes. A week of readings at home gives a steadier
            figure than a single visit does, and it costs nothing once you have a cuff.
          </p>
          <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed mb-4">
            A healthy resting blood pressure is below 120/80 mmHg. Anything at or above 140/90 mmHg on two separate
            readings is classified as hypertension by WHO and the major cardiac societies.
          </div>
          <Link
            to="/guides/home-blood-pressure-guide"
            className="inline-flex items-center gap-2 text-primary font-bold no-underline hover:text-primary-dark"
          >
            Get the 7-day reading guide
          </Link>
          <p className="text-[14px] text-text-secondary leading-relaxed mt-3">
            Come back with the top number and this page will read the chart for you.
          </p>
        </div>
        <ToolCta cta={tool.cta} panel={panel} />
      </div>
    );
  }

  if (result.kind === "outOfRange") {
    return (
      <div>
        <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
          <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
            Outside the published range
          </span>
          <h2 className="text-[1.4rem] sm:text-[1.8rem] font-extrabold text-text-primary font-heading leading-tight mb-3">
            WHO publishes this chart for ages 40 to 74, so there is no cell for your age.
          </h2>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
            We could stretch the numbers to cover you. We are not going to, because a figure invented past the edge of
            a table is worse than no figure at all.
          </p>
          <p className="text-[15px] text-text-secondary leading-relaxed">
            At any age, the measurements this chart stands on are still worth having: your blood pressure, your
            weight, and then your cholesterol and blood sugar.
          </p>
        </div>
        <ToolCta cta={tool.cta} panel={panel} />
      </div>
    );
  }

  const { risk, band, drivers, heartAge, bmi, bmiIndex } = result;
  const sameAsAge = heartAge.ageKey === result.ageKey;

  return (
    <div>
      <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
        <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
          WHO chart, {CHART_REGION}
        </span>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[44px] leading-none font-extrabold text-primary font-heading tabular-nums">
            {risk}%
          </span>
          <span className="text-[15px] text-text-secondary font-heading font-bold">over 10 years</span>
        </div>
        <h2 className="text-[1.25rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading leading-tight mb-4">
          That is the {band.label} band.
        </h2>
        <BandMeter band={band} />

        <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
          Your heart age
        </p>
        {heartAge.ageKey ? (
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
            {sameAsAge ? (
              <>
                Your band is the same one a non-smoker of your sex reaches at your own age, with a systolic reading
                under 120 and a BMI of 20 to 24. On this chart, your heart age and your age agree.
              </>
            ) : (
              <>
                A non-smoker of your sex, with a systolic reading under 120 and a BMI of 20 to 24, reaches this same
                band at{" "}
                <strong className="text-text-primary">{AGE_LABELS[heartAge.ageKey]}</strong>. That is what the phrase
                heart age means here, and it is read off the same table, not worked out from a second formula.
              </>
            )}
          </p>
        ) : (
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
            Your band is higher than a non-smoker with a systolic under 120 and a BMI of 20 to 24 reaches at any age
            the chart publishes, and it stops at 74. So there is no heart age to give you: the honest answer is that
            this band is off the end of the reference column.
          </p>
        )}

        <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
          What is pushing the number up
        </p>
        {drivers.length === 0 ? (
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
            Nothing. On smoking, blood pressure and BMI you are already in the chart's healthiest column, so what is
            left is your age.
          </p>
        ) : (
          <>
            <ul className="mb-2 divide-y divide-border border-y border-border">
              {drivers.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="text-[14.5px] text-text-primary">{d.label}</span>
                  <span className="text-[15px] font-extrabold text-primary font-heading tabular-nums shrink-0">
                    +{d.points} pts
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[12.5px] text-text-muted leading-relaxed mb-4">
              Each figure is the gap in percentage points between your own cell on the chart and the cell you would sit
              in with that one factor at its healthiest published value. Both are printed numbers.
            </p>
          </>
        )}

        {bmi && (
          <p className="text-[13px] text-text-secondary mb-4">
            Your BMI works out at <strong className="text-text-primary">{bmi.toFixed(1)}</strong>, which is the chart's{" "}
            {BMI_LABELS[bmiIndex].toLowerCase()} column.
          </p>
        )}

        <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed">
          This is the 10-year risk of a fatal or non-fatal cardiovascular event for a population with your age, sex,
          smoking status, blood pressure and BMI. It is an estimate drawn from population data rather than a statement
          about you.
        </div>
      </div>

      <ChartLimits />

      <ToolCta cta={tool.cta} panel={panel} />

      <p className="mt-4 text-[13px] text-text-secondary leading-relaxed">
        Read more:{" "}
        <Link to="/blog/high-blood-pressure-silent-killer" className="text-primary font-semibold">
          why high blood pressure is called the silent killer
        </Link>{" "}
        and{" "}
        <Link to="/blog/lipid-profile-cholesterol-test" className="text-primary font-semibold">
          how to read a lipid profile
        </Link>
        .
      </p>
    </div>
  );
}
