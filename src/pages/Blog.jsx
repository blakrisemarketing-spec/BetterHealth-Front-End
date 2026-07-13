import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { ARTICLES } from "../data/blog";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function BlogPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="blog" />
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
              <span className="text-primary italic tracking-normal">
                Know your health.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-text-secondary font-body max-w-[540px] mx-auto">
              Plain-language health education for Ghanaians. What your health numbers mean, what gets missed, and what you can do about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-16 px-6 bg-section-alt">
        <div className="max-w-[1040px] mx-auto">
          {ARTICLES.length === 0 ? (
            <div className="max-w-[480px] mx-auto text-center">
              <Reveal>
                <div className="text-5xl mb-6">✍️</div>
                <h2 className="text-2xl font-bold font-heading text-text-primary mb-3">Articles coming soon</h2>
                <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
                  We are working on health guides, result explainers, and stories from our community. Subscribe below to be notified when the first articles go live.
                </p>
              </Reveal>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARTICLES.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.05}>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="group flex flex-col h-full rounded-card border border-border bg-white p-6 hover:border-primary/40 hover:-translate-y-1 transition-all"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-pill bg-primary-bg border border-primary/20 text-primary text-[10px] font-bold font-heading tracking-wide uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-[1.15rem] font-extrabold font-heading text-text-primary leading-snug mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[14px] text-text-secondary font-body leading-relaxed mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-[12px] text-text-secondary font-body mt-auto">
                      <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                      {article.readingMinutes && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{article.readingMinutes} min read</span>
                        </>
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
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
