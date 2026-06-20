import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import NotFoundPage from "./NotFound";
import { getArticle, ARTICLES } from "../data/blog";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ISO date "2026-06-20" -> "20 June 2026" without relying on the Date object,
// so it renders identically at build time and runtime.
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function Block({ block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[1.05rem] leading-[1.85] text-text-secondary font-body mb-6">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="scroll-mt-28 text-[1.55rem] font-extrabold font-heading text-text-primary mt-12 mb-4 leading-tight"
        >
          {block.text}
        </h2>
      );
    case "list":
      return block.ordered ? (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-[1.05rem] leading-[1.7] text-text-secondary font-body marker:text-primary marker:font-bold">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-[1.05rem] leading-[1.7] text-text-secondary font-body marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="my-8 rounded-card border border-primary/20 bg-primary-bg px-6 py-5">
          {block.title && (
            <p className="font-heading font-bold text-text-primary mb-1.5">
              {block.title}
            </p>
          )}
          <p className="text-[0.98rem] leading-relaxed text-text-secondary font-body m-0">
            {block.text}
          </p>
        </div>
      );
    case "link-internal":
      return (
        <p className="my-7">
          <Link
            to={block.to}
            className="inline-flex items-center gap-2 font-heading font-bold text-primary hover:text-primary-dark transition-colors"
          >
            {block.label}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      );
    case "faq":
      return (
        <div className="mt-10">
          <h2 className="text-[1.55rem] font-extrabold font-heading text-text-primary mb-5">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {block.items.map((item, i) => (
              <details
                key={i}
                className="group rounded-card border border-border bg-white px-5 py-4"
              >
                <summary className="cursor-pointer list-none font-heading font-bold text-text-primary flex justify-between items-center gap-4">
                  {item.q}
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-text-secondary font-body m-0">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      );
    case "disclaimer":
      return (
        <p className="mt-10 pt-6 border-t border-border text-[0.85rem] leading-relaxed text-text-secondary/80 font-body italic">
          {block.text}
        </p>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) return <NotFoundPage />;

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route={`blog/${article.slug}`} />
      <Nav />
      <main>
        {/* Header */}
        <article>
          <header className="pt-[120px] pb-10 px-6 bg-base relative overflow-hidden">
            <GradientOrb color="green" size="460px" className="top-[-12%] right-[-10%]" />
            <div className="max-w-[720px] mx-auto relative z-10">
              <Reveal>
                <nav className="text-[13px] font-body text-text-secondary mb-5" aria-label="Breadcrumb">
                  <Link to="/" className="hover:text-primary">Home</Link>
                  <span className="mx-2">/</span>
                  <Link to="/blog" className="hover:text-primary">Blog</Link>
                </nav>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="flex flex-wrap gap-2 mb-5">
                  {article.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-pill bg-primary-bg border border-primary/20 text-primary text-[11px] font-bold font-heading tracking-wide uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-[2rem] sm:text-[2.5rem] font-extrabold font-heading leading-[1.1] text-text-primary mb-5">
                  {article.title}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-secondary font-body">
                  <span className="font-semibold text-text-primary">
                    {article.author?.name || "BetterHealth Africa"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                  {article.readingMinutes && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingMinutes} min read</span>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </header>

          {/* Body */}
          <div className="px-6 pb-16 bg-base">
            <div className="max-w-[720px] mx-auto">
              {article.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </div>
        </article>

        {/* Related + CTA */}
        {related.length > 0 && (
          <section className="py-16 px-6 bg-section-alt border-t border-border">
            <div className="max-w-[720px] mx-auto">
              <h2 className="text-[1.4rem] font-extrabold font-heading text-text-primary mb-6">
                Keep reading
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="block rounded-card border border-border bg-white p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                  >
                    <p className="font-heading font-bold text-text-primary leading-snug mb-2">
                      {a.title}
                    </p>
                    <p className="text-[13px] text-text-secondary font-body line-clamp-2">
                      {a.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Conversion CTA */}
        <section className="py-16 px-6 bg-base border-t border-border">
          <div className="max-w-[560px] mx-auto text-center">
            <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-3">
              Know your numbers
            </h2>
            <p className="text-[14px] text-text-secondary mb-6 font-body">
              BetterHealth makes comprehensive screening affordable, with home or in-lab collection across Ghana.
            </p>
            <Link
              to="/pricing"
              className="inline-block bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-3 min-h-[44px] text-sm font-bold font-heading transition-all hover:-translate-y-0.5"
            >
              See screening plans
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
