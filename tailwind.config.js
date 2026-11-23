/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Launch homepage looks: CSS variables set in index.css per data-look
        "l-bg": "var(--l-bg)",
        "l-alt": "var(--l-alt)",
        "l-card": "var(--l-card)",
        "l-ink": "var(--l-ink)",
        "l-muted": "var(--l-muted)",
        "l-accent": "var(--l-accent)",
        "l-tint": "var(--l-tint)",
        "l-line": "var(--l-line)",
        "l-btn": "var(--l-btn)",
        "l-btn-fg": "var(--l-btn-fg)",
        "l-band": "var(--l-band)",
        "l-band-soft": "var(--l-band-soft)",
        // Launch palette, taken from the mobile app (mobile/src/ui/theme.ts)
        cream: "#F7F4EC",
        ink: "#1E2A27",
        forest: "#1F5C48",
        "forest-dark": "#17483A",
        mint: "#E1EEE7",
        // Page & Layout
        base: "#FFFFFF",
        "section-alt": "#F5F5F3",
        "bg-dark": "#0A0A0A",
        "bg-dark-card": "#171717",
        card: "#FFFFFF",
        "card-hover": "#F5F5F3",
        border: "#E8E8E6",
        "border-dark": "rgba(255,255,255,0.08)",
        // Brand — Sage green
        primary: "#1F7A55",
        "primary-light": "#2E9A6C",
        "primary-dark": "#17603F",
        "primary-glow": "rgba(31,122,85,0.15)",
        "primary-bg": "#E7F3EC",
        // Foundation accent — warm amber/gold (proposed, not yet locked brand-wide)
        accent: "#D4A24E",
        "accent-light": "#E0B66E",
        "accent-soft": "#E9CE97",
        "accent-dark": "#B9883A",
        // accent-ink: deep gold for amber-coloured TEXT/icons on light backgrounds.
        // Passes WCAG AA (>=4.5:1) on cream (#F5F3EE) and section-alt (#EBE9E3),
        // where the brighter accent shades do not.
        "accent-ink": "#8A5A0A",
        "accent-glow": "rgba(212,162,78,0.18)",
        "accent-bg": "rgba(212,162,78,0.10)",
        // Text
        "text-primary": "#0A0A0A",
        "text-secondary": "#5C5C5C",
        "text-muted": "#8A8A8A",
        "text-on-dark": "#F1F5F9",
        "text-muted-dark": "#94A3B8",
        // Status — Apple system triplet
        success: "#30D158",
        warning: "#FFD60A",
        danger: "#FF453A",
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        // Inter — body face for the foundation landing page (per its brand spec)
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        card: "20px",
        btn: "9999px",
        pill: "9999px",
        input: "8px",
      },
      fontSize: {
        display: "clamp(44px, 6vw, 72px)",
        h1: "clamp(36px, 5vw, 58px)",
        h2: "clamp(28px, 4vw, 44px)",
        h3: "24px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0,0,0,0.05)",
        popover: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        dialog: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "marquee-left": "marquee-left 45s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "organ-pulse": "organ-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        "organ-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: 1 },
          "50%": { transform: "scale(1.03)", opacity: 0.92 },
        },
      },
    },
  },
  plugins: [],
};
