import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── AMBIENTAR Brand palette (from client reference) ──
        charcoal: {
          DEFAULT: "#282A28",
          light:   "#3D3F3D",
        },
        sage: {
          DEFAULT: "#90B488",
          light:   "#A8C8A0",
          dark:    "#698453",
        },
        olive:    "#698453",
        warmGray: "#BCB5AC",
        lightGray:"#D9D9D9",
        // ── Site surface colours ──
        offwhite: "#F5F3EE",
        parchment:"#EDE9E2",
        // ── Deep dark for cinematic/philosophy sections ──
        forest: {
          DEFAULT: "#3A4F3A",
          dark:    "#1A1E1A",   // deep near-black for overlays
        },
      },
      fontFamily: {
        // Balgin for AMBIENTAR wordmark only; falls back to Comfortaa
        balgin:  ["Balgin", "var(--font-comfortaa)", "Comfortaa", "system-ui", "sans-serif"],
        // Comfortaa for subtitles / display text
        display: ["var(--font-comfortaa)", "Comfortaa", "system-ui", "sans-serif"],
        // Cormorant Garamond for editorial serif body / headings
        serif:   ["var(--font-cormorant)", "Georgia", "serif"],
        // Inter as Axzentica stand-in for body text
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up":       "fadeUp 0.8s ease forwards",
        "fade-in":       "fadeIn 1s ease forwards",
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
