import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoFoundation from "../../assets/foundation/logo-foundation.png";

const LINKS = [
  { label: "The Problem", href: "#problem" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Request a Screening", href: "#request" },
  { label: "Our Work", href: "#gallery" },
  { label: "Get Involved", href: "#get-involved" },
];

function Wordmark({ onClick }) {
  return (
    <a href="#top" onClick={onClick} className="flex items-center gap-2.5 no-underline">
      <img src={logoFoundation} alt="BetterHealth Africa Foundation" className="h-8 sm:h-9 w-auto object-contain" />
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-ink font-heading border-l border-border pl-2.5">
        Foundation
      </span>
    </a>
  );
}

export default function FoundationNav({ onSupport }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "border-b border-border shadow-sm" : "border-b border-transparent"
      }`}
      style={scrolled || menuOpen ? { background: "rgba(245,243,238,0.88)", backdropFilter: "blur(16px)" } : {}}
    >
      <nav className="max-w-[1200px] mx-auto px-5 sm:px-6 h-[68px] flex items-center justify-between" aria-label="Primary">
        <Wordmark onClick={() => setMenuOpen(false)} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors font-inter no-underline"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onSupport}
            className="bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-5 py-2.5 text-[14px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Support the mission
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden p-1 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border px-5 py-5 flex flex-col gap-1" style={{ background: "#F5F3EE" }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3.5 text-[17px] font-semibold text-text-primary font-heading border-b border-border no-underline hover:text-accent-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onSupport();
            }}
            className="mt-4 w-full bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-6 py-4 text-[16px] font-bold font-heading transition-all focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Support the mission
          </button>
        </div>
      )}
    </header>
  );
}
