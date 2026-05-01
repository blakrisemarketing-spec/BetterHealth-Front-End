import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown,
  UserPlus, CalendarDays, BarChart3, Zap,
  FlaskConical, UserCheck, ShieldCheck, PackageCheck,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { howItWorksPage } from "../data/content";

const STEP_ICONS = [UserPlus, CalendarDays, BarChart3, Zap];
const SAFETY_ICONS = { FlaskConical, UserCheck, ShieldCheck, PackageCheck };

const carouselSlides = [
  { src: 'screenshots/desktop-dashboard.webp', title: 'Your Health Dashboard', sub: 'All biomarkers in one place' },
  { src: 'screenshots/desktop-healthscore.webp', title: 'Track Every Biomarker', sub: 'Monitor 40+ health markers' },
  { src: 'screenshots/desktop-results.webp', title: 'Deep-Dive Analytics', sub: 'Trends, ranges & AI insights' },
];

function DashboardCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % carouselSlides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Reveal delay={0.15}>
        <div className="rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.5)] border border-white/[0.06]">
          {/* Browser chrome */}
          <div className="bg-[#E8EAED] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex-1 bg-white rounded-full px-3 py-1 text-[11px] text-gray-400 font-medium">
              app.betterhealth.africa
            </div>
          </div>
          {/* Screenshot */}
          <div className="relative aspect-[2756/1646] bg-[#F5F3EF]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={`${import.meta.env.BASE_URL}${carouselSlides[active].src}`}
                alt={carouselSlides[active].title}
                className="w-full h-full object-cover object-top absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
              />
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-6">
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
              i === active ? "bg-primary scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Labels */}
      <Reveal delay={0.25}>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {carouselSlides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`bg-transparent border-none cursor-pointer transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <p className="text-white font-bold font-heading text-[15px]">{slide.title}</p>
              <p className="text-text-muted-dark text-[13px] mt-1 font-body">{slide.sub}</p>
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

// ── FAQ Accordion ──────────────────────────────────────────────────────────────
function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10 cursor-pointer" onClick={onToggle}>
      <div className="flex justify-between items-center py-5 gap-4">
        <span className="text-base font-semibold text-white font-heading">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary shrink-0"
        >
          <ChevronDown size={20} />
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] leading-relaxed text-text-muted-dark font-body m-0">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Step Block ─────────────────────────────────────────────────────────────────
function StepBlock({ step, index }) {
  const Icon = STEP_ICONS[index];
  const isOdd = index % 2 === 0;

  return (
    <Reveal>
      <div className={`py-20 px-6 relative overflow-hidden ${index % 2 === 1 ? "bg-section-alt" : "bg-base"}`}>
        {/* Decorative step number */}
        <span
          className="absolute font-extrabold font-heading select-none pointer-events-none"
          style={{
            fontSize: "clamp(120px, 20vw, 220px)",
            color: "rgba(13,148,136,0.05)",
            top: "-10px",
            [isOdd ? "right" : "left"]: "-20px",
            lineHeight: 1,
          }}
        >
          {step.num}
        </span>

        <div className={`max-w-[1100px] mx-auto flex flex-col ${isOdd ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 lg:gap-20 relative z-10`}>
          {/* Text side */}
          <div className="flex-1 min-w-0">
            {/* Step badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <Icon size={22} className="text-white" />
              </div>
              <span className="text-sm font-bold text-primary font-heading tracking-widest uppercase">
                Step {step.num}
              </span>
            </div>

            <h2 className="text-[2rem] md:text-[2.4rem] font-extrabold text-text-primary font-heading tracking-tight leading-[1.1] mb-4">
              {step.heading}
            </h2>

            <p className="text-[17px] text-text-secondary leading-relaxed font-body mb-6 max-w-[520px]">
              {step.body}
            </p>

            {/* What to expect */}
            <div className="mb-6">
              <p className="text-xs font-bold text-text-muted uppercase tracking-[0.12em] mb-3">What to expect</p>
              <ul className="flex flex-col gap-2.5">
                {step.expects.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5 shrink-0">
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[14px] text-text-secondary leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub-section glassmorphism card */}
            {step.subSection && (
              <div className="bg-white/60 backdrop-blur-sm border border-border rounded-2xl p-6">
                <h3 className="text-[17px] font-bold text-text-primary font-heading mb-2">
                  {step.subSection.heading}
                </h3>
                <p className="text-[14px] text-text-secondary leading-relaxed mb-4 font-body">
                  {step.subSection.body}
                </p>
                <ul className="flex flex-col gap-2">
                  {step.subSection.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">→</span>
                      <span className="text-[13px] text-text-secondary leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Visual side — decorative step number card */}
          <div className="flex-shrink-0 w-full max-w-[260px] aspect-square md:max-w-[300px] rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 flex items-center justify-center relative overflow-hidden">
            <span className="text-[110px] font-extrabold text-primary/20 font-heading leading-none select-none">
              {step.num}
            </span>
            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const { hero, steps, safetyCards, faqs, bottomCta } = howItWorksPage;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>How It Works — BetterHealth Africa</title>
        <meta name="description" content="Sign up, book a collection, and get your results in 48 hours. Learn how BetterHealth Africa makes comprehensive health screening simple and accessible." />
        <link rel="canonical" href="https://www.betterhealth.africa/how-it-works" />
        <meta property="og:url" content="https://www.betterhealth.africa/how-it-works" />
        <meta property="og:title" content="How It Works — BetterHealth Africa" />
        <meta property="og:description" content="Sign up, book a collection, and get your results in 48 hours. Learn how BetterHealth Africa makes comprehensive health screening simple and accessible." />
      </Helmet>
      <Nav />
      <main>

      {/* ── Hero ── */}
      <section className="min-h-[60vh] flex items-center pt-[80px] md:pt-[120px] pb-16 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="600px" className="top-[-10%] right-[-10%]" />
        <GradientOrb color="blue" size="400px" className="bottom-[-10%] left-[-5%]" />
        <div className="max-w-[760px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              {hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[2.2rem] md:text-[3.6rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-5">
              From sign-up to results in{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal">
                72 hours.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-text-secondary max-w-[600px] mx-auto mb-8 font-body">
              {hero.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="https://app.betterhealth.africa/join"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
            >
              {hero.cta} <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── 4 Steps ── */}
      <div>
        {steps.map((step, i) => (
          <StepBlock key={step.num} step={step} index={i} />
        ))}
      </div>

      {/* ── Dashboard Preview (triptych) ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-bg-dark overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">Your Health, Visualised</p>
              <h2 className="text-[2rem] md:text-[2.4rem] font-extrabold text-white font-heading tracking-tight">
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal">
                  understand your health.
                </span>
              </h2>
              <p className="mt-4 text-[16px] text-text-muted-dark font-body max-w-[540px] mx-auto">
                From a 10,000-foot view of your overall health to a deep dive on any single biomarker — all in one place.
              </p>
            </div>
          </Reveal>
          <DashboardCarousel />
        </div>
      </section>

      {/* ── Safety & Quality ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-base">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
                Your safety matters
              </p>
              <h2 className="text-[2rem] md:text-[2.4rem] font-extrabold text-text-primary font-heading tracking-tight">
                Accredited labs. Certified collectors.{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Encrypted data.
                </span>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {safetyCards.map((card, i) => {
              const Icon = SAFETY_ICONS[card.icon] || ShieldCheck;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-white/60 backdrop-blur-sm border border-border rounded-card p-7 hover:-translate-y-1 transition-all duration-300 hover:shadow-card hover:border-primary/20">
                    <div className="w-11 h-11 rounded-xl bg-primary-bg border border-primary/20 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="text-[17px] font-bold text-text-primary font-heading mb-2">{card.title}</h3>
                    <p className="text-[14px] text-text-secondary leading-relaxed font-body">{card.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-bg-dark">
        <div className="max-w-[720px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">FAQ</p>
              <h2 className="text-[2rem] md:text-[2.4rem] font-extrabold text-white font-heading tracking-tight">
                Questions?{" "}
                <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent tracking-normal">
                  Answered.
                </span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[640px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-white font-heading tracking-tight mb-4">
              {bottomCta.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] text-white/80 leading-relaxed font-body mb-8">
              {bottomCta.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="https://app.betterhealth.africa/join"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              {bottomCta.cta} <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
