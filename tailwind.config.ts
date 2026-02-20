import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          DEFAULT: "#3C2218",
          light: "#5C3A2E",
          dark: "#2A1810",
        },
        redflag: {
          DEFAULT: "#E60000",
          light: "#FF3333",
          dark: "#B30000",
        },
        warning: {
          DEFAULT: "#FFCC00",
          light: "#FFD633",
          dark: "#E6B800",
        },
        grunge: "#F4F1EA",
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(230, 0, 0, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(230, 0, 0, 0.9), 0 0 60px rgba(230, 0, 0, 0.4)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(12deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-8deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        drip: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "50%": { transform: "scaleY(1.2)", opacity: "1" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        wave: "wave 2s ease-in-out infinite",
        drip: "drip 1.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
