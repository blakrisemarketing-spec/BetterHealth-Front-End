import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

/**
 * Stripped-down nav for the paid-campaign landing pages.
 *
 * The site nav is deliberately NOT used here. It carries five links to other
 * pages plus a "Book a test" button — six ways for paid traffic to leave the
 * funnel before reading a word, and the "Book a test" CTA competes directly
 * with the offer this page exists to sell. A landing page paid for by the click
 * gets one exit: the booking form.
 *
 * The logo isn't a link for the same reason. It's the brand mark, not a way home.
 */
export default function CampaignNav({ onCta }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border shadow-sm" : "border-b border-transparent"
      }`}
      style={scrolled ? { background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)" } : {}}
    >
      <div className="mx-auto flex h-[68px] max-w-[1120px] items-center justify-between gap-3 px-5 sm:px-6">
        <img
          src={logo}
          alt="BetterHealth Africa"
          className="h-9 w-auto max-w-[150px] object-contain sm:h-10 sm:max-w-[190px]"
        />

        <div className="flex items-center gap-3">
          <span className="hidden text-[13px] font-semibold text-text-secondary sm:inline">
            Free 20-minute call
          </span>
          <a
            href="#book"
            onClick={onCta}
            className="inline-flex min-h-[44px] items-center rounded-btn bg-primary px-5 py-2.5 font-heading text-[14px] font-bold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Book free call
          </a>
        </div>
      </div>
    </nav>
  );
}
