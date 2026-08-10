import { Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Seo from "../components/Seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import ConsultationBooking from "../components/consultation/ConsultationBooking";
import {
  CONSULT_MINUTES,
  CONSULTANTS,
  DISCLAIMER,
  FAQ,
  HOW_IT_WORKS,
  PROMISE,
  SHARED_IMAGES,
  VARIANTS,
} from "../data/wellness-consultation";

/**
 * One page shell driving all four A/B/C/D landing variants. The cells differ by
 * AUDIENCE (blood sugar / blood pressure / general wellness / fertility), not by
 * layout — holding structure, team block and FAQ constant is what makes a
 * difference in results attributable to the audience rather than the furniture.
 *
 * Variant copy: src/data/wellness-consultation.js
 * Audience briefs: artifacts/wellness-consultation/ABCD_TEST.md
 */
export default function WellnessConsultationPage() {
  const { variant: slug } = useParams();
  const v = VARIANTS[slug];

  // Unknown slug — send to the general-wellness cell rather than a 404. A
  // mistyped URL in a live ad should still land somewhere that converts.
  if (!v) return <Navigate to="/wellness-consultation/wellness" replace />;

  const scrollToBooking = (e) => {
    e.preventDefault();
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route={`wellness-consultation/${slug}`} />
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-base px-6 pt-[112px] pb-14 lg:pb-20">
          <GradientOrb color="green" size="620px" className="top-[-14%] right-[-10%]" />
          <GradientOrb color="blue" size="380px" className="bottom-[-16%] left-[-8%]" />
          <div className="relative z-10 mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <Reveal>
                <span className="mb-5 inline-flex items-center gap-2 rounded-pill border border-primary/25 bg-primary-bg px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
                  {v.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mb-5 font-heading text-[2rem] font-extrabold leading-[1.08] tracking-tight text-text-primary sm:text-[2.6rem] lg:text-[3.1rem]">
                  {v.h1}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mb-7 max-w-[560px] font-body text-[17px] leading-relaxed text-text-secondary">
                  {v.lede}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#book"
                    onClick={scrollToBooking}
                    className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-7 py-4 font-heading text-[15px] font-bold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-glow-green"
                  >
                    Book your free call <ArrowRight size={17} />
                  </a>
                  <span className="text-[14px] text-text-secondary">
                    {CONSULT_MINUTES} minutes · nothing to pay
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <figure className="relative">
                <img
                  src={v.hero.src}
                  alt={v.hero.alt}
                  width={1200}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-[4/3] w-full rounded-card object-cover shadow-[0_24px_70px_rgba(43,58,58,0.16)]"
                />
                <figcaption className="absolute -bottom-4 left-4 right-4 rounded-card border border-border bg-card/95 px-4 py-3 shadow-card backdrop-blur sm:left-6 sm:right-auto sm:max-w-[300px]">
                  <p className="text-[13px] leading-snug text-text-secondary">
                    <strong className="text-text-primary">A written plan</strong>, on WhatsApp
                    within a day of your call.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ── What you walk away with ── */}
        <section className="border-t border-border bg-section-alt px-6 py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <Reveal>
              <img
                src={SHARED_IMAGES.plan.src}
                alt={SHARED_IMAGES.plan.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-card object-cover shadow-card"
              />
            </Reveal>
            <div>
              <Reveal>
                <h2 className="mb-3 font-heading text-[1.55rem] font-extrabold tracking-tight text-text-primary sm:text-[2rem]">
                  What you&apos;ll walk away with
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mb-7 text-[15px] leading-relaxed text-text-secondary">
                  Three things, in writing, within 24 hours of your call.
                </p>
              </Reveal>
              <div className="flex flex-col gap-4">
                {PROMISE.map((item, i) => (
                  <Reveal key={item.title} delay={0.1 + i * 0.06}>
                    <div className="flex gap-3.5 rounded-card border border-border bg-card p-4 sm:p-5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check size={14} className="text-white" />
                      </span>
                      <div>
                        <p className="mb-1 text-[15px] font-bold text-text-primary">{item.title}</p>
                        <p className="text-[14px] leading-relaxed text-text-secondary">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Booking ── */}
        <section id="book" className="scroll-mt-20 border-t border-border bg-base px-6 py-16 lg:py-20">
          {/* [&>*]:min-w-0 is load-bearing: a grid item's automatic minimum size
              is min-content, and the picker's 14-day strip is ~970px wide before
              it's allowed to scroll. Without this the strip forces its column
              open and crushes the column beside it to a few characters wide. */}
          <div className="mx-auto grid max-w-[1120px] items-start gap-10 [&>*]:min-w-0 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <Reveal>
                <h2 className="mb-3 font-heading text-[1.55rem] font-extrabold tracking-tight text-text-primary sm:text-[2rem]">
                  Pick a time that suits you
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mb-6 text-[15px] leading-relaxed text-text-secondary">
                  {CONSULT_MINUTES} minutes with a BetterHealth Wellness Consultant, on Google Meet
                  or an ordinary phone call. No payment, and no test required.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <img
                  src={SHARED_IMAGES.consult.src}
                  alt={SHARED_IMAGES.consult.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="hidden aspect-[3/2] w-full rounded-card object-cover shadow-card lg:block"
                />
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ConsultationBooking variant={v.variant} concern={v.concern} />
            </Reveal>
          </div>
        </section>

        {/* ── The question they don't ask out loud ── */}
        <section className="border-t border-border bg-section-alt px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <div className="rounded-card border-l-[3px] border-primary bg-card p-6 shadow-card sm:p-8">
                <p className="mb-3 font-heading text-[1.25rem] font-extrabold leading-snug text-text-primary sm:text-[1.5rem]">
                  &ldquo;{v.unspoken.q}&rdquo;
                </p>
                <p className="text-[15px] leading-relaxed text-text-secondary">{v.unspoken.a}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Variant body ── */}
        <section className="border-t border-border bg-base px-6 py-16 lg:py-20">
          <div className="mx-auto flex max-w-[720px] flex-col gap-10">
            {v.body.map((block, i) => (
              <Reveal key={block.heading} delay={i * 0.06}>
                <div>
                  <h2 className="mb-3 font-heading text-[1.3rem] font-extrabold tracking-tight text-text-primary sm:text-[1.6rem]">
                    {block.heading}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {block.paras.map((p, j) => (
                      <p key={j} className="text-[15px] leading-relaxed text-text-secondary">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="rounded-card border border-border bg-card p-5 sm:p-6">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                  Often the starting point
                </p>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-[19px] font-extrabold text-text-primary">
                    {v.panel.displayName}
                  </h3>
                  <span className="font-heading text-[17px] font-bold text-primary">
                    {v.panel.price}
                  </span>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
                  Your consultant will tell you whether this is the right place to start for you,
                  and say so plainly if something smaller would answer your question. You decide
                  after the call, in your own time.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="border-t border-border bg-section-alt px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-[1120px]">
            <Reveal>
              <h2 className="mb-9 text-center font-heading text-[1.55rem] font-extrabold tracking-tight text-text-primary sm:text-[2rem]">
                How it works
              </h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className="h-full rounded-card border border-border bg-card p-5">
                    <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-heading text-[13px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="mb-1.5 text-[15px] font-bold text-text-primary">{step.title}</p>
                    <p className="text-[14px] leading-relaxed text-text-secondary">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who you'll speak to ── */}
        <section className="border-t border-border bg-base px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-[720px] text-center">
            <Reveal>
              <h2 className="mb-3 font-heading text-[1.55rem] font-extrabold tracking-tight text-text-primary sm:text-[2rem]">
                Who you&apos;ll speak to
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mb-8 text-[15px] leading-relaxed text-text-secondary">
                One of our Wellness Consultants. They&apos;re not doctors and won&apos;t diagnose
                anything — if something needs a doctor, they&apos;ll say so, and a doctor reviews
                any results you go on to have done.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap justify-center gap-2.5">
                {CONSULTANTS.map((c) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-2 rounded-pill border border-border bg-card px-4 py-2 text-[14px] font-semibold text-text-primary"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-bg font-heading text-[12px] font-bold text-primary">
                      {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    {c.name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-border bg-section-alt px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <h2 className="mb-8 font-heading text-[1.55rem] font-extrabold tracking-tight text-text-primary sm:text-[2rem]">
                Before you book
              </h2>
            </Reveal>
            <div className="flex flex-col gap-3">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.04}>
                  <details className="group rounded-card border border-border bg-card p-5">
                    <summary className="cursor-pointer list-none text-[15px] font-bold text-text-primary marker:hidden">
                      {item.q}
                    </summary>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-text-secondary">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="relative overflow-hidden bg-primary px-6 py-16 lg:py-20">
          <GradientOrb color="green" size="520px" className="right-[-10%] top-[-20%] opacity-30" />
          <div className="relative z-10 mx-auto max-w-[560px] text-center">
            <Reveal>
              <h2 className="mb-4 font-heading text-[1.55rem] font-extrabold tracking-tight text-white sm:text-[2.1rem]">
                Twenty minutes could give you a plan
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mb-7 font-body text-[16px] leading-relaxed text-white/80">
                Free, no test required, and the plan is yours to keep either way.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="#book"
                onClick={scrollToBooking}
                className="inline-flex items-center justify-center gap-2 rounded-btn bg-white px-8 py-4 font-heading text-[15px] font-bold text-primary no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book your free call <ArrowRight size={17} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="bg-base px-6 py-8">
          <div className="mx-auto flex max-w-[720px] items-start gap-2.5">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-text-muted" />
            <p className="text-[12.5px] leading-relaxed text-text-muted">{DISCLAIMER}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
