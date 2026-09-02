import { Link } from "react-router-dom";
import { RISK_BANDS } from "../../data/tools/diabetes-risk";
import ToolCta from "./ToolCta";

/** The five FINDRISC bands as a meter, with this person's band picked out. */
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
        <span className="text-[11px] text-text-muted">Low</span>
        <span className="text-[11px] text-text-muted">Very high</span>
      </div>
    </div>
  );
}

/** The result screen, rendered only after a successful lead submit. */
export default function DiabetesRiskResult({ result, tool, panel }) {
  const { score, band, bmi, topItems } = result;
  const movable = topItems.filter((i) => i.movable);

  return (
    <div>
      <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
        <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
          FINDRISC score
        </span>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[44px] leading-none font-extrabold text-primary font-heading tabular-nums">
            {score}
          </span>
          <span className="text-[16px] text-text-secondary font-heading font-bold">out of 26</span>
        </div>
        <h2 className="text-[1.3rem] sm:text-[1.6rem] font-extrabold text-text-primary font-heading leading-tight mb-4">
          {band.headline}
        </h2>
        <BandMeter band={band} />

        <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">
          What is carrying the most weight
        </p>
        {topItems.length === 0 ? (
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
            Nothing you answered scored a point. That is as low as this questionnaire goes.
          </p>
        ) : (
          <ul className="mb-4 divide-y divide-border border-y border-border">
            {topItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-[14.5px] text-text-primary">
                  {item.label}
                  {!item.movable && (
                    <span className="block text-[12px] text-text-muted">Not something you can change</span>
                  )}
                </span>
                <span className="text-[15px] font-extrabold text-primary font-heading tabular-nums shrink-0">
                  +{item.points}
                </span>
              </li>
            ))}
          </ul>
        )}
        {bmi && (
          <p className="text-[13px] text-text-secondary mb-4">
            Your BMI works out at <strong className="text-text-primary">{bmi.toFixed(1)}</strong>.
          </p>
        )}

        {movable.length > 0 && (
          <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed">
            {movable.length === 1
              ? `Of those, ${movable[0].label.toLowerCase()} is the one that can move.`
              : `Of those, ${movable.map((i) => i.label.toLowerCase()).join(" and ")} are the ones that can move.`}{" "}
            In the Diabetes Prevention Program, losing 5 to 7% of body weight and walking 150 minutes a week cut the
            risk of progressing to type 2 diabetes by 58%.
          </div>
        )}
      </div>

      <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
        <h3 className="text-[1.05rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
          Where this score is weakest
        </h3>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          FINDRISC was developed and validated in Finland, and it performs less consistently outside the populations it
          was built on. Nobody has recalibrated it for Ghana. Read your score as a prompt to test rather than as an
          answer about your blood sugar.
        </p>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          The test that settles it is HbA1c, your average blood sugar over the past two to three months. Normal is
          below 5.7%, prediabetes is 5.7% to 6.4%, and 6.5% or above is in the diabetes range, usually confirmed on a
          second test. One caveat for Ghana: around one in four Ghanaians carries the sickle cell trait, which can make
          HbA1c read falsely high or low, and a clinician familiar with your blood picture will say whether a fasting
          glucose suits you better.
        </p>
      </div>

      <ToolCta cta={tool.cta} panel={panel} />

      <p className="mt-4 text-[13px] text-text-secondary leading-relaxed">
        Read more:{" "}
        <Link to="/blog/hba1c-explained" className="text-primary font-semibold">
          what HbA1c actually measures
        </Link>{" "}
        and{" "}
        <Link to="/blog/prediabetes-warning-signs" className="text-primary font-semibold">
          the prediabetes warning window
        </Link>
        .
      </p>
    </div>
  );
}
