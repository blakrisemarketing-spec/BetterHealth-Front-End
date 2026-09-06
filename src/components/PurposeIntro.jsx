import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./ui/Reveal";
import { appUrl } from "../lib/app-links";
import communityConversationPhoto from "../assets/about/community-conversation.jpg";
import diyaImpactTeamPhoto from "../assets/about/diya-impact-team.jpg";
import communityIntakePhoto from "../assets/about/community-intake.jpg";


const valueProps = [
  {
    title: "Real lab results",
    desc: "Accredited partner laboratories run your tests. These are real lab numbers, not estimates.",
  },
  {
    title: "Reviewed by doctors",
    desc: "A doctor reviews your result before it reaches you.",
  },
  {
    title: "Results in 48 to 72 hours",
    desc: "Your full results show up in your dashboard within 48 to 72 hours of collection.",
  },
  {
    title: "Private & confidential",
    desc: "Your health data is encrypted and protected under Ghana's Data Protection Act.",
  },
];

// "About / purpose" section placed directly below the hero so a logged-out
// visitor (and Google's OAuth branding reviewer) can tell, without scrolling far
// and without any login wall, exactly what BetterHealth Africa does and that it's
// the same product behind the "Continue with Google" button in the app.
export default function PurposeIntro() {
  return (
    <section id="about" className="py-20 lg:py-[120px] px-6 bg-base">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              About BetterHealth Africa
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight mb-6">
              Understand your body like{" "}
              <span className="italic text-primary tracking-normal">never before</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-[1.75] text-text-secondary font-body max-w-[720px] mb-4">
              BetterHealth Africa gives you the tools to understand your body like never before and turn that data into actionable insight, helping you live a healthier, longer life.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-[15px] leading-[1.7] text-text-muted font-body max-w-[660px] mb-8">
              Start with the concern on your mind. When your results are ready, sign in with
              email, phone, or Google to review them at{" "}
              <a
                href={appUrl()}
                className="text-primary font-semibold no-underline hover:text-primary-dark transition-colors"
              >
                app.betterhealth.africa
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/book-tests"
                className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green transition-all no-underline"
              >
                Book a test <ArrowRight size={18} />
              </Link>
              <a
                href={appUrl()}
                className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-white border border-border text-text-primary hover:-translate-y-0.5 hover:shadow-md transition-all no-underline"
              >
                Sign in
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-left">
            {valueProps.map((vp, i) => (
              <Reveal key={vp.title} delay={0.25 + i * 0.08}>
                <div className="flex gap-3">
                  <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-[16px] font-bold text-text-primary font-heading mb-2">
                      {vp.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-text-secondary font-body">
                      {vp.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.18} direction="right">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img
              src={communityConversationPhoto}
              alt="A BetterHealth Africa team member speaking with community members during a health screening"
              className="col-span-2 w-full aspect-[16/9] object-cover rounded-card"
              loading="lazy"
            />
            <img
              src={diyaImpactTeamPhoto}
              alt="BetterHealth Africa and Diya Impact team members standing together at a community event"
              className="w-full aspect-[4/3] object-cover object-[center_18%] rounded-card"
              loading="lazy"
            />
            <img
              src={communityIntakePhoto}
              alt="A BetterHealth Africa team member helping a community member during intake"
              className="w-full aspect-[4/3] object-cover object-[center_35%] rounded-card"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
