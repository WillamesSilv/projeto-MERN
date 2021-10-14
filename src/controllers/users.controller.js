const Users = require('../models/user.model')
const jwt = require("jsonwebtoken")
const secret = "mysecret"

module.exports = {
    async index(req, res) {
        const user = await Users.find()
        res.json(user)
    },
    async create(req, res) {
        try {
            const {name_user, email_user, type_user, password_user} = req.body;

            let data = {};

            let user = await Users.findOne({email_user}); // identificando se o email do usuario ja existe
            if(!user) {
                data = {name_user, email_user, type_user, password_user}
                user = await Users.create(data)
                return res.status(200).json(user)
            } else {
                return res.status(500).json(user)
            }
        } catch (error) {
            console.error(error);
        res.status(500).send("server error");
        }
    },
    async details(req, res) {
        const {_id} = req.params
        const user = await Users.findOne({_id})
        res.json(user)
    },
    async delete(req, res) {
        const {_id} = req.params
        const user = await Users.findByIdAndDelete({_id})
        res.json(user)
    },
    async update(req, res) {
        const {_id, name_user, email_user, type_user, password_user} = req.body;
        const data = {name_user, email_user, type_user, password_user}
        const user = await Users.findOneAndUpdate({_id}, data, {new: true}) // Sem a variavel new, retorna os dados antigos
        res.json(user)
    },
    async login(req, res) {
        const { email, senha } = req.body
        Users.findOne({ email_user: email, type_user: 1 }, function (err, user) {
            if(err) {
                console.log(err)
                res.status(200).json({erro: "Erro no servidor, por favor tente novamente"})
            }else if(!user) {
                res.status(200).json({status: 2, erro: "E-mail inválido! "})
            }else {
                user.isCorrectPassword(senha, async function(err, same){
                    if(err) {
                        res.status(200).json({erro:"Erro no servidor, tente novamente."})
                    }else if(!same) {
                        res.status(200).json({status:2, erro: "Senha inválida!"})
                    }else {
                        const payload ={ email }
                        const token = jwt.sign(payload, secret, {
                        expiresIn: "24h"
                        })
                        res.cookie('token', token, { httpOnly: true })
                        res.status(200).json({status: 1, auth: true, token: token, id_client: user._id, user_name: user.name_user})
                    }
                })
                
            }
            
        })
    },
    async checkToken(req, res) {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){ 
            res.json({status:401, msg: "Não autorizado! Token inexistente"})
        }else {
            jwt.verify(token, secret, function(err, decoded) {
                if(err) {
                    res.json({status:401, msg: "Não autorizado! Token inválido"})
                }else {
                    res.json({status: 200})
                }
            })
        }
    },
    async destroyToken(req, res) {
        const token = req.headers.token;
        if(token) {
            res.cookie('token', null, {httpOnly: true})
        }else {
            res.status(401).send('Logout não autorizado!')
        }
        res.send('Sessão finalizada com sucesso!')
    }
}