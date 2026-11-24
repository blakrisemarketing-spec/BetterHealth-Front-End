import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import { loginUrl } from "../lib/app-links";
import StoreButtons from "./launch/StoreButtons";
import { GET_APP_URL, appIsLive } from "../data/app";

const PARTNERS = [
  { label: "For Doctors", route: "/for-doctors" },
  { label: "For Labs", route: "/for-labs" },
  { label: "For Nutritionists", route: "/for-nutritionists" },
];

// `children` turns an item into a dropdown (a plain list in the mobile menu).
const NAV_ITEMS = [
  { label: "Home", route: "/" },
  { label: "Book a test", route: "/book-tests" },
  { label: "About", route: "/about" },
  { label: "Partners", children: PARTNERS },
  { label: "Foundation", route: "/foundation" },
];

function PartnersMenu({ item, linkClass }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) close(); }}
      onKeyDown={(e) => { if (e.key === "Escape") close(); }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`${linkClass} inline-flex items-center gap-1 bg-transparent border-none cursor-pointer p-0`}
      >
        {item.label}
        <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
          <div className="min-w-[200px] rounded-2xl border border-l-line bg-white p-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.25)]">
            {item.children.map((c) => (
              <Link
                key={c.route}
                to={c.route}
                onClick={close}
                className="block rounded-xl px-4 py-2.5 text-[14.5px] font-semibold text-l-ink no-underline hover:bg-l-alt"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
      {/* At the top the bar is a plain full-width strip on the page; once the
          page scrolls it shrinks into the floating pill. */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300 ${solid ? "px-3 sm:px-6 pt-3" : "px-0 pt-0"}`}>
        <div
          className={`mx-auto flex items-center justify-between gap-6 border transition-all duration-300 ${
            solid
              ? "max-w-[1080px] h-[60px] pl-4 pr-2 sm:pl-6 rounded-full border-l-line shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]"
              : "max-w-[1600px] h-[84px] px-4 sm:px-8 lg:px-12 rounded-none border-transparent shadow-none"
          }`}
          style={{
            background: solid ? "var(--l-nav)" : "transparent",
            backdropFilter: solid ? "saturate(180%) blur(18px)" : "none",
            WebkitBackdropFilter: solid ? "saturate(180%) blur(18px)" : "none",
          }}
        >
          <Link to="/" className="flex items-center shrink-0" aria-label="BetterHealth Africa home">
            <img
              src={logo}
              alt="BetterHealth Africa"
              className={`l-logo w-auto object-contain transition-all duration-300 ${solid ? "h-10 md:h-11" : "h-11 md:h-[52px]"} ${onDark ? "brightness-0 invert" : ""}`}
            />
          </Link>

          <div className="hidden lg:flex gap-7 items-center">
            {NAV_ITEMS.map((item) => {
              const linkClass = `text-[14.5px] font-semibold no-underline transition-colors ${onDark ? "text-white/90 hover:text-white" : "text-l-muted hover:text-l-ink"}`;
              return item.children ? (
                <PartnersMenu key={item.label} item={item} linkClass={linkClass} />
              ) : (
                <Link key={item.route} to={item.route} className={linkClass}>
                  {item.label}
                </Link>
              );
            })}
            <a
              href={loginUrl()}
              className={`text-[14.5px] font-semibold no-underline transition-colors ${onDark ? "text-white/90 hover:text-white" : "text-l-muted hover:text-l-ink"}`}
            >
              Sign in
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GET_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center h-11 px-5 rounded-full text-[14.5px] font-bold no-underline transition-all hover:opacity-90 ${onDark ? "bg-white text-[#0A0A0A]" : "bg-l-btn text-l-btn-fg"}`}
            >
              {appIsLive ? "Download the app" : "Join the beta"}
            </a>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenu}
              className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors ${onDark ? "bg-white/10 text-white" : "bg-l-alt text-l-ink"}`}
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenu && (
        <div className="fixed top-[76px] left-0 right-0 bottom-0 px-5 pt-4 pb-8 flex flex-col lg:hidden z-[9999] overflow-y-auto bg-l-bg">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="py-4 border-b border-l-line">
                <p className="text-l-ink text-[22px] font-bold font-heading tracking-[-0.01em] mb-2">{item.label}</p>
                {item.children.map((c) => (
                  <Link
                    key={c.route}
                    to={c.route}
                    onClick={() => setMobileMenu(false)}
                    className="block text-l-muted text-[17px] font-semibold py-2 pl-1 no-underline"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.route}
                to={item.route}
                onClick={() => setMobileMenu(false)}
                className="text-l-ink text-[22px] font-bold font-heading py-4 border-b border-l-line no-underline tracking-[-0.01em]"
              >
                {item.label}
              </Link>
            )
          )}
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
