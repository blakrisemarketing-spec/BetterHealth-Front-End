import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LaunchHero from "../components/launch/LaunchHero";
import { TrustedBy, Statement, Bento, DailyThree } from "../components/launch/LaunchExtras";
import {
  WhyCards, LabBand, Bundles, Testimonials, Founder, MoreGrid, LaunchFAQ, LaunchCTA,
} from "../components/launch/LaunchSections";
import { getHomeVariant, reportHomeVariant, LOOKS, HEROES } from "../lib/home-experiment";

// Fonts a look needs beyond the Quicksand and Inter 400-800 that index.html
// already loads. Added once, only when that look is shown.
const LOOK_FONTS = {
  bright: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
};

function useLookFont(look) {
  useEffect(() => {
    const href = LOOK_FONTS[look];
    if (!href || document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [look]);
}

// Shown with ?preview so the team can flip between designs. Visitors in the
// test never see it.
function VariantSwitcher({ look, hero }) {
  const navigate = useNavigate();
  const go = (next) => {
    const v = { look, hero, ...next };
    navigate(`/?preview&look=${v.look}&hero=${v.hero}`, { replace: true });
  };
  const btn = (on) =>
    `px-3 py-1.5 rounded-full text-[12px] font-bold capitalize border-none cursor-pointer ${on ? "bg-white text-black" : "bg-transparent text-white/70 hover:text-white"}`;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-wrap items-center justify-center gap-1 bg-black/85 backdrop-blur rounded-full p-1.5 shadow-2xl font-[Inter,sans-serif]">
      {LOOKS.map((l) => (
        <button key={l} className={btn(l === look)} onClick={() => go({ look: l })}>{l}</button>
      ))}
      <span className="w-px h-5 bg-white/20 mx-1" />
      {HEROES.map((h) => (
        <button key={h} className={btn(h === hero)} onClick={() => go({ hero: h })}>{h}</button>
      ))}
    </div>
  );
}

// The launch homepage. Three looks and two heroes are under test (see
// src/lib/home-experiment.js); everything below the hero is shared.
export default function Home() {
  const { search } = useLocation();
  const variant = useMemo(() => getHomeVariant(search), [search]);
  useLookFont(variant.look);
  useEffect(() => reportHomeVariant(variant), [variant]);

  return (
    <div data-look={variant.look} className="bg-l-bg text-l-ink min-h-screen overflow-x-hidden">
      <Helmet>
        <title>BetterHealth Africa | Your Everyday Health App, With Lab Tests Built In</title>
        <meta name="description" content="The BetterHealth app for iPhone and Android: log Ghanaian meals by photo, track blood pressure and blood sugar, get medicine reminders, and book lab tests with results a clinician has read." />
        <meta name="theme-color" content={variant.look === "dark" ? "#0C110F" : "#FFFFFF"} />
      </Helmet>
      <Nav />
      <main>
        <LaunchHero variant={variant.hero} />
        <TrustedBy />
        <Statement />
        <Bento />
        <DailyThree />
        <Founder />
        <LabBand />
        <Bundles />
        <Testimonials />
        <WhyCards />
        <MoreGrid />
        <LaunchFAQ />
        <LaunchCTA />
      </main>
      <Footer />
      {variant.preview && <VariantSwitcher look={variant.look} hero={variant.hero} />}
    </div>
  );
}
