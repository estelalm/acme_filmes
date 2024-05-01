
export async function getUsuarios (){

    try{
        const url = 'http://localhost:8080/v2/AcmeFilmes/usuarios'
        const response = await fetch(url)
        const data = await response.json()
    
        console.log(data)
    
        return data.usuarios
    }catch(error){
        console.log(error)
        return false
    }

}

export async function getUsuarioId (id){

const url = `http://localhost:8080/v2/AcmeFilmes/usuario/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.usuario
}

export async function postUsuario (usuario) {
    const url = 'http://localhost:8080/v2/AcmeFilmes/usuario'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(usuario)
    }

    const response = await fetch(url, options)

    console.log(response.json())
    return response.ok
}

export async function getFilmes (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function getFilme (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/filme/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filme
}

export async function getFilmesGenero (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/filmes/filtro/genero/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function getFiltrarFilmes (query){

    const url = `http://localhost:8080/v2/AcmeFilmes/filmes/filtros?${query}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

//atores

export async function getAtores (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/atores'
    const response = await fetch(url)
    const data = await response.json()

    return data.atores
}


export async function getAtorId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data.ator
}

//diretores

export async function getDiretores (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/diretores'
    const response = await fetch(url)
    const data = await response.json()

    return data.diretores
}


export async function getDiretorId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/diretor/${id}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data.diretor
}


//produtoras

export async function getProdutoras (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/produtoras'
    const response = await fetch(url)
    const data = await response.json()

    return data.produtoras
}


export async function getProdutoraId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/produtora/${id}`
        const response = await fetch(url)
        const data = await response.json()
  
        return data.produtoras
}


//generos

export async function getGeneros (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/generos'
    const response = await fetch(url)
    const data = await response.json()

    return data.generos
}


export async function getGeneroId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/genero/${id}`
        const response = await fetch(url)
        const data = await response.json()
  
        return data.generos
}


//países

export async function getPaises (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/paises'
    const response = await fetch(url)
    const data = await response.json()

    return data.paises
}


export async function getPaisId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/pais/${id}`
        const response = await fetch(url)
        const data = await response.json()
  
        return data.paises
}

//classificacoes

export async function getClassificacoes (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/classificacoes'
    const response = await fetch(url)
    const data = await response.json()
    
    return data.classificacoes
}