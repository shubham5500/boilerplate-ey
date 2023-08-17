/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#ffe600",
        lightgrey: "#cccccc",
        grey: "#999999",
      },
    },
  },
  plugins: [],
}
