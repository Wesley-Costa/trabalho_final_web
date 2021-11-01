const express = require('express')
const routes = express.Router()
const UserController = require('./controller/UserController');
const PetsController = require('./controller/PetsController');
const ReservaController = require('./controller/ReservaController');
const ConfiguracaoController = require('./controller/ConfiguracaoController');

routes.get('/users', UserController.list);
routes.post('/users', UserController.create);
routes.post('/users/pesquisa', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/pets', PetsController.list);
routes.post('/pets', PetsController.create);
routes.post('/pets/pesquisa', PetsController.show);
routes.put('/pets/:id', PetsController.update);
routes.delete('/pets/:id', PetsController.delete);

routes.get('/reserva', ReservaController.list);
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

