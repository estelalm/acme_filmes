import { postAvaliacaoFilme, updateAvaliacaoFilme, getFilmesAvaliadosUsuario, postFilmeSalvo, postFilmeComprado } from "../../api/endpoints.js"
import { getIdsAvaliados, getIdsComprados, getIdsSalvos } from "../../api/id_results_endpoints.js"
let idUsuario = localStorage.getItem('idUsuario')

export const mostrarFilmeClicado = async (filme) => {

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
    trailer.src = filme.trailer
    trailer.title = 'Youtube video player'
    trailer.frameborder = '0'
    trailer.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    videoContainer.appendChild(trailer)

    const infoFilmeFundo = document.createElement('div')
    infoFilmeFundo.classList.add('text-slate-50', 'pt-20', 'px-6', 'h-[56%]', 'bottom-[3vw]', 'relative', 'bg-gradient-to-b', 'from-transparent', 'from-6%', 'to-fuchsia-950', 'to-10%')

    const infoFilme = document.createElement('div')
    infoFilme.classList.add('h-full', 'overflow-y-scroll', 'pt-2',
        'scrollbar-thumb-fuchsia-900', 'scrollbar-track-transparent', 'scrollbar',
        'scrollbar-thumb-rounded-full', 'scrollbar-track-rounded-full', 'scrollbar-w-1')

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

    const generosFilme = filme.generos.map(genero => {
        return genero.nome
    })
    generos.textContent = generosFilme.join('/')
    tituloEgenero.replaceChildren(titulo, generos)

    const sinopse = document.createElement('p')
    sinopse.classList.add('py-8', 'pr-3', 'leading-5')
    sinopse.textContent = filme.sinopse

    mainInfo.replaceChildren(tituloEgenero, sinopse)

    const botoesDiv = document.createElement('div')
    botoesDiv.classList.add('w-2/5', 'flex', 'flex-col', 'items-end', 'px-12')

    const botComprarAssistir = document.createElement('button')
    botComprarAssistir.classList.add('flex', 'bg-pink-300', 'px-4', 'py-[12px]', 'w-48', 'rounded-md', 'items-center', 'gap-5')
    const botComprarImg = document.createElement('img')
    botComprarImg.classList.add('h-8')
    const botComprarText = document.createElement('span')
    botComprarText.classList.add('text-indigo-950', 'text-xl')


    let filmesComprados = await getIdsComprados(idUsuario)
    if (filmesComprados.includes(filme.id)) {
        botComprarAssistir.href = ''
        botComprarImg.src = '../img/assistir.png'
        botComprarText.textContent = 'Assistir'
    } else {
        botComprarAssistir.href = ''
        botComprarImg.src = '../img/comprar.png'
        botComprarText.textContent = `R$${filme.valor_unitario.toFixed(2)}`
    }
    botComprarAssistir.replaceChildren(botComprarImg, botComprarText)

    const botoesDeAcao = document.createElement('div')
    botoesDeAcao.classList.add('flex', 'justify-center', 'w-48', 'py-4', 'gap-5', 'items-center')

    const botAdicionar = document.createElement('button')
    botAdicionar.classList.add('bg-cover', 'bg-no-repeat', 'bg-center', 'h-10', 'rounded-xl', 'aspect-square')
    
    let filmesSalvos = await getIdsSalvos(idUsuario)
    if(filmesSalvos.includes(filme.id)){
        botAdicionar.classList.add("bg-[url('../img/adicionado.svg')]")
    }else{
        botAdicionar.classList.add("bg-[url('../img/add-lista.svg')]")
    }

    botAdicionar.addEventListener('click', async () =>{
        if(filmesSalvos.includes(filme.id)){
            await deleteFilmeSalvo(idUsuario, filme.id)
        }
        else{
            await postFilmeSalvo(idUsuario, filme.id)
        }
        window.location.reload()
    })

    const botAvaliar = document.createElement('button')
    botAvaliar.classList.add('bg-cover', 'bg-no-repeat', 'bg-center', 'h-10', 'rounded-xl', 'aspect-square')

    let filmesAvaliados = await getIdsAvaliados(idUsuario)

    if (filmesAvaliados.includes(filme.id)) {
        botAvaliar.style.backgroundImage = 'url("../img/avaliado.svg")'
    } else {
        botAvaliar.style.backgroundImage = 'url("../img/avaliar.svg")'
    }

    botAvaliar.addEventListener('click', () => {
        const containerAvaliacao = document.createElement('div')
        containerAvaliacao.classList.add('flex', 'gap-4')

        for (let count = 1; count < 6; count++) {
            let numero = document.createElement('button')
            numero.innerHTML = count
            containerAvaliacao.appendChild(numero)

            numero.addEventListener('click', async () => {
                let idUsuario = localStorage.getItem('idUsuario')

                let novaAvaliacao = {
                    "usuario": idUsuario,
                    "avaliacao": count
                }

                if(filmesAvaliados.includes(filme.id))
                await updateAvaliacaoFilme(filme.id, novaAvaliacao)
                else
                await postAvaliacaoFilme(filme.id, novaAvaliacao)

                botoesDiv.removeChild(containerAvaliacao)
            })
        }
        botoesDiv.appendChild(containerAvaliacao)

    })

    botoesDeAcao.replaceChildren(botAdicionar, botAvaliar)
    botoesDiv.replaceChildren(botComprarAssistir, botoesDeAcao)

    row.replaceChildren(mainInfo, botoesDiv)

    const maisInfo = document.createElement('div')
    maisInfo.classList.add('grid')

    const duracaoCompleta = filme.duracao.split('T')
    const duracaoTempo = duracaoCompleta[1].split('.')
    const duracaoFilme = duracaoTempo[0]
    const duracao = document.createElement('span')
    duracao.textContent = `Duração: ${duracaoFilme}`
    const classificacao = document.createElement('span')

    console.log(filme)
    classificacao.textContent = `Classificação indicativa: ${filme.classificacao[0].nome_completo}`

    const dataSplit = filme.data_lancamento.split('T')
    const dataFilme = dataSplit[0].split('-').reverse().join('/')
    const lancamento = document.createElement('span')
    lancamento.textContent = `Lançamento: ${dataFilme}`

    const direcao = document.createElement('span')
    const diretoresFilme = filme.diretor.map(diretor => {
        return diretor.nome
    })
    direcao.textContent = 'Direção: ' + diretoresFilme.join(', ')

    const producao = document.createElement('span')
    const produtoraFilme = filme.produtora.map(produtora => {
        return produtora.nome
    })
    producao.textContent = `Produção: ` + produtoraFilme.join(', ')

    const elenco = document.createElement('p')
    const elencoFilme = filme.elenco.map(ator => {
        return ator.nome
    })
    elenco.textContent = `Elenco: ` + elencoFilme.join(', ')

    maisInfo.replaceChildren(duracao, classificacao, lancamento, direcao, producao, elenco)
    infoFilme.replaceChildren(row, maisInfo)
    infoFilmeFundo.appendChild(infoFilme)
    paginaDoFilme.replaceChildren(botaoVoltar, videoContainer, infoFilmeFundo)
    main.appendChild(paginaDoFilme)

    botaoVoltar.addEventListener('click', () => {
        body.classList.remove('overflow-y-hidden')
        blur.classList.add('hidden')
        paginaDoFilme.remove()
    })
}