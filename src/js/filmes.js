'use strict'

import { getFilmes, getGeneros, getClassificacoes, getPaises, getFiltrarFilmes, getFilmesGenero } from "../../api/endpoints.js"
import { mostrarFilmeClicado } from "./filme_clicado.js"

const loaders = document.querySelectorAll(".loader")
loaders.forEach(loader => displayLoading(loader))

let generoId = localStorage.getItem('generoId')

const filmesContainer = document.getElementById('section-filmes')

let defaultClassificacao = document.getElementById('default-classificacao')
let defaultPais = document.getElementById('default-pais')

//preencher e utilizar os selects para filtrar os filmes
const listaGeneros = document.getElementById('filtro-genero')

const preencherListaGeneros = async () => {

    const generos = await getGeneros()

    // <option value="all">Todos</option>
    const defaultSelected =  document.createElement('option')
    defaultSelected.id ='default-genero'
    defaultSelected.value = 0
    defaultSelected.textContent = 'Todos'
    
    listaGeneros.appendChild(defaultSelected)

    let limit = 0
    let reset =0
    generos.forEach(genero => {


        const generoOption = document.createElement('option')
        generoOption.classList.add('p-2', 'hover:bg-roxo-transparencia')
        generoOption.value = genero.id
        generoOption.textContent = genero.nome

        if (genero.id == generoId) {
            generoOption.selected = true
        }

        listaGeneros.appendChild(generoOption)
        
    })

}
listaGeneros.addEventListener('change', () =>{
    filmesContainer.innerHTML = ''
    filtrarGenero()

    defaultClassificacao.selected = true
    defaultPais.selected = true
})
const filtrarGenero = () =>{
    const generosOptions =  listaGeneros.querySelectorAll('option')
    generosOptions.forEach(option =>{

        if(option.selected){
            if(option.value == 0)
            carregarFilmes()
            else
            carregarFilmesGenero(Number(option.value))
        }
    })
}

const listaClassificacoes = document.getElementById('filtro-classificacao')
const preencherListaClassificacaoIndicativa = async () => {

    const classificacoes = await getClassificacoes()

    classificacoes.forEach(classificacao => {

        const classificacaoOption = document.createElement('option')
        classificacaoOption.classList.add('p-2', 'hover:bg-roxo-transparencia')
        classificacaoOption.value = classificacao.id
        classificacaoOption.textContent = classificacao.nome

        listaClassificacoes.appendChild(classificacaoOption)

    })

}
listaClassificacoes.addEventListener('change', () =>{
    filmesContainer.innerHTML = ''
    filtrarClassificacao()

    let defaultGenero = document.getElementById('default-genero')
    defaultGenero.selected = true
    defaultPais.selected = true
})
const filtrarClassificacao = () =>{
    const classificacaoOptions =  listaClassificacoes.querySelectorAll('option')

    classificacaoOptions.forEach(option =>{

        if(option.selected){
            if(option.value == 0)
            carregarFilmes()
            else
            carregarFiltrarFilmes(`classificacao_id=${option.value}`)
        }
    })
}

const listaPaises = document.getElementById('filtro-pais')
const preencherListaPaises = async () => {

    const paises = await getPaises()


    paises.forEach(pais => {


        const listaPaises = document.getElementById('filtro-pais')

        const paisOption = document.createElement('option')
        paisOption.classList.add('p-2', 'hover:bg-roxo-transparencia')
        paisOption.value = pais.id
        paisOption.textContent = pais.nome

        listaPaises.appendChild(paisOption)

    })

}
listaPaises.addEventListener('change', () =>{
    filmesContainer.innerHTML = ''
    filtrarPaises()

    //resetar os outros selects
    let defaultGenero = document.getElementById('default-genero')
    defaultGenero.selected = true
    defaultClassificacao.selected = true
})
const filtrarPaises = () =>{
    const paisesOptions =  listaPaises.querySelectorAll('option')

    paisesOptions.forEach(option =>{

        if(option.selected){
            if(option.value == 0)
            carregarFilmes()
            else
            carregarFiltrarFilmes(`pais_origem_id=${option.value}`)
        }
    })
}

//criar card dos filmes
const criarCardFilme = async (filme) => {
    const capaFilme = document.createElement('div')
    capaFilme.classList.add('bg-roxo', 'w-[14vw]', 'aspect-[2/3]', 'group', 'overflow-hidden', 'bg-cover', 'bg-center', 'bg-no-repeat')
    capaFilme.style.backgroundImage = `url(${filme.foto_capa})`
    const cardFilme = document.createElement('div')
    cardFilme.classList.add('w-full', 'h-full', 'bg-[#16082891]', 'relative', 'top-full', 'group-hover:top-0', 'transitions', 'transition-all', 'p-4')

    const tituloFilme = document.createElement('span')
    tituloFilme.classList.add('text-lg')
    tituloFilme.textContent = filme.nome

    const anoEavaliacao = document.createElement('p')
    anoEavaliacao.classList.add('pt-4', 'flex', 'justify-around')

    const dataLancamento = filme.data_lancamento.split('T')[0].split('-').reverse()
    const anoFilme = document.createElement('span')
    anoFilme.textContent = dataLancamento[2]
    const avaliacaoFilme = document.createElement('span')
    if(filme.avaliacao != null)
    avaliacaoFilme.textContent = `${filme.avaliacao}/5 ☆`  
    else
    avaliacaoFilme.textContent = `n/a ☆`  

    anoEavaliacao.replaceChildren(anoFilme, avaliacaoFilme)

    const botoesAcao = document.createElement('div')
    botoesAcao.classList.add('grid', 'pt-4', 'gap-4')
    const preco = document.createElement('button')
    preco.textContent = `R$ ${filme.valor_unitario.toFixed(2)}`
    preco.classList.add('flex', 'bg-roxo', 'px-3', 'py-[10px]', 'rounded-lg', 'w-full', 'items-center', 'gap-5')
    const saibaMais = document.createElement('button')
    saibaMais.textContent = 'Saiba mais'
    saibaMais.classList.add('bg-roxo', 'px-3', 'py-2', 'gap-2', 'grid', 'content-center', 'lg:text-2xl', 'md:text-sm',  'sm:text-sm', 'rounded-md', 'grow')
    botoesAcao.replaceChildren(preco, saibaMais)

    cardFilme.replaceChildren(tituloFilme, anoEavaliacao, botoesAcao)
    capaFilme.appendChild(cardFilme)
    filmesContainer.appendChild(capaFilme)

    saibaMais.addEventListener('click', () =>{
        mostrarFilmeClicado(filme)
    })

}

//carregar os filmes na pagina
const carregarFilmes = async () =>{
    let filmes = await getFilmes()

    filmes.forEach(filme =>{
        criarCardFilme(filme)
    })
}

const pesquisarFilmes = async (filmes) =>{

        const searchInput = document.getElementById('barra-pesquisa')
      
        searchInput.onkeyup = function(){

        let valorInput = searchInput.value
        
            if(valorInput.length){
                filmes.forEach(filme => {
                if(filme.nome.toLowerCase().includes(valorInput.toLowerCase()) && valorInput != "" ){
                    filmesContainer.innerHTML = '';
                    criarCardFilme(filme)
                }
            })
            }else{
                filmesContainer.innerHTML = '';
                carregarFilmes()
            }      

    }

}

//carregar os filmes na pagina de acordo com os filtros
const carregarFilmesGenero = async (id) =>{
    let filmes = await getFilmesGenero(id)
    
    if(filmes){
        filmes.forEach(filme =>{
            criarCardFilme(filme)
        })
    }else{
        filmesContainer.innerHTML = 'Sinto muito, não há nenhum filme desse gênero por aqui.'
    }

}
const carregarFiltrarFilmes = async (query) =>{
    let filmes = await getFiltrarFilmes(query)

    if(filmes){
        filmes.forEach(filme =>{
        criarCardFilme(filme)
    })
    }else{
            filmesContainer.innerHTML = 'Sinto muito, não há nenhum filme assim por aqui.'
    }
    
}

preencherListaGeneros()
preencherListaClassificacaoIndicativa()
preencherListaPaises()
pesquisarFilmes(await getFilmes())

if(generoId != 0){
    carregarFilmesGenero(generoId)
}else{
    filmesContainer.innerHTML = ''
    carregarFilmes()
}