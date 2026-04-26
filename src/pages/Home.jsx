import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
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
import Reveal from "../components/ui/Reveal";
import GDPCBadge from "../components/ui/GDPCBadge";

export default function Home() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>BetterHealth Africa — Know Your Health Before Symptoms Appear</title>
        <meta name="description" content="Comprehensive lab testing with 100+ biomarkers, personalized health insights, and home sample collection across Ghana. Starting from GHS 8/day." />
      </Helmet>
      <Nav />
      <main>
        <Hero />
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
        <FounderStory />
        <AdvisoryTeam />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
