const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res) {
        const id = crypto.randomBytes(4).toString('hex')
        const { email, senha, nome, sobrenome, telefone, funcao, dataCadastro, status } = req.body
        const imagemPet = {
            imagem: ''
        }

        if (req.file) {
            imagemPet.imagem = req.file.filename
        }
        const { imagem } = imagemPet;

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

        return res.json({ id });
    },

    async list(req, res) {
        const { id } = req.params;
        const user = await connection('users')
            .where('id', id)
            .select('*');

        return res.json(user);
    },

    async show(req, res) {
        const { id, email, nome, sobrenome, telefone, funcao, dataCadastro, status } = req.body
        const user = await connection('users')
            .where('id', 'like', `%${id || ''}%`)
            .where('email', 'like', `%${email || ''}%`)
            .where('nome', 'like', `%${nome || ''}%`)
            .where('sobrenome', 'like', `%${sobrenome || ''}%`)
            .where('telefone', 'like', `%${telefone || ''}%`)
            .where('funcao', 'like', `%${funcao || ''}%`)
            .where('dataCadastro', 'like', `%${dataCadastro || ''}%`)
            .where('status', 'like', `%${status || ''}%`)
            .select('*');

        return res.json(user);
    },

    async auth(req, res) {
        const { email, senha } = req.body
        const user = await connection('users')
            .where({
                email: email,
                senha: senha
            }).select('*')

        return res.status(200).json(user);
    },

    async update(req, res) {
        const { id } = req.params;
        const { email, senha, nome, sobrenome, telefone, funcao, dataCadastro, status } = req.body
        const imagemPet = {
            imagem: ''
        }

        if (req.file) {
            imagemPet.imagem = req.file.filename
        }
        const { imagem } = imagemPet;
        
        await connection('users')
            .where('id', id)
            .update({
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
        return res.status(200).send();
    },

    async delete(req, res) {
        const { id } = req.params;
        console.log(id)
        await connection('users').where('id', id).delete();
        return res.status(204).send();
    },
}