import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { loginUrl } from "../lib/app-links";
import StoreButtons from "./launch/StoreButtons";

const NAV_ITEMS = [
  { label: "The App", route: "/download-app" },
  { label: "Lab Tests", route: "/book-tests" },
  { label: "Blog", route: "/blog" },
  { label: "About", route: "/about" },
  { label: "FAQ", route: "/faq" },
];

// `dark` is for pages whose hero is dark: the bar starts with light words and
// turns cream once the page scrolls.
export default function Nav({ dark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const solid = scrolled || mobileMenu;
  const onDark = dark && !solid;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? "shadow-[0_1px_0_var(--l-line)]" : ""}`}
        style={solid ? { background: "var(--l-nav)", backdropFilter: "saturate(180%) blur(18px)", WebkitBackdropFilter: "saturate(180%) blur(18px)" } : {}}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[68px] md:h-[76px] flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center shrink-0" aria-label="BetterHealth Africa home">
            <img
              src={logo}
              alt="BetterHealth Africa"
              className={`l-logo h-9 md:h-10 w-auto object-contain max-w-[170px] transition-all duration-300 ${onDark ? "brightness-0 invert" : ""}`}
            />
          </Link>

          <div className="hidden lg:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.route}
                to={item.route}
                className={`text-[15px] font-semibold no-underline transition-colors ${onDark ? "text-white/90 hover:text-white" : "text-l-muted hover:text-l-ink"}`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={loginUrl()}
              className={`text-[15px] font-semibold no-underline transition-colors ${onDark ? "text-white/90 hover:text-white" : "text-l-muted hover:text-l-ink"}`}
            >
              Sign in
            </a>
          </div>

          <div className="flex items-center gap-2">
            <StoreButtons size="sm" tone={onDark ? "light" : "dark"} className="hidden md:flex !gap-2 flex-nowrap" />
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenu}
              className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors ${onDark ? "bg-white/10 text-white" : "bg-l-card text-l-ink"}`}
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenu && (
        <div className="fixed top-[68px] md:top-[76px] left-0 right-0 bottom-0 px-5 pt-4 pb-8 flex flex-col lg:hidden z-[9999] overflow-y-auto bg-l-bg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              onClick={() => setMobileMenu(false)}
              className="text-l-ink text-[22px] font-bold font-heading py-4 border-b border-l-line no-underline tracking-[-0.01em]"
            >
              {item.label}
            </Link>
          ))}
          <a href={loginUrl()} className="text-l-muted text-[18px] font-semibold py-4 no-underline">
            Sign in
          </a>
          <div className="mt-auto pt-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-l-accent mb-3">Get the app</p>
            <StoreButtons size="md" />
          </div>
        </div>
      )}
    </>
  );
}
