import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Stethoscope, Apple, FlaskConical, TestTubes, HeartPulse } from "lucide-react";
import { navLinks } from "../data/content";
import logo from "../assets/logo.png";

const PARTNER_LINKS = [
  { label: "For Doctors", route: "/for-doctors", icon: Stethoscope },
  { label: "For Nutritionists & Dieticians", route: "/for-nutritionists", icon: Apple },
  { label: "For Lab Owners", route: "/for-labs", icon: FlaskConical },
];

const PATHWAY_LINKS = [
  { label: "Comprehensive Tests", route: "/book", icon: TestTubes },
  { label: "Health Programs", route: "/programs", icon: HeartPulse },
];

function useDropdown() {
  const ref = useRef(null);
  const timer = useRef(null);
  const [open, setOpen] = useState(false);

  const enter = () => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    setOpen(true);
  };
  const leaveSoon = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return { ref, open, setOpen, enter, leaveSoon };
}

function DesktopDropdown({ label, items, linkClass, dropdown }) {
  return (
    <div
      ref={dropdown.ref}
      className="relative"
      onMouseEnter={dropdown.enter}
      onMouseLeave={dropdown.leaveSoon}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={dropdown.open}
        onClick={() => dropdown.setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape") dropdown.setOpen(false);
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dropdown.setOpen((v) => !v); }
        }}
        className={`${linkClass} inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0`}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${dropdown.open ? "rotate-180" : ""}`} />
      </button>

      {dropdown.open && (
        <div className="absolute right-0 top-full pt-2 w-[260px] z-50">
          <div role="menu" aria-label={`${label} options`} className="bg-white border border-border rounded-card shadow-lg overflow-hidden">
            {items.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.route}
                  to={p.route}
                  role="menuitem"
                  onClick={() => dropdown.setOpen(false)}
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
  );
}

function MobileAccordion({ label, items, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-text-primary text-base sm:text-xl font-semibold font-heading bg-transparent border-none cursor-pointer"
      >
        {label}
        <ChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="flex flex-col pb-3 pl-2">
          {items.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.route}
                to={p.route}
                onClick={() => { onClose(); setOpen(false); }}
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
  );
}

export default function Nav({ dark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathways = useDropdown();
  const partners = useDropdown();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const navActive = scrolled || mobileMenu;

  const desktopLinkClass =
    !navActive && dark
      ? "text-white/90 text-sm font-medium hover:text-primary transition-colors"
      : "text-text-secondary text-sm font-medium hover:text-primary transition-colors";

  const routeMap = {
    "How It Works": "/how-it-works",
    "About": "/about",
  };

  const renderLink = (link, mobile = false) => {
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
    return null;
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
            {renderLink("How It Works")}

            <DesktopDropdown label="Pathways" items={PATHWAY_LINKS} linkClass={desktopLinkClass} dropdown={pathways} />

            {renderLink("About")}

            <DesktopDropdown label="For Partners" items={PARTNER_LINKS} linkClass={desktopLinkClass} dropdown={partners} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a href="https://app.betterhealth.africa" className={`hidden md:inline-block text-sm font-medium hover:text-primary transition-colors px-4 py-2 no-underline ${!navActive && dark ? "text-white/90" : "text-text-secondary"}`}>
              Sign In
            </a>
            <Link to="/book" className="bg-primary hover:bg-primary-dark text-white border-none rounded-btn px-5 py-3 min-h-[44px] text-sm font-semibold font-heading transition-all hover:-translate-y-0.5 cursor-pointer no-underline inline-flex items-center">
              Book a Test
            </Link>
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

      {/* Mobile menu */}
      {mobileMenu && (
        <div
          className="fixed top-[72px] left-0 right-0 bottom-0 px-6 py-6 flex flex-col gap-2 md:hidden z-[9999] border-t border-border shadow-xl overflow-y-auto"
          style={{ backgroundColor: "#ffffff" }}
        >
          {renderLink("How It Works", true)}

          <MobileAccordion label="Pathways" items={PATHWAY_LINKS} onClose={() => setMobileMenu(false)} />

          {renderLink("About", true)}

          <MobileAccordion label="For Partners" items={PARTNER_LINKS} onClose={() => setMobileMenu(false)} />

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
            <Link
              to="/book"
              onClick={() => setMobileMenu(false)}
              className="w-full text-center bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-4 text-base font-bold font-heading transition-all no-underline"
            >
              Book a Test
            </Link>
            <a
              href="https://app.betterhealth.africa"
              className="w-full text-center text-text-secondary text-base font-medium hover:text-primary transition-colors py-2 no-underline"
            >
              Sign In
            </a>
          </div>
        </div>
      )}
    </>
  );
}
