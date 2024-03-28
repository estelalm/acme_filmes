
export async function getFilmes (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function getFilme (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/filme/${1}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filme[0]
}



  //colocar no cms
