import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { joinUrl } from "../../lib/app-links";
import { usePricingCatalogue, singleTestPrice } from "../../lib/pricing-catalogue";

/**
 * The next-step card under a tool result. Two shapes:
 *   { kind: "panel", panelSlug, label, body }  -> internal /book-tests/<slug>,
 *     with the live catalogue price the page passes in via `panel`.
 *   { kind: "test", testCode, slug, name, price, label, body } -> a deep link
 *     into the app's onboarding with the single test pre-selected.
 *
 * Test prices are read from the live catalogue by marketing slug, the same way
 * the single-test pages do it: singleTestPrice() maps the slug through
 * SINGLE_TEST_CODES and looks the code up in testsByCode. `cta.price` is the
 * static fallback, so a failed catalogue call renders the last known figure
 * rather than nothing, exactly as the panel prices behave.
 */
export default function ToolCta({ cta, panel, tone = "primary" }) {
  const catalogue = usePricingCatalogue();
  if (!cta) return null;

  const testPrice = cta.kind === "test" ? singleTestPrice(catalogue, cta.slug, cta.price) : null;

  const solid = tone === "primary";
  const wrap = solid
    ? "rounded-card bg-primary text-white p-5 sm:p-6"
    : "rounded-card border border-border bg-section-alt p-5 sm:p-6";
  const eyebrow = solid
    ? "text-[12px] font-bold uppercase tracking-[0.12em] text-white/80 mb-1"
    : "text-[12px] font-bold uppercase tracking-[0.12em] text-text-secondary mb-1";
  const heading = solid
    ? "text-[1.2rem] font-extrabold font-heading leading-snug mb-1"
    : "text-[1.05rem] font-extrabold font-heading leading-snug mb-1 text-text-primary";
  const bodyClass = solid ? "text-[14px] text-white/85 mb-4" : "text-[14px] text-text-secondary mb-4";
  const button = solid
    ? "inline-flex items-center gap-2 bg-white text-primary rounded-btn px-5 py-3 text-[15px] font-bold font-heading no-underline transition-all hover:-translate-y-0.5"
    : "inline-flex items-center gap-2 bg-card border border-primary text-primary hover:bg-primary-bg rounded-btn px-5 py-3 text-[15px] font-bold font-heading no-underline transition-all";

  if (cta.kind === "panel") {
    if (!panel) return null;
    return (
      <div className={wrap}>
        <p className={eyebrow}>Next step</p>
        <p className={heading}>{cta.label}</p>
        <p className={bodyClass}>
          {cta.body} {panel.displayName} ({panel.name}) &middot; {panel.tests.length} tests &middot; {panel.price}
        </p>
        <Link to={`/book-tests/${panel.slug}`} className={button}>
          Book {panel.displayName} <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className={wrap}>
      <p className={eyebrow}>{solid ? "Next step" : "Also worth doing"}</p>
      <p className={heading}>{cta.label}</p>
      <p className={bodyClass}>
        {cta.body} {cta.name} &middot; {testPrice}
      </p>
      <a
        href={joinUrl({ test: cta.testCode })}
        target="_blank"
        rel="noopener noreferrer"
        className={button}
      >
        Book {cta.name} ({testPrice}) <ArrowRight size={16} />
      </a>
    </div>
  );
}
