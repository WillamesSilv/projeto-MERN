const Produto = require('../models/produto.model')

module.exports = {
    async index(req, res) {
        const product = await Produto.find()
        res.json(product)
    },
    async create(req, res) {
        try {
            const {nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;

            let data = {};

            let product = await Produto.findOne({nome_produto}); // identificando se o email do usuario ja existe
            if(!product) {
                data = {nome_produto, descricao_produto, preco_produto, qtd_produto}
                product = await Produto.create(data)
                return res.status(200).json(product)
            } else {
                return res.status(500).json(product)
            }
        } catch (error) {
            console.error(error);
        res.status(500).send("server error");
        }
    },
    async details(req, res) {
        const {_id} = req.params
        const product = await Produto.findOne({_id})
        res.json(product)
    },
    async delete(req, res) {
        const {_id} = req.params
        const product = await Produto.findByIdAndDelete({_id})
        res.json(product)
    },
    async update(req, res) {
        const {_id, nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;
        const data = {nome_produto, descricao_produto, preco_produto, qtd_produto}
        const product = await Produto.findOneAndUpdate({_id}, data, {new: true}) // Sem a variavel new, retorna os dados antigos
        res.json(product)
    }
}