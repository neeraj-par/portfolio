import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F0E4",
        ink: "#221F1A",
        "ink-soft": "#5B564A",
        "ink-faint": "#6F6A58",
        accent: "#C15E3D",
        "accent-soft": "#EFD3C3",
        tape: "#EAC7BC",
        card: "#FBF8F0",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
        plex: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
