const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const id = crypto.randomBytes(4).toString('hex')
        const { email, senha, nome, sobrenome, telefone, funcao, dataCadastro, imagem, status } = req.body
        await connection('users').insert({
            id,
            email,
            senha,
            nome,
            sobrenome,
            telefone,
            funcao,
            dataCadastro,
            imagem,
            status
        });
        res.json({ id });
    },

    async list(req, res) {
        const users = await connection('users').select('*');
        res.json(users);
    },

    async show(req, res) {
        const { id } = req.params;
        const user = await connection('users')
            .where('id', id)
            .select('*');
        return res.json(user);
    },

    async update(req, res) {
        const { id } = req.params;
        const { email, senha, nome, sobrenome, telefone, funcao, dataCadastro, imagem, status } = req.body
        await connection('users')
            .where('id', id)
            .update({
                id,
                email,
                senha,
                nome,
                sobrenome,
                telefone,
                funcao,
                dataCadastro,
                imagem,
                status
            });
        return res.status(204).send();
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('users').where('id', id).delete();
        return res.status(204).send();
    },

    async auth(req, res) {
        const { email, senha } = req.body;
        // e = await connection('users').where('email', et, 'senha', senha).select('id')
        e = await connection('users').findOne({ email, senha }, (err, user) => {
            if (err)
                reject({
                    message: 'We could not log you in. Reason: ' + err.message
                })

            if (!user)
                reject({
                    message: 'User does not exists'
                })

            return(user)
        })
        return res.json(e) 

    }
}