'use strict'


import { getFilmes, getFilme } from "./filmes.js"



async function criarDestaques() {

    const filmes = await getFilmes()

    filmes.forEach(filme =>{
        criarCard(filme)
    })
}

async function criarCard(filme) {

    const card = document.createElement('div');
    let classeFotoCapa = `bg-[url("${filme.foto_capa}")]`
    card.classList.add('border-[6px]', 'border-violet-300', classeFotoCapa, 'shrink-0', 'h-[80%]', 'bg-contain', 'w-[16vw]', 'min-w-[400px]', 'flex', 'justify-end');

    //quando o card for clicado fica com 'w-[45vw]' e 'h-full'

    const infoFilme = document.createElement('div');
    infoFilme.classList.add('hidden', 'bg-gradient-to-r', 'from-transparent', 'from-6%', 'to-indigo-900', 'to-10%', 'h-full', 'w-[62%]', 'pl-28', 'pr-8', 'py-12');

    const titulo = document.createElement('h3');
    titulo.textContent = filme.nome;
    titulo.classList.add('text-7xl');
    const dataEgenero = document.createElement('p');
    dataEgenero.classList.add('text-sm', 'flex', 'gap-5');
    const ano = document.createElement('span');
    ano.textContent = 2023;
    ano.classList.add('ano_lancamento', 'text-xl');
    const genero = document.createElement('span');
    genero.textContent = 'Fantasia/Aventura';
    genero.classList.add('genero', 'text-xl');
    dataEgenero.append(ano, genero);

    const sinopse = document.createElement('p');
    sinopse.textContent = filme.sinopse;
    sinopse.classList.add('text-xl', 'py-6', 'w-[70%]', 'leading-6');

    const tempoEsaibaMais = document.createElement('div');
    tempoEsaibaMais.classList.add('flex', 'text-violet-950', 'gap-10', 'h-[12%]');
    const tempo = document.createElement('span');
    tempo.classList.add('flex', 'bg-purple-400', 'px-3', 'py-2', 'gap-4', 'text-xl', 'rounded-lg', 'items-center', 'w-[36%]');
    const tempoImg = document.createElement('img');
    tempoImg.src = '../img/duracao.png';
    tempoImg.classList.add('h-[80%]', 'aspect-square');
    tempo.textContent = '1h 41m';
    tempo.append(tempoImg);
    const saibaMais = document.createElement('button');
    saibaMais.textContent = 'Saiba Mais';
    saibaMais.classList.add('bg-purple-300', 'px-3', 'py-2', 'gap-2', 'grid', 'content-center', 'text-2xl', 'rounded-md', 'grow');
    tempoEsaibaMais.append(tempo, saibaMais);

    const comprarEadicionar = document.createElement('div');
    comprarEadicionar.classList.add('flex', 'py-4', 'text-violet-950', 'items-center', 'gap-16', 'h-[20%]');
    const assistirComprar = document.createElement('a');
    assistirComprar.classList.add('flex', 'bg-pink-300', 'px-3', 'py-[10px]', 'text-2xl', 'rounded-lg', 'w-[50%]', 'items-center', 'gap-5', 'h-full');
    assistirComprar.href = '';
    const comprarImg = document.createElement('img');
    comprarImg.src = '../img/assistir.png';
    comprarImg.classList.add('h-[60%]');
    const textoCompra = document.createElement('p');
    textoCompra.textContent = 'Assistir';
    assistirComprar.append(comprarImg, textoCompra);
    const adicionarLista = document.createElement('button');
    adicionarLista.classList.add('bg-[url(\'../img/adicionado.svg\')]', 'bg-contain', 'bg-no-repeat', 'bg-center', 'h-full', 'aspect-square');
    comprarEadicionar.append(assistirComprar, adicionarLista);

    infoFilme.append(titulo, dataEgenero, sinopse, tempoEsaibaMais, comprarEadicionar);
    card.appendChild(infoFilme);

    const destaqueContainer = document.getElementById('destaques-container')
    destaqueContainer.appendChild(card)
}

async function preencherContainer() {
    const container = document.querySelector('section')
    const filmes = await getFilmes()

    // filmes.forEach(filme =>{
    //     const card = criarCard(filme)
    //     container.appendChild(card)
    // })
}

criarDestaques()















////////////////////////////

// const card = document.createElement('div')
// const infoFilme = document.createElement('div')

// const titulo = document.createElement('h3')
// titulo.textContent = filme.nome

// const dataEgenero = document.createElement('p')
// const ano = document.createElement('span')
// ano.textContent = 2023
// const genero = document.createElement('span')
// ano.textContent = 'Fantasia/Aventura'
// dataEgenero.replaceChildren(ano, genero)

// const sinopse = document.createElement('p')
// sinopse.textContent = filme.sinopse

// const tempoEsaibaMais = document.createElement('div')
// const tempo = document.createElement('span')
// const tempoImg = document.createElement('img')
// tempoImg.src = '../img/duracao.png'
// tempo.appendChild(tempoImg)
// tempo.textContent = filme.duracao
// const saibaMais = document.createElement('button')
// saibaMais.textContent = 'Saiba Mais'

// const comprarEadicionar = document.createElement('div')
// const assistirComprar = document.createElement('a')
// const comprarImg = document.createElement('img')
// comprarImg.src = '../img/assistir.png'
// const textoCompra = document.createElement('p')
// textoCompra.textContent = 'Assistir'
// assistirComprar.replaceChildren(comprarImg, textoCompra)

// const adicionarLista = document.createElement('button')