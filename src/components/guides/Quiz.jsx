import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { scoreQuiz } from "./quiz-scoring";

/**
 * One question at a time. Tapping an option records it and moves on; the
 * back button returns to the previous question with its choice still
 * highlighted. On the last question the quiz is scored and `onFinish`
 * receives { panelSlug, scores, answers }.
 */
export default function Quiz({ quiz, onFinish }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});

  const total = quiz.questions.length;
  const question = quiz.questions[step];
  const chosen = selections[question.id];

  const choose = (idx) => {
    const next = { ...selections, [question.id]: idx };
    setSelections(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      onFinish(scoreQuiz(quiz, next));
    }
  };

  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-bold text-primary uppercase tracking-[0.12em]">
          Question {step + 1} of {total}
        </span>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
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

      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-extrabold text-text-primary font-heading leading-snug mb-4">
        {question.text}
      </h2>

      <div className="flex flex-col gap-2.5" role="group" aria-label={question.text}>
        {question.options.map((opt, idx) => {
          const active = chosen === idx;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => choose(idx)}
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
    </div>
  );
}
