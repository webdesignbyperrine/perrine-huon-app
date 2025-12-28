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
        // Primary Blue - Ligne claire
        primary: {
          DEFAULT: '#2B5B8A',
          50: '#EDF3F8',
          100: '#D4E2EF',
          200: '#A9C5DF',
          300: '#7EA8CF',
          400: '#538BBF',
          500: '#2B5B8A',
          600: '#234A70',
          700: '#1B3956',
          800: '#13283C',
          900: '#0B1722',
        },
        // Accent Pink - Usage parcimonieux (CTA principaux)
        accent: {
          DEFAULT: '#ff0f7c',
          light: '#ff4d9a',
          dark: '#d90066',
          50: '#FFF0F6',
          100: '#FFE0ED',
          200: '#FFC2DB',
          300: '#FF94C1',
          400: '#FF4D9A',
          500: '#ff0f7c',
          600: '#d90066',
          700: '#B30054',
          800: '#8C0042',
          900: '#660030',
        },
        // Secondary - Bleu clair pour accents secondaires
        secondary: {
          DEFAULT: '#4A7AA8',
          light: '#6B9AC4',
          dark: '#2B5B8A',
        },
        // Paper backgrounds - Beige kraft harmonisé avec CSS
        paper: {
          light: '#D4C4A8',
          DEFAULT: '#CDBF9B',
          dark: '#C5B590',
          cream: '#E8DCC4',
        },
        // Gris bleutés
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Couleurs de remplissage légères pour illustrations
        fill: {
          blue: 'rgba(43, 91, 138, 0.08)',
          pink: 'rgba(255, 15, 124, 0.08)',
          light: 'rgba(43, 91, 138, 0.04)',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-outfit)', 'monospace'],
      },
      borderRadius: {
        'sketch': '12px',
        'sketch-lg': '16px',
        'sketch-xl': '24px',
      },
      boxShadow: {
        'sketch': '0 4px 20px rgba(43, 91, 138, 0.1)',
        'sketch-lg': '0 8px 40px rgba(43, 91, 138, 0.15)',
        'sketch-accent': '0 8px 25px rgba(255, 15, 124, 0.3)',
        'card': '0 2px 10px rgba(43, 91, 138, 0.08)',
        'card-hover': '0 10px 40px rgba(43, 91, 138, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.7s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'stroke-draw': 'strokeDraw 2s ease-out forwards',
        'pulse-pink': 'pulsePink 2s ease-in-out infinite',
        'appear': 'appear 0.5s ease-out forwards',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        strokeDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        pulsePink: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 15, 124, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 15, 124, 0)' },
        },
        appear: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      strokeWidth: {
        'sketch': '2px',
      },
    },
  },
  plugins: [],
};

export default config;
