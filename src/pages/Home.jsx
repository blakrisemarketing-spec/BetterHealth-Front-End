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

export default function Home() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <ConditionMarquee />
        <HowItWorks />
        <ProductShowcase />
        <WhatWeTest />
        <ComparisonTable />
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
