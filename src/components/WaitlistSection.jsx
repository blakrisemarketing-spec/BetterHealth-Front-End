import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./ui/Reveal";

export default function WaitlistSection() {
  return (
    <section className="py-[100px] px-6 bg-section-alt">
      <div className="max-w-[700px] mx-auto text-center">
        <Reveal>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-text-primary font-heading leading-[1.15] mb-4">
            Ready to take control of your health?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-text-secondary mb-8 max-w-[480px] mx-auto font-body">
            Sign up for early access. Be the first to know when BetterHealth Africa launches in Ghana.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            to="/waitlist"
            className="inline-flex items-center justify-center gap-2 rounded-btn px-8 py-4 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green transition-all no-underline"
          >
            Join the Waitlist <ArrowRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
