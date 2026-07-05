import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft, Check, Clock, Droplets, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { getSingleTestDetail } from "../data/single-test-details";
import { joinUrl } from "../lib/app-links";
import { testCode } from "../data/app-catalogue";
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

export default function SingleTestDetailPage() {
  const { slug } = useParams();
  const test = getSingleTestDetail(slug);

  if (!test) {
    return (
      <div className="bg-base min-h-screen overflow-x-hidden">
        <Nav />
        <main className="pt-[120px] pb-20 px-6 text-center">
          <h1 className="text-[2rem] font-extrabold text-text-primary font-heading mb-4">Test not found</h1>
          <p className="text-text-secondary mb-6">We couldn't find that test. It may have moved, or the link might be off.</p>
          <Link to="/book" className="text-primary font-bold no-underline hover:text-primary-dark">
            &larr; Back to all tests
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${test.name}: ${test.subtitle} | BetterHealth Africa`;
  const pageDesc = test.description;
  const pageUrl = `${SITE_URL}/test/${test.slug}`;

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: test.name,
    description: test.description,
    url: pageUrl,
    provider: {
      "@type": "MedicalOrganization",
      name: "BetterHealth Africa",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GHS",
      price: test.price.replace(/[^\d.]/g, ""),
      url: pageUrl,
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonld = test.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: test.faqs.map((f) => ({
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
                <span className="inline-block text-[11px] font-bold text-primary uppercase tracking-[0.12em] bg-primary-bg border border-primary/20 rounded-pill px-3 py-1 mb-3">
                  Single test
                </span>
                <h1 className="text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-1">
                  {test.name}
                </h1>
                <p className="text-[16px] sm:text-[18px] text-text-muted font-medium">{test.subtitle}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-text-secondary font-body max-w-[600px] mb-6">
                {test.description}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
                <div className="flex items-center gap-2 text-[14px] text-text-secondary">
                  <Droplets size={16} className="text-primary" />
                  <span>{test.sampleType}</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-text-secondary">
                  <Clock size={16} className="text-primary" />
                  <span>{test.turnaround}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div>
                  <span className="text-[32px] font-extrabold text-primary font-heading">{test.price}</span>
                  <span className="text-[12px] text-text-muted ml-2">Excl. VAT</span>
                </div>
                <a
                  href={joinUrl({ test: testCode(test.slug) })}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
                >
                  Book this test <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── What it measures ── */}
        <section className="py-12 lg:py-16 px-6 bg-base border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                What this test measures
              </h2>
              <p className="text-[15px] text-text-secondary mb-6">
                Each marker explained in plain language.
              </p>
            </Reveal>
            <div className="flex flex-col gap-4">
              {test.whatItMeasures.map((item, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="rounded-card border border-border bg-card p-5">
                    <h3 className="text-[16px] font-extrabold text-text-primary font-heading mb-1.5">
                      {item.marker}
                    </h3>
                    <p className="text-[14px] text-text-secondary leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
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
              {test.whoShouldTest.map((item, i) => (
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

        {/* ── Preparation ── */}
        <section className="py-10 px-6 bg-base border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-3">
                How to prepare
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                {test.preparation}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-12 px-6 bg-section-alt border-t border-border">
          <div className="max-w-[720px] mx-auto">
            <Reveal>
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-6">
                How it works
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { num: "1", title: "Book online", desc: "Sign up and select this test. Choose a partner lab near you or book home collection." },
                  { num: "2", title: "Give a sample", desc: `A quick ${test.sampleType.toLowerCase()} sample. It takes a few minutes.` },
                  { num: "3", title: "See results", desc: `Clinician-reviewed results in ${test.turnaround}, with every marker explained.` },
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
        {test.faqs?.length > 0 && (
          <section className="py-12 px-6 bg-base border-t border-border">
            <div className="max-w-[720px] mx-auto">
              <Reveal>
                <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-6">
                  Common questions
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="bg-card border border-border rounded-card px-5">
                  {test.faqs.map((faq, i) => (
                    <FaqItem key={i} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── Included in these panels ── */}
        {test.includedInPanels?.length > 0 && (
          <section className="py-12 px-6 bg-section-alt border-t border-border">
            <div className="max-w-[720px] mx-auto">
              <Reveal>
                <h2 className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                  Save with a panel
                </h2>
                <p className="text-[15px] text-text-secondary mb-6">
                  This test comes inside these fuller panels. You get more markers for a better price.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {test.includedInPanels.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.05}>
                    <Link
                      to={`/book/${p.slug}`}
                      className="rounded-card border border-border bg-card p-4 hover:border-primary/30 transition-all no-underline block"
                    >
                      <h3 className="text-[16px] font-extrabold text-text-primary font-heading mb-1">{p.name}</h3>
                      <p className="text-[12px] text-text-muted mb-1">{p.subtitle}</p>
                      <p className="text-[12px] text-text-secondary mb-2">{p.tests.length} tests included</p>
                      <span className="text-[13px] text-primary font-semibold inline-flex items-center gap-1">
                        Learn more <ArrowRight size={12} />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-14 px-6 bg-primary relative overflow-hidden border-t border-border">
          <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
          <div className="max-w-[520px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-[1.5rem] sm:text-[2rem] font-extrabold text-white font-heading tracking-tight mb-3">
                Ready to book?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[15px] text-white/80 leading-relaxed mb-6">
                {test.price} · Results in {test.turnaround} · Home collection available
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={joinUrl({ test: testCode(test.slug) })}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary rounded-btn px-8 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
              >
                Book {test.name} <ArrowRight size={16} />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
