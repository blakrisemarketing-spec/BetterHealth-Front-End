import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorks"));
const WhatWeTestPage = lazy(() => import("./pages/WhatWeTest"));
const StoriesPage = lazy(() => import("./pages/Stories"));
const AboutPage = lazy(() => import("./pages/About"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const TermsPage = lazy(() => import("./pages/Terms"));
const BlogPage = lazy(() => import("./pages/Blog"));
const CareersPage = lazy(() => import("./pages/Careers"));
const DownloadAppPage = lazy(() => import("./pages/DownloadApp"));
const ForLabsPage = lazy(() => import("./pages/ForLabs"));
const ForDoctorsPage = lazy(() => import("./pages/ForDoctors"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
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
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/download-app" element={<DownloadAppPage />} />
          <Route path="/for-labs" element={<ForLabsPage />} />
          <Route path="/for-doctors" element={<ForDoctorsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
