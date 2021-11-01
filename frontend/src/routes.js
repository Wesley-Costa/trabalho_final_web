import React from 'react';
import Login from './pages/Login/login';
import Reserva from './pages/Reserva/reserva';
import FazerReserva from './pages/FazerReserva/fazerReserva'
import EditarReserva from './pages/EditarReserva/editarReserva'
import VerReserva from './pages/VerReserva/verReserva'
import Usuario from './pages/Usuario/usuario';
import EditarUsuario from './pages/EditarUsuario/editarUsuario';
import CriarConta from './pages/CriarConta/criarConta'
import Pet from './pages/Pet/pet';
import CadastrarPet from './pages/CadastrarPet/cadastrarPet'
import EditarPet from './pages/EditarPet/editarPet'
import VisualizarPet from './pages/VisualizarPet/visualizarPet'
import Configuracoes from './pages/Configuracoes/configuracoes';
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/Home' component={Reserva} />
                <Route path='/Reserva' component={Reserva} />
                <Route path='/FazerReserva' component={FazerReserva} /> 
                <Route path='/EditarReserva/:id' component={EditarReserva} />
                <Route path='/VerReserva/:id' component={VerReserva} />
                <Route path='/Usuario' component={Usuario} />
                <Route path='/EditarUsuario/:id' component={EditarUsuario} />
                <Route path='/CriarConta' component={CriarConta} />
                <Route path='/Configuracoes' component={Configuracoes} />
                <Route path='/Pet' component={Pet} />
                <Route path='/CadastrarPet' component={CadastrarPet} />
                <Route path='/EditarPet/:id' component={EditarPet} />
                <Route path='/VisualizarPet/:id' component={VisualizarPet} />
            </Switch>
        </BrowserRouter>
    );
}