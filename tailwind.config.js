/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Page & Layout
        base: "#FAFAF9",
        "section-alt": "#F3F4F6",
        "bg-dark": "#0F1724",
        "bg-dark-card": "#1A2537",
        card: "#FFFFFF",
        "card-hover": "#F8FFFE",
        border: "#E5E7EB",
        "border-dark": "rgba(255,255,255,0.08)",
        // Brand
        primary: "#0D9488",
        "primary-light": "#14B8A6",
        "primary-dark": "#0F766E",
        "primary-glow": "rgba(13,148,136,0.15)",
        "primary-bg": "rgba(13,148,136,0.08)",
        // Text
        "text-primary": "#111827",
        "text-secondary": "#4B5563",
        "text-muted": "#9CA3AF",
        "text-on-dark": "#F1F5F9",
        "text-muted-dark": "#94A3B8",
        // Status
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        card: "24px",
        btn: "12px",
        pill: "100px",
        input: "10px",
      },
      fontSize: {
        display: "clamp(44px, 6vw, 72px)",
        h1: "clamp(36px, 5vw, 58px)",
        h2: "clamp(28px, 4vw, 44px)",
        h3: "24px",
      },
      boxShadow: {
        "glow-green": "0 0 40px rgba(13,148,136,0.2)",
        "glow-blue": "0 0 40px rgba(14,165,233,0.15)",
        card: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
      },
      animation: {
        "marquee-left": "marquee-left 45s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "orb-drift": "orb-drift 12s ease-in-out infinite",
        "orb-scale": "orb-scale 8s ease-in-out infinite",
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
        "orb-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(20px, -15px)" },
          "66%": { transform: "translate(-20px, 15px)" },
        },
        "orb-scale": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.6 },
          "50%": { transform: "scale(1.1)", opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};
