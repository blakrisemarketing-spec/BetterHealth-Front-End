import { useEffect, useRef, useState } from "react";

/**
 * Renders nothing until it is close to the viewport, then renders and stays.
 *
 * The page carries the booking picker twice: once in the hero, and once at the
 * foot of the argument for the reader who scrolled past the first one. Two
 * mounted pickers means two `GET /slots` requests on load, one of which is for a
 * component nine screens down that most visitors never reach — on a page opened
 * from an ad on Ghanaian mobile data, against an API that is also serving the
 * picker the visitor is actually looking at.
 *
 * `rootMargin` is generous on purpose. The second picker has to be populated by
 * the time it is scrolled to, not start loading then; 600px is roughly the
 * distance a thumb-flick covers before the reader stops.
 *
 * Once mounted it never unmounts — tearing the picker down would discard a
 * half-filled form the moment the reader scrolled up to re-read something.
 */
export default function LazyMount({ children, rootMargin = "600px", placeholderClassName = "" }) {
  const ref = useRef(null);
  // Resolved at first render rather than in the effect: with no
  // IntersectionObserver (an old browser, or a prerender pass) the answer is
  // "render it now", and deciding that in an effect would mean one wasted
  // render and a cascading-setState lint error for no benefit. Leaving a
  // permanent hole where the booking form should be is the failure to avoid.
  const [shown, setShown] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown, rootMargin]);

  if (shown) return children;
  // Reserve height so the sentinel does not sit flush against the section above
  // it, which would trip the observer on load and defeat the whole component.
  return <div ref={ref} aria-hidden className={placeholderClassName || "min-h-[420px]"} />;
}
