/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "hsl(61, 70%, 52%)",
        red: "hsl(4, 69%, 50%)",
        "slat-100": "hsl(202, 86%, 94%)",
        "slat-300": "hsl(203, 41%, 72%)",
        "slat-500": "hsl(200, 26%, 54%)",
        "slat-700": "hsl(200, 24%, 40%)",
        "slat-900": "hsl(202, 55%, 16%)",
      },
      fontFamily: {
        main: "PlusJakartaSans",
        mainItalic: "./assets/fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf"
      }
    },
  },
  plugins: [],
}

