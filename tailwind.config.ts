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
          DEFAULT: '#00264D',
          50: '#E6EBF0',
          100: '#CCD8E1',
          200: '#99B1C3',
          300: '#668AA5',
          400: '#336387',
          500: '#00264D',
          600: '#001E3D',
          700: '#00172E',
          800: '#000F1E',
          900: '#00080F',
        },
        secondary: {
          DEFAULT: '#DD47B3',
          50: '#FCE8F6',
          100: '#F9D1ED',
          200: '#F3A3DB',
          300: '#ED75C9',
          400: '#E747B7',
          500: '#DD47B3',
          600: '#B1398F',
          700: '#852B6B',
          800: '#591C47',
          900: '#2D0E24',
        },
        accent: {
          orange: '#FFB97C',
          red: '#FF4855',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;

