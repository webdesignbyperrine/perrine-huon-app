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
        // Blanc coquille d'œuf - doux et chaleureux
        white: '#F0EAD6',
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
          DEFAULT: '#2F4558',
          50: '#E8ECF0',
          100: '#D1D9E1',
          200: '#A3B3C3',
          300: '#758DA5',
          400: '#476787',
          500: '#2F4558',
          600: '#263846',
          700: '#1C2A35',
          800: '#131C23',
          900: '#090E12',
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
