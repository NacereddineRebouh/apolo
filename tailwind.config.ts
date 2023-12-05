import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    // require("prettier-plugin-tailwindcss"),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  theme: {
    extend: {
      keyframes: {
        pulseslow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
        pulseslow4: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.6' },
        },
        pulseslow2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.1' },
        },
        pulseslow3: {
          '0%, 100%': { opacity: '.4' },
          '50%': { opacity: '0' },
        },
        scale: {
          '0%, 100%': { scale: '1.2' },
          '50%': { scale: '0.4' },
        },
      },
      animation: {
        'bounce-slow':
          'bounce 3s linear infinite, pulse 3s cubic-bezier(1, 0.75, 0.25, 0) infinite',
        'pulse-slow': 'pulseslow 3s linear infinite',
        'pulse-slow2': 'pulseslow4 4s linear infinite',
        'pulse-superslow':
          'pulseslow2 21s linear infinite, scale 21s linear infinite',
        'pulse-superslowDark':
          'pulseslow3 21s cubic-bezier(0.4, 0, 0.6, 1) infinite, scale 21s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
    screens: {
      xs: '340px',
      // => @media (min-width: 640px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
};
export default config;
