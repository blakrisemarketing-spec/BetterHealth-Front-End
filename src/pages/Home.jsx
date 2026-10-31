import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import PurposeIntro from "../components/PurposeIntro";
import ConditionMarquee from "../components/ConditionMarquee";
import HowItWorks from "../components/HowItWorks";
import ProductShowcase from "../components/ProductShowcase";
import WhatWeTest from "../components/WhatWeTest";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import ScreeningBundles from "../components/ScreeningBundles";
import DiseasePrograms from "../components/DiseasePrograms";
import FounderStory from "../components/FounderStory";
import AdvisoryTeam from "../components/AdvisoryTeam";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GDPCBadge from "../components/ui/GDPCBadge";
import { WaitlistProvider } from "../context/WaitlistContext";
import HealthConcernChooser from "../components/HealthConcernChooser";
import TrustBar from "../components/TrustBar";
import AppFeatures from "../components/app/AppFeatures";
import AppLoop from "../components/app/AppLoop";

export default function Home() {
  return (
    <WaitlistProvider>
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>BetterHealth Africa | Your Everyday Health App, With Lab Tests Built In</title>
        <meta name="description" content="The BetterHealth app for iPhone and Android: log Ghanaian meals by photo, track blood pressure and blood sugar, get medicine reminders, and book lab tests with results a clinician has read." />
      </Helmet>
      <Nav />
      <main>
        <Hero />
        <PurposeIntro />
        <AppFeatures limit={8} />
        <AppLoop />
        <ProductShowcase />
        <HowItWorks />
        <HealthConcernChooser />
        <TrustBar />
        <ScreeningBundles />
        <DiseasePrograms compact />
        <WhatWeTest />

        <section className="py-10 px-6 bg-base border-y border-border">
          <div className="max-w-[820px] mx-auto">
            <Reveal>
              <GDPCBadge variant="banner" />
            </Reveal>
          </div>
        </section>
        <ConditionMarquee />

        <Testimonials />
        <Pricing />
        <FounderStory />
        <AdvisoryTeam />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
    </WaitlistProvider>
  );
}
