const connection = require('../database/connection');
const { show } = require('./UserController');
const path = require('path');

// var filepath = '~/path/to/file.png'

// app.get('/path/for/site', function (req, res) {
//     res.sendFile(filepath);
// })

module.exports = {

    async show(req, res){
        const {img} = req.body;
        const pathImg = path.resolve(path.basename('') + img)
        return res.sendFile(pathImg)
    }
}