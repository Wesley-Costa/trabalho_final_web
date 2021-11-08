const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const id_reserva = crypto.randomBytes(4).toString('hex')
        
        const { pet, inicio, fim, status, valor, notas, proprietario } = req.body
        const id = await connection('pets').where('nome', pet).select('id')
        const usuario_id = await connection('pets').where('nome', pet).select('usuario_id')
        
        await connection('reserva').insert({
            id: id_reserva,
            pet,
            proprietario,
            inicio,
            fim,
            status,
            proprietario_id: usuario_id[0].usuario_id,
            pet_id: id[0].id,
            valor,
            notas
        });
        res.json({ id_reserva });
    },

    async list(req, res){
        const {id} = req.params;
        const reserva = await connection('reserva')
        .where('id', id)
        .select('*');

        return res.json(reserva);
    },

    async show(req, res) {
        const { id, pet, proprietario, inicio, fim, status, proprietario_id, valor } = req.body
        const reserva = await connection('reserva')
        .where('id', 'like', `%${id || ''}%`)
        .where('pet', 'like', `%${pet || ''}%`)
        .where('proprietario', 'like', `%${proprietario || ''}%`)
        .where('inicio', 'like', `%${inicio || ''}%`)
        .where('fim', 'like', `%${fim || ''}%`)
        .where('status', 'like', `%${status || ''}%`)
        .where('proprietario_id', 'like', `%${proprietario_id || ''}%`)
        .where('valor', 'like', `%${valor || ''}%`)
        .select('*');

        return res.json(reserva);
    },

    async update(req, res) {
        const { id } = req.params;
        const { pet, proprietario, inicio, fim, status, proprietario_id, pet_id, valor, notas } = req.body
        await connection('reserva')
            .where('id', id)
            .update({
                pet,
                proprietario,
                inicio,
                fim,
                status,
                proprietario_id,
                pet_id,
                valor,
                notas
            });
        return res.status(204).send();
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('reserva').where('id', id).delete();
        return res.status(204).send();
    }
}