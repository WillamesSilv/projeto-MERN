const express = require('express')

const routes = express.Router()

const Users = require('./controllers/users.controller')

routes.get('/', Users.index)

// Rotas de usuários
routes.post('/api/users', Users.create)
routes.get('/api/users', Users.index)
routes.get('/api/users.details/:_id', Users.details)
routes.delete('/api/users/:_id', Users.delete)
routes.put('/api/users', Users.update)


module.exports = routes