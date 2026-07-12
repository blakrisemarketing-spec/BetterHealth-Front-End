import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, LineChart, Stethoscope } from "lucide-react";
import Seo from "../components/Seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import DiseasePrograms from "../components/DiseasePrograms";
import FinalCTA from "../components/FinalCTA";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { diseasePrograms } from "../data/content";

const HOW_STEPS = [
  {
    icon: FlaskConical,
    title: "Test",
    desc: "The program will help you book the tests your condition needs, at a lab or with home collection where available. A doctor reviews your results.",
  },
  {
    icon: LineChart,
    title: "Monitor",
    desc: "Log readings like blood sugar and blood pressure at home between tests, so trends are easy to see.",
  },
  {
    icon: Stethoscope,
    title: "Stay on track",
    desc: "A doctor, personal nutritionist coach, and wellness coach help you understand what to adjust and what to keep watching.",
  },
];

export default function ProgramsPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="programs" />
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section className="min-h-[46vh] flex items-center pt-[120px] pb-16 px-6 bg-base relative overflow-hidden">
          <GradientOrb color="green" size="560px" className="top-[-10%] right-[-8%]" />
          <GradientOrb color="blue" size="360px" className="bottom-[-10%] left-[-5%]" />
          <div className="max-w-[720px] mx-auto text-center relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
                {diseasePrograms.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.4rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-5">
                A program for the condition{" "}
                <span className="text-primary italic tracking-normal">you’re managing.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg leading-relaxed text-text-secondary max-w-[600px] mx-auto font-body mb-8">
                A result on its own can leave you guessing. A program tells you what to do next. Each one
                brings together the right tests, simple monitoring you do at home, doctor review, a personal
                nutritionist coach, and a wellness coach. These programs are coming soon. Join the waitlist
                and tell us which one you want first.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                to="/waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-btn px-7 py-3.5 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green transition-all no-underline"
              >
                Join the program waitlist <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Programs grid (page provides its own hero, so hide the section header) ── */}
        <DiseasePrograms showHeader={false} />

        {/* ── How a program works ── */}
        <section className="py-16 lg:py-20 px-6 bg-section-alt border-t border-border">
          <div className="max-w-[960px] mx-auto">
            <Reveal>
              <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight text-center mb-10">
                How a program works
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={i * 0.1}>
                    <div className="bg-card border border-border rounded-card p-6 h-full">
                      <span className="w-11 h-11 rounded-card bg-primary-bg flex items-center justify-center mb-4">
                        <Icon size={22} className="text-primary" />
                      </span>
                      <h3 className="text-[18px] font-extrabold text-text-primary font-heading mb-2">
                        {i + 1}. {step.title}
                      </h3>
                      <p className="text-[14px] text-text-secondary leading-relaxed">{step.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
