import { Link } from "react-router-dom";
import { ArrowRight, Smartphone } from "lucide-react";
import Reveal from "./ui/Reveal";
import GradientOrb from "./ui/GradientOrb";
import Badge from "./ui/Badge";
import PhoneFrame from "./ui/PhoneFrame";
import { trustedPartners } from "../data/content";
import { appHeroStats, appIsLive, GET_APP_URL } from "../data/app";
import { heroAppScreens } from "./app/screens";
import GDPCBadge from "./ui/GDPCBadge";

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
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              {appIsLive ? "Now on iPhone and Android" : "The BetterHealth app is in beta"}
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-h1 font-extrabold leading-[1.1] font-heading text-text-primary mb-6">
              Your health,{" "}
              <span className="text-primary italic tracking-normal pr-[0.15em]">
                every day
              </span>
              , in one app.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg leading-[1.7] text-text-secondary max-w-[520px] mb-8 font-body">
              Log your waakye by photo. Record your blood pressure and sugar. Get reminded to take your medicines. Track your steps, your period and your mood. When it is time for a lab test, book it in the same app and get results a clinician has read, explained in plain words.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={GET_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green transition-all no-underline"
              >
                <Smartphone size={18} /> {appIsLive ? "Get the app" : "Join the beta"}
              </a>
              <Link
                to="/book-tests"
                className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-white border border-border text-text-primary hover:-translate-y-0.5 hover:shadow-md transition-all no-underline"
              >
                Book a lab test <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="flex items-center gap-3 mb-6">
              <GDPCBadge />
              <span className="text-[13px] text-text-muted font-body">Your health data is protected by law</span>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex gap-8 flex-wrap">
              {appHeroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl sm:text-[28px] font-extrabold text-text-primary font-heading tracking-tight">
                    {stat.value}
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

        {/* Right - Phone mockup of the app */}
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
            <PhoneFrame screens={heroAppScreens} interval={3500} />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-white text-xs font-bold font-heading px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
              iPhone &amp; Android
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
