import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorksPage from "./pages/HowItWorks";
import WhatWeTestPage from "./pages/WhatWeTest";
import StoriesPage from "./pages/Stories";
import AboutPage from "./pages/About";
import PricingPage from "./pages/Pricing";
import FAQPage from "./pages/FAQ";
import ContactPage from "./pages/Contact";
import PrivacyPage from "./pages/Privacy";
import BlogPage from "./pages/Blog";
import CareersPage from "./pages/Careers";

export default function App() {
  return (
    <BrowserRouter basename="/BetterHealth-Front-End">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/what-we-test" element={<WhatWeTestPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
