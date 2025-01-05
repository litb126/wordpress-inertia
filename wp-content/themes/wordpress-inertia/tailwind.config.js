module.exports = {
  content: [
    './*.php',
    './resources/js/**/*.js',
    './resources/js/**/*.jsx',
  ],
  theme: {
    fontFamily: {
      display: ['Montserrat', 'sans-serif']
    },
    extend: {
      aspectRatio: {
        'photo': '6 / 4',
        'portrait': '4 / 5',
      }
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
