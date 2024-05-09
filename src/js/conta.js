'use strict'

import { getUsuarioId } from "../../api/endpoints.js"

const idUsuario = localStorage.getItem('idUsuario')

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const senha = document.getElementById('senha')

const preencherInfoUsuario = async () =>{

    let usuario = await getUsuarioId(idUsuario)


    nome.value = usuario[0].nome
    email.value = usuario[0].email
    senha.value = usuario[0].senha
}

const modoEditar = () =>{
    nome.disabled = false
    email.disabled = false
    senha.disabled = false
}

const infoContainer = document.getElementById('info-container')
const botoes = infoContainer.querySelectorAll('button')
botoes.forEach(botao =>{
    botao.addEventListener('click', modoEditar)
})


const botaoSair = document.getElementById('sair')
botaoSair.addEventListener('click', () =>{
    window.location.assign('../../index.html')
})
preencherInfoUsuario()