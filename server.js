const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const routes = require('./src/routes')

const app = express()
const port = process.env.PORT || 5000 // Utilizar uma porta existente  ou 5000 caso ela já esteja em so


mongoose.connect('mongodb://localhost:27017/curso-mern',
 function(err) {
    if(err) {
        console.log(err)
    }else {
        console.log('MongoDB CONECTADO com sucesso!')
    }
})

app.use(cors()) // Segurança para saber quais dominios podem consumir os dados da api
app.use(cookieParser())
app.use(express.json()) // Serve para receber e enviar Dados no formato JSON
app.use(routes)



app.listen(port, () => {
    console.log(`server runing on port ${port}`)
})