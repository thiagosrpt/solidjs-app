/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  
  theme: {
    extend: {
      transitionTimingFunction: {
        // Gentle ease-in-out: eases away from rest and settles softly, no snap at the start
        soft: 'cubic-bezier(0.45, 0, 0.15, 1)',
      },
    },
  },
  plugins: [],
}

