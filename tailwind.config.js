/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
],
  theme: {
    extend: {
      colors:{
        'rosa-claro': '#E0B1CB',
        'rosa-muito-claro': '#EAD0DE',
        'rosa-cinzento': '#BE95C4',
        'roxo-claro': '#9F86C0',
        'roxo': '#5B3B85',
        'roxo-escuro-1': '#271C48',
        'roxo-escuro2': '#231942',
        'roxo-transparencia': '#3A285E'
      },
      backgroundImage:{
        'fundo-geral': 'linear-gradient(#8A6FAE, #5B3B85)'
      }
    },
    fontFamily: {
      'textos': ['"Inder"', 'sans-serif']
    }
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')
]
}