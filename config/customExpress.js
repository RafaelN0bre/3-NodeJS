 // Setando os módulos para poder chamá-los

const express = require('express')
const consign = require('consign')
module.exports = () => {
    // Executando o express criando o app

    const app = express()

    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    //Configurando o consign

    consign()
        .include('controllers')
        .into(app)

    return app
}