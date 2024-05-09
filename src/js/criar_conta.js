'use strict'

import { postUsuario } from "../../api/endpoints.js"


const botaoEntrar = document.getElementById('botao-entrar')

const criarConta = async () => {

    let nome = document.getElementById('nome').value
    let cpf = document.getElementById('cpf').value
    let celular = document.getElementById('celular').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let confirmaSenha = document.getElementById('confirma-senha').value

    if (nome == "" || cpf == "" || celular == "" || email == "" || senha == "" || confirmaSenha == "") {
    } else if (senha != confirmaSenha) {
        alert("As senhas não são iguais")
    } else {

        let novoUsuarioJSON = {
            "nome": nome,
            "cpf": cpf,
            "telefone": celular,
            "email": email,
            "senha": senha
        }

        let novoUsuario = postUsuario(novoUsuarioJSON)

        if (novoUsuario) {
            // alert("Conta criada, voltando para a página de login.")
            // window.location.assign("../../index.html")
            console.log(novoUsuario)
        }
    }
}

botaoEntrar.addEventListener('click', criarConta)