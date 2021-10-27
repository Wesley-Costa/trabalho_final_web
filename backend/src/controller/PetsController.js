const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const id = crypto.randomBytes(4).toString('hex')
        const {raca, tamanho, nome, tipo, imagem, usuario_id} = req.body
        await connection('pets').insert({
            id,
            raca, 
            tamanho, 
            nome, 
            tipo, 
            imagem, 
            usuario_id
        });
        res.json({id});
    },
    
    async list(req, res){
        const pets = await connection('pets').select('*');
        res.json(pets);
    },

    async show(req,res){
        const {id} = req.params;
        const pet = await connection('pets')
                    .where('id', id)
                    .select('*');
        return res.json(pet);
    },

    async update(req, res){
        const {id} = req.params;
        const {raca, tamanho, nome, tipo} = req.body
        await connection('pets')
            .where('id',id)
            .update({
                id,
                raca, 
                tamanho, 
                nome, 
                tipo
        });
        return res.status(204).send();
    },

    async delete(req,res){
        const {id} = req.params;
        await connection('pets').where('id', id).delete();
        return res.status(204).send();
    }
}