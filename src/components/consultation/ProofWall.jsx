import { Quote, Star } from "lucide-react";
import Fade from "./Fade";
import { FOUNDER_QUOTE, MEMBER_STORIES } from "../../data/wellness-consultation";

const BASE = import.meta.env.BASE_URL;

// A subset of the site's trusted-by set, chosen for local recognisability in
// Ghana rather than logo quality — an institution the reader's family belongs to
// does more for trust here than a startup they've never heard of.
const ORGS = [
  { name: "Methodist Church Ghana", logo: `${BASE}logos/methodist-church-ghana.png`, className: "max-h-11 max-w-[150px]" },
  { name: "Wesley Girls Senior High School", logo: `${BASE}logos/wesley-girls.png`, className: "max-h-11 max-w-[150px]" },
  { name: "Project Management Institute Ghana", logo: `${BASE}logos/pmi-ghana.png` },
  { name: "Diya Impact Foundation", logo: `${BASE}logos/diya-impact-foundation.png` },
];

/**
 * Social proof for a service that has no testimonials yet.
 *
 * The consultation is new, so there is nothing honest to quote about it — and
 * inventing reviews for a health brand is not a trade-off worth discussing. What
 * exists instead is real and does the same job:
 *
 *   1. Members who tested with BetterHealth, framed for what they actually are
 *      (evidence that finding out early changes the decision), never dressed up
 *      as consultation reviews.
 *   2. The founder's own story, which is the strongest trust asset the brand has
 *      and is already published on the About page.
 *   3. Institutions that have run screenings with us.
 *
 * When consultation testimonials exist, they belong at the top of this component
 * and the framing line under the heading should change with them.
 */
export default function ProofWall() {
  return (
    <div className="mx-auto max-w-[1120px]">
      <Fade>
        <h2 className="mb-2 text-center font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
          What happens when people stop guessing
        </h2>
      </Fade>
      <Fade delay={0.06}>
        <p className="mx-auto mb-9 max-w-[620px] text-center text-[14px] leading-relaxed text-text-muted">
          Members who tested with BetterHealth. Names are shortened to protect privacy — the
          consultation itself is new, so nobody below is reviewing the call.
        </p>
      </Fade>

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        {MEMBER_STORIES.map((t, i) => (
          <Fade key={t.name} delay={0.1 + i * 0.08}>
            <figure className="flex h-full flex-col gap-4 rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-pill bg-accent-bg px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-ink">
                  Found: {t.discovery}
                </span>
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} size={12} className="fill-accent text-accent" />
                  ))}
                </span>
              </div>
              <blockquote className="flex-1 font-body text-[15px] italic leading-relaxed text-text-primary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-[13px] font-bold text-white">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block font-heading text-[14px] font-bold text-text-primary">
                    {t.name}
                  </span>
                  <span className="block text-[12.5px] text-text-muted">
                    {t.age ? `Age ${t.age} · ` : ""}
                    {t.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Fade>
        ))}
      </div>

      <Fade delay={0.1}>
        <figure className="rounded-card border border-border bg-section-alt p-6 sm:p-8">
          <Quote size={22} className="mb-3 text-primary" />
          <blockquote className="mb-4 font-heading text-[17px] font-semibold leading-relaxed text-text-primary sm:text-[19px]">
            {FOUNDER_QUOTE.quote}
          </blockquote>
          <figcaption className="text-[13.5px] text-text-secondary">
            <strong className="text-text-primary">{FOUNDER_QUOTE.name}</strong> ·{" "}
            {FOUNDER_QUOTE.title}
          </figcaption>
        </figure>
      </Fade>

      <Fade delay={0.14}>
        <div className="mt-9 flex flex-col items-center gap-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
            We&apos;ve run screenings with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {ORGS.map((org) => (
              <img
                key={org.name}
                src={org.logo}
                alt={org.name}
                title={org.name}
                loading="lazy"
                className={`w-auto object-contain opacity-70 transition-opacity hover:opacity-100 ${
                  org.className || "max-h-8 max-w-[130px]"
                }`}
              />
            ))}
          </div>
        </div>
      </Fade>
    </div>
  );
}
