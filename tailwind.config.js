/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      grey: {
        200: '#eaeaea',
        300: '#acb8c7',
        500: '#06233d',
      },
      orange: {
        600: '#ec6e24',
      },
    },
  },
  plugins: [],
}
