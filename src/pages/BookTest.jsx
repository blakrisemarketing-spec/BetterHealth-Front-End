import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { testPanels, singleTests } from "../data/content";
import { SIGN_UP_URL } from "../lib/app-links";
import {
  usePricingCatalogue,
  withBackendPanelPrices,
  withBackendSingleTestPrices,
} from "../lib/pricing-catalogue";

const CONCERNS = [
  { key: "everything", label: "Check everything", icon: "🔍" },
  { key: "diabetes",   label: "Blood sugar / diabetes", icon: "🩸" },
  { key: "heart",      label: "Heart & cholesterol", icon: "❤️" },
  { key: "general",    label: "General check-up", icon: "🩺" },
  { key: "liver",      label: "Kidneys & liver", icon: "🫘" },
  { key: "fever",      label: "Fever / feeling unwell", icon: "🤒" },
  { key: "men",        label: "Men's health", icon: "♂️" },
  { key: "women",      label: "Women's health", icon: "♀️" },
  { key: "fertility",  label: "Trying to conceive", icon: "👶" },
  { key: "sti",        label: "Sexual health (private)", icon: "🔒" },
];

function panelsForConcern(key, panels) {
  if (!key) return [];
  return panels.filter((p) => p.concerns.includes(key));
}

export default function BookTestPage() {
  const [selected, setSelected] = useState(null);
  const resultRef = useRef(null);
  const backendPrices = usePricingCatalogue();
  const pricedPanels = withBackendPanelPrices(testPanels, backendPrices);
  const pricedSingleTests = withBackendSingleTestPrices(singleTests, backendPrices);
  const panorama = pricedPanels.find((p) => p.slug === "panorama");
  const packageRows = [
    pricedPanels.slice(0, Math.ceil(pricedPanels.length / 2)),
    pricedPanels.slice(Math.ceil(pricedPanels.length / 2)),
  ];

  const handleConcern = (key) => {
    setSelected(key);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const recommended = panelsForConcern(selected, pricedPanels);

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="book-tests" />
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
                    <p className="text-[13px] text-primary font-bold uppercase tracking-wide mb-1">{panorama.name}</p>
                    <h2 className="text-[22px] sm:text-[26px] font-extrabold text-text-primary font-heading leading-snug mb-2">
                      {panorama.displayName}
                    </h2>
                    <p className="text-[14px] text-text-secondary leading-relaxed mb-3">
                      {panorama.why}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-1">
                      <span className="text-[13px] text-text-muted">{panorama.tests.length} tests included</span>
                      <span className="text-[13px] text-text-muted">Results in 48 to 72 hours</span>
                      <span className="text-[13px] text-text-muted">Home collection available</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-center gap-2 sm:min-w-[160px]">
                    <Link
                      to="/book-tests/panorama"
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
                  Pick the one that sounds like you and we'll show you the right test.
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
                          <div className="mb-1.5">
                            <span className="block text-[11px] font-bold text-primary uppercase tracking-[0.1em] mb-0.5">
                              {panel.name}
                            </span>
                            <h3 className="text-[20px] font-extrabold text-text-primary font-heading leading-tight">
                              {panel.displayName}
                            </h3>
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
                            to={`/book-tests/${panel.slug}`}
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
        <AllPackages packageRows={packageRows} />

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
                  Book a single test on its own. No package needed.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-card border border-border overflow-hidden">
                {pricedSingleTests.map((test, i) => (
                  <Link
                    key={test.slug}
                    to={`/test/${test.slug}`}
                    className={`flex items-center justify-between px-5 py-3.5 no-underline group ${
                      i % 2 === 0 ? "bg-card" : "bg-section-alt/50"
                    } ${i < singleTests.length - 1 ? "border-b border-border/50" : ""}`}
                  >
                    <span className="min-w-0 pr-2 text-[14px] text-text-primary font-medium group-hover:text-primary transition-colors">{test.name}</span>
                    <span className="ml-3 inline-flex shrink-0 items-center gap-2">
                      <span className="text-[13px] font-bold text-primary">{test.price}</span>
                      <ArrowRight size={14} className="text-text-muted group-hover:text-primary transition-colors shrink-0" />
                    </span>
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
                  { num: "3", title: "See results", desc: "A doctor reviews your results, ready in 48 to 72 hours." },
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
                Message us on WhatsApp and we'll help you pick the right test. No pressure, no charge.
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

function AllPackages({ packageRows }) {
  return (
    <section className="py-12 lg:py-14 bg-base overflow-hidden">
      <Reveal>
        <div className="max-w-[720px] mx-auto text-center px-6 mb-7">
          <span className="inline-block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-2">
            Test packages
          </span>
          <h2 className="text-[1.4rem] sm:text-[1.7rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
            Compare every panel at a glance
          </h2>
          <p className="text-[15px] text-text-secondary">
            Swipe the rows or tap any package to see what is included.
          </p>
        </div>
      </Reveal>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-base to-transparent" />
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {packageRows.map((row, index) => (
            <PackageMarqueeRow
              key={index}
              panels={row}
              direction={index === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageMarqueeRow({ panels, direction = "left" }) {
  return (
    <div className="overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-hidden sm:px-0 sm:snap-none">
      <div
        className={`flex w-max gap-2.5 pr-4 motion-reduce:animate-none sm:gap-3 sm:px-3 sm:pr-0 ${
          direction === "left" ? "sm:animate-marquee-left" : "sm:animate-marquee-right"
        } hover:[animation-play-state:paused] active:[animation-play-state:paused]`}
        style={{ animationDuration: direction === "left" ? "52s" : "48s" }}
      >
        {panels.map((panel) => (
          <PackageCard key={panel.slug} panel={panel} />
        ))}
        {panels.map((panel) => (
          <PackageCard
            key={`${panel.slug}-marquee-copy`}
            panel={panel}
            className="hidden sm:flex"
          />
        ))}
      </div>
    </div>
  );
}

function PackageCard({ panel, className = "" }) {
  return (
    <Link
      to={`/book-tests/${panel.slug}`}
      className={`group flex h-[152px] w-[58vw] min-w-[208px] max-w-[232px] snap-start flex-col justify-between rounded-card border border-border bg-card p-4 text-left no-underline shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_rgba(43,58,58,0.10)] sm:h-[168px] sm:w-[316px] sm:min-w-[316px] sm:max-w-none sm:snap-align-none sm:p-4 ${className}`}
    >
      <div>
        <div className="mb-2 flex items-start justify-between gap-2.5 sm:gap-3">
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-primary uppercase tracking-[0.1em] mb-0.5 sm:text-[11px]">
              {panel.name}
            </span>
            <h3 className="text-[16px] font-extrabold text-text-primary font-heading leading-tight sm:text-[18px]">
              {panel.displayName}
            </h3>
          </div>
          {panel.popular && (
            <span className="shrink-0 rounded-pill bg-primary-bg px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-primary sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.08em]">
              Popular
            </span>
          )}
        </div>

        <p className="text-[13px] font-bold text-primary sm:hidden">
          {panel.price} · {panel.tests.length} tests included
        </p>

        <div className="hidden flex-wrap gap-1.5 sm:flex">
          {panel.tests.slice(0, 3).map((test) => (
            <span
              key={test}
              className="rounded-pill border border-border/70 bg-section-alt/70 px-2 py-1 text-[11px] font-medium text-text-secondary"
            >
              {test}
            </span>
          ))}
          {panel.tests.length > 3 && (
            <span className="rounded-pill border border-primary/20 bg-primary-bg px-2 py-1 text-[11px] font-bold text-primary">
              +{panel.tests.length - 3}
            </span>
          )}
        </div>
      </div>

      <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary transition-colors group-hover:text-primary-dark sm:text-[13px]">
        <span className="sm:hidden">View</span>
        <span className="hidden sm:inline">{panel.price}</span>
        <span className="hidden sm:inline text-text-muted">·</span>
        <span className="hidden sm:inline">Learn more</span>
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}
