import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Reveal from "./ui/Reveal";
import { conditions, conditions2 } from "../data/content";

function MarqueeRow({ items, direction = "left" }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex gap-3 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-block px-5 py-2 rounded-pill border border-white/[0.12] text-text-on-dark/80 text-sm font-body tracking-wide bg-white/[0.04] hover:border-primary/40 hover:shadow-glow-green transition-all duration-300 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CountUp({ end }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (1600 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count}</span>;
}

export default function ConditionMarquee() {
  return (
    <section className="py-20 bg-bg-dark relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <Reveal>
        <div className="text-center mb-10 px-6">
          <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
            Comprehensive Screening
          </p>
          <h2 className="text-h2 font-extrabold text-text-on-dark font-heading tracking-tight">
            Screen for early indicators of <CountUp end={100} />+ conditions
          </h2>
        </div>
      </Reveal>

      <div className="flex flex-col gap-3">
        <MarqueeRow items={conditions} direction="left" />
        <MarqueeRow items={conditions2} direction="right" />
      </div>
    </section>
  );
}
