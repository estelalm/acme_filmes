'use strict'

import { postFilme } from "./filmes.js"
const botaoEntra = document.getElementById('botao-entrar')
botaoEntra.addEventListener('click', () => {

    window.location.assign('./src/pages/home.html')
})

const filme =     {
    "id": 2,
    "nome": "Frozen: Uma aventura congelante",
    "sinopse": "método post",
    "duracao": "01:12:50",
    "data_lancamento": "2014-01-08",
    "data_relancamento": null,
    "foto_capa": "https://images.justwatch.com/poster/306660449/s718/precure-all-stars-f.jpg",
    "valor_unitario": 10
  }