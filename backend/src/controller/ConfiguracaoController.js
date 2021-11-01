const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const id = crypto.randomBytes(4).toString('hex')
        const {vagas, valorDiaria} = req.body
        await connection('configuracao').insert({
            id,
            vagas,
            valorDiaria
        });
        res.json({id});
    },
    
    async list(req, res){
        const config = await connection('configuracao').select('*');
        res.json(config);
    },

    async show(req,res){
        const {id} = req.params;
        const config = await connection('configuracao')
                    .where('id', id)
                    .select('*');
        return res.json(config);
    },

    async update(req, res){
        const {id} = req.params;
        const {vagas, valorDiaria} = req.body
        await connection('configuracao')
            .where('id',id)
            .update({
                vagas,
                valorDiaria
        });
        return res.status(204).send();
    },

    async delete(req,res){
        const {id} = req.params;
        await connection('configuracao').where('id', id).delete();
        return res.status(204).send();
    }
}