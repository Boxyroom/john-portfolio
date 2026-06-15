import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#12100e",
        "charcoal-2": "#1b1713",
        "charcoal-3": "#28221c",
        bone: "#f4ead8",
        "bone-muted": "#cdbc9e",
        copper: "#c87434",
        "copper-bright": "#e2954b",
        steel: "#8f9996",
        blueprint: "#20343a",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 90px rgba(200, 116, 52, 0.16)",
        inset: "inset 0 1px 0 rgba(244, 234, 216, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
