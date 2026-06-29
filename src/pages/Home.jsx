import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import PurposeIntro from "../components/PurposeIntro";
import TrustBar from "../components/TrustBar";
import ConditionMarquee from "../components/ConditionMarquee";
import HowItWorks from "../components/HowItWorks";
import ProductShowcase from "../components/ProductShowcase";
import WhatWeTest from "../components/WhatWeTest";
import ComparisonTable from "../components/ComparisonTable";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FounderStory from "../components/FounderStory";
import AdvisoryTeam from "../components/AdvisoryTeam";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import WaitlistSection from "../components/WaitlistSection";
import Reveal from "../components/ui/Reveal";
import GDPCBadge from "../components/ui/GDPCBadge";
import { WaitlistProvider } from "../context/WaitlistContext";

export default function Home() {
  return (
    <WaitlistProvider>
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>BetterHealth Africa — Know Your Health Before Symptoms Appear</title>
        <meta name="description" content="BetterHealth Africa is a digital health platform that makes diagnostic testing and clinical guidance accessible across Africa. Book lab tests with 127 biomarkers, get results reviewed by qualified clinicians, and access them from your phone. Create an account or sign in with email, phone, or Google at app.betterhealth.africa." />
      </Helmet>
      <Nav />
      <main>
        <Hero />
        <PurposeIntro />
        <TrustBar />
        <ConditionMarquee />
        <HowItWorks />
        <ProductShowcase />
        <WhatWeTest />
        <ComparisonTable />

        {/* Data Protection Strip */}
        <section className="py-12 px-6 bg-bg-dark">
          <div className="max-w-[800px] mx-auto">
            <Reveal>
              <GDPCBadge variant="banner" />
            </Reveal>
          </div>
        </section>

        <Testimonials />
        <Pricing />
        <WaitlistSection />
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
