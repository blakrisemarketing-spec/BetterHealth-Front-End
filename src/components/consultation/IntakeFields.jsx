const inputCls =
  "w-full rounded-input border border-border bg-card px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary";

/**
 * Renders a list of INTAKE_QUESTIONS. Shared by both stages — the three
 * qualifying questions above the picker and the four on the confirmation screen
 * are the same fields, so they are the same code and look identical.
 *
 * Controlled: the parent owns `answers`, because for the pre-booking stage those
 * answers have to travel in the booking POST and the parent is what makes it.
 */
export default function IntakeFields({ questions, answers, onChange, disabled }) {
  const set = (id, value) => onChange({ ...answers, [id]: value });

  return (
    <div className="flex flex-col gap-5">
      {questions.map((q) => (
        <div key={q.id}>
          <p className="mb-1 text-[14px] font-bold text-text-primary">
            {q.label}
            {q.required && <span className="ml-1 text-primary">*</span>}
          </p>
          {q.help && (
            <p className="mb-2.5 text-[12.5px] leading-relaxed text-text-muted">{q.help}</p>
          )}

          {q.type === "longText" && (
            <textarea
              rows={2}
              maxLength={400}
              placeholder={q.placeholder}
              value={answers[q.id] || ""}
              onChange={(e) => set(q.id, e.target.value)}
              disabled={disabled}
              className={inputCls}
            />
          )}

          {q.type === "text" && (
            <input
              type="text"
              maxLength={200}
              placeholder={q.placeholder}
              value={answers[q.id] || ""}
              onChange={(e) => set(q.id, e.target.value)}
              disabled={disabled}
              className={inputCls}
            />
          )}

          {q.type === "choice" && (
            <>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const on = answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set(q.id, on ? "" : opt)}
                      aria-pressed={on}
                      disabled={disabled}
                      className={`cursor-pointer rounded-pill border px-3.5 py-2 text-left text-[13.5px] font-semibold transition-all ${
                        on
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-card text-text-secondary hover:border-primary/40"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {q.other && answers[q.id] === "Other" && (
                <input
                  type="text"
                  maxLength={120}
                  placeholder={q.otherPlaceholder}
                  value={answers[`${q.id}__other`] || ""}
                  onChange={(e) => set(`${q.id}__other`, e.target.value)}
                  disabled={disabled}
                  className={`${inputCls} mt-2.5`}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
