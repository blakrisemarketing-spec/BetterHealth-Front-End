import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

/**
 * One question per screen, for the tools with more than four questions.
 * Follows components/guides/Quiz.jsx: tapping an option records it and moves
 * on, Back returns with the previous choice still highlighted, and the last
 * step calls `onFinish(values)`.
 *
 * Step shapes (from src/data/tools/<slug>.js):
 *   { kind: "choice", id, text, help?, options: [{ value, label, points }] }
 *   { kind: "number", id, text, help?, field: { id, label, unit, min, max, placeholder },
 *     choice?: { id, label, help?, options: [{ value, label }] },
 *     unknownLabel?, unknownNote?, unknownLink?: { to, label } }
 *   { kind: "measurements", id, text, help?, fields: [field, field] }
 *
 * `choice` on a number step is a selector that shares the screen with the input,
 * for a question that only changes how the number is read rather than adding a
 * score of its own (the FINDRISC waist cut-off is the case this exists for).
 */
export default function Stepper({ steps, onFinish }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [error, setError] = useState("");

  const total = steps.length;
  const current = steps[step];

  const advance = (next) => {
    setError("");
    if (step < total - 1) {
      setValues(next);
      setStep(step + 1);
    } else {
      setValues(next);
      onFinish(next);
    }
  };

  const chooseOption = (value) => advance({ ...values, [current.id]: value });

  const numberFields = current.kind === "measurements" ? current.fields : current.field ? [current.field] : [];

  const submitNumbers = (e) => {
    e.preventDefault();
    const next = { ...values };
    if (current.choice && !values[current.choice.id]) {
      setError(`${current.choice.label} Pick one to carry on.`);
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

  const setField = (id) => (e) => setValues((v) => ({ ...v, [id]: e.target.value }));

  const inputClass =
    "w-full rounded-btn px-4 py-3.5 text-[16px] bg-section-alt border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-bold text-primary uppercase tracking-[0.12em]">
          Question {step + 1} of {total}
        </span>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep(step - 1);
            }}
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-text-secondary hover:text-text-primary cursor-pointer bg-transparent border-0"
          >
            <ArrowLeft size={14} /> Back
          </button>
        ) : (
          <span />
        )}
      </div>

      <div className="h-1.5 w-full rounded-pill bg-section-alt mb-5" aria-hidden="true">
        <div
          className="h-1.5 rounded-pill bg-primary transition-all"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
        {current.text}
      </h2>
      {current.help && (
        <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{current.help}</p>
      )}

      {current.kind === "choice" && (
        <div className="flex flex-col gap-2.5" role="group" aria-label={current.text}>
          {current.options.map((opt) => {
            const active = values[current.id] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => chooseOption(opt.value)}
                aria-pressed={active}
                className={`w-full text-left rounded-btn border px-4 py-3.5 text-[15px] font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[52px] ${
                  active
                    ? "border-primary bg-primary-bg text-text-primary"
                    : "border-border bg-section-alt text-text-primary hover:border-primary/50"
                }`}
              >
                <span>{opt.label}</span>
                {active && <Check size={18} className="text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {(current.kind === "number" || current.kind === "measurements") && (
        <form onSubmit={submitNumbers} noValidate>
          {current.choice && (
            <fieldset className="border-0 p-0 m-0 mb-4">
              <legend className="block text-[13px] font-semibold mb-1.5 text-text-primary">
                {current.choice.label}
              </legend>
              {current.choice.help && (
                <p className="text-[12.5px] text-text-secondary leading-snug mb-2">{current.choice.help}</p>
              )}
              <div className="grid grid-cols-2 gap-2">
                {current.choice.options.map((opt) => {
                  const active = values[current.choice.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValues((v) => ({ ...v, [current.choice.id]: opt.value }))}
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
          <div className={current.kind === "measurements" ? "grid grid-cols-2 gap-3" : ""}>
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
          <button
            type="submit"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading cursor-pointer transition-all"
          >
            Continue <ArrowRight size={16} />
          </button>

          {current.unknownLabel && (
            <div className="mt-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => advance({ ...values, [current.field.id]: "unknown" })}
                className="text-[14px] text-primary font-bold underline bg-transparent border-0 cursor-pointer p-0"
              >
                {current.unknownLabel}
              </button>
              {current.unknownNote && (
                <p className="mt-2 text-[13px] text-text-secondary leading-relaxed">
                  {current.unknownNote}{" "}
                  {current.unknownLink && (
                    <Link to={current.unknownLink.to} className="text-primary font-semibold">
                      {current.unknownLink.label}
                    </Link>
                  )}
                </p>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
