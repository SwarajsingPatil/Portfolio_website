// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Adjust this path based on your project structure
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors used in the hero component
        slate: {
          900: '#0f172a',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          500: '#a855f7',
        },
        gray: {
          400: '#9ca3af',
          600: '#4b5563',
        },
      },
      spacing: {
        '12': '3rem',
        '8': '2rem',
        '6': '1.5rem',
        '4': '1rem',
      },
      fontSize: {
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      maxWidth: {
        '4xl': '56rem',
        '2xl': '42rem',
      },
      borderRadius: {
        'lg': '0.5rem',
      },
      transitionProperty: {
        'all': 'all',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}