import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Page Not Found — BetterHealth Africa</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to BetterHealth Africa to explore comprehensive health screening services in Ghana." />
      </Helmet>
      <Nav />
      <section className="min-h-[60vh] flex items-center justify-center pt-[120px] pb-20 px-6">
        <div className="text-center max-w-[480px]">
          <h1 className="text-[4rem] font-extrabold font-heading text-primary mb-4">404</h1>
          <h2 className="text-[1.8rem] font-extrabold font-heading text-text-primary mb-3">Page not found</h2>
          <p className="text-text-secondary text-lg mb-8 font-body">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
          >
            Go Home
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
