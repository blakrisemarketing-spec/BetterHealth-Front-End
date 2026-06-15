import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Lightweight scroll reveal built on IntersectionObserver + CSS transitions.
 * No animation library, and motion is skipped entirely when the user prefers
 * reduced motion (content shows immediately).
 */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  // Lazy init: when reduced motion is preferred, start visible so the effect
  // never has to setState synchronously.
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fdn-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Counts up to `end` once the element scrolls into view. Honors reduced-motion
 * by rendering the final value immediately, and never blocks content rendering.
 */
export function CountUp({ end, duration = 1600, prefix = "", suffix = "", className = "" }) {
  const ref = useRef(null);
  // Lazy init: render the final value immediately under reduced motion so the
  // effect never has to setState synchronously.
  const [value, setValue] = useState(() => (prefersReducedMotion() ? end : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(end * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/**
 * Warm-toned placeholder block for a photo that does not exist yet. Each one is
 * labelled with the real photo that should replace it.
 * TODO: replace every <ImagePlaceholder> with a real screening photo.
 */
export function ImagePlaceholder({ label, aspect = "16 / 10", className = "", rounded = "rounded-card" }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder. ${label}`}
      className={`relative overflow-hidden border border-accent/25 ${rounded} ${className}`}
      style={{
        aspectRatio: aspect,
        background:
          "linear-gradient(135deg, rgba(212,162,78,0.20) 0%, rgba(107,142,127,0.18) 100%)",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-primary font-inter">
          Photo placeholder
        </span>
        <span className="max-w-[280px] text-[13px] font-medium leading-snug text-text-primary/70 font-inter">
          {label}
        </span>
      </div>
    </div>
  );
}

/** Accessible modal: Esc to close, click-outside to close, focus moved in and body scroll locked. */
export function Modal({ open, onClose, title, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-text-primary/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative w-full sm:max-w-[480px] bg-white rounded-t-card sm:rounded-card shadow-dialog border border-border p-6 sm:p-8 max-h-[92vh] overflow-y-auto outline-none"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <h3 className="text-[22px] font-bold text-text-primary font-heading leading-tight">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:bg-section-alt hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
