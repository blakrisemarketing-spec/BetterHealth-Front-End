import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calculator, Check, ShieldCheck } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import GradientOrb from "../components/ui/GradientOrb";
import GuideContent, { GuideDisclaimer, GuideSources } from "../components/guides/GuideContent";
import ToolLeadForm from "../components/tools/ToolLeadForm";
import ToolResult, { ToolQuestions } from "../components/tools/ToolRunner";
import { getTool, TOOL_TRUST_LINE } from "../data/tools";
import { testPanels } from "../data/content";
import { readGuideUnlock } from "../lib/leads";
import { usePricingCatalogue, withBackendPanelPrice } from "../lib/pricing-catalogue";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

// No entrance animation on the hero: it is the above-the-fold content on a
// page bought by the click, and the first question sits directly under it.
function Hero({ tool }) {
  return (
    <section className="pt-[88px] pb-4 px-5 sm:px-6 bg-base relative overflow-hidden">
      <GradientOrb color="green" size="480px" className="top-[-15%] right-[-15%]" />
      <div className="max-w-[720px] mx-auto relative z-10">
        <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-bold text-primary uppercase tracking-[0.12em] mb-1.5">
          <Calculator size={13} />
          {tool.eyebrow}
        </span>
        <h1 className="text-[1.6rem] sm:text-[2.3rem] font-extrabold font-heading leading-[1.12] text-text-primary mb-2">
          {tool.title}
        </h1>
        <p className="text-[14.5px] sm:text-[16px] leading-relaxed text-text-secondary font-body">
          {tool.intro}
        </p>
      </div>
    </section>
  );
}

function AboutTool({ tool }) {
  return (
    <div className="rounded-card border border-border bg-section-alt p-5 mt-6">
      <p className="text-[15px] text-text-secondary leading-relaxed mb-3">{tool.promise}</p>
      <ul className="space-y-1 mb-3">
        {tool.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[14px] text-text-primary leading-snug">
            <Check size={15} className="text-primary shrink-0 mt-[3px]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="flex items-start gap-2 text-[12px] text-text-muted leading-snug">
        <ShieldCheck size={14} className="text-primary shrink-0 mt-[1px]" />
        <span>{TOOL_TRUST_LINE}</span>
      </p>
    </div>
  );
}

function ToolView({ tool, panel }) {
  const [result, setResult] = useState(null);
  const [unlocked, setUnlocked] = useState(() =>
    typeof window === "undefined" ? null : readGuideUnlock(tool.slug),
  );
  const pendingScroll = useRef(null);

  useEffect(() => {
    if (!pendingScroll.current) return;
    const id = pendingScroll.current;
    pendingScroll.current = null;
    scrollToId(id);
  }, [result, unlocked]);

  const onFinish = (r) => {
    pendingScroll.current = unlocked ? "tool-result" : "tool";
    setResult(r);
  };
  const onUnlocked = (name) => {
    pendingScroll.current = "tool-result";
    setUnlocked(name || "1");
  };
  const restart = () => {
    setResult(null);
    pendingScroll.current = "tool";
  };

  const showResult = Boolean(result && unlocked);

  return (
    <>
      <Hero tool={tool} />

      <section id="tool" className="px-5 sm:px-6 pb-8 scroll-mt-20">
        <div className="max-w-[720px] mx-auto">
          {!result && <ToolQuestions slug={tool.slug} onFinish={onFinish} />}

          {result && !unlocked && (
            <>
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
                  <Check size={13} /> Calculated
                </span>
                <h2 className="text-[1.4rem] sm:text-[1.7rem] font-extrabold text-text-primary font-heading leading-tight mb-1">
                  Your result is ready.
                </h2>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Tell us where to send it and we will show it right here, in full.
                </p>
              </div>
              <ToolLeadForm
                tool={tool}
                healthInterest={result.healthInterest}
                answers={result.answers}
                onUnlocked={onUnlocked}
              />
            </>
          )}

          {!result && <AboutTool tool={tool} />}
        </div>
      </section>

      {showResult && (
        <section id="tool-result" className="px-5 sm:px-6 py-10 bg-base border-t border-border scroll-mt-20">
          <div className="max-w-[720px] mx-auto">
            <ToolResult slug={tool.slug} result={result} tool={tool} panel={panel} />
            {/* The Part 2 lines cite studies by short name; the full list is the page's own Sources. */}
            <div className="mt-8">
              <GuideSources sources={tool.sources} />
            </div>
            <div className="mt-2">
              <GuideDisclaimer />
            </div>
            <p className="mt-3 text-[12px] text-text-muted leading-relaxed">
              We use your number to send the result, and nothing else unless you ticked the box.{" "}
              <Link to="/privacy" className="text-primary font-semibold">Privacy policy</Link>
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-5 text-[14px] text-text-secondary font-semibold underline bg-transparent border-0 cursor-pointer"
            >
              Start again
            </button>
          </div>
        </section>
      )}

      {!result && (
        <section className="px-5 sm:px-6 py-10 bg-base border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <GuideContent sections={tool.sections} sources={tool.sources} />
          </div>
        </section>
      )}
    </>
  );
}

export default function ToolPage() {
  const { slug } = useParams();
  const tool = getTool(slug);
  const catalogue = usePricingCatalogue();

  if (!tool) {
    return (
      <div className="bg-base min-h-screen overflow-x-hidden">
        <Nav />
        <main className="pt-[120px] pb-20 px-6 text-center">
          <h1 className="text-[2rem] font-extrabold text-text-primary font-heading mb-4">Tool not found</h1>
          <p className="text-text-secondary mb-6">
            We couldn&rsquo;t find that tool. It may have moved, or the link might be off.
          </p>
          <Link to="/tools" className="text-primary font-bold no-underline hover:text-primary-dark">
            &larr; All free tools
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const ctaBase = tool.cta?.kind === "panel" ? testPanels.find((p) => p.slug === tool.cta.panelSlug) : null;
  const panel = ctaBase ? withBackendPanelPrice(ctaBase, catalogue) : null;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route={`tools/${tool.slug}`} />
      <Nav />
      <main>
        <ToolView key={tool.slug} tool={tool} panel={panel} />
      </main>
      <Footer />
    </div>
  );
}
