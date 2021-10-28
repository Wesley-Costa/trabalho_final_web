import React from 'react';
import Login from './pages/Login/login';
import Reserva from './pages/Reserva/reserva';
import Usuario from './pages/Usuario/usuario';
import EditarUsuario from './pages/Usuario/editarUsuario';
import Pet from './pages/Pet/pet';
import Configuracoes from './pages/Configuracoes/configuracoes';
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/Home' component={Reserva} />
                <Route path='/Reserva' component={Reserva} />
                <Route path='/Usuario' component={Usuario} />
                <Route path='/Usuario/editar' component={EditarUsuario} />
                <Route path='/Configuracoes' component={Configuracoes} />
                <Route path='/Pet' component={Pet} />
            </Switch>
        </BrowserRouter>
    );
}