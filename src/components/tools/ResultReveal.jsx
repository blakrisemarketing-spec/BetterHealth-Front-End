import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The animated reveal on a result screen: the headline number resolves over
 * about a second, the band meter lights up segment by segment to the band,
 * and the sections below fade in once that has settled. Every piece checks
 * prefers-reduced-motion through framer-motion's hook and renders its final
 * state immediately when it is set.
 */

const REVEAL_MS = 1000;
const EASE = [0.16, 1, 0.3, 1];

/**
 * A number that climbs from 0 to `target` over `duration` ms, eased out. With
 * reduced motion on, the target is shown straight away and no frame runs.
 */
function useCountUp(target, duration = REVEAL_MS) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce || typeof window === "undefined") return undefined;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - p) ** 3;
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduce]);

  return reduce ? target : value;
}

export function CountUp({ value, decimals = 0, className = "" }) {
  const v = useCountUp(Number(value) || 0);
  return <span className={className}>{v.toFixed(decimals)}</span>;
}

/** Wraps whatever should appear once the headline has resolved. */
export function RevealAfter({ children, delay = REVEAL_MS / 1000 + 0.15, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : delay, duration: 0.55, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** The card that holds the headline: a quick fade so the reveal has a start. */
export function ResultCard({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * A meter of published bands that lights one segment at a time and settles on
 * the active one. Segments before it stay a tint, so the eye reads "this far".
 */
export function BandMeter({ bands, activeId, leftLabel, rightLabel }) {
  const reduce = useReducedMotion();
  const activeIdx = bands.findIndex((b) => b.id === activeId);
  const stepDelay = REVEAL_MS / 1000 / Math.max(1, bands.length);

  return (
    <div className="mb-5">
      <div className="flex gap-1" aria-hidden="true">
        {bands.map((b, i) => {
          const reached = i <= activeIdx;
          const active = i === activeIdx;
          const tone = active ? "bg-primary" : reached ? "bg-primary/30" : "bg-section-alt";
          return (
            <motion.div
              key={b.id}
              className={`h-2 flex-1 rounded-pill origin-center ${tone}`}
              initial={reduce || !reached ? false : { opacity: 0.25, scaleY: 0.4 }}
              animate={{ opacity: 1, scaleY: reduce ? 1 : active ? [0.4, 1.7, 1] : 1 }}
              transition={{ delay: reduce ? 0 : i * stepDelay, duration: active ? 0.45 : 0.25 }}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[11px] text-text-muted">{leftLabel}</span>
        <span className="text-[11px] text-text-muted">{rightLabel}</span>
      </div>
    </div>
  );
}
