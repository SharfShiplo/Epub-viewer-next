/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Noto Sans Bengali', 'sans-serif'],
        heading: ['Noto Sans Bengali', 'sans-serif'],
      },

    },
  },
  plugins: [],
}