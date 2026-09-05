import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { CounterControl, CounterRows, FoodTiles, MultiPick, PlatePicker, ScaleRows, WeekStrip } from "./PlateBuilder";
import { countTotal, timesLabel } from "../../data/tools/plate";
import { cubesLabel } from "../../data/tools/heart-habits";

/**
 * One question per screen, in one or more parts.
 *
 * Props: either `steps` (one part) or `parts: [{ id, number, title, intro?,
 * steps }]`. Part 1 is the validated instrument and its steps are untouched;
 * later parts open with a chapter screen ("Part 2: your week on a plate") so
 * the extra questions read as added value. Values are one flat map keyed by
 * step id, handed to `onFinish(values)` after the last step.
 *
 * Step shapes (src/data/tools/*.js):
 *   { kind: "choice", id, text, help?, layout?: "grid", options: [{ value, label, hint?, points? }] }
 *   { kind: "number", id, text, help?, field, choice?, unknownLabel?, unknownNote?, unknownLink? }
 *   { kind: "measurements", id, text, help?, fields: [field, field] }
 *   { kind: "tiles", id, text, help?, foods, groups }          value: { code: n }
 *   { kind: "plate", id, text, help?, options }                value: option.value
 *   { kind: "scales", id, text, help?, rows, options }         value: { rowId: option.value }
 *   { kind: "multi", id, text, help?, options }                value: [option.value]
 *   { kind: "counters", id, text, help?, options }             value: { code: n }
 *   { kind: "counter", id, text, help?, unit, max }            value: n
 * Any step may carry `feedback(value, values)`, a one-line observation shown
 * above the next question, and `skipIf(values)` to drop out of the flow.
 */

function buildScreens(parts) {
  const screens = [];
  parts.forEach((part, i) => {
    if (i > 0) screens.push({ kind: "chapter", part });
    part.steps.forEach((step) => screens.push({ kind: "step", step, part }));
  });
  return screens;
}

const stepSkipped = (step, values) => typeof step.skipIf === "function" && Boolean(step.skipIf(values));

// A chapter screen goes with its part: when every question in a part has
// skipped out, the part is not in this run at all and its chapter screen would
// announce nothing. That is what makes a set of parts selectable rather than fixed.
const isSkipped = (screen, values) =>
  screen.kind === "chapter"
    ? screen.part.steps.every((s) => stepSkipped(s, values))
    : screen.kind === "step" && stepSkipped(screen.step, values);

const visibleSteps = (part, values) => part.steps.filter((s) => !stepSkipped(s, values));

const CONTINUE_KINDS = new Set(["tiles", "scales", "multi", "counters", "counter"]);

const optionClass = (active) =>
  `w-full text-left rounded-btn border px-4 py-3.5 text-[15px] font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[52px] ${
    active ? "border-primary bg-primary-bg text-text-primary" : "border-border bg-section-alt text-text-primary hover:border-primary/50"
  }`;

const continueClass =
  "mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading cursor-pointer transition-all";

export default function Stepper({ steps, parts, onFinish, initialValues }) {
  const partList = useMemo(() => parts || [{ id: "main", number: 1, steps }], [parts, steps]);
  const screens = useMemo(() => buildScreens(partList), [partList]);
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [values, setValues] = useState(() => ({ ...(initialValues || {}) }));
  const [error, setError] = useState("");
  const [note, setNote] = useState(null);

  const questions = screens.filter((s) => s.kind === "step" && !isSkipped(s, values));
  const total = questions.length;
  const current = screens[index];

  // Parts numbered by what this run actually shows, so a flow whose parts are
  // chosen by an earlier answer never says "Part 5 of 5" after three of them.
  const shownParts = partList.filter((p) => visibleSteps(p, values).length > 0);
  const multiPart = shownParts.length > 1;
  const partNumber = (part) => shownParts.indexOf(part) + 1;
  const step = current.kind === "step" ? current.step : null;
  const answeredBefore = questions.filter((s) => screens.indexOf(s) < index).length;
  const number = step ? answeredBefore + 1 : answeredBefore;
  const progress = total > 0 ? Math.min(1, (step ? number : answeredBefore) / total) : 0;

  const move = (from, vals, dir) => {
    let i = from + dir;
    while (i >= 0 && i < screens.length && isSkipped(screens[i], vals)) i += dir;
    return i;
  };

  const advance = (next) => {
    setError("");
    setValues(next);
    const text = step && typeof step.feedback === "function" ? step.feedback(next[step.id], next) : "";
    setNote(text ? { text, key: `${step.id}-${index}` } : null);
    const i = move(index, next, 1);
    if (i >= screens.length) onFinish(next);
    else setIndex(i);
  };

  const back = () => {
    setError("");
    setNote(null);
    setIndex(Math.max(0, move(index, values, -1)));
  };

  const set = (id, v) => setValues((prev) => ({ ...prev, [id]: v }));
  const chooseOption = (value) => advance({ ...values, [step.id]: value });

  const numberFields = step?.kind === "measurements" ? step.fields : step?.field ? [step.field] : [];

  const submitNumbers = (e) => {
    e.preventDefault();
    const next = { ...values };
    if (step.choice && !values[step.choice.id]) {
      setError(`${step.choice.label} Pick one to carry on.`);
      return;
    }
    for (const f of numberFields) {
      const raw = String(values[f.id] ?? "").trim();
      const n = Number(raw);
      if (!raw || Number.isNaN(n) || n < f.min || n > f.max) {
        setError(`Enter a ${f.label.toLowerCase()} between ${f.min} and ${f.max} ${f.unit}.`);
        return;
      }
      next[f.id] = n;
    }
    advance(next);
  };

  const submitContinue = () => {
    const v = values[step.id];
    if (step.kind === "scales") {
      const missing = step.rows.filter((r) => !v || !v[r.id]);
      if (missing.length > 0) {
        setError(`Pick an answer for ${missing.map((r) => r.label.toLowerCase()).join(" and ")} to carry on.`);
        return;
      }
    }
    if (step.kind === "multi" && step.min > 0 && (!Array.isArray(v) || v.length < step.min)) {
      setError(step.min === 1 ? "Pick at least one to carry on." : `Pick at least ${step.min} to carry on.`);
      return;
    }
    const next = { ...values };
    if (step.kind === "counter") next[step.id] = Number(v) || 0;
    else if (step.kind === "multi") next[step.id] = Array.isArray(v) ? v : [];
    else if (step.kind === "tiles" || step.kind === "counters") next[step.id] = v || {};
    advance(next);
  };

  const setField = (id) => (e) => setValues((v) => ({ ...v, [id]: e.target.value }));

  const inputClass =
    "w-full rounded-btn px-4 py-3.5 text-[16px] bg-section-alt border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary";

  const header = (
    <>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-bold text-primary uppercase tracking-[0.12em]">
          {multiPart && current.part ? `Part ${partNumber(current.part)} · ` : ""}
          {step ? `Question ${number} of ${total}` : `${answeredBefore} of ${total} answered`}
        </span>
        {index > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-text-secondary hover:text-text-primary cursor-pointer bg-transparent border-0"
          >
            <ArrowLeft size={14} /> Back
          </button>
        ) : (
          <span />
        )}
      </div>

      <div
        className="h-1.5 w-full rounded-pill bg-section-alt mb-5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={step ? number : answeredBefore}
      >
        <div className="h-1.5 rounded-pill bg-primary transition-all duration-300" style={{ width: `${progress * 100}%` }} />
      </div>
    </>
  );

  // Chapter screen: announces the next part before its first question.
  if (current.kind === "chapter") {
    const part = current.part;
    const previous = shownParts[shownParts.indexOf(part) - 1];
    const count = visibleSteps(part, values).length;
    return (
      <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7">
        {header}
        <motion.div
          key={`chapter-${part.id}`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {previous && (
            <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary mb-3">
              <Check size={14} className="text-primary" /> Part {partNumber(previous)} done: {previous.title.toLowerCase()}
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
            <Sparkles size={13} /> Part {partNumber(part)} of {shownParts.length}
          </span>
          <h2 className="text-[1.4rem] sm:text-[1.7rem] font-extrabold text-text-primary font-heading leading-tight mb-2">
            {part.title}
          </h2>
          {part.intro && <p className="text-[14.5px] text-text-secondary leading-relaxed mb-3">{part.intro}</p>}
          <p className="text-[13px] text-text-muted mb-1">
            {count === 1 ? "One quick question" : `${count} quick questions`}. Taps only, no typing.
          </p>
          <button type="button" onClick={() => setIndex(move(index, values, 1))} className={continueClass}>
            Start part {partNumber(part)} <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  const value = values[step.id];

  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7">
      {header}

      {note && (
        <motion.div
          key={note.key}
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex items-start gap-2 rounded-card border-l-4 border-primary bg-primary-bg px-3.5 py-2.5 text-[13.5px] text-text-primary leading-snug"
          role="status"
        >
          <Sparkles size={15} className="text-primary shrink-0 mt-[2px]" />
          <span>{note.text}</span>
        </motion.div>
      )}

      <motion.div
        key={`step-${index}`}
        initial={reduce ? false : { opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h2 className="text-[1.2rem] sm:text-[1.4rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
          {step.text}
        </h2>
        {step.help && <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{step.help}</p>}

        {step.kind === "choice" && (
          <div
            className={step.layout === "grid" ? "grid grid-cols-2 gap-2.5" : "flex flex-col gap-2.5"}
            role="group"
            aria-label={step.text}
          >
            {step.options.map((opt) => {
              const active = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => chooseOption(opt.value)}
                  aria-pressed={active}
                  className={optionClass(active)}
                >
                  <span>
                    {opt.label}
                    {opt.hint && <span className="block text-[12px] font-normal text-text-secondary leading-snug mt-0.5">{opt.hint}</span>}
                  </span>
                  {active && <Check size={18} className="text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {step.kind === "plate" && <PlatePicker options={step.options} value={value} onChange={chooseOption} />}

        {step.kind === "tiles" && (
          <div>
            <div className="rounded-card bg-section-alt p-3.5 mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[30px] leading-none font-extrabold text-primary font-heading tabular-nums" aria-live="polite">
                  {countTotal(value)}
                </span>
                <span className="text-[13px] text-text-secondary">starchy meals this week</span>
              </div>
              <WeekStrip total={countTotal(value)} />
              <p className="text-[12.5px] text-text-secondary leading-snug mt-2.5" aria-live="polite">
                {step.feedback ? step.feedback(value || {}, values) : ""}
              </p>
            </div>
            <FoodTiles foods={step.foods} groups={step.groups} value={value || {}} onChange={(v) => set(step.id, v)} />
            {step.note && <p className="text-[12px] text-text-muted leading-relaxed mt-4">{step.note}</p>}
          </div>
        )}

        {step.kind === "scales" && (
          <ScaleRows rows={step.rows} options={step.options} value={value || {}} onChange={(v) => set(step.id, v)} />
        )}

        {step.kind === "multi" && (
          <MultiPick
            name={step.text}
            layout={step.layout}
            options={step.options}
            value={value || []}
            onChange={(v) => set(step.id, v)}
          />
        )}

        {step.kind === "counters" && (
          <div>
            <p className="text-[13px] text-text-secondary mb-2" aria-live="polite">
              <strong className="text-text-primary font-extrabold text-[16px] font-heading tabular-nums">
                {countTotal(value)}
              </strong>{" "}
              a week so far
            </p>
            <CounterRows options={step.options} value={value || {}} onChange={(v) => set(step.id, v)} />
          </div>
        )}

        {step.kind === "counter" && (
          <div className="flex flex-col items-center py-3">
            <CounterControl
              large
              value={value || 0}
              max={step.max}
              label={step.text}
              format={step.max === 5 ? cubesLabel : timesLabel}
              onChange={(n) => set(step.id, n)}
            />
            {step.unit && <p className="text-[13px] text-text-secondary mt-2">{step.unit}</p>}
          </div>
        )}

        {CONTINUE_KINDS.has(step.kind) && (
          <>
            {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
            <button type="button" onClick={submitContinue} className={continueClass}>
              Continue <ArrowRight size={16} />
            </button>
          </>
        )}

        {(step.kind === "number" || step.kind === "measurements") && (
          <form onSubmit={submitNumbers} noValidate>
            {step.choice && (
              <fieldset className="border-0 p-0 m-0 mb-4">
                <legend className="block text-[13px] font-semibold mb-1.5 text-text-primary">{step.choice.label}</legend>
                {step.choice.help && (
                  <p className="text-[12.5px] text-text-secondary leading-snug mb-2">{step.choice.help}</p>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {step.choice.options.map((opt) => {
                    const active = values[step.choice.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setValues((v) => ({ ...v, [step.choice.id]: opt.value }))}
                        aria-pressed={active}
                        className={`rounded-btn border px-3 py-3 text-[15px] font-semibold transition-all cursor-pointer min-h-[48px] flex items-center justify-center gap-2 ${
                          active
                            ? "border-primary bg-primary-bg text-text-primary"
                            : "border-border bg-section-alt text-text-primary hover:border-primary/50"
                        }`}
                      >
                        {opt.label}
                        {active && <Check size={16} className="text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}
            <div className={step.kind === "measurements" ? "grid grid-cols-2 gap-3" : ""}>
              {numberFields.map((f) => (
                <div key={f.id}>
                  <label className="block text-[13px] font-semibold mb-1.5 text-text-primary" htmlFor={`step-${f.id}`}>
                    {f.label} ({f.unit})
                  </label>
                  <input
                    id={`step-${f.id}`}
                    type="number"
                    inputMode="numeric"
                    min={f.min}
                    max={f.max}
                    step="1"
                    placeholder={f.placeholder}
                    value={values[f.id] ?? ""}
                    onChange={setField(f.id)}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
            {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
            <button type="submit" className={continueClass}>
              Continue <ArrowRight size={16} />
            </button>

            {step.unknownLabel && (
              <div className="mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => advance({ ...values, [step.field.id]: "unknown" })}
                  className="text-[14px] text-primary font-bold underline bg-transparent border-0 cursor-pointer p-0"
                >
                  {step.unknownLabel}
                </button>
                {step.unknownNote && (
                  <p className="mt-2 text-[13px] text-text-secondary leading-relaxed">
                    {step.unknownNote}{" "}
                    {step.unknownLink && (
                      <Link to={step.unknownLink.to} className="text-primary font-semibold">
                        {step.unknownLink.label}
                      </Link>
                    )}
                  </p>
                )}
              </div>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
}
