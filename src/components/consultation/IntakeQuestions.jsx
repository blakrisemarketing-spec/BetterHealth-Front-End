import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitIntake } from "../../lib/consultation-api";
import { POST_QUESTIONS } from "../../data/wellness-consultation";
import IntakeFields from "./IntakeFields";
import { flattenAnswers, missingRequired } from "./intake-answers";

/**
 * The second half of the intake, shown on the confirmation screen.
 *
 * The three qualifying questions were answered before the picker and are already
 * saved — they went up inside the booking POST. These four are the ones with
 * typing in them, which is why they sit after the commitment rather than before
 * it, and why nothing here can affect the booking.
 *
 * Three rules hold it together:
 *
 *   1. The booking is done and the copy says so, so nobody abandons half way
 *      believing they have lost the slot.
 *   2. Everything is skippable — "Skip" is a real button, not a greyed-out
 *      afterthought.
 *   3. A failed submit is not the visitor's problem. If the endpoint is missing
 *      or the network drops they still see a thank-you; the failure is logged
 *      for us, not surfaced as an error to someone who did nothing wrong.
 */
export default function IntakeQuestions({ refCode }) {
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("open"); // open | saving | done | skipped

  const answered = POST_QUESTIONS.filter((q) => String(answers[q.id] || "").trim()).length;
  const missing = missingRequired(POST_QUESTIONS, answers);

  const send = async () => {
    setStatus("saving");
    const { stored } = await submitIntake(refCode, flattenAnswers(POST_QUESTIONS, answers));
    if (!stored) {
      // Deliberately not shown to the visitor — their booking is fine, and this
      // is our plumbing, not their mistake.
      console.warn("[intake] post-booking answers were not stored for", refCode);
    }
    setStatus("done");
  };

  if (status === "done" || status === "skipped") {
    return (
      <div className="mt-5 rounded-card border border-border bg-section-alt p-5">
        <p className="text-[15px] font-semibold text-text-primary">
          {status === "done" && answered > 0
            ? "Thank you — your consultant will read this before the call."
            : "No problem. Your consultant will go through it on the call."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-card border border-border bg-section-alt p-5 sm:p-6">
      <p className="mb-1 font-heading text-[16px] font-extrabold text-text-primary">
        A few more things, if you have a minute
      </p>
      <p className="mb-5 text-[14px] leading-relaxed text-text-secondary">
        The more your consultant knows before the call, the less of your twenty minutes goes on
        catching up. <strong className="text-text-primary">Your slot is already saved</strong> —
        none of this changes that.
      </p>

      <IntakeFields
        questions={POST_QUESTIONS}
        answers={answers}
        onChange={setAnswers}
        disabled={status === "saving"}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={send}
          disabled={status === "saving" || answered === 0 || missing.length > 0}
          className="inline-flex items-center gap-2 rounded-btn bg-primary px-6 py-3 font-heading text-[14px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "saving" ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Check size={15} /> Send to my consultant
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => setStatus("skipped")}
          disabled={status === "saving"}
          className="cursor-pointer border-none bg-transparent text-[13.5px] font-semibold text-text-secondary underline underline-offset-2 hover:text-primary"
        >
          Skip this
        </button>
      </div>
    </div>
  );
}
