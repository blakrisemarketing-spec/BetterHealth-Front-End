import { Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, Smartphone, Trash2, Wallet } from "lucide-react";
import Seo from "../components/Seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import PhoneFrame from "../components/ui/PhoneFrame";
import AppLoop from "../components/app/AppLoop";
import AppFeatures from "../components/app/AppFeatures";
import StoreBadges from "../components/app/StoreBadges";
import { APP_SCREENS, heroAppScreens } from "../components/app/screens";
import { APP_BETA_URL, appDisclaimer, appIsLive } from "../data/app";

const DEEP_DIVES = [
  {
    screen: APP_SCREENS.food,
    eyebrow: "Food",
    title: "Built for the food on your plate",
    body: "The food list covers over 480 Ghanaian, Nigerian and West African foods, from banku to kelewele, and understands the names people use for them.",
    points: [
      "Take a photo of your plate and check what the app found",
      "Or describe it: \"2 balls of kenkey and fried fish\"",
      "Scan a barcode, or read a packet's nutrition label",
      "A daily calorie target set from your goal, with advice for diabetes, blood pressure and kidney disease",
      "Weekly meal plans and local recipes, with healthier swaps",
    ],
  },
  {
    screen: APP_SCREENS.readings,
    eyebrow: "Readings",
    title: "Your home readings in one place",
    body: "If you check your blood pressure or sugar at home, the numbers usually end up on scraps of paper. Log them in seconds and see the pattern.",
    points: [
      "Blood pressure, blood sugar and weight",
      "Day, week and month charts",
      "Reminders at the times you choose",
      "Clear safety advice if a reading is very high or very low",
    ],
  },
  {
    screen: APP_SCREENS.medicines,
    eyebrow: "Medicines",
    title: "Know whether you took your medicine",
    body: "Add each medicine once, with a photo of the pack. The app reminds you at the exact time and keeps a record of every dose.",
    points: [
      "Exact-time reminders",
      "Mark each dose taken or skipped",
      "A list you can show your doctor",
    ],
  },
  {
    screen: APP_SCREENS.results,
    eyebrow: "Lab tests",
    title: "Book a test and read the result in the app",
    body: "Pick a package or a single test, choose home collection or a partner lab, and pay with Mobile Money or card. Your results arrive in 48 to 72 hours, after a clinician has read them.",
    points: [
      "Results grouped by organ, each against its normal range",
      "What each result measures and what helps",
      "Compare with your earlier results",
      "Upload results from another lab for our clinical team to check",
      "Download your report as a PDF",
    ],
    cta: { to: "/book-tests", label: "See lab tests and prices" },
  },
];

const TRUST = [
  { Icon: Wallet, title: "Free to use", body: "Tracking, reminders, meal plans, challenges and articles cost nothing. You pay only for the lab tests and consultations you book." },
  { Icon: ShieldCheck, title: "You choose what it reads", body: "The app asks before it reads steps or sleep from your phone, and you can change your mind at any time. We never sell your data." },
  { Icon: Trash2, title: "Leave whenever you like", body: "Delete your account from inside the app or on our website." },
];

export default function DownloadAppPage() {
  return (
    <>
      <Seo route="download-app" />

      <Nav dark />

      <main className="bg-bg-light text-text-primary overflow-x-hidden">
        {/* Hero */}
        <section className="relative pt-28 pb-20 px-6 bg-bg-dark text-text-on-dark overflow-hidden">
          <GradientOrb className="top-[-80px] right-[-80px] opacity-30" />
          <GradientOrb className="bottom-[-60px] left-[-60px] opacity-20" size={320} />
          <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-semibold tracking-wide mb-6">
                {appIsLive ? "NOW ON iPHONE & ANDROID" : "BETA ON iPHONE & ANDROID"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold font-heading leading-tight mb-6">
                One app for your<br />
                <span className="text-primary-light">everyday health.</span>
              </h1>
              <p className="text-lg text-text-muted-dark leading-relaxed max-w-[500px] mb-10">
                Food, home readings, medicines, steps, your cycle and your mood, next to lab results a clinician has read. Built in Ghana, with Ghanaian food in its food list.
              </p>

              <StoreBadges />

              {!appIsLive && (
                <p className="text-sm text-text-muted-dark mt-4 max-w-[460px]">
                  The app is not in the public stores yet. Either button opens the beta sign-up, and we will send you instructions to install it.
                </p>
              )}
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex justify-center">
                <PhoneFrame screens={heroAppScreens} interval={3500} />
              </div>
            </Reveal>
          </div>
        </section>

        <AppLoop />

        <AppFeatures
          eyebrow="Features"
          heading={
            <>
              Everything the app <span className="italic text-primary tracking-normal">does</span>
            </>
          }
          intro="Each part works on its own, so use what you need. Pick the tabs that matter to you and the app arranges itself around them."
        />

        {/* Deep dives */}
        {DEEP_DIVES.map((d, i) => (
          <section key={d.eyebrow} className={`py-20 lg:py-24 px-6 ${i % 2 ? "bg-bg-alt" : "bg-base"}`}>
            <div className={`max-w-[1100px] mx-auto flex flex-col ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 lg:gap-20`}>
              <Reveal direction={i % 2 ? "right" : "left"} className="w-full md:w-[320px] md:flex-shrink-0 flex justify-center">
                <PhoneFrame screens={[d.screen]} />
              </Reveal>
              <div className="flex-1">
                <Reveal>
                  <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">{d.eyebrow}</p>
                  <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold font-heading tracking-tight leading-[1.15] mb-4">{d.title}</h2>
                  <p className="text-[17px] leading-[1.7] text-text-secondary font-body mb-6">{d.body}</p>
                  <ul className="flex flex-col gap-3 list-none p-0 m-0">
                    {d.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px] text-text-secondary font-body">
                        <Check size={18} className="text-primary mt-0.5 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {d.cta && (
                    <Link
                      to={d.cta.to}
                      className="inline-flex items-center gap-2 mt-8 text-primary font-bold font-heading no-underline hover:text-primary-dark transition-colors"
                    >
                      {d.cta.label} <ArrowRight size={18} />
                    </Link>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* Free / privacy */}
        <section className="py-20 px-6 bg-base border-t border-border">
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-6">
            {TRUST.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="h-full p-6 rounded-card border border-border bg-white">
                  <t.Icon size={24} className="text-primary mb-4" />
                  <h3 className="font-bold font-heading text-lg mb-2">{t.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed m-0">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Beta CTA */}
        <section id="beta" className="py-20 px-6 bg-bg-alt">
          <div className="max-w-[600px] mx-auto text-center">
            <Reveal>
              <Smartphone size={36} className="text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold font-heading mb-4">
                {appIsLive ? "Get BetterHealth on your phone." : "Help us finish the app."}
              </h2>
              <p className="text-text-secondary mb-8">
                {appIsLive
                  ? "Download it free from the App Store or Google Play."
                  : "Join the beta testing program to use the app before it reaches the stores. Tell us what works and what does not, and we will use it to fix and improve the app."}
              </p>
              {appIsLive ? (
                <StoreBadges dark={false} className="justify-center" />
              ) : (
                <a
                  href={APP_BETA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-btn px-8 py-4 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 transition-all no-underline"
                >
                  Join the beta <ArrowRight size={18} />
                </a>
              )}
              <p className="text-xs text-text-muted mt-8 leading-relaxed">{appDisclaimer}</p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
