import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/content";
import logo from "../assets/logo.png";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (link, mobile = false) => {
    const routeMap = {
      "How It Works": "/how-it-works",
      "What We Test": "/what-we-test",
      "Stories": "/stories",
      "About": "/about",
      "Pricing": "/pricing",
    };
    if (routeMap[link]) {
      return (
        <Link
          key={link}
          to={routeMap[link]}
          onClick={() => mobile && setMobileMenu(false)}
          className={
            mobile
              ? "text-text-primary text-xl font-semibold font-heading py-4 border-b border-border no-underline hover:text-primary transition-colors"
              : "text-text-secondary text-sm font-medium hover:text-primary transition-colors"
          }
        >
          {link}
        </Link>
      );
    }
    return (
      <a
        key={link}
        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
        onClick={() => mobile && setMobileMenu(false)}
        className={
          mobile
            ? "text-text-primary text-xl font-semibold font-heading py-4 border-b border-border no-underline hover:text-primary transition-colors"
            : "text-text-secondary text-sm font-medium hover:text-primary transition-colors"
        }
      >
        {link}
      </a>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
      style={scrolled ? { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" } : {}}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="BetterHealth Africa"
            className="h-11 w-auto object-contain"
            style={{ maxWidth: "220px" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => renderLink(link))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:inline-block text-text-secondary text-sm font-medium hover:text-primary transition-colors px-4 py-2">
            Log in
          </a>
          <button className="bg-primary hover:bg-primary-dark text-white border-none rounded-btn px-5 py-2.5 text-sm font-semibold font-heading transition-all hover:-translate-y-0.5 cursor-pointer">
            Get Started
          </button>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden bg-transparent border-none text-text-primary p-1 cursor-pointer"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="fixed top-[72px] left-0 right-0 bottom-0 bg-white p-8 flex flex-col gap-2 md:hidden z-50">
          {navLinks.map((link) => renderLink(link, true))}
        </div>
      )}
    </nav>
  );
}
