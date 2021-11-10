const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const id = crypto.randomBytes(4).toString('hex')
        const { raca, tamanho, nome, tipo, usuario_id } = req.body
        console.log(req.body)
        const imagemPet = {
            imagem: ''
        }

        if (req.file) {
            imagemPet.imagem = req.file.filename
        }
        const { imagem } = imagemPet;
        console

        await connection('pets').insert({
            id,
            raca, 
            tamanho, 
            nome, 
            tipo, 
            imagem, 
            usuario_id
        });

        return res.json({ id });
    },

    async list(req, res) {
        const { id } = req.params;
        const pets = await connection('pets')
            .where('id', id)
            .select('*');

        return res.json(pets);
    },

    async show(req, res) {
        const { id, raca, tamanho, nome, usuario_id } = req.body
        const pet = await connection('pets')
            .where('id', 'like', `%${id || ''}%`)
            .where('raca', 'like', `%${raca || ''}%`)
            .where('tamanho', 'like', `%${tamanho || ''}%`)
            .where('nome', 'like', `%${nome || ''}%`)
            .where('usuario_id', 'like', `%${usuario_id || ''}%`)
            .select('*');

        return res.json(pet);
    },

    async update(req, res) {
        const { id } = req.params;
        const { raca, tamanho, nome, tipo, usuario_id } = req.body
        console.log(req.body)
        const imagemPet = {
            imagem: ''
        }

        if (req.file) {
            imagemPet.imagem = req.file.filename
        }
        const { imagem } = imagemPet;
        console.log(imagem)

        await connection('pets')
            .where('id', id)
            .update({
                raca,
                tamanho,
                nome,
                tipo,
                imagem,
                usuario_id
            });
        return res.status(204).send();
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('pets').where('id', id).delete();
        return res.status(204).send();
    }
}