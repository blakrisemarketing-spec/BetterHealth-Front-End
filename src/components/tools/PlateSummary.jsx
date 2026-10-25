import { FREQUENCY, GUIDELINE_STAPLE_FRACTION, MAX_TIMES, timesLabel } from "../../data/tools/plate";
import { lifestyleNote } from "../../data/tools/lifestyle";
import { PlateGraphic, Segmented, WeekStrip } from "./PlateBuilder";

/** A study citation in short form under a line of guidance. */
export function Cite({ children }) {
  if (!children) return null;
  return <p className="text-[11.5px] text-text-muted leading-snug mt-1">Source: {children}</p>;
}

/** The one plain sentence every Part 2 section carries. */
export function LifestyleNote({ scoreName }) {
  return (
    <p className="text-[13px] text-text-secondary leading-relaxed mb-4 rounded-card bg-section-alt px-3.5 py-2.5">
      {lifestyleNote(scoreName)}
    </p>
  );
}

function Label({ children }) {
  return <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-1.5">{children}</p>;
}

/**
 * "Your week on a plate", shown back as logged, then read against Ghana's
 * guidelines with a sourced swap for each food logged. `short` is the BMI
 * tool's form: starchy meals, plate proportion and sugary drinks only, and it
 * leaves out the blood-sugar accompaniment line, which belongs to the
 * diabetes tool.
 */
export default function PlateSummary({ plate, scoreName, short = false, eyebrow = "Part 2: your week on a plate" }) {
  if (!plate) return null;
  const plus = (atLeast) => (atLeast ? "+" : "");
  const guidance = short ? (plate.guidance || []).filter((g) => g.id !== "accompaniment") : plate.guidance || [];

  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
      <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">{eyebrow}</span>
      <h3 className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-text-primary font-heading leading-snug mb-3">
        What a week looks like on your plate
      </h3>
      <LifestyleNote scoreName={scoreName} />

      <div className="mb-5">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[38px] leading-none font-extrabold text-primary font-heading tabular-nums">
            {plate.starchyPerWeek}
            {plus(plate.starchyAtLeast)}
          </span>
          <span className="text-[14px] text-text-secondary leading-snug">
            starchy meals a week{plate.starchyAtLeast ? ", at least" : ""}
            {plate.starchyPerWeek > 0 ? `, about ${plate.starchyPerDay} a day` : ""}
          </span>
        </div>
        <WeekStrip total={plate.starchyPerWeek} />
      </div>

      {plate.foods.length > 0 && (
        <div className="mb-5">
          <Label>What you logged most</Label>
          <ul className="space-y-1.5">
            {plate.foods.slice(0, 6).map((f) => (
              <li key={f.code}>
                <div className="flex items-center gap-2">
                  <span className="w-[44%] text-[13.5px] text-text-primary truncate">{f.label}</span>
                  <span className="flex-1 h-2 rounded-pill bg-section-alt overflow-hidden" aria-hidden="true">
                    <span
                      className="block h-2 rounded-pill bg-primary"
                      style={{ width: `${(f.times / MAX_TIMES) * 100}%` }}
                    />
                  </span>
                  <span className="w-9 text-right text-[13px] font-extrabold text-primary tabular-nums font-heading">
                    {timesLabel(f.times)}&times;
                  </span>
                </div>
                {f.serving && (
                  <p className="text-[11.5px] text-text-muted leading-snug">Guideline serving: {f.serving}</p>
                )}
              </li>
            ))}
          </ul>
          {plate.foods.length > 6 && (
            <p className="text-[12px] text-text-muted mt-1.5">
              and {plate.foods.length - 6} more you logged less often
            </p>
          )}
        </div>
      )}

      {plate.proportion && (
        <div className="mb-5">
          <Label>Starch on a typical plate or bowl</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-card bg-section-alt p-3">
              <PlateGraphic fraction={plate.proportion.fraction} size={56} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-text-secondary">Yours</p>
                <p className="text-[14px] font-bold text-text-primary font-heading leading-tight">
                  {plate.proportion.label}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-card bg-section-alt p-3">
              <PlateGraphic fraction={GUIDELINE_STAPLE_FRACTION} size={56} tone="accent" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-text-secondary">Ghana's guideline bowl</p>
                <p className="text-[14px] font-bold text-text-primary font-heading leading-tight">A little under half</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!short && (plate.veg || plate.protein) && (
        <div className="mb-5 space-y-3">
          {plate.veg && (
            <div>
              <Label>Vegetables with a meal</Label>
              <Segmented options={FREQUENCY} value={plate.veg.value} readOnly />
            </div>
          )}
          {plate.protein && (
            <div>
              <Label>Protein with a meal</Label>
              <Segmented options={FREQUENCY} value={plate.protein.value} readOnly />
              {plate.proteins.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {plate.proteins.map((p) => (
                    <span
                      key={p.value}
                      className="text-[12px] font-bold rounded-pill bg-primary-bg text-text-primary px-2.5 py-1"
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={short && plate.fried === null ? "" : "mb-5"}>
        <Label>Sugary drinks</Label>
        <p className="text-[15px] text-text-primary leading-snug">
          <strong className="font-extrabold text-primary font-heading tabular-nums text-[20px]">
            {plate.drinksPerWeek}
            {plus(plate.drinksAtLeast)}
          </strong>{" "}
          a week{plate.drinksAtLeast ? ", at least" : ""}
        </p>
        {plate.drinks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {plate.drinks.map((d) => (
              <span key={d.code} className="text-[12px] font-bold rounded-pill bg-section-alt text-text-primary px-2.5 py-1">
                {d.label} {timesLabel(d.times)}&times;
              </span>
            ))}
          </div>
        )}
      </div>

      {!short && plate.fried !== null && (
        <div>
          <Label>Fried food</Label>
          <p className="text-[15px] text-text-primary leading-snug">
            <strong className="font-extrabold text-primary font-heading tabular-nums text-[20px]">
              {timesLabel(plate.fried)}
            </strong>{" "}
            meals a week
          </p>
        </div>
      )}

      {guidance.length > 0 && (
        <div className="mt-5 pt-5 border-t border-border">
          <Label>Read against Ghana's guidelines</Label>
          <ul className="space-y-3">
            {guidance.map((g) => (
              <li key={g.id}>
                <p className="text-[14px] text-text-primary leading-relaxed">{g.text}</p>
                <Cite>{g.cite}</Cite>
              </li>
            ))}
          </ul>
        </div>
      )}

      {plate.swaps && plate.swaps.length > 0 && (
        <div className="mt-5 pt-5 border-t border-border">
          <Label>What would move it</Label>
          <p className="text-[13px] text-text-secondary leading-relaxed mb-3">
            One line for each food you logged, most often first. Most of the Ghanaian studies behind these tested ten
            people each, so read them as a direction, not a precise figure. Where no Ghanaian study has measured a food, the
            line says so.
          </p>
          <ul className="space-y-3">
            {plate.swaps.map((s) => (
              <li key={s.code} className="rounded-card border-l-4 border-primary bg-primary-bg px-3.5 py-2.5">
                <p className="text-[13px] font-bold text-text-primary font-heading mb-0.5">
                  {s.label} <span className="text-primary tabular-nums">{timesLabel(s.times)}&times; a week</span>
                </p>
                <p className="text-[14px] text-text-primary leading-relaxed">{s.text}</p>
                <Cite>{s.cite}</Cite>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
