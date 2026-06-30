import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { testPanels, singleTests } from "../data/content";
import { SIGN_UP_URL } from "../lib/app-links";

const CONCERNS = [
  { key: "everything", label: "Check everything", icon: "🔍" },
  { key: "diabetes",   label: "Blood sugar / diabetes", icon: "🩸" },
  { key: "heart",      label: "Heart & cholesterol", icon: "❤️" },
  { key: "tired",      label: "Always tired", icon: "😴" },
  { key: "fever",      label: "Fever / feeling unwell", icon: "🤒" },
  { key: "men",        label: "Men's health", icon: "♂️" },
  { key: "women",      label: "Women's health", icon: "♀️" },
  { key: "sti",        label: "Sexual health (private)", icon: "🔒" },
  { key: "liver",      label: "Liver & kidneys", icon: "🫘" },
  { key: "thyroid",    label: "Thyroid / weight", icon: "⚡" },
];

function panelsForConcern(key) {
  if (!key) return [];
  return testPanels.filter((p) => p.concerns.includes(key));
}

const panorama = testPanels.find((p) => p.slug === "panorama");

export default function BookTestPage() {
  const [selected, setSelected] = useState(null);
  const resultRef = useRef(null);

  const handleConcern = (key) => {
    setSelected(key);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const recommended = panelsForConcern(selected);

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="book" />
      <Nav />
      <main>

        {/* ── Hero ── */}
        <section className="pt-[120px] pb-10 px-6 bg-base relative overflow-hidden">
          <GradientOrb color="green" size="560px" className="top-[-10%] right-[-8%]" />
          <GradientOrb color="blue" size="360px" className="bottom-[-10%] left-[-5%]" />
          <div className="max-w-[640px] mx-auto text-center relative z-10">
            <Reveal>
              <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold font-heading leading-[1.1] text-text-primary mb-4">
                Book a health test
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-text-secondary font-body max-w-[480px] mx-auto">
                Not sure what to test? Tell us what's on your mind and we'll point you to the right one.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── "Not sure? Start here" — Panorama spotlight ── */}
        <section className="pb-6 px-6 bg-base relative z-10">
          <div className="max-w-[720px] mx-auto">
            <Reveal delay={0.15}>
              <div className="relative rounded-card border-2 border-primary bg-card p-6 sm:p-8 shadow-[0_20px_60px_rgba(13,148,136,0.10)]">
                <div className="absolute -top-3 left-6 sm:left-8 bg-primary text-white text-[10px] font-extrabold tracking-[0.14em] px-4 py-1 rounded-pill font-heading inline-flex items-center gap-1.5">
                  <Sparkles size={12} /> MOST POPULAR
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex-1">
                    <p className="text-[13px] text-primary font-bold uppercase tracking-wide mb-1">Not sure where to start?</p>
                    <h2 className="text-[22px] sm:text-[26px] font-extrabold text-text-primary font-heading leading-snug mb-2">
                      Panorama — check everything
                    </h2>
                    <p className="text-[14px] text-text-secondary leading-relaxed mb-3">
                      Blood sugar, heart, liver, kidneys, thyroid, and more — all in one visit. If you only do one test this year, this is the one.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-1">
                      <span className="text-[13px] text-text-muted">{panorama.tests.length} tests included</span>
                      <span className="text-[13px] text-text-muted">Results in 48–72 hrs</span>
                      <span className="text-[13px] text-text-muted">Home collection available</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-center gap-2 sm:min-w-[160px]">
                    <Link
                      to="/book/panorama"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-3 text-[14px] font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
                    >
                      Learn more <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── "What's on your mind?" — Concern picker ── */}
        <section className="py-12 lg:py-16 px-6 bg-base">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <h2 className="text-[1.4rem] sm:text-[1.7rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                  Or tell us what's on your mind
                </h2>
                <p className="text-[15px] text-text-secondary">
                  Pick the one that fits and we'll show you the right test.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {CONCERNS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => handleConcern(c.key)}
                    className={`flex flex-col items-center gap-1.5 rounded-card px-3 py-4 text-center transition-all duration-200 cursor-pointer border ${
                      selected === c.key
                        ? "bg-primary-bg border-primary shadow-sm scale-[1.03]"
                        : "bg-card border-border hover:border-primary/30 hover:bg-section-alt"
                    }`}
                  >
                    <span className="text-[20px] leading-none">{c.icon}</span>
                    <span className={`text-[12px] sm:text-[13px] font-semibold leading-tight ${
                      selected === c.key ? "text-primary" : "text-text-primary"
                    }`}>
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Recommendation result ── */}
        {selected && (
          <section ref={resultRef} className="pb-12 px-6 bg-base scroll-mt-24">
            <div className="max-w-[720px] mx-auto">
              <div className="flex flex-col gap-4">
                {recommended.map((panel) => (
                  <Reveal key={panel.slug}>
                    <div className={`rounded-card bg-card border p-5 sm:p-6 transition-all ${
                      panel.popular ? "border-primary border-2" : "border-border"
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[20px] font-extrabold text-text-primary font-heading">
                              {panel.name}
                            </h3>
                            <span className="text-[12px] text-text-muted">· {panel.subtitle}</span>
                          </div>
                          <p className="text-[14px] text-text-secondary leading-relaxed mb-3">
                            {panel.why}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-1">
                            {panel.tests.map((t, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-[12px] text-text-secondary bg-section-alt rounded-pill px-2.5 py-1 border border-border/60">
                                <Check size={10} className="text-primary" />
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center sm:min-w-[140px]">
                          <Link
                            to={`/book/${panel.slug}`}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-5 py-2.5 text-[13px] font-bold font-heading transition-all hover:-translate-y-0.5 no-underline whitespace-nowrap"
                          >
                            Learn more <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── All packages (collapsed by default) ── */}
        <AllPackages />

        {/* ── Single tests ── */}
        <section className="py-12 lg:py-16 px-6 bg-base border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <span className="inline-block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-2">
                  À la carte
                </span>
                <h2 className="text-[1.4rem] sm:text-[1.7rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                  Know exactly what you need?
                </h2>
                <p className="text-[15px] text-text-secondary">
                  Book a single test — no package required.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-card border border-border overflow-hidden">
                {singleTests.map((test, i) => (
                  <Link
                    key={test.slug}
                    to={`/test/${test.slug}`}
                    className={`flex items-center justify-between px-5 py-3.5 no-underline group ${
                      i % 2 === 0 ? "bg-card" : "bg-section-alt/50"
                    } ${i < singleTests.length - 1 ? "border-b border-border/50" : ""}`}
                  >
                    <span className="text-[14px] text-text-primary font-medium group-hover:text-primary transition-colors">{test.name}</span>
                    <ArrowRight size={14} className="text-text-muted group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-center mt-5">
                <a
                  href={SIGN_UP_URL}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3 text-[14px] font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
                >
                  Book a single test <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── How it works strip ── */}
        <section className="py-12 px-6 bg-section-alt border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight text-center mb-6">
                How it works
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { num: "1", title: "Pick a test", desc: "Choose a package above or a single test." },
                  { num: "2", title: "Get tested", desc: "Visit a partner lab or book home collection." },
                  { num: "3", title: "See results", desc: "Clinician-reviewed results in 48–72 hours." },
                ].map((s) => (
                  <div key={s.num} className="flex gap-3 items-start bg-card border border-border rounded-card p-4">
                    <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 text-white text-[12px] font-bold">
                      {s.num}
                    </span>
                    <div>
                      <p className="text-[14px] font-bold text-text-primary mb-0.5">{s.title}</p>
                      <p className="text-[13px] text-text-secondary leading-snug">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="text-center mt-5">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 text-primary text-[14px] font-semibold no-underline hover:text-primary-dark transition-colors"
                >
                  See the full process <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-16 lg:py-20 px-6 bg-primary relative overflow-hidden">
          <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
          <div className="max-w-[520px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.4rem] font-extrabold text-white font-heading tracking-tight mb-4">
                Still not sure?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/80 leading-relaxed font-body mb-6">
                WhatsApp us and we'll help you pick the right test — no pressure, no charge.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/233209876543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary rounded-btn px-7 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
                >
                  Chat on WhatsApp
                </a>
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 rounded-btn px-7 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 hover:bg-white/20 no-underline"
                >
                  Explore health programs
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function AllPackages() {
  const [showAll, setShowAll] = useState(false);
  const panels = testPanels.filter((p) => p.slug !== "panorama");

  return (
    <section className="py-8 px-6 bg-base">
      <div className="max-w-[720px] mx-auto">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="w-full flex items-center justify-between py-4 px-5 rounded-card border border-border bg-card hover:bg-section-alt transition-colors cursor-pointer"
        >
          <div className="text-left">
            <p className="text-[15px] font-bold text-text-primary font-heading">
              View all {testPanels.length} test packages
            </p>
            <p className="text-[13px] text-text-muted">
              Compare every panel side by side
            </p>
          </div>
          <ChevronRight
            size={18}
            className={`text-text-muted transition-transform duration-200 shrink-0 ${showAll ? "rotate-90" : ""}`}
          />
        </button>

        {showAll && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {panels.map((panel) => (
              <div
                key={panel.slug}
                className="rounded-card border border-border bg-card p-4 hover:border-primary/30 transition-colors"
              >
                <div className="mb-2">
                  <h4 className="text-[16px] font-extrabold text-text-primary font-heading">{panel.name}</h4>
                  <p className="text-[12px] text-text-muted">{panel.subtitle}</p>
                </div>
                <p className="text-[12px] text-text-secondary mb-3">{panel.tests.join(" · ")}</p>
                <Link
                  to={`/book/${panel.slug}`}
                  className="w-full py-2 rounded-btn text-[13px] font-bold font-heading text-center no-underline bg-section-alt border border-border hover:border-primary/30 text-text-primary hover:text-primary transition-all block"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
