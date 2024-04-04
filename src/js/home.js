'use strict'


import { getFilmes, getFilme } from "./filmes.js"



const destaqueContainer = document.getElementById('destaques-container')
const meusFilmesContainer = document.getElementById('meus-filmes-container')
async function criarDestaques() {
    const filmes = await getFilmes()
    filmes.forEach(filme =>{
        criarCard(filme, destaqueContainer, true)
    })
}
async function criarMeusFilmes() {
    const filmes = await getFilmes()
    filmes.forEach(filme =>{
        criarCard(filme, meusFilmesContainer, false)
    })
}
//CRIAR CARDS DOS FILMES
async function criarCard(filme, container, destaque) {

    const containerDestino = container

    //criar os elementos
    const card = document.createElement('div')
    card.style.backgroundImage = `url(${filme.foto_capa})`
    const infoFilme = document.createElement('div')
    const titulo = document.createElement('h3')
    titulo.textContent = filme.nome
    const dataEgenero = document.createElement('p')
    const ano = document.createElement('span')
    ano.textContent = 2023
    const genero = document.createElement('span')
    genero.textContent = 'Fantasia/Aventura'
    const sinopse = document.createElement('p')
    sinopse.textContent = filme.sinopse
    const botoes = document.createElement('div')
    const tempoEsaibaMais = document.createElement('div')
    const tempo = document.createElement('span')
    const tempoImg = document.createElement('img')
    tempoImg.src = '../img/duracao.png'
    const tempoText = document.createElement('span')
    tempoText.textContent = '1h 41m'
    const saibaMais = document.createElement('button')
    saibaMais.textContent = 'Saiba Mais'
    const comprarEadicionar = document.createElement('div')
    const assistirComprar = document.createElement('a')
    assistirComprar.href = ''
    const comprarImg = document.createElement('img')
    comprarImg.src = '../img/assistir.png'
    const textoCompra = document.createElement('p')
    textoCompra.textContent = 'Assistir'
    assistirComprar.append(comprarImg, textoCompra)
    const adicionarLista = document.createElement('button')
    //adicionar as classes gerais

    //adicionar as classes para os destaques e para outras situações
    if(destaque){
        card.classList.add('transitions','border-[6px]', 'border-violet-300', 'shrink-0', 'w-[50vw]', 'bg-contain','h-full', 'min-w-[200px]', 'flex', 'justify-end')
        infoFilme.classList.add( 'bg-gradient-to-r', 'from-transparent', 'from-6%', 'to-indigo-900', 'to-10%', 'h-full', 'w-[70%]', 'pl-28', 'pr-8', 'py-12')
        titulo.classList.add('text-5xl')
        dataEgenero.classList.add('flex', 'gap-5')
        ano.classList.add('text-lg')
        genero.classList.add('text-lg')
        sinopse.classList.add('text-[1rem]', 'py-6', 'w-[90%]', 'leading-6')
        tempoEsaibaMais.classList.add('flex', 'text-violet-950', 'gap-10', 'h-[12%]')
        tempo.classList.add('flex', 'bg-purple-400', 'px-3', 'py-2', 'gap-4', 'text-lg', 'rounded-lg', 'items-center', 'w-[40%]')
        tempoImg.classList.add('h-[80%]', 'aspect-square')
        saibaMais.classList.add('bg-purple-300', 'px-3', 'py-2', 'gap-2', 'grid', 'content-center', 'text-2xl', 'rounded-md', 'grow')
        comprarEadicionar.classList.add('flex', 'py-4', 'text-violet-950', 'items-center', 'gap-16', 'h-[20%]')
        assistirComprar.classList.add('flex', 'bg-pink-300', 'px-3', 'py-[10px]', 'text-2xl', 'rounded-lg', 'w-[50%]', 'items-center', 'gap-5', 'h-full')
        comprarImg.classList.add('h-[60%]')
        adicionarLista.classList.add("bg-[url('../img/adicionado.svg')]", 'bg-contain', 'bg-no-repeat', 'bg-center', 'h-full', 'aspect-square')
    }else{
        card.classList.add('group', 'shrink-0', 'w-[12vw]', 'hover:w-[24vw]', 'hover:bg-contain', 'hover:border-[6px]', 'hover:border-violet-300', 'bg-cover','h-full', 'min-w-[200px]', 'flex', 'justify-end')
        infoFilme.classList.add('group-hover:block', 'bg-gradient-to-r', 'from-transparent', 'from-6%', 'to-indigo-900', 'to-10%', 'h-full', 'w-[62%]', 'pl-12', 'pr-8', 'py-6', 'hidden', 'text-white')
        titulo.classList.add('text-xl')
        dataEgenero.classList.add('flex', 'gap-5', 'hidden')
        ano.classList.add('text-md')
        genero.classList.add('text-md')
        sinopse.classList.add('text-sm', 'py-4', 'w-[90%]', 'leading-6', 'h-[50%]', 'text-elipsis', 'overflow-hidden')
        tempoEsaibaMais.classList.add('flex', 'text-violet-950', 'gap-10', 'h-[12%]')
        tempo.classList.add('flex', 'bg-purple-400', 'px-3', 'py-2', 'gap-4', 'text-lg', 'rounded-lg', 'items-center', 'w-[40%]', 'hidden')
        tempoImg.classList.add('h-[80%]', 'aspect-square')
        saibaMais.classList.add('bg-purple-300', 'px-3', 'py-2', 'gap-2', 'grid', 'content-center', 'text-2xl', 'rounded-md', 'grow')
        comprarEadicionar.classList.add('flex', 'py-4', 'text-violet-950', 'items-center', 'gap-16', 'h-[20%]')
        assistirComprar.classList.add('flex', 'bg-pink-300', 'px-3', 'py-[10px]', 'text-2xl', 'rounded-lg', 'w-[50%]', 'items-center', 'gap-5', 'h-full', 'hidden')
        comprarImg.classList.add('h-[60%]')
        adicionarLista.classList.add("bg-[url('../img/adicionado.svg')]", 'bg-contain', 'bg-no-repeat', 'bg-center', 'h-full', 'aspect-square')
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


const mostrarFilmeClicado = (filme) =>{

    const body = document.querySelector('body')
    body.classList.add('overflow-y-hidden')
    const main = document.querySelector('main')
    const blur = document.getElementById('blur-overlay')
    blur.classList.remove('hidden')

    const paginaDoFilme = document.createElement('div')
    paginaDoFilme.classList.add('fixed', 'bottom-0', 'right-1/4', 'left-1/4', 'bg-fuchsia-950', 'h-[95vh]', 'w-[54vw]', 'left-[25%]', 'bottom-[0.5px]', 'p-2', 'rounded-md')
    const botaoVoltar = document.createElement('button')
    botaoVoltar.classList.add('absolute', 'translate-x-[-45px]', 'h-[30px]', 'aspect-square', 'bg-[url("../img/seta.svg")]', 'bg-cover')

    const videoContainer = document.createElement('div')
    videoContainer.classList.add('h-3/6')
    const trailer = document.createElement('iframe')
    trailer.width = '100%'
    trailer.height = '100%'
    trailer.src = 'https://www.youtube-nocookie.com/embed/yBiU39bUFlA?si=GPRVz2g4m_7XG36w&amp;controls=0&rel=0'
    trailer.title = 'Youtube video player'
    trailer.frameborder = '0'
    trailer.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    videoContainer.appendChild(trailer)

    const infoFilme = document.createElement('div')
    infoFilme.classList.add('text-slate-50', 'pt-20', 'px-6', 'h-[56%]', 'bottom-[3vw]', 'relative', 'bg-gradient-to-b', 'from-transparent', 'from-6%', 'to-fuchsia-950', 'to-10%')

    const row = document.createElement('div')
    row.classList.add('flex')

    const mainInfo = document.createElement('div')
    mainInfo.classList.add('grid', 'w-3/5')

    const tituloEgenero = document.createElement('div')
    tituloEgenero.classList.add('grid')
    const titulo = document.createElement('h2')
    titulo.classList.add('text-5xl')
    titulo.textContent = filme.nome
    const generos = document.createElement('span')
    generos.textContent = 'fantsia/aventura'
    tituloEgenero.replaceChildren(titulo, generos)

    const sinopse = document.createElement('p')
    sinopse.classList.add('py-8', 'pr-3', 'leading-5')
    sinopse.textContent = filme.sinopse

    mainInfo.replaceChildren(tituloEgenero, sinopse)

    const botoesDiv = document.createElement('div')
    botoesDiv.classList.add('w-2/5', 'flex', 'flex-col', 'items-end', 'px-12')

    const botComprarAssistir = document.createElement('button')
    botComprarAssistir.classList.add('flex', 'bg-pink-300', 'px-4', 'py-[12px]', 'w-48', 'rounded-md',  'items-center', 'gap-5')
    const botComprarImg = document.createElement('img')
    botComprarImg.src = '../img/comprar.png'
    botComprarImg.classList.add('h-8')
    const botComprarText = document.createElement('span')
    botComprarText.classList.add('text-indigo-950', 'text-xl')
    botComprarText.textContent = filme.valor_unitario.toFixed(2)
    botComprarAssistir.replaceChildren(botComprarImg, botComprarText)

    const botoesDeAcao = document.createElement('div')
    botoesDeAcao.classList.add('flex', 'justify-center', 'w-48', 'py-4', 'gap-5', 'items-center')
    
    const botAdicionar = document.createElement('button')
    botAdicionar.classList.add('bg-[url("../img/add-lista.svg")]', 'bg-cover', 'bg-no-repeat', 'bg-center', 'h-10', 'rounded-xl', 'aspect-square')
    const botAvaliar = document.createElement('button')
    botAvaliar.classList.add('bg-[url("../img/avaliar.svg")]', 'bg-cover', 'bg-no-repeat', 'bg-center', 'h-10', 'rounded-xl', 'aspect-square')
    botoesDeAcao.replaceChildren(botAdicionar, botAvaliar)
    botoesDiv.replaceChildren(botComprarAssistir, botoesDeAcao)

    row.replaceChildren(mainInfo, botoesDiv)

    const maisInfo = document.createElement('div')
    maisInfo.classList.add('grid', 'h-[42%]', 'overflow-y-scroll',
    'scrollbar-thumb-fuchsia-900', 'scrollbar-track-transparent', 'scrollbar',
    'scrollbar-thumb-rounded-full', 'scrollbar-track-rounded-full', 'scrollbar-w-1')

    const duracao = document.createElement('span')
    duracao.textContent = `Duração: ${filme.duracao}`
    const classificacao = document.createElement('span')
    classificacao.textContent = `Classificação indicativa: livre`
    const lancamento = document.createElement('span')
    lancamento.textContent = `Lançamento: ${filme.data_lancamento}`
    const direcao = document.createElement('span')
    direcao.textContent = 'Direção:'
    const producao = document.createElement('span')
    producao.textContent = `Produção: `
    const elenco = document.createElement('span')
    elenco.textContent = `Elenco: `

    maisInfo.replaceChildren(duracao, classificacao, lancamento, direcao, producao, elenco)
    infoFilme.replaceChildren(row, maisInfo)
    paginaDoFilme.replaceChildren(botaoVoltar, videoContainer, infoFilme)
    main.appendChild(paginaDoFilme)

    botaoVoltar.addEventListener('click', ( ) =>{
        body.classList.remove('overflow-y-hidden')
        blur.classList.add('hidden')
        paginaDoFilme.remove()
    })
}

///////////////////////////// SLIDER DOS DESTAQUES /////////////////////////
let slideIndex = 0
const botaoNext = document.getElementById('botaoNext')
let nextSlide = () =>{
    if(slideIndex >=3){

    }else{
        let translate = 50 * slideIndex
        destaqueContainer.style.transform = `translate(-${translate}vw, 0)`
        slideIndex++
        console.log(slideIndex)
    }

}
const botaoPrev = document.getElementById('botaoPrev')
let prevSlide = () =>{
    let translate = 50 * -slideIndex
    destaqueContainer.style.transform = `translate(${translate}vw, 0)`
    slideIndex--
    console.log(slideIndex)
}
botaoNext.addEventListener('click', () =>{
    nextSlide()
})
botaoPrev.addEventListener('click', () =>{
    prevSlide()
})

/////////////////////////////////////////////////////////////////////////

criarDestaques()
criarMeusFilmes()



