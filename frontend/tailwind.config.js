/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#022C22',
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          100: '#D1FAE5',
          50: '#F0FDF4',
        },
        gold: {
          900: '#78350F',
          800: '#92400E',
          700: '#B45309',
          600: '#D97706',
          500: '#F59E0B',
          400: '#FBBF24',
          200: '#FDE68A',
          100: '#FEF3C7',
          50: '#FFFBEB',
        },
        paper: {
          warm: '#FAFAF9',
          parchment: '#F5F5F4',
          stone: '#E7E5E4',
          line: '#E2E8F0',
        },
        brand: {
          primary: '#064E3B',
          'primary-hover': '#022C22',
          'primary-light': '#F0FDF4',
          navy: '#022C22',
          indigo: '#064E3B',
          accent: '#D97706',
          'accent-purple': '#7C3AED',
          success: '#059669',
          'success-light': '#ECFDF5',
          emerald: '#059669',
          amber: '#D97706',
          rose: '#BE123C',
          dark: '#1C1917',
          muted: '#78716C',
          border: '#E7E5E4',
          surface: '#FAFAF9',
        }
      },
      fontFamily: {
        serif: ['"Be Vietnam Pro"', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        ipa: ['"Gentium Plus"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        flame: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-3px) scale(1.08)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.8)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        flame: 'flame 2s infinite ease-in-out',
        glow: 'glowPulse 2s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
