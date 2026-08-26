import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CONSULT_MINUTES } from "../../data/wellness-consultation";

/**
 * Mobile sticky booking bar.
 *
 * Nearly all of this traffic arrives from Meta on a phone, and the page is long
 * on purpose — which means for most of the scroll there is no CTA on screen. The
 * bar keeps the booking form one tap away from any point on the page.
 *
 * It hides itself while the booking section is visible — two competing "book"
 * affordances on a 375px screen, one of them covering the form's own submit
 * button, is worse than none — and again over the footer, where a fixed bar
 * would otherwise permanently cover the legal links Meta expects to find.
 */
export default function StickyCTA({ hideOver = ["#book", "footer"], onCta }) {
  const [show, setShow] = useState(false);
  const [covering, setCovering] = useState(false);

  useEffect(() => {
    // Past the hero — roughly one screen — is where the bar earns its space.
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // `hideOver` is a literal in every current call site, so it's stable across
  // renders; joined into a string so a caller passing an inline array doesn't
  // re-run the effect on every render.
  const watched = hideOver.join(",");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = watched
      .split(",")
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);
    if (!targets.length) return;

    // One entry per target, so the bar stays hidden while ANY of them is on
    // screen rather than flickering back as the reader crosses between them.
    const hits = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) hits.add(entry.target);
          else hits.delete(entry.target);
        }
        setCovering(hits.size > 0);
      },
      // A sliver counts as visible: the bar should be gone before the reader
      // reaches the day picker, not the moment it's centred.
      { threshold: 0.12 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [watched]);

  const visible = show && !covering;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 shadow-[0_-4px_24px_rgba(43,58,58,0.12)] backdrop-blur transition-all duration-300 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[14px] font-bold text-text-primary">
            Free {CONSULT_MINUTES}-minute call
          </p>
          <p className="truncate text-[12px] text-text-secondary">
            Written plan on WhatsApp within a day
          </p>
        </div>
        <a
          href="#book"
          onClick={onCta}
          tabIndex={visible ? 0 : -1}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-btn bg-primary px-5 py-3 font-heading text-[14px] font-bold text-white no-underline transition-colors hover:bg-primary-dark"
        >
          Book <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
