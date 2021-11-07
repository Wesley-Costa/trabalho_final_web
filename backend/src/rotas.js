const express = require('express')
const routes = express.Router()
const UserController = require('./controller/UserController');
const PetsController = require('./controller/PetsController');
const ReservaController = require('./controller/ReservaController');
const ConfiguracaoController = require('./controller/ConfiguracaoController');
const multer = require('./config/multer');

routes.get('/users/profile/:id', UserController.list);
routes.post('/users', multer.single('image'), UserController.create);
routes.post('/users/pesquisa', UserController.show);
routes.post('/users/auth', UserController.auth);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/pets/profile/:id', PetsController.list);
routes.get('/pets/profile/:userId', PetsController.listUser);
routes.post('/pets', multer.single('image'), PetsController.create);
routes.post('/pets/pesquisa', PetsController.show);
routes.put('/pets/:id', PetsController.update);
routes.delete('/pets/:id', PetsController.delete);

routes.get('/reserva/profile/:id', ReservaController.list);
routes.post('/reserva', ReservaController.create);
routes.post('/reserva/pesquisa', ReservaController.show);
routes.put('/reserva/:id', ReservaController.update);
routes.delete('/reserva/:id', ReservaController.delete);

routes.get('/configuracao', ConfiguracaoController.list);
routes.post('/configuracao', ConfiguracaoController.create);
routes.get('/configuracao/:id', ConfiguracaoController.show);
routes.put('/configuracao/:id', ConfiguracaoController.update);
routes.delete('/configuracao/:id', ConfiguracaoController.delete);

module.exports = routes;

