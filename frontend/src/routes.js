import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from './context/authContext';
import Login from './pages/Login/login';
import Reserva from './pages/Reserva/reserva';
import FazerReserva from './pages/FazerReserva/fazerReserva'
import EditarReserva from './pages/EditarReserva/editarReserva'
import VerReserva from './pages/VerReserva/verReserva'
import Usuario from './pages/Usuario/usuario';
import EditarUsuario from './pages/EditarUsuario/editarUsuario';
import CriarConta from './pages/CriarConta/criarConta'
import CriarPerfil from './pages/CriarPerfil/criarPerfil';
import Pet from './pages/Pet/pet';
import CadastrarPet from './pages/CadastrarPet/cadastrarPet'
import EditarPet from './pages/EditarPet/editarPet'
import VisualizarPet from './pages/VisualizarPet/visualizarPet'
import Configuracoes from './pages/Configuracoes/configuracoes';

function CustomRoute({ isPrivate, ...rest }) {
    const { loading, authenticated } = useContext(Context);
  
    if (loading) {
      return <h1>Loading...</h1>;
    }
  
    if (isPrivate && !authenticated) {
      return <Redirect to="/" />
    }
  
    return <Route {...rest} />;
  }

export default function Routes() {
    return (
        <Switch>
            <CustomRoute exact path='/' component={Login} />
            <CustomRoute exact path='/CriarConta' component={CriarConta} />
            <CustomRoute isPrivate path='/Home' component={Reserva} />
            <CustomRoute isPrivate path='/Reserva' component={Reserva} />
            <CustomRoute isPrivate path='/FazerReserva' component={FazerReserva} /> 
            <CustomRoute isPrivate path='/EditarReserva/:id' component={EditarReserva} />
            <CustomRoute isPrivate path='/VerReserva/:id' component={VerReserva} />
            <CustomRoute isPrivate path='/Usuario' component={Usuario} />
            <CustomRoute isPrivate path='/EditarUsuario/:id' component={EditarUsuario} />
            <CustomRoute isPrivate path='/CriarPerfil' component={CriarPerfil} />
            <CustomRoute isPrivate path='/Configuracoes' component={Configuracoes} />
            <CustomRoute isPrivate path='/Pet' component={Pet} />
            <CustomRoute isPrivate path='/CadastrarPet' component={CadastrarPet} />
            <CustomRoute isPrivate path='/EditarPet/:id' component={EditarPet} />
            <CustomRoute isPrivate path='/VisualizarPet/:id' component={VisualizarPet} />
        </Switch>
    );
}