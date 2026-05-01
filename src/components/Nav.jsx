import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/content";
import logo from "../assets/logo.png";

export default function Nav({ dark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  // When mobile menu is open, treat nav as "scrolled" so it stays opaque/visible
  const navActive = scrolled || mobileMenu;

  const desktopLinkClass =
    !navActive && dark
      ? "text-white/90 text-sm font-medium hover:text-primary transition-colors"
      : "text-text-secondary text-sm font-medium hover:text-primary transition-colors";

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
              ? "text-text-primary text-base sm:text-xl font-semibold font-heading py-4 border-b border-border no-underline hover:text-primary transition-colors"
              : desktopLinkClass
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
            ? "text-text-primary text-base sm:text-xl font-semibold font-heading py-4 border-b border-border no-underline hover:text-primary transition-colors"
            : desktopLinkClass
        }
      >
        {link}
      </a>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navActive
            ? "border-b border-border shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
        style={navActive ? { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" } : {}}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="BetterHealth Africa"
              className={`h-11 w-auto object-contain max-w-[180px] sm:max-w-[220px] transition-all duration-300 ${
                !navActive && dark ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => renderLink(link))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link to="/how-it-works" className={`hidden md:inline-block text-sm font-medium hover:text-primary transition-colors px-4 py-2 no-underline ${!navActive && dark ? "text-white/90" : "text-text-secondary"}`}>
              Learn More
            </Link>
            <a href="#waitlist" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-primary hover:bg-primary-dark text-white border-none rounded-btn px-5 py-3 min-h-[44px] text-sm font-semibold font-heading transition-all hover:-translate-y-0.5 cursor-pointer no-underline inline-flex items-center">
              Join Waitlist
            </a>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenu}
              className={`md:hidden bg-transparent border-none p-1 cursor-pointer transition-colors ${!navActive && dark ? "text-white" : "text-text-primary"}`}
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — rendered outside nav to avoid stacking context issues */}
      {mobileMenu && (
        <div
          className="fixed top-[72px] left-0 right-0 bottom-0 px-6 py-6 flex flex-col gap-2 md:hidden z-[9999] border-t border-border shadow-xl overflow-y-auto"
          style={{ backgroundColor: "#ffffff" }}
        >
          {navLinks.map((link) => renderLink(link, true))}
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
            <a
              href="#waitlist"
              onClick={(e) => { e.preventDefault(); setMobileMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full text-center bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-4 text-base font-bold font-heading transition-all no-underline"
            >
              Join Waitlist
            </a>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenu(false)}
              className="w-full text-center text-text-secondary text-base font-medium hover:text-primary transition-colors py-2 no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
