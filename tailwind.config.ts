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
        base: "var(--color-bg-base)",
        raised: "var(--color-bg-raised)",
        overlay: "var(--color-bg-overlay)",
        inverse: "var(--color-bg-inverse)",
        "on-accent": "var(--color-text-inverse)",
        primary: "rgb(var(--color-text-primary-rgb) / <alpha-value>)",
        secondary: "var(--color-text-secondary)",
        tertiary: "var(--color-text-tertiary)",
        accent: {
          DEFAULT: "rgb(var(--color-accent-rgb) / <alpha-value>)",
          hover: "var(--color-accent-hover)",
          muted: "var(--color-accent-muted)",
          subtle: "var(--color-accent-subtle)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
          accent: "var(--color-border-accent)",
        },
        /* Legacy aliases — mapped to new tokens until components are migrated */
        ink: "rgb(var(--color-bg-base-rgb) / <alpha-value>)",
        surface: "var(--color-bg-raised)",
        "surface-raised": "var(--color-bg-overlay)",
        cream: "rgb(var(--color-text-primary-rgb) / <alpha-value>)",
        navy: "rgb(var(--color-bg-base-rgb) / <alpha-value>)",
        slate: {
          text: "var(--color-text-secondary)",
          muted: "var(--color-text-tertiary)",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        sans: ["var(--font-newsreader)", "Georgia", "serif"],
        body: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "var(--leading-normal)" }],
        sm: ["var(--text-sm)", { lineHeight: "var(--leading-normal)" }],
        base: ["var(--text-base)", { lineHeight: "var(--leading-relaxed)" }],
        lg: ["var(--text-lg)", { lineHeight: "var(--leading-relaxed)" }],
        xl: ["var(--text-xl)", { lineHeight: "var(--leading-snug)" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-snug)" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-tight)" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "var(--leading-tight)" }],
        "5xl": ["var(--text-5xl)", { lineHeight: "var(--leading-tight)" }],
        "6xl": ["var(--text-6xl)", { lineHeight: "var(--leading-tight)" }],
        "7xl": ["var(--text-7xl)", { lineHeight: "var(--leading-tight)" }],
        display: [
          "var(--text-display)",
          { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)" },
        ],
        hero: [
          "var(--text-hero)",
          { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)" },
        ],
      },
      spacing: {
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        18: "4.5rem",
        20: "var(--space-20)",
        22: "5.5rem",
        24: "var(--space-24)",
        32: "var(--space-32)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      maxWidth: {
        narrow: "var(--container-narrow)",
        wide: "var(--container-wide)",
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
        wider: "var(--tracking-wider)",
        widest: "var(--tracking-widest)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      ringOffsetColor: {
        base: "var(--color-bg-base)",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgb(0 0 0 / 0.5)",
        "card-hover": "0 24px 48px -12px rgb(0 0 0 / 0.6)",
        glow: "0 0 60px -12px rgb(202 255 0 / 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.25s ease-out forwards",
        "slow-pulse": "slowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
