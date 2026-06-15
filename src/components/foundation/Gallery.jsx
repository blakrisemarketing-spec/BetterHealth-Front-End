import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import g01 from "../../assets/foundation/gallery/g01.webp";
import g02 from "../../assets/foundation/gallery/g02.webp";
import g03 from "../../assets/foundation/gallery/g03.webp";
import g04 from "../../assets/foundation/gallery/g04.webp";
import g05 from "../../assets/foundation/gallery/g05.webp";
import g06 from "../../assets/foundation/gallery/g06.webp";
import g07 from "../../assets/foundation/gallery/g07.webp";
import g08 from "../../assets/foundation/gallery/g08.webp";

const IMAGES = [
  { src: g01, alt: "A foundation volunteer takes a finger-prick blood sample from a community member." },
  { src: g02, alt: "A young child stands at a height board during a free community health check." },
  { src: g03, alt: "A volunteer talks a smiling older woman through her screening results." },
  { src: g04, alt: "A BetterHealth Africa Foundation volunteer explains a check to a participant." },
  { src: g05, alt: "A clinician measures a young patient's blood pressure at a community screening." },
  { src: g06, alt: "A community member smiles during her free health screening." },
  { src: g07, alt: "Volunteers run free health checks for residents at a screening day." },
  { src: g08, alt: "A volunteer and a participant share a moment at the screening table." },
];

const ROW_A = [0, 1, 2, 3];
const ROW_B = [4, 5, 6, 7];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Gallery() {
  const [idx, setIdx] = useState(null);
  const [reduced] = useState(prefersReducedMotion);

  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(
    () => setIdx((i) => (i === null ? null : (i + IMAGES.length - 1) % IMAGES.length)),
    [],
  );
  const next = useCallback(
    () => setIdx((i) => (i === null ? null : (i + 1) % IMAGES.length)),
    [],
  );

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [idx, close, prev, next]);

  const Tile = ({ i }) => (
    <button
      type="button"
      onClick={() => setIdx(i)}
      aria-label={`Open photo: ${IMAGES[i].alt}`}
      className="group relative shrink-0 w-[230px] sm:w-[290px] overflow-hidden rounded-xl border border-border shadow-card focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      style={{ aspectRatio: "4 / 3" }}
    >
      <img
        src={IMAGES[i].src}
        alt={IMAGES[i].alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-[1.06]"
      />
      <span className="pointer-events-none absolute inset-0 bg-text-primary/0 transition-colors duration-300 group-hover:bg-text-primary/15" />
    </button>
  );

  return (
    <>
      {reduced ? (
        /* Reduced-motion fallback: manually scrollable rows, no animation. */
        <div className="space-y-4">
          {[ROW_A, ROW_B].map((row, ri) => (
            <div
              key={ri}
              className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {row.map((i) => (
                <Tile key={i} i={i} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        /* Auto-scrolling marquee rows. Hover (desktop) or press (touch) pauses a row so any photo can be tapped. */
        <div className="space-y-4 sm:space-y-5">
          <div className="overflow-hidden">
            <div
              className="flex gap-4 sm:gap-5 w-max pr-4 sm:pr-5 animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]"
              style={{ animationDuration: "44s" }}
            >
              {[...ROW_A, ...ROW_A].map((i, k) => (
                <Tile key={k} i={i} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex gap-4 sm:gap-5 w-max pr-4 sm:pr-5 animate-marquee-right hover:[animation-play-state:paused] active:[animation-play-state:paused]"
              style={{ animationDuration: "50s" }}
            >
              {[...ROW_B, ...ROW_B].map((i, k) => (
                <Tile key={k} i={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {idx !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-text-primary/92 backdrop-blur-sm p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/90 bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-5 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white/90 bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <ChevronLeft size={26} />
          </button>
          <figure className="max-w-[92vw] max-h-[88vh] flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={IMAGES[idx].src}
              alt={IMAGES[idx].alt}
              className="max-h-[80vh] max-w-[92vw] w-auto h-auto object-contain rounded-card"
            />
            <figcaption className="text-[13px] text-white/75 font-inter text-center max-w-[600px]">
              {IMAGES[idx].alt}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-5 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white/90 bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </>
  );
}
