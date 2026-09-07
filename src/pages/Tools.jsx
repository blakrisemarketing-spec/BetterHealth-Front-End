import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { TOOLS } from "../data/tools";

export default function ToolsPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="tools" />
      <Nav />
      <main>
        <section className="pt-[110px] pb-8 px-6 bg-base relative overflow-hidden">
          <GradientOrb color="green" size="520px" className="top-[-10%] right-[-10%]" />
          <div className="max-w-[880px] mx-auto relative z-10">
            <Reveal>
              <span className="block text-[13px] font-bold text-primary uppercase tracking-[0.12em] mb-2">
                Free tools
              </span>
              <h1 className="text-[2rem] sm:text-[2.6rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-4">
                Put your own numbers in.
              </h1>
              <p className="text-[16px] sm:text-[18px] text-text-secondary leading-relaxed max-w-[620px]">
                Five calculators built on published instruments and on the thresholds our own health articles cite.
                Each one works out its answer on your device, and says what it can and cannot settle.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="max-w-[880px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.04}>
                <Link
                  to={`/tools/${t.slug}`}
                  className="block h-full rounded-card border border-border bg-card p-5 sm:p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all no-underline"
                >
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary uppercase tracking-[0.12em] mb-2">
                    <Calculator size={13} />
                    {t.eyebrow}
                  </span>
                  <h2 className="text-[1.15rem] font-extrabold text-text-primary font-heading leading-snug mb-2">
                    {t.title}
                  </h2>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-4">{t.promise}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] font-semibold text-text-secondary bg-section-alt rounded-pill px-3 py-1">
                      {t.format}
                    </span>
                    <span className="text-[13px] text-primary font-bold inline-flex items-center gap-1">
                      Open the tool <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
