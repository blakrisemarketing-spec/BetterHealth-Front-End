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

export default function Home() {
  return (
    <WaitlistProvider>
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>BetterHealth Africa | Know Your Health Before Symptoms Appear</title>
        <meta name="description" content="BetterHealth Africa is Ghana's first health intelligence platform. Book lab tests, get doctor-reviewed results, and understand your health indicators from your phone." />
      </Helmet>
      <Nav />
      <main>
        <Hero />
        <HealthConcernChooser />
        <TrustBar />
        <PurposeIntro />
        <HowItWorks />
        <ScreeningBundles />
        <DiseasePrograms compact />
        <ProductShowcase />
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
