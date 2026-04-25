import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

export default function BlogPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Blog — BetterHealth Africa</title>
        <meta name="description" content="Health insights, biomarker explainers, and wellness guides from the BetterHealth Africa team. Coming soon." />
        <link rel="canonical" href="https://www.betterhealth.africa/blog" />
        <meta property="og:url" content="https://www.betterhealth.africa/blog" />
        <meta property="og:title" content="Blog — BetterHealth Africa" />
        <meta property="og:description" content="Health insights, biomarker explainers, and wellness guides from the BetterHealth Africa team. Coming soon." />
      </Helmet>
      <Nav />
      <main>

      {/* Hero */}
      <section className="min-h-[44vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-10%] right-[-8%]" />
        <div className="max-w-[720px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              BetterHealth Blog
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-4">
              Know your numbers.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal">
                Know your health.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-text-secondary font-body max-w-[540px] mx-auto">
              Plain-language health education for Ghanaians. What your biomarkers mean, what gets missed, and what you can do about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Empty state */}
      <section className="py-24 px-6 bg-section-alt flex-1">
        <div className="max-w-[480px] mx-auto text-center">
          <Reveal>
            <div className="text-5xl mb-6">✍️</div>
            <h2 className="text-2xl font-bold font-heading text-text-primary mb-3">Articles coming soon</h2>
            <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
              We are working on health guides, biomarker explainers, and stories from our community. Subscribe below to be notified when the first articles go live.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-base border-t border-border">
        <div className="max-w-[560px] mx-auto text-center">
          <Reveal>
            <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-3">Get health insights in your inbox</h2>
            <p className="text-[14px] text-text-secondary mb-6">One email per month. No spam. Just useful health education for Ghanaians.</p>
            <form onSubmit={(e) => { e.preventDefault(); window.open(`mailto:hello@betterhealth.africa?subject=Newsletter%20Signup&body=Please%20add%20me%20to%20the%20BetterHealth%20newsletter.`, "_blank"); }} className="flex gap-2 w-full max-w-[420px] mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 border border-border rounded-btn px-4 py-3 text-sm text-text-primary bg-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              />
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white rounded-btn px-5 py-3 min-h-[44px] text-sm font-bold font-heading transition-all hover:-translate-y-0.5 shrink-0">
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
