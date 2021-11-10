const express = require('express')
const routes = express.Router()
const UserController = require('./controller/UserController');
const PetsController = require('./controller/PetsController');
const ReservaController = require('./controller/ReservaController');
const ConfiguracaoController = require('./controller/ConfiguracaoController');
const multer = require('./config/multer');
const ControllerImage = require('./controller/ControllerImage')

routes.get('/users/profile/:id', UserController.list);
routes.post('/users', multer.single('image'), UserController.create);
routes.post('/users/pesquisa', UserController.show);
routes.post('/users/auth', UserController.auth);
routes.put('/users/:id',  multer.single('image'), UserController.update);
routes.delete('/users/profile/delete/:id', UserController.delete);

routes.get('/pets/profile/:id', PetsController.list);
routes.post('/pets', multer.single('image'), PetsController.create);
routes.post('/pets/pesquisa', PetsController.show);
routes.put('/pets/:id', multer.single('image'), PetsController.update);
routes.delete('/pets/profile/delete/:id', PetsController.delete);

routes.get('/reserva/profile/:id', ReservaController.list);
routes.post('/reserva', ReservaController.create);
routes.post('/reserva/pesquisa', ReservaController.show);
routes.put('/reserva/:id', ReservaController.update);
routes.delete('/reserva/profile/delete/:id', ReservaController.delete);

routes.get('/configuracao', ConfiguracaoController.list);
routes.post('/configuracao', ConfiguracaoController.create);
routes.get('/configuracao/:id', ConfiguracaoController.show);
routes.put('/configuracao/:id', ConfiguracaoController.update);
routes.delete('/configuracao/:id', ConfiguracaoController.delete);

module.exports = routes;

