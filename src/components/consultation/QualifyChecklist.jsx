import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Fade from "./Fade";

/**
 * Self-qualification checklist — the reader decides the page is about them.
 *
 * Two reasons this is here rather than a paragraph making the same points.
 * First, a statement the reader ticks is a statement they've agreed with, and
 * agreement compounds into a booking. Second, it's the only way to be specific
 * about symptoms without breaking Meta's personal-attributes rule: the page
 * never asserts anything about the reader, it offers a list and the reader
 * selects. Same information, opposite grammar.
 *
 * Deliberately NOT scored. Ticking four boxes doesn't mean anything clinically,
 * and a page that implies otherwise is doing diagnosis by widget. The response
 * only ever says what happens next.
 */
export default function QualifyChecklist({ heading, items, onCta }) {
  const [ticked, setTicked] = useState(() => new Set());

  const toggle = (i) => {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const count = ticked.size;

  return (
    <div className="mx-auto max-w-[720px]">
      <Fade>
        <h2 className="mb-2 font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
          {heading}
        </h2>
      </Fade>
      <Fade delay={0.06}>
        <p className="mb-7 text-[16.5px] leading-relaxed text-text-secondary">
          Tap anything that's true for you. Nothing is sent anywhere. This is for you to see.
        </p>
      </Fade>

      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => {
          const on = ticked.has(i);
          return (
            <Fade key={item} delay={0.1 + i * 0.05}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`flex w-full cursor-pointer items-start gap-3.5 rounded-card border p-4 text-left transition-all sm:p-5 ${
                  on
                    ? "border-primary bg-primary-bg shadow-card"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <span
                  className={`mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] border-2 transition-all ${
                    on ? "border-primary bg-primary" : "border-border bg-card"
                  }`}
                >
                  {on && <Check size={14} strokeWidth={3} className="text-white" />}
                </span>
                <span
                  className={`text-[16.5px] leading-snug ${
                    on ? "font-semibold text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {item}
                </span>
              </button>
            </Fade>
          );
        })}
      </div>

      {/* Response appears only once something is ticked — an empty verdict box
          sitting there before any interaction just adds height. The panel stays
          mounted so the reveal can animate, which means it has to be hidden from
          assistive tech as well as visually: otherwise a screen reader reads out
          "You've ticked 0" before the reader has touched anything. */}
      <div
        aria-hidden={count === 0}
        className={`overflow-hidden transition-all duration-500 ${
          count > 0 ? "mt-6 max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-card border-l-[3px] border-accent-dark bg-card p-5 shadow-card sm:p-6">
          <p className="mb-2 font-heading text-[17px] font-extrabold leading-snug text-text-primary">
            {count === 1
              ? "One is enough to be worth twenty minutes."
              : `You've ticked ${count}. That's what the call is for.`}
          </p>
          <p className="mb-5 text-[15px] leading-relaxed text-text-secondary">
            None of this is a diagnosis. It does mean you have specific things to ask about, and
            your consultant will start from those rather than a script.
          </p>
          <a
            href="#book"
            onClick={onCta}
            tabIndex={count === 0 ? -1 : 0}
            className="inline-flex items-center gap-2 rounded-btn bg-primary px-6 py-3.5 font-heading text-[15px] font-bold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Book your free call <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
