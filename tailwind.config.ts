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
          DEFAULT: '#0a0e1a',
          50: '#f0f1f5',
          100: '#e1e3eb',
          200: '#c3c7d7',
          300: '#a5abc3',
          400: '#878faf',
          500: '#69739b',
          600: '#545c7c',
          700: '#3f455d',
          800: '#2a2e3e',
          900: '#0a0e1a',
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
          blue: '#4FC3F7',
          cyan: '#00E5FF',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
