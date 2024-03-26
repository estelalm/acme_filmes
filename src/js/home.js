'use strict'


import { getFilmes, getFilme } from "./filmes.js"



async function criarDestaques(){

}

async function criarCard(filme) {

    const card = document.createElement('div')
    const titulo = document.createElement('h2')
    titulo.textContent = filme.nome

    const sinopse = document.createElement('textarea')
    sinopse.textContent = filme.sinopse

    card.replaceChildren(titulo, sinopse)

    return card
}

async function preencherContainer(){
    const container = document.querySelector('section')
    const filmes = await getFilmes()

    // filmes.forEach(filme =>{
    //     const card = criarCard(filme)
    //     container.appendChild(card)
    // })
}


