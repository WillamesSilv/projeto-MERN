const { update } = require('../models/user.model');
const Users = require('../models/user.model')

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
    }
}