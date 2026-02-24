import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        "bg-soft": "rgb(var(--color-bg-soft) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-2": "rgb(var(--color-accent-2) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)"
      },
      boxShadow: {
        panel: "0 12px 50px -24px rgb(9 14 25 / 0.45)",
        glow: "0 0 0 1px rgb(var(--color-line) / 0.4), 0 20px 80px -35px rgb(var(--color-accent) / 0.35)"
      },
      borderRadius: {
        "2xl-plus": "1.5rem"
      },
      backgroundImage: {
        grid:
          "linear-gradient(to right, rgb(var(--color-line) / 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-line) / 0.16) 1px, transparent 1px)"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;

