const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const id = crypto.randomBytes(4).toString('hex')
        const {pet, inicio, fim, status, proprietario_id, pet_id, valor} = req.body
        await connection('reserva').insert({
            id,
            pet, 
            inicio, 
            fim, 
            status, 
            proprietario_id, 
            pet_id, 
            valor
        });
        res.json({id});
    },
    
    async list(req, res){
        const reserva = await connection('reserva').select('*');
        res.json(reserva);
    },

    async show(req,res){
        const {id} = req.params;
        const reserva = await connection('reserva')
                    .where('id', id)
                    .select('*');
        return res.json(reserva);
    },

    async update(req, res){
        const {id} = req.params;
        const {pet, inicio, fim, status, proprietario_id, pet_id, valor} = req.body
        await connection('reserva')
            .where('id',id)
            .update({
                id,
                pet, 
                inicio, 
                fim, 
                status, 
                proprietario_id, 
                pet_id, 
                valor
        });
        return res.status(204).send();
    },

    async delete(req,res){
        const {id} = req.params;
        await connection('reserva').where('id', id).delete();
        return res.status(204).send();
    }
}