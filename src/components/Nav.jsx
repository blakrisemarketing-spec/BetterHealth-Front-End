import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Stethoscope, Apple, FlaskConical } from "lucide-react";
import { navLinks } from "../data/content";
import { BOOK_TEST_URL } from "../lib/app-links";
import logo from "../assets/logo.png";

const PARTNER_LINKS = [
  { label: "For Doctors", route: "/for-doctors", icon: Stethoscope },
  { label: "For Nutritionists & Dieticians", route: "/for-nutritionists", icon: Apple },
  { label: "For Lab Owners", route: "/for-labs", icon: FlaskConical },
];

export default function Nav({ dark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [partnersMobileOpen, setPartnersMobileOpen] = useState(false);
  const partnersRef = useRef(null);
  const partnersCloseTimer = useRef(null);

  const openPartners = () => {
    if (partnersCloseTimer.current) {
      clearTimeout(partnersCloseTimer.current);
      partnersCloseTimer.current = null;
    }
    setPartnersOpen(true);
  };

  // Close on a short delay so a brief cursor excursion (e.g. travelling from the
  // trigger toward the submenu) doesn't dismiss the menu before it's reached.
  const closePartnersSoon = () => {
    if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
    partnersCloseTimer.current = setTimeout(() => setPartnersOpen(false), 140);
  };

  useEffect(() => () => {
    if (partnersCloseTimer.current) clearTimeout(partnersCloseTimer.current);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  // Close desktop dropdown on click-outside or Esc
  useEffect(() => {
    if (!partnersOpen) return;
    const onPointer = (e) => {
      if (partnersRef.current && !partnersRef.current.contains(e.target)) {
        setPartnersOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setPartnersOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [partnersOpen]);

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

            {/* For Partners dropdown */}
            <div
              ref={partnersRef}
              className="relative"
              onMouseEnter={openPartners}
              onMouseLeave={closePartnersSoon}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={partnersOpen}
                onClick={() => setPartnersOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setPartnersOpen(false);
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPartnersOpen((v) => !v);
                  }
                }}
                className={`${desktopLinkClass} inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0`}
              >
                For Partners
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${partnersOpen ? "rotate-180" : ""}`}
                />
              </button>

              {partnersOpen && (
                // top-full + pt-2 (padding, not a margin) keeps the panel's hover
                // area touching the trigger, so the cursor never crosses a dead gap
                // that would dismiss the menu before reaching an item.
                <div className="absolute right-0 top-full pt-2 w-[260px] z-50">
                  <div
                    role="menu"
                    aria-label="Partner options"
                    className="bg-white border border-border rounded-card shadow-lg overflow-hidden"
                  >
                    {PARTNER_LINKS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <Link
                          key={p.route}
                          to={p.route}
                          role="menuitem"
                          onClick={() => setPartnersOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary font-medium hover:bg-section-alt hover:text-primary transition-colors no-underline border-b border-border last:border-b-0"
                        >
                          <span className="w-8 h-8 rounded-card bg-primary-bg flex items-center justify-center shrink-0">
                            <Icon size={16} className="text-primary" />
                          </span>
                          {p.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link to="/how-it-works" className={`hidden md:inline-block text-sm font-medium hover:text-primary transition-colors px-4 py-2 no-underline ${!navActive && dark ? "text-white/90" : "text-text-secondary"}`}>
              Learn More
            </Link>
            <a href={BOOK_TEST_URL} className="bg-primary hover:bg-primary-dark text-white border-none rounded-btn px-5 py-3 min-h-[44px] text-sm font-semibold font-heading transition-all hover:-translate-y-0.5 cursor-pointer no-underline inline-flex items-center">
              Book a Test
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

          {/* For Partners accordion */}
          <div className="border-b border-border">
            <button
              type="button"
              aria-expanded={partnersMobileOpen}
              onClick={() => setPartnersMobileOpen((v) => !v)}
              className="w-full flex items-center justify-between py-4 text-text-primary text-base sm:text-xl font-semibold font-heading bg-transparent border-none cursor-pointer"
            >
              For Partners
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${partnersMobileOpen ? "rotate-180" : ""}`}
              />
            </button>
            {partnersMobileOpen && (
              <div className="flex flex-col pb-3 pl-2">
                {PARTNER_LINKS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.route}
                      to={p.route}
                      onClick={() => {
                        setMobileMenu(false);
                        setPartnersMobileOpen(false);
                      }}
                      className="flex items-center gap-3 py-3 text-text-secondary text-[15px] font-medium hover:text-primary transition-colors no-underline"
                    >
                      <span className="w-7 h-7 rounded-card bg-primary-bg flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-primary" />
                      </span>
                      {p.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
            <a
              href={BOOK_TEST_URL}
              onClick={() => setMobileMenu(false)}
              className="w-full text-center bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-4 text-base font-bold font-heading transition-all no-underline"
            >
              Book a Test
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
