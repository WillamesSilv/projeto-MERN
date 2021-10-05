const express = require('express')

const routes = express.Router()

const Users = require('./controllers/users.controller')
const Produto = require('./controllers/produtos.controllers')

routes.get('/', Users.index)

// Rotas de usuários
routes.post('/api/users', Users.create)
routes.get('/api/users', Users.index)
routes.get('/api/users.details/:_id', Users.details)
routes.delete('/api/users/:_id', Users.delete)
routes.put('/api/users', Users.update)

// Rotas de Produtos
routes.post('/api/produtos', Produto.create)
routes.get('/api/produtos', Produto.index)
routes.get('/api/produtos.details/:_id', Produto.details)
routes.delete('/api/produtos/:_id', Produto.delete)
routes.put('/api/produtos', Produto.update)


module.exports = routes