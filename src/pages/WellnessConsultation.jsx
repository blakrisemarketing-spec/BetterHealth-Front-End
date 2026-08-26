import { Navigate, useParams } from "react-router-dom";
import { ArrowRight, BadgeCheck, Check, FlaskConical, Microscope, ShieldCheck, X } from "lucide-react";
import Seo from "../components/Seo";
import Footer from "../components/Footer";
import Fade from "../components/consultation/Fade";
import GradientOrb from "../components/ui/GradientOrb";
import ConsultationBooking from "../components/consultation/ConsultationBooking";
import CampaignNav from "../components/consultation/CampaignNav";
import StickyCTA from "../components/consultation/StickyCTA";
import QualifyChecklist from "../components/consultation/QualifyChecklist";
import ProofWall from "../components/consultation/ProofWall";
import HeroMedia from "../components/consultation/HeroMedia";
import {
  CONSULT_MINUTES,
  DISCLAIMER,
  FAQ,
  HERO_CHECKS,
  HERO_CTA_NOTE,
  PLAN_SECTION_HEADING,
  PROMISE,
  SCOPE,
  SESSION_SHEET,
  SHARED_IMAGES,
  TRUST_POINTS,
  VARIANTS,
} from "../data/wellness-consultation";

const TRUST_ICONS = {
  flask: FlaskConical,
  badge: BadgeCheck,
  shield: ShieldCheck,
  science: Microscope,
};

/**
 * One page shell driving all four A/B/C/D landing variants. The cells differ by
 * AUDIENCE (blood sugar / blood pressure / general wellness / fertility), not by
 * layout — holding structure, proof, team and FAQ constant is what makes a
 * difference in results attributable to the audience rather than the furniture.
 *
 * Section order is a conversion argument, and each section is doing one job:
 *
 *   hero        get read in three seconds, kill the three cost/effort objections
 *   trust       borrow institutional credibility before asking for attention
 *   agitate     cost of inaction, the emotional engine of the page
 *   checklist   the reader decides the page is about them
 *   book        the conversion point, the moment they have decided
 *   belief      kill the false belief that stops the booking
 *   mechanism   why the problem stays hidden, and what we'd actually look at
 *   promise     what they walk away with
 *   inside      the twenty minutes, minute by minute
 *   proof       borrow trust from members who tested
 *   scope       the boundaries of the call
 *   faq         last objections
 *   close       one more ask
 *
 * The booking form sits high, directly under the checklist, rather than after
 * the whole argument. Everything below it is for the reader who is not ready
 * yet; the sticky CTA and the closing block carry them back up.
 *
 * Four blocks were cut on 2026-08-18 — a four-card how-it-works, a plan-covers
 * pill wall, an us-vs-them table and a consultant roster. Each restated
 * something the page already said, and the length was costing more than they
 * returned. They are one `git revert` away if a cell's numbers argue for them.
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
      <CampaignNav onCta={scrollToBooking} />
      <main>
{/* ── Hero ──
            No Reveal on the headline, sub or CTA. Everything else on the page
            fades in on scroll, but the LCP element of an ad landing page cannot
            spend its first second at opacity 0 — on a Ghanaian 3G connection
            that is a blank screen at exactly the moment the click is regretted. */}
        <section className="relative overflow-hidden bg-base px-5 pt-[104px] pb-12 sm:px-6 lg:pb-20">
          <GradientOrb color="green" size="620px" className="top-[-14%] right-[-10%]" />
          <GradientOrb color="blue" size="380px" className="bottom-[-16%] left-[-8%]" />
          <div className="relative z-10 mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-primary/25 bg-primary-bg px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
                {v.eyebrow}
              </span>

              <h1 className="mb-5 font-heading text-[2.05rem] font-extrabold leading-[1.06] tracking-tight text-text-primary sm:text-[2.6rem] lg:text-[3.1rem]">
                {v.h1}
              </h1>

              <div className="mb-7 flex max-w-[540px] flex-col gap-3.5">
                {v.heroSub.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-[16.5px] leading-relaxed text-text-secondary sm:text-[17px]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#book"
                  onClick={scrollToBooking}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-btn bg-primary px-8 py-4 font-heading text-[16px] font-bold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-glow-green"
                >
                  Book a call <ArrowRight size={17} />
                </a>
                <span className="text-[13.5px] font-semibold text-text-secondary">
                  {HERO_CTA_NOTE}
                </span>
              </div>
            </div>

            <HeroMedia
              vimeoId={v.hero.vimeoId}
              poster={v.hero.poster}
              alt={v.hero.alt}
            />
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="border-y border-border bg-section-alt px-5 py-5 sm:px-6">
          <ul className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {TRUST_POINTS.map((point) => {
              const Icon = TRUST_ICONS[point.icon];
              return (
                <li key={point.label} className="flex items-center gap-2">
                  <Icon size={16} className="shrink-0 text-primary" />
                  <span className="text-[13px] font-semibold text-text-secondary">
                    {point.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── The plan · cost of inaction ── */}
        <section className="bg-base px-5 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[720px]">
            <Fade>
              <h2 className="mb-5 font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                {PLAN_SECTION_HEADING}
              </h2>
            </Fade>
            {/* Readable weight, not bold. The lead is long — it describes the
                fear — and setting it heavy makes a wall the reader skips. The
                short `turn` lines below are what get the emphasis. */}
            <Fade delay={0.06}>
              <p className="mb-7 font-body text-[17px] font-medium leading-relaxed text-text-primary sm:text-[18px]">
                {v.agitate.lead}
              </p>
            </Fade>

            {/* The photograph that used to be the hero. It sits at the pivot on
                purpose — the argument turns from fear to "it needn't be your
                reality" right here, and a human face carries that better than
                another paragraph. */}
            <Fade delay={0.1}>
              <img
                src={v.photo.src}
                alt={v.photo.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="mb-7 aspect-[3/2] w-full rounded-card object-cover shadow-card"
              />
            </Fade>

            {v.agitate.turn && (
              <Fade delay={0.12}>
                <div className="mb-7 border-l-[3px] border-primary pl-5">
                  {v.agitate.turn.map((line, i) => (
                    <p
                      key={i}
                      className="font-heading text-[17px] font-bold leading-relaxed text-text-primary sm:text-[19px]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Fade>
            )}

            <div className="mb-8 flex flex-col gap-3.5">
              {v.agitate.paras.map((p, i) => (
                <Fade key={i} delay={0.1 + i * 0.06}>
                  <p className="text-[17px] leading-relaxed text-text-secondary">{p}</p>
                </Fade>
              ))}
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {v.agitate.stats.map((stat, i) => (
                <Fade key={stat.label} delay={0.14 + i * 0.06}>
                  <div className="h-full rounded-card border border-accent-soft bg-accent-bg p-5">
                    <p className="font-heading text-[1.9rem] font-extrabold leading-none tracking-tight text-accent-ink">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={0.2}>
              <p className="border-l-[3px] border-accent-dark pl-5 font-heading text-[17px] font-bold leading-relaxed text-text-primary sm:text-[19px]">
                {v.agitate.cost}
              </p>
            </Fade>
          </div>
        </section>

        {/* ── Self-qualification ── */}
        <section className="bg-base px-5 pb-14 sm:px-6 lg:pb-20">
          <QualifyChecklist
            heading={v.checklist.heading}
            items={v.checklist.items}
            onCta={scrollToBooking}
          />
        </section>

        {/* ── Booking — the one conversion point on the page ── */}
        <section id="book" className="scroll-mt-[76px] border-t border-border bg-base px-5 py-14 sm:px-6 lg:py-20">
          {/* [&>*]:min-w-0 is load-bearing: a grid item's automatic minimum size
              is min-content, and the picker's 14-day strip is ~970px wide before
              it's allowed to scroll. Without this the strip forces its column
              open and crushes the column beside it to a few characters wide. */}
          <div className="mx-auto grid max-w-[1120px] items-start gap-8 [&>*]:min-w-0 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <Fade>
                <h2 className="mb-3 font-heading text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.45rem]">
                  Pick a time that suits you
                </h2>
              </Fade>
              <Fade delay={0.06}>
                <p className="mb-6 text-[17px] leading-relaxed text-text-secondary">
                  {CONSULT_MINUTES} minutes with a BetterHealth Wellness Consultant, on Google Meet
                  or an ordinary phone call. The call and your written plan are free.
                </p>
              </Fade>
              <Fade delay={0.1}>
                <ul className="mb-7 flex flex-col gap-2.5">
                  {HERO_CHECKS.map((check) => (
                    <li key={check} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check size={12} strokeWidth={3.5} className="text-white" />
                      </span>
                      <span className="text-[14.5px] font-semibold leading-snug text-text-primary">
                        {check}
                      </span>
                    </li>
                  ))}
                </ul>
              </Fade>
              <Fade delay={0.14}>
                <img
                  src={SHARED_IMAGES.consult.src}
                  alt={SHARED_IMAGES.consult.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="hidden aspect-[3/2] w-full rounded-card object-cover shadow-card lg:block"
                />
              </Fade>
            </div>
            <Fade delay={0.1}>
              <ConsultationBooking variant={v.variant} concern={v.concern} />
            </Fade>
          </div>
        </section>

        {/* ── False belief ── */}
        <section className="border-t border-border bg-section-alt px-5 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[720px]">
            <Fade>
              <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                What most people fear
              </p>
            </Fade>
            <Fade delay={0.06}>
              <p className="mb-6 font-heading text-[1.35rem] font-extrabold leading-snug text-text-primary sm:text-[1.7rem]">
                {v.belief.myth}
              </p>
            </Fade>
            <Fade delay={0.12}>
              <div className="rounded-card border-l-[3px] border-primary bg-card p-6 shadow-card sm:p-7">
                <p className="mb-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  What&apos;s actually true
                </p>
                <p className="text-[17px] leading-relaxed text-text-secondary">
                  {v.belief.truth}
                </p>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── Mechanism · why it stays hidden, what we'd look at ── */}
        <section className="bg-section-alt px-5 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto flex max-w-[720px] flex-col gap-9">
            {v.body.map((block, i) => (
              <Fade key={block.heading} delay={i * 0.06}>
                <div>
                  <h2 className="mb-3 font-heading text-[1.3rem] font-extrabold tracking-tight text-text-primary sm:text-[1.6rem]">
                    {block.heading}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {block.paras.map((p, j) => (
                      <p key={j} className="text-[17px] leading-relaxed text-text-secondary">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}

            <Fade>
              <div className="rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                  Often the baseline
                </p>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-[19px] font-extrabold text-text-primary">
                    {v.panel.displayName}
                  </h3>
                  <span className="font-heading text-[17px] font-bold text-primary">
                    {v.panel.price}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                  Your consultant will tell you whether this is the right baseline for you, and say
                  so plainly if something smaller would answer your question. You decide after the
                  call, in your own time.
                </p>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── The product · what you walk away with ── */}
        <section className="border-t border-border bg-base px-5 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <Fade>
              <img
                src={SHARED_IMAGES.plan.src}
                alt={SHARED_IMAGES.plan.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-card object-cover shadow-card"
              />
            </Fade>
            <div>
              <Fade>
                <h2 className="mb-3 font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                  What you&apos;ll walk away with
                </h2>
              </Fade>
              <Fade delay={0.06}>
                <p className="mb-7 text-[16.5px] leading-relaxed text-text-secondary">
                  Three things, in writing, within 24 hours of your call.
                </p>
              </Fade>
              <div className="flex flex-col gap-4">
                {PROMISE.map((item, i) => (
                  <Fade key={item.title} delay={0.1 + i * 0.06}>
                    <div className="flex gap-3.5 rounded-card border border-border bg-card p-4 shadow-card sm:p-5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check size={14} className="text-white" />
                      </span>
                      <div>
                        <p className="mb-1 text-[15px] font-bold text-text-primary">{item.title}</p>
                        <p className="text-[15px] leading-relaxed text-text-secondary">{item.body}</p>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>

            </div>
          </div>
        </section>

                {/* ── Inside the call ──
            The objection this answers is not "what do I do" but "how long am I
            committing to, and to what". A visitor who cannot picture the twenty
            minutes assumes the worst about them. */}
        <section className="bg-base px-5 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto max-w-[720px]">
            <Fade>
              <div className="rounded-card border border-border bg-card p-6 shadow-card sm:p-7">
                <p className="mb-1 font-heading text-[1.3rem] font-extrabold tracking-tight text-text-primary sm:text-[1.6rem]">
                  Inside the {CONSULT_MINUTES} minutes
                </p>
                <p className="mb-5 text-[15px] leading-relaxed text-text-secondary">
                  So you know what you&apos;re agreeing to, and when it ends.
                </p>
                <ol className="flex flex-col gap-4">
                  {SESSION_SHEET.map((block) => (
                    <li key={block.when} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                      <span className="shrink-0 self-start rounded-pill bg-primary-bg px-3 py-1 font-heading text-[12.5px] font-bold tabular-nums text-primary sm:w-[94px] sm:text-center">
                        {block.when}
                      </span>
                      <div>
                        <p className="text-[15px] font-bold text-text-primary">{block.title}</p>
                        <p className="text-[14.5px] leading-relaxed text-text-secondary">
                          {block.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Fade>
          </div>
        </section>

{/* ── Proof ── */}
        <section className="border-t border-border bg-section-alt px-5 py-14 sm:px-6 lg:py-20">
          <ProofWall />
        </section>

        {/* ── What this is, and what it isn't ──
            A safety surface as much as a conversion one: every cell targets
            people who already carry a diagnosis, so the limits of a
            non-clinical call are worth stating in full sight rather than in the
            disclaimer at the foot of the page. */}
        <section className="bg-base px-5 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto max-w-[900px]">
            <Fade>
              <h2 className="mb-8 text-center font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                What this is, and what it isn&apos;t
              </h2>
            </Fade>
            <div className="grid gap-4 lg:grid-cols-2">
              <Fade>
                <div className="h-full rounded-card border border-border bg-card p-6 shadow-card">
                  <p className="mb-4 font-heading text-[16px] font-bold text-text-primary">
                    What it is
                  </p>
                  <ul className="flex flex-col gap-3">
                    {SCOPE.is.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-primary">
                          <Check size={12} strokeWidth={3.5} className="text-white" />
                        </span>
                        <span className="text-[14.5px] leading-relaxed text-text-secondary">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
              <Fade delay={0.08}>
                <div className="h-full rounded-card border border-border bg-section-alt p-6">
                  <p className="mb-4 font-heading text-[16px] font-bold text-text-primary">
                    What it isn&apos;t
                  </p>
                  <ul className="flex flex-col gap-3">
                    {SCOPE.isnt.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border border-border bg-card">
                          <X size={11} strokeWidth={3} className="text-text-muted" />
                        </span>
                        <span className="text-[14.5px] leading-relaxed text-text-secondary">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-base px-5 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto max-w-[720px]">
            <Fade>
              <h2 className="mb-8 font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                Before you book
              </h2>
            </Fade>
            <div className="flex flex-col gap-3">
              {FAQ.map((item, i) => (
                <Fade key={item.q} delay={i * 0.04}>
                  <details className="group rounded-card border border-border bg-card p-5">
                    <summary className="cursor-pointer list-none text-[15px] font-bold text-text-primary marker:hidden">
                      {item.q}
                    </summary>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-text-secondary">
                      {item.a}
                    </p>
                  </details>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="relative overflow-hidden bg-primary px-5 py-16 sm:px-6 lg:py-20">
          <GradientOrb color="green" size="520px" className="right-[-10%] top-[-20%] opacity-30" />
          <div className="relative z-10 mx-auto max-w-[560px] text-center">
            <Fade>
              <h2 className="mb-4 font-heading text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.45rem]">
                You don&apos;t need another warning. You need a plan.
              </h2>
            </Fade>
            <Fade delay={0.08}>
              <p className="mb-7 font-body text-[16px] leading-relaxed text-white/85">
                Paid for by the BetterHealth Foundation. The written plan is yours to keep
                either way.
              </p>
            </Fade>
            <Fade delay={0.16}>
              <a
                href="#book"
                onClick={scrollToBooking}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-btn bg-white px-8 py-4 font-heading text-[16px] font-bold text-primary no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book your free call <ArrowRight size={17} />
              </a>
            </Fade>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="bg-base px-5 py-8 pb-24 sm:px-6 lg:pb-8">
          <div className="mx-auto flex max-w-[720px] items-start gap-2.5">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-text-muted" />
            <p className="text-[12.5px] leading-relaxed text-text-muted">{DISCLAIMER}</p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA onCta={scrollToBooking} />
    </div>
  );
}
