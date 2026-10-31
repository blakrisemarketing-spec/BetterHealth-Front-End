import Reveal from "../ui/Reveal";
import PhoneFrame from "../ui/PhoneFrame";
import { appLoop } from "../../data/app";
import { APP_SCREENS } from "./screens";

// The app's daily loop, in the words its own onboarding uses.
export default function AppLoop() {
  return (
    <section className="py-20 lg:py-[120px] px-6 bg-base relative overflow-hidden">
      <div className="max-w-[1180px] mx-auto flex flex-col-reverse md:flex-row items-center gap-14 lg:gap-20">
        <Reveal direction="left" className="w-full md:w-[320px] md:flex-shrink-0 flex justify-center">
          <PhoneFrame screens={[APP_SCREENS.home]} />
        </Reveal>

        <div className="flex-1">
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              How the app works
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight mb-5 leading-[1.1]">
              Small things,{" "}
              <span className="italic text-primary tracking-normal pr-[0.12em]">done daily</span>
            </h2>
            <p className="text-[17px] leading-[1.7] text-text-secondary font-body mb-10 max-w-[560px]">
              Pick a few habits you can keep, then watch your numbers to see whether they are working.
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {appLoop.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="flex gap-5">
                  <span className="text-[28px] font-extrabold text-primary/40 font-heading leading-none w-10 shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-bold text-text-primary font-heading mb-1.5">{step.title}</h3>
                    <p className="text-[15px] leading-relaxed text-text-secondary font-body m-0">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
