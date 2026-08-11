import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate } from "react-router-dom";
import { captureReferralFromUrl } from "./lib/partner-signup";
import { trackPageView, trackBookingIntent } from "./lib/analytics";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorks"));
const WhatWeTestPage = lazy(() => import("./pages/WhatWeTest"));
const StoriesPage = lazy(() => import("./pages/Stories"));
const AboutPage = lazy(() => import("./pages/About"));
const ProgramsPage = lazy(() => import("./pages/Programs"));
const BookTestPage = lazy(() => import("./pages/BookTest"));
const TestDetailPage = lazy(() => import("./pages/TestDetail"));
const SingleTestDetailPage = lazy(() => import("./pages/SingleTestDetail"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const TermsPage = lazy(() => import("./pages/Terms"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const CareersPage = lazy(() => import("./pages/Careers"));
const DownloadAppPage = lazy(() => import("./pages/DownloadApp"));
const WaitlistPage = lazy(() => import("./pages/Waitlist"));
const ForLabsPage = lazy(() => import("./pages/ForLabs"));
const ForDoctorsPage = lazy(() => import("./pages/ForDoctors"));
const ForNutritionistsPage = lazy(() => import("./pages/ForNutritionists"));
const FoundationPage = lazy(() => import("./pages/Foundation"));
const WellnessConsultationPage = lazy(() => import("./pages/WellnessConsultation"));
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

/**
 * Fires a Meta Pixel + GA4 page view on every client-side route change. The
 * initial document load is already counted by the base pixel/GTM snippets in
 * index.html, so the first render is skipped here to avoid double-counting.
 */
function RouteAnalytics() {
  const location = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
  return null;
}

/**
 * A single delegated click listener that catches every click-out to the app's
 * /join onboarding (the site's primary conversion) and fires a booking-intent
 * event — so we don't have to wire onClick into each scattered CTA, and future
 * CTAs are covered automatically. The panel/test being booked is read from the
 * outbound URL for content attribution.
 */
function BookingClickTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.includes("app.betterhealth.africa") || !href.includes("/join")) return;
      try {
        const params = new URL(href, window.location.origin).searchParams;
        const content = params.get("panel") || params.get("test") || params.get("tests");
        const contentType = params.has("panel")
          ? "panel"
          : params.has("tests")
            ? "tests"
            : params.has("test")
              ? "test"
              : undefined;
        trackBookingIntent({ content: content || undefined, contentType });
      } catch {
        trackBookingIntent();
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

function RedirectWithSearch({ to }) {
  const location = useLocation();
  return <Navigate to={`${to}${location.search}`} replace />;
}

function LegacyBookDetailRedirect() {
  const { slug } = useParams();
  const location = useLocation();
  return <Navigate to={`/book-tests/${slug}${location.search}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ReferralCapture />
      <RouteAnalytics />
      <BookingClickTracker />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/what-we-test" element={<WhatWeTestPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<RedirectWithSearch to="/book-tests" />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/book-tests" element={<BookTestPage />} />
          <Route path="/book-tests/:slug" element={<TestDetailPage />} />
          <Route path="/book" element={<RedirectWithSearch to="/book-tests" />} />
          <Route path="/book/:slug" element={<LegacyBookDetailRedirect />} />
          <Route path="/test/:slug" element={<SingleTestDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/download-app" element={<DownloadAppPage />} />
          <Route path="/for-labs" element={<ForLabsPage />} />
          <Route path="/for-doctors" element={<ForDoctorsPage />} />
          <Route path="/for-nutritionists" element={<ForNutritionistsPage />} />
          <Route path="/foundation" element={<FoundationPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          {/* Paid-campaign landing variants (A/B/C/D by audience). The bare path
              redirects to whichever cell is currently winning, keeping the
              search string so the utm params and click ids survive the hop. */}
          <Route
            path="/wellness-consultation"
            element={<RedirectWithSearch to="/wellness-consultation/wellness" />}
          />
          <Route path="/wellness-consultation/:variant" element={<WellnessConsultationPage />} />
          <Route path="/deleteme" element={<DeleteMePage />} />
          <Route path="/ref/:code" element={<ReferralRedirectPage />} />
          <Route path="/ref/:code/:partnerType" element={<ReferralRedirectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
