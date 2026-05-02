import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

const FEATURES = [
  {
    icon: "📊",
    title: "Your health dashboard",
    body: "All your biomarker results in one place — organised by organ system, colour-coded for clarity, and explained in plain language.",
  },
  {
    icon: "📈",
    title: "Trend tracking",
    body: "See how your numbers change over time. Spot improvements, catch regressions, and understand what your lifestyle changes are actually doing.",
  },
  {
    icon: "🔔",
    title: "Smart alerts",
    body: "Get notified the moment your results are ready, and receive priority alerts if anything falls into a critical range.",
  },
  {
    icon: "📄",
    title: "Shareable reports",
    body: "Download and share a clean PDF report with your doctor, specialist, or family — whenever you need it.",
  },
  {
    icon: "📅",
    title: "Booking & scheduling",
    body: "Book your next home collection or lab visit directly from the app. Pick a date, pick a time — done.",
  },
  {
    icon: "💬",
    title: "Doctor consultations",
    body: "Premium members can book a video or phone consultation with a doctor directly through the app to review their results.",
  },
];

export default function DownloadAppPage() {
  return (
    <>
      <Helmet>
        <title>Download the App — BetterHealth Africa</title>
        <meta
          name="description"
          content="Download the BetterHealth app for iOS and Android. Track your biomarkers, book collections, and take control of your health — all from your phone."
        />
      </Helmet>

      <Nav dark />

      <main className="bg-bg-light text-text-primary overflow-x-hidden">
        {/* Hero */}
        <section className="relative pt-28 pb-20 px-6 bg-bg-dark text-text-on-dark overflow-hidden">
          <GradientOrb className="top-[-80px] right-[-80px] opacity-30" />
          <GradientOrb className="bottom-[-60px] left-[-60px] opacity-20" size={320} />
          <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide mb-6">
                COMING SOON — iOS &amp; ANDROID
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold font-heading leading-tight mb-6">
                Your health,<br />
                <span className="text-primary">in your pocket.</span>
              </h1>
              <p className="text-lg text-text-muted-dark leading-relaxed max-w-[480px] mb-10">
                The BetterHealth app puts your biomarker results, trend tracking, booking, and doctor consultations all in one place — available for iOS and Android in 2026.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* App Store */}
                <a
                  href="#notify"
                  className="flex items-center gap-3 px-5 py-3 rounded-card bg-white/10 border border-white/20 text-gray-300 font-semibold text-sm hover:bg-white/20 hover:text-white transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs font-normal">Download on the</span>
                    <span className="text-base font-bold">App Store</span>
                  </span>
                </a>

                {/* Google Play */}
                <a
                  href="#notify"
                  className="flex items-center gap-3 px-5 py-3 rounded-card bg-white/10 border border-white/20 text-gray-300 font-semibold text-sm hover:bg-white/20 hover:text-white transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.22.98.14l11.65-11.65L12.1 9.54 3.18 23.76zm16.4-12.37L16.8 9.83 4.34.55C4.01.34 3.6.3 3.22.5L14.93 12.21l4.65-4.65c.35.2.6.55.6.98v.02c0 .43-.24.78-.6.83zM3.22.5C2.84.7 2.6 1.1 2.6 1.55v20.9c0 .45.24.85.62 1.05L14.93 12.21 3.22.5zm13.58 7.33l2.79 1.56c.79.44.79 1.16 0 1.6l-2.79 1.56-3.13-3.13 3.13-1.59z" />
                  </svg>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs font-normal">Get it on</span>
                    <span className="text-base font-bold">Google Play</span>
                  </span>
                </a>
              </div>

              <p className="text-xs text-text-muted-dark/60 mt-4">
                App not yet live. Tap either button to register for early access.
              </p>
            </Reveal>

            {/* Phone mockup placeholder */}
            <Reveal delay={0.15}>
              <div className="flex justify-center">
                <div className="relative w-[240px] h-[480px] rounded-[40px] bg-white/5 border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-card bg-primary/20 flex items-center justify-center text-3xl">
                    📱
                  </div>
                  <p className="text-text-muted-dark text-sm text-center px-6">
                    App preview coming soon
                  </p>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1.5 rounded-full bg-white/10" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-bold font-heading text-center mb-4">
                Everything you need, one app.
              </h2>
              <p className="text-center text-text-secondary max-w-[520px] mx-auto mb-14">
                The BetterHealth app is built around your results — making it easy to understand, track, and act on your health data.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.07}>
                  <div className="p-6 rounded-card border border-border bg-white hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-4">{f.icon}</div>
                    <h3 className="font-bold font-heading text-lg mb-2">{f.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Notify CTA */}
        <section id="notify" className="py-20 px-6 bg-bg-alt">
          <div className="max-w-[560px] mx-auto text-center">
            <Reveal>
              <div className="text-4xl mb-4">🔔</div>
              <h2 className="text-3xl font-bold font-heading mb-4">
                Be first to know when we launch.
              </h2>
              <p className="text-text-secondary mb-8">
                The app is launching on iOS and Android in 2026. Drop your email below and we will notify you the moment it is live — plus early access perks for subscribers.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); const email = e.target.elements.email.value; window.open(`mailto:hello@betterhealth.africa?subject=App%20Early%20Access&body=Hi%2C%20please%20notify%20me%20at%20${encodeURIComponent(email)}%20when%20the%20app%20launches.`, "_blank"); }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-card border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-card bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors whitespace-nowrap"
                >
                  Notify me
                </button>
              </form>
              <p className="text-xs text-text-muted mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
