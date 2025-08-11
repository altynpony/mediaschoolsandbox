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
        'brand-purple': '#8B5CF6',
        'brand-green': '#84CC16',
        'brand-light-green': '#C7F59B',
        'brand-light-purple': '#C4B5FD',
        'brand-purple-dark': '#7C3AED',
        'brand-green-dark': '#65A30D',
        'brand-neutral': '#6B7280',
        'brand-neutral-light': '#9CA3AF',
        'brand-neutral-dark': '#374151',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;