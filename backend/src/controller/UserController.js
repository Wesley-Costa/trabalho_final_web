const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const id = crypto.randomBytes(4).toString('hex')
        const {email, senha, nome, sobrenome, telefone,  funcao, dataCadastro, imagem, status} = req.body
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
        res.json({id});
    },
    
    async list(req, res){
        const {id} = req.params;
        const user = await connection('users')
        .where('id', id)
        .select('*');

        return res.json(user);
    },

    async show(req, res) {
        const {id, email, senha, nome, sobrenome, telefone,  funcao, dataCadastro, imagem, status} = req.body
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

    async update(req, res){
        const {id} = req.params;
        const {email, senha, nome, sobrenome, telefone,  funcao, dataCadastro, imagem, status} = req.body
        await connection('users')
            .where('id',id)
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
        return res.status(204).send();
    },

    async delete(req,res){
        const {id} = req.params;
        await connection('users').where('id', id).delete();
        return res.status(204).send();
    }
}