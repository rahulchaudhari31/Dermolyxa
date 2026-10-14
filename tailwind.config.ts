import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        surface: "#141210",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F5D77A",
          dark: "#B8860B",
        },
        ink: "#F5F1E8",
        muted: "#B6B1A6",
        ivory: "#FAF7F0",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #F5D77A 0%, #D4AF37 50%, #B8860B 100%)",
        "gold-text":
          "linear-gradient(135deg, #F5D77A 0%, #D4AF37 45%, #B8860B 100%)",
      },
      boxShadow: {
        "gold-glow":
          "0 0 0 1px rgba(212,175,55,0.15), 0 20px 45px -20px rgba(212,175,55,0.35)",
        "gold-soft": "0 10px 40px -20px rgba(212,175,55,0.55)",
      },
      letterSpacing: {
        luxe: "0.28em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
