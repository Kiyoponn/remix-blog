module.exports = {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        nippo: ['nippo', 'sans-serif']
      },
      colors: {
        primary: '#FFDA56',
        secondary: '#FBEEDF',
        tertiary: '#25323B',
        'accent-1': '#2B23B9',
        'accent-2': '#D91647'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
