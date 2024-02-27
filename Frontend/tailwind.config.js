/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myviolet: {
          100: "#883ae0"
        }
      }
    },
  },
  plugins: [],
}

