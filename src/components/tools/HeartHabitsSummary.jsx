import { Cite, LifestyleNote } from "./PlateSummary";

/** Within or outside a published range, where the guidance is a range at all. */
function StatusPill({ status }) {
  if (!status) return null;
  const within = status === "within";
  return (
    <span
      className={`inline-block text-[11px] font-bold uppercase tracking-[0.08em] rounded-pill px-2 py-0.5 ${
        within ? "bg-primary-bg text-primary" : "bg-section-alt text-text-primary"
      }`}
    >
      {within ? "Inside the guideline range" : "Outside the guideline range"}
    </span>
  );
}

/**
 * Part 2 of the heart age result: each habit as logged, read against the
 * published guidance it belongs to. Salt rows carry context rather than a
 * pass or fail, because a count of cubes or days is never turned into grams.
 */
export default function HeartHabitsSummary({ habits }) {
  if (!habits || habits.rows.length === 0) return null;

  return (
    <>
      <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
        <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
          Part 2: heart habits
        </span>
        <h3 className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-text-primary font-heading leading-snug mb-3">
          Each habit against the published guidance
        </h3>
        <LifestyleNote scoreName="heart age reading" />
        <ul className="divide-y divide-border border-y border-border">
          {habits.rows.map((r) => (
            <li key={r.id} className="py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] font-semibold text-text-primary leading-snug">{r.label}</span>
                <span className="text-[15px] font-extrabold text-primary font-heading tabular-nums shrink-0 text-right">
                  {r.value}
                </span>
              </div>
              {r.status && (
                <div className="mt-1">
                  <StatusPill status={r.status} />
                </div>
              )}
              {r.threshold && <p className="text-[13px] text-text-secondary leading-relaxed mt-1.5">{r.threshold}</p>}
              <Cite>{r.cite}</Cite>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-card border border-border bg-section-alt p-5 sm:p-6 mb-4">
        <h3 className="text-[1.05rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
          The chart cannot see these
        </h3>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-3">
          The WHO chart reads five things, your age, sex, smoking, systolic blood pressure and BMI, and then it stops.
          It has no line for salt, activity, drinks, sleep or family history, so nothing you logged in Part 2 moved
          the percentage above by a single point.
        </p>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          Ghana&rsquo;s dietary guidelines, WHO and the American Heart Association each publish guidance on these habits
          because each one affects heart risk in a way this chart cannot see, so every row above is read against that
          guidance rather than added to the chart. Most Ghanaian adults eat more salt than WHO advises, so for most
          people the salt rows are the ones with room to move.
        </p>
      </div>
    </>
  );
}
