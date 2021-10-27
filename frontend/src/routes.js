import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login/login';
import Reserva from './pages/Reserva/reserva';
import Usuario from './pages/Usuario/usuario';
import Configuracoes from './pages/Configuracoes/configuracoes';

export default function Routes (){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/app' exact component={Reserva}/>
                <Route path='/Reserva' component={Reserva}/>
                <Route path='/Usuario' component={Usuario}/>
                <Route path='/Configuracoes' component={Configuracoes}/>    
            </Switch>
        </BrowserRouter>
    );
}