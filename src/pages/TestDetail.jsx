import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Check, Clock, Droplets, FlaskConical, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { getTestDetail } from "../data/test-details";
import { testPanels, singleTests } from "../data/content";
import { SIGN_UP_URL } from "../lib/app-links";
import { SITE_URL, DEFAULT_OG_IMAGE } from "../data/seo";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 px-1 text-left cursor-pointer bg-transparent"
      >
        <span className="text-[15px] font-semibold text-text-primary pr-4">{q}</span>
        {open ? <ChevronUp size={18} className="text-text-muted shrink-0" /> : <ChevronDown size={18} className="text-text-muted shrink-0" />}
      </button>
      {open && (
        <p className="text-[14px] text-text-secondary leading-relaxed pb-4 px-1">{a}</p>
      )}
    </div>
  );
}

export default function TestDetailPage() {
  const { slug } = useParams();
  const panel = getTestDetail(slug);

  if (!panel) {
    return (
      <div className="bg-base min-h-screen overflow-x-hidden">
        <Nav />
        <main className="pt-[120px] pb-20 px-6 text-center">
          <h1 className="text-[2rem] font-extrabold text-text-primary font-heading mb-4">Test not found</h1>
          <p className="text-text-secondary mb-6">We couldn't find that test panel. It may have moved, or the link might be off.</p>
          <Link to="/book" className="text-primary font-bold no-underline hover:text-primary-dark">
            &larr; Back to all tests
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPanels = testPanels
    .filter((p) => p.slug !== panel.slug && p.concerns.some((c) => panel.concerns.includes(c)))
    .slice(0, 2);

  const relatedSingleTest = singleTests
    .find((t) => t.concerns.some((c) => panel.concerns.includes(c)));

  const pageTitle = `${panel.displayName} (${panel.name}) | BetterHealth Africa`;
  const pageDesc = panel.description;
  const pageUrl = `${SITE_URL}/book/${panel.slug}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: `${panel.displayName} (${panel.name} Panel)`,
    description: panel.description,
    url: pageUrl,
    provider: {
      "@type": "MedicalOrganization",
      name: "BetterHealth Africa",
      url: SITE_URL,
    },
    usesDevice: { "@type": "MedicalDevice", name: "Laboratory analysis" },
    ...(panel.price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "GHS",
        price: panel.price.replace(/[^\d.]/g, ""),
        url: pageUrl,
        availability: "https://schema.org/InStock",
      },
    }),
  };

  const faqJsonld = panel.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: panel.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={pageTitle} />
        <meta property="og:site_name" content="BetterHealth Africa" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDesc} />
        <meta property="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(jsonld)}</script>
        {faqJsonld && (
          <script type="application/ld+json">{JSON.stringify(faqJsonld)}</script>
        )}
      </Helmet>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <section className="pt-[120px] pb-10 px-6 bg-base relative overflow-hidden">
          <GradientOrb color="green" size="560px" className="top-[-10%] right-[-8%]" />
          <GradientOrb color="blue" size="360px" className="bottom-[-10%] left-[-5%]" />
          <div className="max-w-[720px] mx-auto relative z-10">
            <Reveal>
              <Link to="/book" className="inline-flex items-center gap-1.5 text-[13px] text-primary font-semibold no-underline hover:text-primary-dark transition-colors mb-6">
                <ArrowLeft size={14} /> All tests
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mb-3">
                <span className="block text-[13px] sm:text-[15px] font-bold text-primary uppercase tracking-[0.12em] mb-1.5">
                  {panel.name}
                </span>
                <h1 className="text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.08] text-text-primary">
                  {panel.displayName}
                </h1>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-text-secondary font-body max-w-[600px] mb-6">
                {panel.description}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
                <div className="flex items-center gap-2 text-[14px] text-text-secondary">
                  <Droplets size={16} className="text-primary" />
                  <span>{panel.sampleType}</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-text-secondary">
                  <Clock size={16} className="text-primary" />
                  <span>{panel.turnaround}</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-text-secondary">
                  <FlaskConical size={16} className="text-primary" />
                  <span>{panel.tests.length} tests included</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div>
                  <span className="text-[32px] font-extrabold text-primary font-heading">{panel.price}</span>
                  <span className="text-[12px] text-text-muted ml-2">Excl. VAT</span>
                </div>
                <a
                  href={SIGN_UP_URL}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
                >
                  Book {panel.name} <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Who should take this test ── */}
        <section className="py-12 px-6 bg-section-alt border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-5">
                Who should take this test?
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {panel.whoShouldTest.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 bg-card border border-border rounded-card p-4">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-[14px] text-text-primary">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── What's included — each test explained ── */}
        <section className="py-12 lg:py-16 px-6 bg-base border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                What's included
              </h2>
              <p className="text-[15px] text-text-secondary mb-6">
                Every test in this panel, explained in plain language.
              </p>
            </Reveal>
            <div className="flex flex-col gap-4">
              {panel.testDetails.map((test, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="rounded-card border border-border bg-card p-5">
                    <h3 className="text-[16px] font-extrabold text-text-primary font-heading mb-1.5">
                      {test.name}
                    </h3>
                    <p className="text-[13px] text-text-muted mb-2">
                      <span className="font-semibold">Measures:</span> {test.measures}
                    </p>
                    <p className="text-[14px] text-text-secondary leading-relaxed">
                      {test.why}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Preparation ── */}
        <section className="py-10 px-6 bg-section-alt border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-3">
                How to prepare
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                {panel.preparation}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-12 px-6 bg-base border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-6">
                How it works
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { num: "1", title: "Book online", desc: "Sign up and select this panel. Choose a partner lab near you or book home sample collection." },
                  { num: "2", title: "Get tested", desc: `A quick ${panel.sampleType.toLowerCase()} sample. It takes about 15 minutes, at a lab or at home.` },
                  { num: "3", title: "See results", desc: `Clinician-reviewed results in ${panel.turnaround}, with every marker explained in plain language.` },
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
          </div>
        </section>

        {/* ── FAQs ── */}
        {panel.faqs?.length > 0 && (
          <section className="py-12 px-6 bg-section-alt border-t border-border">
            <div className="max-w-[720px] mx-auto">
              <Reveal>
                <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-6">
                  Common questions about {panel.name}
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="bg-card border border-border rounded-card px-5">
                  {panel.faqs.map((faq, i) => (
                    <FaqItem key={i} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-14 px-6 bg-primary relative overflow-hidden border-t border-border">
          <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
          <div className="max-w-[520px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-[1.5rem] sm:text-[2rem] font-extrabold text-white font-heading tracking-tight mb-3">
                Ready to book {panel.name}?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[15px] text-white/80 leading-relaxed mb-6">
                {panel.price} · {panel.tests.length} tests · Results in {panel.turnaround}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={SIGN_UP_URL}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary rounded-btn px-8 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
              >
                Book {panel.name} <ArrowRight size={16} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── Related ── */}
        {(relatedPanels.length > 0 || relatedSingleTest) && (
          <section className="py-12 px-6 bg-base border-t border-border">
            <div className="max-w-[720px] mx-auto">
              <Reveal>
                <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-6">
                  You might also consider
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPanels.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.05}>
                    <Link
                      to={`/book/${p.slug}`}
                      className="rounded-card border border-border bg-card p-4 hover:border-primary/30 transition-all no-underline block h-full"
                    >
                      <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-[0.1em] mb-2">{p.name}</span>
                      <h3 className="text-[16px] font-extrabold text-text-primary font-heading mb-1">{p.displayName}</h3>
                      <p className="text-[12px] text-text-muted mb-2">{p.tests.length} tests</p>
                      <span className="text-[13px] text-primary font-semibold inline-flex items-center gap-1">
                        Learn more <ArrowRight size={12} />
                      </span>
                    </Link>
                  </Reveal>
                ))}
                {relatedSingleTest && (
                  <Reveal delay={relatedPanels.length * 0.05}>
                    <Link
                      to={`/test/${relatedSingleTest.slug}`}
                      className="rounded-card border border-border bg-card p-4 hover:border-primary/30 transition-all no-underline block h-full"
                    >
                      <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-[0.1em] mb-2">Single test</span>
                      <h3 className="text-[16px] font-extrabold text-text-primary font-heading mb-1">{relatedSingleTest.name}</h3>
                      <p className="text-[12px] text-text-muted mb-2">Individual test</p>
                      <span className="text-[13px] text-primary font-semibold inline-flex items-center gap-1">
                        Learn more <ArrowRight size={12} />
                      </span>
                    </Link>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
