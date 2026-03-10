import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090F",
        foreground: "#FFFFFF",
        "brand-identity": "#FF2D78",
        "content-creation": "#00F5FF",
        "funnel-systems": "#10B981",
        "priority-urgent": "#FF2D78",
        "priority-medium": "#F59E0B",
        "priority-optional": "#10B981",
        "card-bg": "rgba(255, 255, 255, 0.03)",
        "card-border": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
