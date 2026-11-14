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
        primary: {
          DEFAULT: "#3C2350",
          dark: "#291735",
          light: "#F3EEF6",
        },
        accent: {
          gold: "#C9A24D",
          light: "#F6EEDC",
        },
        secondary: "#C9A24D",
        background: "#FAF8F5",
        surface: "#FFFFFF",
        "text-primary": "#241828",
        "text-secondary": "#665D69",
        "on-surface-variant": "#665D69",
        "outline-variant": "#E6E0E8",
        border: "#E6E0E8",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
        playfair: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'saas': '0 10px 30px -5px rgba(60, 35, 80, 0.08), 0 4px 12px -2px rgba(60, 35, 80, 0.04)',
        'saas-lg': '0 20px 40px -15px rgba(60, 35, 80, 0.12), 0 8px 16px -4px rgba(60, 35, 80, 0.06)',
        'saas-glow': '0 0 35px -5px rgba(201, 162, 77, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;

