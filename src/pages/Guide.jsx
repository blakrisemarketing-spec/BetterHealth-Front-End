import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, ChevronUp, FileText, Lock, ShieldCheck } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import GradientOrb from "../components/ui/GradientOrb";
import LeadForm, { UnlockedCard } from "../components/guides/LeadForm";
import Quiz from "../components/guides/Quiz";
import GuideContent, { GuideSection } from "../components/guides/GuideContent";
import { getGuide, GUIDE_TRUST_LINE } from "../data/guides";
import { testPanels } from "../data/content";
import { readGuideUnlock } from "../lib/leads";
import { usePricingCatalogue, withBackendPanelPrice } from "../lib/pricing-catalogue";

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. The guide, the PDF and the quiz are free to keep. You do not need an account and there is nothing to buy.",
  },
  {
    q: "What happens after I submit?",
    a: "The full guide unlocks on this page straight away, with a PDF you can download. We also send the link to your WhatsApp so you can find it again.",
  },
  {
    q: "Do you sell my number?",
    a: "No. We use it only to send the guide and, if you tick the box, occasional health education. You can reply STOP at any time. Our privacy policy explains what we keep and why.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 px-1 text-left cursor-pointer bg-transparent border-0"
      >
        <span className="text-[15px] font-semibold text-text-primary pr-4">{q}</span>
        {open ? <ChevronUp size={18} className="text-text-muted shrink-0" /> : <ChevronDown size={18} className="text-text-muted shrink-0" />}
      </button>
      {open && (
        <p className="text-[14px] text-text-secondary leading-relaxed pb-4 px-1">
          {a}{" "}
          {q.startsWith("Do you sell") && (
            <Link to="/privacy" className="text-primary font-semibold">Read the privacy policy</Link>
          )}
        </p>
      )}
    </div>
  );
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

// No entrance animation on the hero: it is the above-the-fold content on a
// page bought by the click, and on a slow 3G phone a fade-in is a blank
// screen for the first paint.
function Hero({ guide }) {
  return (
    <section className="pt-[92px] pb-5 px-5 sm:px-6 bg-base relative overflow-hidden">
      <GradientOrb color="green" size="480px" className="top-[-15%] right-[-15%]" />
      <div className="max-w-[720px] mx-auto relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-bold text-primary uppercase tracking-[0.12em] mb-2">
            {guide.kind === "quiz" ? <Check size={13} /> : <FileText size={13} />}
            {guide.eyebrow}
          </span>
          <h1 className="text-[1.75rem] sm:text-[2.4rem] md:text-[2.8rem] font-extrabold font-heading leading-[1.1] text-text-primary mb-3">
            {guide.title}
          </h1>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-text-secondary font-body mb-3">
            {guide.promise}
          </p>
          <span className="inline-block text-[12px] font-semibold text-text-secondary bg-section-alt border border-border rounded-pill px-3 py-1 mb-3">
            {guide.format}
          </span>
          <ul className="space-y-1 mb-3">
            {guide.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[14px] text-text-primary leading-snug">
                <Check size={15} className="text-primary shrink-0 mt-[3px]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2 text-[12px] text-text-muted leading-snug">
            <ShieldCheck size={14} className="text-primary shrink-0 mt-[1px]" />
            <span>{GUIDE_TRUST_LINE}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="py-10 px-5 sm:px-6 bg-section-alt border-t border-border">
      <div className="max-w-[720px] mx-auto">
        <h2 className="text-[1.2rem] sm:text-[1.4rem] font-extrabold text-text-primary font-heading tracking-tight mb-4">
          Common questions
        </h2>
        <div className="bg-card border border-border rounded-card px-4 sm:px-5">
          {FAQ.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BookCta({ panel, label }) {
  if (!panel) return null;
  return (
    <div className="rounded-card bg-primary text-white p-5 sm:p-6 mt-6">
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/80 mb-1">Next step</p>
      <p className="text-[1.2rem] font-extrabold font-heading leading-snug mb-1">{label}</p>
      <p className="text-[14px] text-white/85 mb-4">
        {panel.displayName} ({panel.name}) · {panel.tests.length} tests · {panel.price}
      </p>
      <Link
        to={`/book-tests/${panel.slug}`}
        className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-5 py-3 text-[15px] font-bold font-heading no-underline transition-all hover:-translate-y-0.5"
      >
        Book {panel.displayName} <ArrowRight size={16} />
      </Link>
    </div>
  );
}

/* ---------------- Guide (kind: "guide") ---------------- */

function GuideView({ guide, panel }) {
  const [unlocked, setUnlocked] = useState(() =>
    typeof window === "undefined" ? null : readGuideUnlock(guide.slug),
  );
  const [returning] = useState(() => Boolean(unlocked));
  const pendingScroll = useRef(false);

  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    scrollToId("guide-content");
  }, [unlocked]);

  const onUnlocked = (name) => {
    pendingScroll.current = true;
    setUnlocked(name || "1");
  };

  return (
    <>
      <Hero guide={guide} />

      <section id="get" className="px-5 sm:px-6 pb-8 scroll-mt-20">
        <div className="max-w-[720px] mx-auto">
          {unlocked ? (
            <UnlockedCard guide={guide} panel={panel} firstName={unlocked} returning={returning} />
          ) : (
            <LeadForm guide={guide} onUnlocked={onUnlocked} />
          )}
        </div>
      </section>

      <section id="guide-content" className="px-5 sm:px-6 py-10 bg-base border-t border-border scroll-mt-20">
        <div className="max-w-[720px] mx-auto">
          {unlocked ? (
            <>
              <GuideContent sections={guide.sections} sources={guide.sources} />
              <BookCta panel={panel} label={guide.cta.label} />
              {guide.pdf && (
                <a
                  href={guide.pdf}
                  download
                  className="mt-4 inline-flex items-center gap-2 text-primary font-bold no-underline hover:text-primary-dark"
                >
                  <FileText size={16} /> Download the PDF ({guide.format})
                </a>
              )}
            </>
          ) : (
            <>
              <GuideSection section={guide.sections[0]} index={0} />
              <div className="relative">
                <div className="max-h-[380px] overflow-hidden blur-[3px] select-none pointer-events-none opacity-70" aria-hidden="true">
                  <GuideContent sections={guide.sections} sources={guide.sources} from={1} to={4} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base/70 to-base flex items-end justify-center pb-4">
                  <div className="rounded-card border border-border bg-card shadow-md p-5 text-center max-w-[360px] w-full">
                    <Lock size={20} className="text-primary mx-auto mb-2" />
                    <p className="text-[15px] font-extrabold text-text-primary font-heading mb-1">
                      {guide.sections.length - 1} more sections inside
                    </p>
                    <p className="text-[13px] text-text-secondary mb-4">
                      Unlock the full guide and the {guide.format}. Takes 20 seconds.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToId("get")}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-5 py-3 text-[15px] font-bold font-heading cursor-pointer transition-all"
                    >
                      Unlock the full guide <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <FaqSection />
    </>
  );
}

/* ---------------- Quiz (kind: "quiz") ---------------- */

function QuizResult({ guide, result, catalogue }) {
  const base = testPanels.find((p) => p.slug === result.panelSlug) || testPanels[0];
  const panel = withBackendPanelPrice(base, catalogue);
  const copy = guide.quiz.results[panel.slug];
  const altBase = copy?.alsoConsider
    ? testPanels.find((p) => p.slug === copy.alsoConsider.panelSlug)
    : null;
  const alt = altBase ? withBackendPanelPrice(altBase, catalogue) : null;

  return (
    <div>
      <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-7 mb-4">
        <span className="block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
          {panel.name}
        </span>
        <h2 className="text-[1.5rem] sm:text-[1.9rem] font-extrabold text-text-primary font-heading leading-tight mb-2">
          {copy?.headline || `Your best fit: the ${panel.displayName}`}
        </h2>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-4">{copy?.why || panel.why}</p>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[28px] font-extrabold text-primary font-heading">{panel.price}</span>
          <span className="text-[12px] text-text-muted">Excl. VAT · {panel.tests.length} tests</span>
        </div>

        <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-2">Tests included</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-5">
          {panel.tests.map((t) => (
            <li key={t} className="flex items-start gap-2 text-[14px] text-text-primary">
              <Check size={15} className="text-primary shrink-0 mt-[3px]" /> {t}
            </li>
          ))}
        </ul>

        <Link
          to={`/book-tests/${panel.slug}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-3.5 text-[16px] font-bold font-heading no-underline transition-all"
        >
          Book {panel.displayName} <ArrowRight size={16} />
        </Link>
      </div>

      {alt && (
        <div className="rounded-card border border-border bg-section-alt p-5">
          <p className="text-[12px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-1">Also consider</p>
          <p className="text-[15px] font-extrabold text-text-primary font-heading mb-1">
            {alt.displayName} ({alt.name}) · {alt.price}
          </p>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-3">{copy.alsoConsider.text}</p>
          <Link to={`/book-tests/${alt.slug}`} className="text-[14px] text-primary font-bold inline-flex items-center gap-1 no-underline">
            See {alt.displayName} <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

function QuizView({ guide, catalogue }) {
  const [result, setResult] = useState(null);
  const [unlocked, setUnlocked] = useState(() =>
    typeof window === "undefined" ? null : readGuideUnlock(guide.slug),
  );
  const [returning] = useState(() => Boolean(unlocked));
  const pendingScroll = useRef(null);

  useEffect(() => {
    if (!pendingScroll.current) return;
    const id = pendingScroll.current;
    pendingScroll.current = null;
    scrollToId(id);
  }, [result, unlocked]);

  const onFinish = (r) => {
    pendingScroll.current = "get";
    setResult(r);
  };
  const onUnlocked = (name) => {
    pendingScroll.current = "quiz-result";
    setUnlocked(name || "1");
  };
  const restart = () => {
    setResult(null);
    pendingScroll.current = "get";
  };

  const showResult = result && unlocked;

  return (
    <>
      <Hero guide={guide} />

      <section id="get" className="px-5 sm:px-6 pb-8 scroll-mt-20">
        <div className="max-w-[720px] mx-auto">
          {!result && (
            <>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-3">{guide.quiz.intro}</p>
              <Quiz quiz={guide.quiz} onFinish={onFinish} />
            </>
          )}

          {result && !unlocked && (
            <>
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
                  <Check size={13} /> Quiz complete
                </span>
                <h2 className="text-[1.4rem] sm:text-[1.7rem] font-extrabold text-text-primary font-heading leading-tight mb-1">
                  Your best-fit test is ready.
                </h2>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Tell us where to send it and we will show it right here, with the tests included and the price.
                </p>
              </div>
              <LeadForm
                guide={guide}
                healthInterest={result.panelSlug}
                answers={result.answers}
                onUnlocked={onUnlocked}
              />
            </>
          )}

          {showResult && (
            <div className="mb-4">
              <UnlockedCard
                guide={guide}
                firstName={unlocked}
                returning={returning}
                onJump={() => scrollToId("quiz-result")}
              />
            </div>
          )}
        </div>
      </section>

      {showResult && (
        <section id="quiz-result" className="px-5 sm:px-6 py-10 bg-base border-t border-border scroll-mt-20">
          <div className="max-w-[720px] mx-auto">
            <QuizResult guide={guide} result={result} catalogue={catalogue} />
            <button
              type="button"
              onClick={restart}
              className="mt-5 text-[14px] text-text-secondary font-semibold underline bg-transparent border-0 cursor-pointer"
            >
              Retake the quiz
            </button>
          </div>
        </section>
      )}

      {!result && (
        <section className="px-5 sm:px-6 py-10 bg-base border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <GuideContent sections={guide.sections} sources={guide.sources} />
          </div>
        </section>
      )}

      <FaqSection />
    </>
  );
}

/* ---------------- Page ---------------- */

export default function GuidePage() {
  const { slug } = useParams();
  const guide = getGuide(slug);
  const catalogue = usePricingCatalogue();

  if (!guide) {
    return (
      <div className="bg-base min-h-screen overflow-x-hidden">
        <Nav />
        <main className="pt-[120px] pb-20 px-6 text-center">
          <h1 className="text-[2rem] font-extrabold text-text-primary font-heading mb-4">Guide not found</h1>
          <p className="text-text-secondary mb-6">We couldn't find that guide. It may have moved, or the link might be off.</p>
          <Link to="/guides" className="text-primary font-bold no-underline hover:text-primary-dark">
            &larr; All free guides
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const ctaBase = testPanels.find((p) => p.slug === guide.cta?.panelSlug) || null;
  const panel = ctaBase ? withBackendPanelPrice(ctaBase, catalogue) : null;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route={`guides/${guide.slug}`} />
      <Nav />
      <main>
        {guide.kind === "quiz" ? (
          <QuizView key={guide.slug} guide={guide} catalogue={catalogue} />
        ) : (
          <GuideView key={guide.slug} guide={guide} panel={panel} />
        )}
      </main>
      <Footer />
    </div>
  );
}
