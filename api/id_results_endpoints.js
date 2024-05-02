
import { getFilmesCompradosUsuario, getFilmesSalvosUsuario, getFilmesAvaliadosUsuario} from "./endpoints.js"

export const getIdsComprados = async (idUsuario) =>{
    const filmes = await getFilmesCompradosUsuario(idUsuario)
    if(filmes){
        const idsComprados = filmes.map(filme =>{
            return filme.id
        })
        return idsComprados
    }else{
        return []
    }
}
export const getIdsSalvos = async (idUsuario) =>{
    const filmes = await getFilmesSalvosUsuario(idUsuario)
    if(filmes){
        const idsSalvos = filmes.map(filme =>{
            return filme.id
        })
        return idsSalvos
    }else{
        return []
    }
}

export const getIdsAvaliados = async (idUsuario) => {
    const filmes = await getFilmesAvaliadosUsuario(idUsuario)
    if (filmes) {
        const idsAvaliados = filmes.map(filme => {
            return filme.filme[0].id
        })
        return idsAvaliados
    } else {
        return []
    }
}