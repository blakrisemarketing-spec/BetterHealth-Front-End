/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Page & Layout
        base: "#F5F3EE",
        "section-alt": "#EBE9E3",
        "bg-dark": "#0F1724",
        "bg-dark-card": "#1A2537",
        card: "#FFFFFF",
        "card-hover": "#F5F3EE",
        border: "#E0DCD5",
        "border-dark": "rgba(255,255,255,0.08)",
        // Brand — Sage green
        primary: "#6B8E7F",
        "primary-light": "#7BA898",
        "primary-dark": "#5F8070",
        "primary-glow": "rgba(107,142,127,0.15)",
        "primary-bg": "rgba(107,142,127,0.08)",
        // Text
        "text-primary": "#2B3A3A",
        "text-secondary": "#6B7979",
        "text-muted": "#9CA3AF",
        "text-on-dark": "#F1F5F9",
        "text-muted-dark": "#94A3B8",
        // Status — Apple system triplet
        success: "#30D158",
        warning: "#FFD60A",
        danger: "#FF453A",
      },
      fontFamily: {
        heading: ["Quicksand", "system-ui", "-apple-system", "sans-serif"],
        body: ["Quicksand", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
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
