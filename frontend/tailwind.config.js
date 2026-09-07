/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          'primary-hover': '#1D4ED8',
          'primary-light': '#EFF6FF',
          navy: '#1E1B4B',
          indigo: '#4F46E5',
          accent: '#F59E0B',
          'accent-purple': '#7C3AED',
          success: '#10B981',
          'success-light': '#ECFDF5',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          dark: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          surface: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        ipa: ['"Gentium Plus"', 'Inter', 'system-ui', 'sans-serif'],
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
