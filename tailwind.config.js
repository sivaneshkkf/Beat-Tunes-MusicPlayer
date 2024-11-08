/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A5260",
        middle: "#1D1F24",
        secondary : "#353531",
        txtcolor : "#595B5C"
      },

      animation: {
        spinSlow: 'spin 3s linear infinite',
      }
    },
   
  },
  plugins: [],
}

