/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          500: '#14b8a6',
          700: '#0f766e',
          900: '#134e4a',
        },
      },
    },
  },
  plugins: [],
};
