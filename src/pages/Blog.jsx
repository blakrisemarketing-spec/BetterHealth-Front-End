import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

const FEATURED_POST = {
  tag: "Prevention",
  title: "Why your fasting glucose is normal but you might still be pre-diabetic",
  excerpt: "Most Ghanaian hospital check-ups test fasting glucose and call it done. But HbA1c tells a completely different story — one that catches diabetes years earlier. Here's what you need to know.",
  readTime: "6 min read",
  date: "March 2026",
};

const POSTS = [
  {
    tag: "Lab Science",
    title: "What is HbA1c — and why is it more important than your fasting glucose?",
    excerpt: "HbA1c measures your average blood sugar over 3 months. It's the gold standard for diabetes detection. Most Ghanaians have never had it tested.",
    readTime: "5 min read",
    date: "March 2026",
  },
  {
    tag: "Thyroid",
    title: "The thyroid conditions being missed in West Africa",
    excerpt: "Hashimoto's thyroiditis, subclinical hypothyroidism, and thyroid nodules are far more common than most doctors realise. The reason they're missed: incomplete testing.",
    readTime: "7 min read",
    date: "March 2026",
  },
  {
    tag: "Sickle Cell",
    title: "Every Ghanaian couple should know their sickle cell status",
    excerpt: "Ghana has one of the highest sickle cell disease rates in the world. A simple haemoglobin electrophoresis test can tell you your genotype in 48 hours.",
    readTime: "4 min read",
    date: "February 2026",
  },
  {
    tag: "Vitamins",
    title: "Vitamin D deficiency in the sunniest country on earth",
    excerpt: "Ghana has year-round sunshine. And yet Vitamin D deficiency is widespread — particularly among office workers and urban professionals. Here's why.",
    readTime: "5 min read",
    date: "February 2026",
  },
  {
    tag: "Liver",
    title: "Non-alcoholic fatty liver disease: the silent epidemic in Ghana",
    excerpt: "NAFLD affects an estimated 25% of adults globally. It has no symptoms until it's serious. The only way to know is to test your liver enzymes.",
    readTime: "6 min read",
    date: "January 2026",
  },
  {
    tag: "Cardiovascular",
    title: "Why cholesterol alone doesn't tell the full story",
    excerpt: "ApoB and Lp(a) are better predictors of cardiovascular risk than LDL. They're almost never tested in Ghanaian hospitals. BetterHealth tests both.",
    readTime: "5 min read",
    date: "January 2026",
  },
];

const TAG_COLORS = {
  Prevention: "bg-green-50 text-green-700 border-green-200",
  "Lab Science": "bg-blue-50 text-blue-700 border-blue-200",
  Thyroid: "bg-purple-50 text-purple-700 border-purple-200",
  "Sickle Cell": "bg-red-50 text-red-700 border-red-200",
  Vitamins: "bg-orange-50 text-orange-700 border-orange-200",
  Liver: "bg-amber-50 text-amber-700 border-amber-200",
  Cardiovascular: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function BlogPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Nav />

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
            <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold font-heading leading-[1.08] tracking-[-0.03em] text-text-primary mb-4">
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

      {/* Featured */}
      <section className="py-12 px-6 bg-section-alt">
        <div className="max-w-[960px] mx-auto">
          <Reveal>
            <p className="text-[12px] text-primary uppercase tracking-[0.12em] font-bold mb-4">Featured</p>
            <div className="bg-white border border-border rounded-card p-8 md:p-10 hover:-translate-y-1 transition-all duration-300 hover:shadow-card hover:border-primary/20 cursor-pointer">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-pill border ${TAG_COLORS[FEATURED_POST.tag] || "bg-primary-bg text-primary border-primary/20"}`}>
                {FEATURED_POST.tag}
              </span>
              <h2 className="text-[1.5rem] md:text-[1.8rem] font-extrabold text-text-primary font-heading leading-tight mt-3 mb-3">
                {FEATURED_POST.title}
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-5">{FEATURED_POST.excerpt}</p>
              <div className="flex items-center gap-4 text-[13px] text-text-muted">
                <span className="flex items-center gap-1"><Clock size={13} /> {FEATURED_POST.readTime}</span>
                <span>{FEATURED_POST.date}</span>
                <span className="ml-auto flex items-center gap-1 text-primary font-semibold">
                  Read article <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 px-6 bg-base">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-white border border-border rounded-card p-6 flex flex-col h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-card hover:border-primary/20 cursor-pointer">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-pill border self-start mb-3 ${TAG_COLORS[post.tag] || "bg-primary-bg text-primary border-primary/20"}`}>
                    {post.tag}
                  </span>
                  <h3 className="text-[15px] font-bold text-text-primary font-heading leading-snug mb-2 flex-1">{post.title}</h3>
                  <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[12px] text-text-muted pt-3 border-t border-border/50">
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-section-alt border-t border-border">
        <div className="max-w-[560px] mx-auto text-center">
          <Reveal>
            <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-3">Get health insights in your inbox</h2>
            <p className="text-[14px] text-text-secondary mb-6">One email per month. No spam. Just useful health education for Ghanaians.</p>
            <div className="flex gap-2 w-full max-w-[420px] mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 border border-border rounded-btn px-4 py-3 text-sm text-text-primary bg-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              />
              <button className="bg-primary hover:bg-primary-dark text-white rounded-btn px-5 py-3 min-h-[44px] text-sm font-bold font-heading transition-all hover:-translate-y-0.5 shrink-0">
                Subscribe
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
