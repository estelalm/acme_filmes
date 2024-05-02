'use strict'


import {    getFilmes, getFilmeNome, getGeneros, getFilmesCompradosUsuario, 
            getFilmesSalvosUsuario, postFilmeComprado, postFilmeSalvo, 
            deleteFilmeSalvo, postAvaliacaoFilme, getFilmesAvaliadosUsuario } from "../../api/endpoints.js"

import { getIdsAvaliados, getIdsComprados, getIdsSalvos } from "../../api/id_results_endpoints.js"
import { mostrarFilmeClicado } from "./filme_clicado.js"

const idUsuario = localStorage.getItem('idUsuario')

const destaqueContainer = document.getElementById('destaques-container')
const meusFilmesContainer = document.getElementById('meus-filmes-container')
const filmesSalvosContainer= document.getElementById('filmes-salvos')

const criarDestaques = async () => {
    const filmes = await getFilmes()
    filmes.forEach(filme =>{
        if(filme.id < 8){
            criarCard(filme, destaqueContainer, true)
        }
    })
}
const criarMeusFilmes = async () => {
    
    const filmes = await getFilmesCompradosUsuario(idUsuario)
    if(!filmes){
        meusFilmesContainer.innerHTML = 'Você ainda não comprou nenhum filme'
    }else{
    filmes.forEach(filme =>{
        criarCard(filme, meusFilmesContainer, false)
    })
}
}
const criarFilmesSalvos = async () => {
    const filmes = await getFilmesSalvosUsuario(idUsuario)
    if(!filmes){
        filmesSalvosContainer.innerHTML = 'Você ainda não salvou nenhum filme'
    }else{
    filmes.forEach(filme =>{
        criarCard(filme, filmesSalvosContainer, false)
    })
}
}


//CRIAR CARDS DOS FILMES
const criarCard = async (filme, container, destaque) => {

    const filmesComprados = await getIdsComprados(idUsuario)
    const filmesSalvos = await getIdsSalvos(idUsuario)

    const containerDestino = container

    //criar os elementos
    const card = document.createElement('div')
    card.style.backgroundImage = `url(${filme.foto_capa})`
    const infoFilme = document.createElement('div')

    const titulo = document.createElement('h3')
    titulo.textContent = filme.nome

    const dataEgenero = document.createElement('p')

    const dataLancamento = filme.data_lancamento.split('T')[0].split('-').reverse()
    const ano = document.createElement('span')
    ano.textContent = dataLancamento[2]

    const generosFilme = filme.generos.map(genero =>{
        return genero.nome
    })
    const genero = document.createElement('span')
    genero.textContent = generosFilme.join('/')

    const sinopse = document.createElement('p')
    sinopse.textContent = filme.sinopse
    const botoes = document.createElement('div')
    const tempoEsaibaMais = document.createElement('div')

    const tempo = document.createElement('span')
    const tempoImg = document.createElement('img')
    tempoImg.src = '../img/duracao.png'

    // const duracaoCompleta = filme.duracao.split('T')
    // const duracaoTempo = duracaoCompleta[1].split('.')
    // const duracaoFilme = duracaoTempo[0]

    const duracaoFilme = filme.duracao.split('T')[1].split('.')[0].split(':')
    const duracaoFormatada = `${duracaoFilme[0]}h${duracaoFilme[1]}m`
    
    const tempoText = document.createElement('span')
    tempoText.textContent = duracaoFormatada
    const saibaMais = document.createElement('button')
    saibaMais.textContent = 'Saiba Mais'

    const comprarEadicionar = document.createElement('div')
    const assistirComprar = document.createElement('a')
    const comprarImg = document.createElement('img')
    const textoCompra = document.createElement('p')

    if(filmesComprados.includes(filme.id)){
        assistirComprar.href = ''
        comprarImg.src = '../img/assistir.png'
        textoCompra.textContent = 'Assistir'
    }else{
        assistirComprar.href = ''
        comprarImg.src = '../img/comprar.png'
        textoCompra.textContent = `R$${filme.valor_unitario}`
    }

    assistirComprar.addEventListener('click',async () =>{
        if(filmesComprados.includes(filme.id)){
        await postFilmeComprado(idUsuario, filme.id)
        }

    })


    assistirComprar.append(comprarImg, textoCompra)
    const adicionarLista = document.createElement('button')

    if(filmesSalvos.includes(filme.id)){
        adicionarLista.classList.add("bg-[url('../img/adicionado.svg')]")
    }else{
        adicionarLista.classList.add("bg-[url('../img/add-lista.svg')]")
    }

    adicionarLista.addEventListener('click', async () =>{
        if(filmesSalvos.includes(filme.id)){
            await deleteFilmeSalvo(idUsuario, filme.id)
        }
        else{
            await postFilmeSalvo(idUsuario, filme.id)
        }
        window.location.reload()
    })
    //adicionar as classes gerais

    //adicionar as classes para os destaques e para outras situações
    if(destaque){
        card.classList.add('transitions', 'border-[6px]', 'border-violet-300', 'shrink-0', 'w-[58vw]', 'bg-contain','h-full', 'min-w-[600px]', 'flex', 'justify-end')
        infoFilme.classList.add( 'bg-gradient-to-r', 'from-transparent', 'from-6%', 'to-indigo-900', 'to-10%', 'h-full', 'w-[70%]', 'pl-24', 'pr-6', 'py-6')
        titulo.classList.add('text-5xl')
        dataEgenero.classList.add('flex', 'gap-5')
        ano.classList.add('text-lg')
        genero.classList.add('text-lg')
        sinopse.classList.add('text-[0.9rem]', 'py-4', 'w-[90%]', 'h-[40%]', 'leading-6', 'overflow-hidden', 'text-elipsis')
        tempoEsaibaMais.classList.add('flex', 'text-violet-950', 'gap-10', 'h-[12%]', 'pr-4')
        tempo.classList.add('flex', 'bg-purple-400', 'px-3', 'py-2', 'gap-4', 'text-lg', 'rounded-lg', 'items-center', 'w-[40%]')
        tempoImg.classList.add('h-[80%]', 'aspect-square')
        saibaMais.classList.add('bg-purple-300', 'px-3', 'py-2', 'gap-2', 'grid', 'content-center', 'text-2xl', 'rounded-md', 'grow')
        comprarEadicionar.classList.add('flex', 'py-4', 'text-violet-950', 'items-center', 'gap-16', 'h-[20%]')
        assistirComprar.classList.add('flex', 'bg-pink-300', 'px-3', 'py-[10px]', 'text-2xl', 'rounded-lg', 'w-[50%]', 'items-center', 'gap-5', 'h-full')
        comprarImg.classList.add('h-[60%]')
        adicionarLista.classList.add( 'bg-contain', 'bg-no-repeat', 'bg-center', 'h-[7vh]', 'aspect-square')
    }else{
        card.classList.add('group', 'shrink-0',  'w-[12vw]', 'hover:w-[32vw]', 'transitions', 'transition-all', 'hover:bg-contain', 'hover:border-[6px]', 'hover:border-violet-300', 'bg-cover','h-full', 'min-w-[200px]', 'flex', 'justify-end')
        infoFilme.classList.add('group-hover:block', 'bg-gradient-to-r', 'from-transparent', 'from-6%', 'to-indigo-900', 'to-10%', 'h-full', 'w-[62%]', 'pl-12', 'pr-8', 'py-6', 'hidden', 'text-white')
        titulo.classList.add('text-xl')
        dataEgenero.classList.add('flex', 'gap-5', 'hidden')
        ano.classList.add('text-md')
        genero.classList.add('text-md')
        sinopse.classList.add('text-sm', 'py-4', 'w-[90%]', 'leading-6', 'h-[70%]', 'text-elipsis', 'overflow-hidden')
        tempoEsaibaMais.classList.add('flex', 'text-violet-950', 'gap-10', 'h-[12%]')
        tempo.classList.add('flex', 'bg-purple-400', 'px-3', 'py-2', 'gap-4', 'text-lg', 'rounded-lg', 'items-center', 'w-[40%]', 'hidden')
        tempoImg.classList.add('h-[80%]', 'aspect-square')
        saibaMais.classList.add('bg-purple-300', 'px-3', 'py-2', 'gap-2', 'grid', 'content-center', 'text-2xl', 'rounded-md', 'grow')
        comprarEadicionar.classList.add('flex', 'py-4', 'text-violet-950', 'items-center', 'gap-16', 'h-[20%]')
        assistirComprar.classList.add('flex', 'bg-pink-300', 'px-3', 'py-[10px]', 'text-2xl', 'rounded-lg', 'w-[50%]', 'items-center', 'gap-5', 'h-full', 'hidden')
        comprarImg.classList.add('h-[60%]')
        adicionarLista.classList.add('bg-contain', 'bg-no-repeat', 'bg-center', 'h-full', 'aspect-square')
        botoes.classList.add('flex', 'py-2')
    }

    //colocar os elementos no html
    dataEgenero.replaceChildren(ano, genero)
    tempo.replaceChildren(tempoImg, tempoText)
    tempoEsaibaMais.replaceChildren(tempo, saibaMais)
    comprarEadicionar.replaceChildren(assistirComprar, adicionarLista)
    botoes.replaceChildren(tempoEsaibaMais, comprarEadicionar)
    infoFilme.replaceChildren(titulo, dataEgenero, sinopse, botoes)
    card.appendChild(infoFilme)
    containerDestino.appendChild(card)

    //event listeners
    saibaMais.addEventListener('click', () =>{
        mostrarFilmeClicado(filme)
    })
  
}

///////////////////////////// SLIDER DOS DESTAQUES /////////////////////////
let slideIndex = 0
const botaoNext = document.getElementById('botaoNext')
let nextSlide = () =>{
    if(slideIndex >=3){

    }else{
        let translate = 58 * slideIndex
        destaqueContainer.style.transform = `translate(-${translate}vw, 0)`
        slideIndex++
    }

}
const botaoPrev = document.getElementById('botaoPrev')
let prevSlide = () =>{
    let translate = 58 * -slideIndex
    destaqueContainer.style.transform = `translate(${translate}vw, 0)`
    slideIndex--
}
botaoNext.addEventListener('click', () =>{
    nextSlide()
})
botaoPrev.addEventListener('click', () =>{
    prevSlide()
})

/////////////////////////////////////////////////////////////////////////
///////////////////// PREENCHER LISTA DE GÊNEROS ///////////////////////

const preencherListaGeneros = async () =>{

    const generos = await getGeneros()

    generos.forEach(genero =>{

        const listaGeneros = document.getElementById('lista-genero')

        const generoLi = document.createElement('li')
        generoLi.classList.add('p-2', 'hover:bg-roxo-transparencia')
        const generoLink = document.createElement('a')
        generoLink.href = './filmes.html'
        generoLink.textContent = genero.nome
        generoLi.appendChild(generoLink)

        generoLi.addEventListener('click', () =>{
            localStorage.setItem('generoId', genero.id)
        })

        listaGeneros.appendChild(generoLi)

    })

}

//barra de pesquisa
const search = function (filmes){

    const searchInput = document.getElementById('search-bar')
    const resultsBox = document.getElementById('search-result')

    let filmesNameArray = []
    filmes.forEach(function(filme){
         let name = filme.nome 
         filmesNameArray.push(name)
    })
    searchInput.onkeyup = function(){
    let results = []
    let input = searchInput.value

     if(input.length){
          resultsBox.classList.remove('hidden')
          results = filmesNameArray.filter((keyword) =>{
          return keyword.toLowerCase().includes(input.toLowerCase())
         })
     }else{
      resultsBox.classList.add('hidden')
     }
     displayResult(results)
  }
  
  const displayResult = function (results){
  
        let content = results.map((listItem) => {
            return `<li class="p-2 hover:bg-roxo-transparencia filme-search">${listItem}</li>`
        })
  
        resultsBox.innerHTML = `<ul class="pb-4">${content.join('')}</ul>`
  

        const filmeList = document.querySelectorAll('.filme-search')
        filmeList.forEach( filmeListed =>{
          filmeListed.addEventListener('click', async () =>{
            let nomeFilme = filmeListed.textContent

            let filme = await getFilmeNome(nomeFilme)

            await mostrarFilmeClicado(filme[0])
             
          })
        })
    }
  }
  async function loadSearchItems(){
    const filmes = await getFilmes()
    search(filmes)
  }
  loadSearchItems()
  





const botaoSair = document.getElementById('sair')
botaoSair.addEventListener('click', () =>{
    window.location.assign('../../index.html')
})

criarDestaques()
criarMeusFilmes()
criarFilmesSalvos()
preencherListaGeneros()


