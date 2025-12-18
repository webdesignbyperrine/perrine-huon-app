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
          DEFAULT: '#0d1a2d',
          50: '#f0f1f5',
          100: '#e1e3eb',
          200: '#c3c7d7',
          300: '#a5abc3',
          400: '#878faf',
          500: '#69739b',
          600: '#545c7c',
          700: '#3f455d',
          800: '#2a2e3e',
          900: '#0d1a2d',
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
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-outfit)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.7s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'blur-in': 'blurIn 0.8s ease-out forwards',
        'slide-rotate-in': 'slideRotateIn 0.7s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        slideRotateIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) rotate(-2deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0deg)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
