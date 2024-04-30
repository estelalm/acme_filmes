'use strict'

import { getUsuarios, getFilmes } from "../../api/endpoints.js"


const logar = async function () {

            let usuarios = await getUsuarios()
            let loginValido = false

            let login = document.getElementById('email').value
            let senha = document.getElementById('senha').value

            usuarios.forEach((usuario) => {

                let usuarioEmail
                let usuarioSenha
                if (usuario.email == login && senha == usuario.senha) {
                    usuarioEmail = usuario.email
                    usuarioSenha = usuario.senha
                    let idUsuario = usuario.id
                    localStorage.setItem('idUsuario', idUsuario)
                    loginValido = true
                } 
            })

            if(loginValido)
            window.location.assign('/src/pages/home.html')
            else
            alert('Usuário ou senha incorretos')
}

const botaoEntra = document.getElementById('botao-entrar')
botaoEntra.addEventListener('click', logar)