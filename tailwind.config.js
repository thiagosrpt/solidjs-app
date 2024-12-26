/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { bottom: "-25%" },
          '75%': { bottom: "3%" },
          '100%': { bottom: "0%" },
        },
      },
      animation: {
        slide: 'slide 300ms ease-in-out', // Create the animation with your timing function and duration
      },
      backgroundSize: {
        'size-125': 'auto 125%', // Adds 125% background size
        'size-100': 'auto 100%', // Adds 100% background size
      },
    },
  },
  plugins: [],
}

