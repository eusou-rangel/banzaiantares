import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./prisma/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06111f",
        midnight: "#08152b",
        "electric-green": "#39ff88",
        "acid-yellow": "#d7ff3f",
        "arcade-purple": "#8d4dff",
        "neon-cyan": "#25e7ff"
      },
      boxShadow: {
        glow: "0 0 28px rgba(57, 255, 136, 0.22)",
        purple: "0 0 30px rgba(141, 77, 255, 0.22)"
      },
      fontFamily: {
        display: ["Arial Black", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "Segoe UI", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
