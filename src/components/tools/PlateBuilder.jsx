import { Check, Minus, Plus } from "lucide-react";
import { MAX_TIMES, timesLabel } from "../../data/tools/plate";

/**
 * The tap-only widgets behind "Your week on a plate" and "Heart habits".
 * Every one of them is a controlled input: the Stepper owns the value and
 * hands it back on Continue. Nothing here scores anything; see
 * src/data/tools/plate.js for the rule.
 */

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/**
 * Seven day columns with `rows` slots each. Slots fill one-per-day first, so
 * the strip reads as meals a day: one full row is one a day, two rows is two.
 * Responds to every tap because `total` is the live counter sum.
 */
export function WeekStrip({ total, rows = 4 }) {
  const capacity = 7 * rows;
  const filled = Math.min(total, capacity);
  return (
    <div aria-hidden="true">
      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map((d, day) => (
          <div key={day} className="flex flex-col-reverse gap-1">
            {Array.from({ length: rows }, (_, row) => {
              const on = row * 7 + day < filled;
              return (
                <div
                  key={row}
                  className={`h-2.5 rounded-pill transition-colors duration-300 ${on ? "bg-primary" : "bg-section-alt"}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5 mt-1">
        {DAYS.map((d, i) => (
          <span key={i} className="text-center text-[10px] font-bold text-text-muted">
            {d}
          </span>
        ))}
      </div>
      {total > capacity && (
        <p className="text-[11px] text-text-muted mt-1">The strip holds {capacity}; you logged {total}.</p>
      )}
    </div>
  );
}

/** The food grid. Tap a tile to add one; the small minus takes one away. */
export function FoodTiles({ foods, groups, value = {}, onChange, max = MAX_TIMES }) {
  const bump = (code) => {
    const n = value[code] || 0;
    if (n >= max) return;
    onChange({ ...value, [code]: n + 1 });
  };
  const drop = (code) => {
    const n = value[code] || 0;
    if (n <= 0) return;
    const next = { ...value, [code]: n - 1 };
    if (next[code] === 0) delete next[code];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div key={g.id}>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary mb-1.5">{g.label}</p>
          <div className="grid grid-cols-3 gap-2">
            {foods
              .filter((f) => f.group === g.id)
              .map((f) => {
                const n = value[f.code] || 0;
                const capped = n >= max;
                return (
                  <div key={f.code} className="relative">
                    <button
                      type="button"
                      onClick={() => bump(f.code)}
                      aria-label={`${f.label}: ${timesLabel(n)} a week. Tap to add one.`}
                      className={`w-full h-full min-h-[74px] rounded-card border px-2.5 py-2 text-left flex flex-col justify-between gap-1.5 transition-all cursor-pointer select-none active:scale-[0.96] ${
                        n > 0
                          ? "border-primary bg-primary-bg"
                          : "border-border bg-section-alt hover:border-primary/50"
                      }`}
                    >
                      <span className="text-[12.5px] font-bold text-text-primary leading-tight pr-4">{f.label}</span>
                      <span
                        className={`self-end inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-pill text-[13px] font-extrabold tabular-nums font-heading transition-all ${
                          n > 0 ? "bg-primary text-white" : "bg-card text-text-muted border border-border"
                        } ${capped ? "ring-2 ring-primary/30" : ""}`}
                      >
                        {n > 0 ? timesLabel(n) : <Plus size={14} />}
                      </span>
                    </button>
                    {n > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          drop(f.code);
                        }}
                        aria-label={`${f.label}: take one away`}
                        className="absolute top-1 right-1 w-6 h-6 rounded-pill bg-card border border-border text-text-secondary flex items-center justify-center cursor-pointer hover:border-primary hover:text-primary"
                      >
                        <Minus size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

function wedgePath(cx, cy, r, fraction) {
  const f = Math.max(0, Math.min(fraction, 0.9999));
  const a = f * 2 * Math.PI;
  const x = cx + r * Math.sin(a);
  const y = cy - r * Math.cos(a);
  const large = f > 0.5 ? 1 : 0;
  return `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${large} 1 ${x} ${y} Z`;
}

/**
 * A mashing bowl (asanka) seen from above, with the starch share shaded.
 * Ghana's own dietary guidelines picture the day's food in one, which is why
 * the graphic is a bowl with an earthenware rim rather than a plate.
 */
export function PlateGraphic({ fraction, size = 96, tone = "primary" }) {
  const fill = tone === "accent" ? "#B9883A" : "#6B8E7F";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" className="shrink-0">
      <circle cx="50" cy="50" r="48" fill="#E9CE97" stroke="#B9883A" strokeWidth="2" />
      <circle cx="50" cy="50" r="41" fill="#F5F3EE" stroke="#D4A24E" strokeWidth="1" />
      <path d={wedgePath(50, 50, 40, fraction)} fill={fill} opacity="0.9" />
      <circle cx="50" cy="50" r="2" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

/** Four plates to tap. Tapping one records it and the Stepper moves on. */
export function PlatePicker({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3" role="group" aria-label="How much of the plate is starch">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`rounded-card border p-3 flex flex-col items-center gap-2 cursor-pointer transition-all active:scale-[0.97] ${
              active ? "border-primary bg-primary-bg" : "border-border bg-section-alt hover:border-primary/50"
            }`}
          >
            <PlateGraphic fraction={o.fraction} size={84} />
            <span className="text-[14px] font-bold text-text-primary font-heading inline-flex items-center gap-1.5">
              {o.label}
              {active && <Check size={15} className="text-primary" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** A segmented row of short options. `readOnly` renders it as a display. */
export function Segmented({ options, value, onChange, readOnly = false, name }) {
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      role={readOnly ? undefined : "group"}
      aria-label={name}
    >
      {options.map((o) => {
        const active = value === o.value;
        const cls = `rounded-btn border px-1 py-2.5 text-[12.5px] font-bold text-center leading-tight transition-all ${
          active
            ? "border-primary bg-primary text-white"
            : readOnly
              ? "border-border bg-section-alt text-text-muted"
              : "border-border bg-section-alt text-text-primary hover:border-primary/50 cursor-pointer"
        }`;
        if (readOnly) {
          return (
            <span key={o.value} className={cls} aria-current={active ? "true" : undefined}>
              {o.short || o.label}
            </span>
          );
        }
        return (
          <button key={o.value} type="button" onClick={() => onChange(o.value)} aria-pressed={active} className={cls}>
            {o.short || o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Several labelled rows, each a segmented scale, on one screen. */
export function ScaleRows({ rows, options, value = {}, onChange }) {
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <fieldset key={row.id} className="border-0 p-0 m-0">
          <legend className="text-[14.5px] font-bold text-text-primary font-heading mb-0.5">{row.label}</legend>
          {row.hint && <p className="text-[12px] text-text-secondary leading-snug mb-1.5">{row.hint}</p>}
          <Segmented
            name={row.label}
            options={options}
            value={value[row.id]}
            onChange={(v) => onChange({ ...value, [row.id]: v })}
          />
        </fieldset>
      ))}
    </div>
  );
}

/** Pick any number of chips. */
export function MultiPick({ options, value = [], onChange, name }) {
  const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={name}>
      {options.map((o) => {
        const active = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 rounded-pill border px-4 py-2.5 text-[14px] font-bold transition-all cursor-pointer min-h-[44px] active:scale-[0.97] ${
              active
                ? "border-primary bg-primary text-white"
                : "border-border bg-section-alt text-text-primary hover:border-primary/50"
            }`}
          >
            {o.label}
            {active && <Check size={14} />}
          </button>
        );
      })}
    </div>
  );
}

/** The minus / count / plus control shared by the counters below. */
export function CounterControl({ value = 0, onChange, max = MAX_TIMES, min = 0, format = timesLabel, label, large = false }) {
  const n = Number(value) || 0;
  const btn = `rounded-pill border flex items-center justify-center cursor-pointer transition-all active:scale-[0.94] ${
    large ? "w-14 h-14" : "w-10 h-10"
  }`;
  return (
    <div className={`inline-flex items-center ${large ? "gap-5" : "gap-2.5"}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, n - 1))}
        disabled={n <= min}
        aria-label={`${label}: take one away`}
        className={`${btn} ${n <= min ? "border-border bg-section-alt text-text-muted cursor-not-allowed" : "border-border bg-card text-text-primary hover:border-primary hover:text-primary"}`}
      >
        <Minus size={large ? 22 : 16} />
      </button>
      <span
        className={`tabular-nums font-extrabold font-heading text-center ${large ? "text-[44px] min-w-[72px] text-primary" : "text-[18px] min-w-[36px] text-text-primary"}`}
        aria-live="polite"
      >
        {format(n)}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, n + 1))}
        disabled={n >= max}
        aria-label={`${label}: add one`}
        className={`${btn} ${n >= max ? "border-border bg-section-alt text-text-muted cursor-not-allowed" : "border-primary bg-primary text-white hover:bg-primary-dark"}`}
      >
        <Plus size={large ? 22 : 16} />
      </button>
    </div>
  );
}

/** A list of labelled counters, one per row. Value is { code: n }. */
export function CounterRows({ options, value = {}, onChange, max = MAX_TIMES }) {
  const set = (code, n) => {
    const next = { ...value, [code]: n };
    if (n === 0) delete next[code];
    onChange(next);
  };
  return (
    <ul className="divide-y divide-border border-y border-border">
      {options.map((o) => (
        <li key={o.code} className="flex items-center justify-between gap-3 py-2.5">
          <span className="text-[14px] font-semibold text-text-primary leading-snug">{o.label}</span>
          <CounterControl value={value[o.code] || 0} onChange={(n) => set(o.code, n)} max={max} label={o.label} />
        </li>
      ))}
    </ul>
  );
}
