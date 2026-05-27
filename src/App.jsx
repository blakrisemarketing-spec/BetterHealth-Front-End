import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import StructuredData from "./components/StructuredData";
import { getOrganizationSchema } from "./components/structured-data";
import { captureReferralFromUrl } from "./lib/partner-signup";

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
const ForNutritionistsPage = lazy(() => import("./pages/ForNutritionists"));
const WaitlistPage = lazy(() => import("./pages/Waitlist"));
const DeleteMePage = lazy(() => import("./pages/DeleteMe"));
const ReferralRedirectPage = lazy(() => import("./pages/ReferralRedirect"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

/**
 * Silently captures `?ref=<code>` from the URL on every navigation and
 * stores it in sessionStorage. The code is read by submitPartnerSignup()
 * and silently included with any partner form submission for the rest of
 * the session — survives in-site navigation away from the referral link,
 * doesn't survive closing the tab.
 */
function ReferralCapture() {
  const location = useLocation();
  useEffect(() => {
    captureReferralFromUrl(location.search);
  }, [location.search]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ReferralCapture />
      <StructuredData data={getOrganizationSchema()} />
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
          <Route path="/for-nutritionists" element={<ForNutritionistsPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/deleteme" element={<DeleteMePage />} />
          <Route path="/ref/:code" element={<ReferralRedirectPage />} />
          <Route path="/ref/:code/:partnerType" element={<ReferralRedirectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
