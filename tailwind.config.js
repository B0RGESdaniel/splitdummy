/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    data: {
      selectedMode: "state~='on'",
    },
    extend: {
      colors: {
        blueish: "#335CED",
        snow: "#F5F5F5"
      },
      boxShadow: {
        inside: "inset 1px 2px 4px rgba(0, 0, 0, 0.4)"
      }
    },
  },
  plugins: [],
}

