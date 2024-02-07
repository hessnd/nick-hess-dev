/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      marvinVisionsSmallVariable: ['Marvin Visions Small Variable', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

