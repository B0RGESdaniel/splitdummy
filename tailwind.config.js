/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueish: "#335CED",
        snow: "#F5F5F5"
      }
    },
  },
  plugins: [],
}

