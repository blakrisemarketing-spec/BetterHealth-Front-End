import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./ui/Reveal";
import { appIsLive, GET_APP_URL } from "../data/app";
import GradientOrb from "./ui/GradientOrb";

export default function FinalCTA() {
  return (
    <section className="py-[120px] px-6 bg-bg-dark relative overflow-hidden text-center">
      {/* Orb */}
      <GradientOrb color="green" size="800px" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[700px] mx-auto relative z-10">
        <Reveal>
          <h2 className="text-[clamp(32px,5vw,52px)] font-extrabold text-text-on-dark font-heading leading-[1.15] mb-5">
            Start looking after your health{" "}
            <span className="italic text-primary-light">today</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-text-muted-dark mb-4 max-w-[480px] mx-auto font-body">
            Get the app to track your food, readings and medicines every day. When you want a clearer picture, book a lab test from the same place.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-sm text-text-muted-dark mb-8 max-w-[400px] mx-auto font-body">
            {appIsLive
              ? "Free on iPhone and Android. Lab tests are available across Ghana."
              : "The app is in beta on iPhone and Android. Join the beta and we will send you an invite."}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={GET_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-btn px-8 py-4 text-[15px] font-bold font-heading bg-gradient-to-r from-primary to-primary-light text-white shadow-[0_4px_30px_rgba(13,148,136,0.35)] hover:shadow-[0_8px_40px_rgba(13,148,136,0.5)] hover:-translate-y-1 hover:scale-[1.02] transition-all no-underline"
            >
              {appIsLive ? "Get the app" : "Join the beta"} <ArrowRight size={18} />
            </a>
            <Link
              to="/book-tests"
              className="inline-flex items-center justify-center gap-2 rounded-btn px-8 py-4 text-[15px] font-bold font-heading border border-white/25 text-white hover:bg-white/10 hover:-translate-y-1 transition-all no-underline"
            >
              Book a lab test
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
