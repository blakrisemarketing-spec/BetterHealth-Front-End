import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Reveal from "./ui/Reveal";
import GradientOrb from "./ui/GradientOrb";
import Badge from "./ui/Badge";
import PhoneFrame from "./ui/PhoneFrame";
import { heroStats, trustedPartners } from "../data/content";

const heroScreens = [
  { src: `${import.meta.env.BASE_URL}screenshots/mobile-healthscore.jpg`, alt: "Health Score 83/100 with organ system breakdown" },
  { src: `${import.meta.env.BASE_URL}screenshots/mobile-focus.jpg`, alt: "Today's Focus and Celebrate Your Wins" },
  { src: `${import.meta.env.BASE_URL}screenshots/mobile-biomarker.jpg`, alt: "Blood Urea Nitrogen biomarker detail" },
];

function CountUp({ end, duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-[100px] pb-16 px-6 bg-base relative overflow-hidden">
      {/* Subtle background orbs */}
      <GradientOrb color="green" size="700px" className="top-[-20%] right-[-15%]" />
      <GradientOrb color="blue" size="500px" className="bottom-[-15%] left-[-10%]" />

      <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row flex-wrap items-center gap-10 md:gap-12 lg:gap-16">
        {/* Left - Copy */}
        <div className="flex-1 w-full md:w-[480px] md:min-w-[300px]">
          <Reveal>
            <Badge variant="primary" className="mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
              Now available in Ghana
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-h1 font-extrabold leading-[1.08] font-heading text-text-primary tracking-[-0.03em] mb-5">
              Know what&apos;s happening{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal">
                inside
              </span>{" "}
              your body.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-text-secondary max-w-[520px] mb-8 font-body">
              Comprehensive lab testing with 100+ biomarkers, personalized health insights, and home sample collection. Starting from GHS 8/day.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/pricing" className="bg-primary hover:bg-primary-dark text-white border-none rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 no-underline">
                Start Your Health Check <ArrowRight size={18} />
              </Link>
              <Link to="/what-we-test" className="bg-transparent text-text-primary border-2 border-border hover:border-primary hover:text-primary rounded-btn px-7 py-4 text-base font-semibold font-heading transition-all cursor-pointer no-underline">
                See What We Test
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex gap-8 flex-wrap">
              {heroStats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl sm:text-[28px] font-extrabold text-text-primary font-heading tracking-tight">
                    {stat.value === "127+" ? (
                      <><CountUp end={127} />+</>
                    ) : (
                      stat.value
                    )}
                  </span>
                  <span className="text-[11px] sm:text-[13px] text-text-muted font-medium tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Trust bar */}
          <Reveal delay={0.5}>
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-[11px] text-text-muted uppercase tracking-[0.12em] font-semibold mb-4">Trusted Partners</p>
              <div className="flex items-center gap-8 flex-wrap">
                {trustedPartners.map((partner) => (
                  <span key={partner} className="text-sm font-bold text-text-muted font-heading tracking-tight">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right - Phone mockup with real screenshot */}
        <Reveal delay={0.3} direction="right" className="w-full md:w-[380px] md:flex-shrink-0 flex justify-center">
          <div className="animate-float relative">
            <PhoneFrame screens={heroScreens} interval={3500} />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-white text-xs font-bold font-heading px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
              42 Biomarkers Tracked
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
