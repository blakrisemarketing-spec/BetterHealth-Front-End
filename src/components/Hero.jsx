import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Reveal from "./ui/Reveal";
import GradientOrb from "./ui/GradientOrb";
import Badge from "./ui/Badge";
import PhoneFrame from "./ui/PhoneFrame";
import { heroStats, trustedPartners, waitlist } from "../data/content";
import { useWaitlist } from "../context/WaitlistContext";
import GDPCBadge from "./ui/GDPCBadge";

const heroScreens = [
  { src: `${import.meta.env.BASE_URL}screenshots/mobile-healthscore.webp`, alt: "Health Score 83/100 with organ system breakdown" },
  { src: `${import.meta.env.BASE_URL}screenshots/mobile-focus.webp`, alt: "Today's Focus and Celebrate Your Wins" },
  { src: `${import.meta.env.BASE_URL}screenshots/mobile-biomarker.webp`, alt: "Blood Urea Nitrogen biomarker detail" },
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

function HeroEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | duplicate | error
  const { submitted, markSubmitted } = useWaitlist();

  const apiUrl = import.meta.env.VITE_WAITLIST_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: "",
          email: email.trim().toLowerCase(),
          whatsapp: "",
          healthInterest: "",
          source: "hero-inline",
        }),
      });

      const data = await res.json();

      if (data.result === "duplicate") {
        setStatus("duplicate");
        markSubmitted();
      } else if (data.result === "success") {
        setStatus("success");
        markSubmitted();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success" || status === "duplicate" || submitted) {
    return (
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100">
          <CheckCircle2 size={22} className="text-green-600" />
        </div>
        <p className="text-[15px] font-medium leading-snug text-text-primary">
          {status === "duplicate" ? waitlist.duplicateMessage : waitlist.successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={`flex-1 rounded-btn px-4 py-3.5 text-[14px] bg-section-alt border border-border text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 focus:ring-teal-600 ${
            status === "loading" ? "opacity-60" : ""
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            status === "loading" ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Get Early Access <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">{waitlist.errorMessage}</p>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="waitlist" className="min-h-screen flex items-center pt-[100px] pb-16 px-6 bg-base relative overflow-hidden">
      {/* Subtle background orbs */}
      <GradientOrb color="green" size="700px" className="top-[-20%] right-[-15%]" />
      <GradientOrb color="blue" size="500px" className="bottom-[-15%] left-[-10%]" />

      <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row flex-wrap items-center gap-10 md:gap-12 lg:gap-16">
        {/* Left - Copy */}
        <div className="flex-1 w-full md:w-[480px] md:min-w-[300px]">
          <Reveal>
            <Badge variant="primary" className="mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
              Launching Soon in Ghana
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-h1 font-extrabold leading-[1.1] font-heading text-text-primary mb-6">
              Know what&apos;s happening{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal pr-[0.15em]">
                inside
              </span>{" "}
              your body.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg leading-[1.7] text-text-secondary max-w-[520px] mb-8 font-body">
              Comprehensive lab testing with 100+ biomarkers, personalized health insights, and home sample collection. Starting from GHS 2/day.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <HeroEmailForm />
            <Link to="/what-we-test" className="inline-block text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-6 no-underline">
              See What We Test &rarr;
            </Link>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="flex items-center gap-3 mb-6">
              <GDPCBadge />
              <span className="text-[13px] text-text-muted font-body">Your health data is protected by law</span>
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
              <p className="text-[11px] text-text-muted uppercase tracking-[0.12em] font-semibold mb-4">Our Partners</p>
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
          <div
            className="relative md:animate-float"
            style={{
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
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
