/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // Enables class-based dark mode toggle
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family
      },
      colors: {
        primary: '#2563eb',     // Tailwind's blue-600
        secondary: '#1e40af',   // Tailwind's blue-800
        accent: '#10b981',      // Tailwind's emerald-500
        darkBg: '#0f172a',      // Slate-900
        lightBg: '#f9fafb',     // Gray-50
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
