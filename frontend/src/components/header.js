import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/header.css';
import { FaUser, FaDog, FaCog, FaBookOpen } from 'react-icons/fa';

export default function Header(){
   
    return(
        <header id="main-header">
            <title>Hotel Pet</title>
            <user>
                <Link to="/Usuario/EditarUsuario" className="user-button" style={{ textDecoration: 'none' }}>
                    <icon><FaUser/></icon> Usuário
                </Link>
            </user>
            <aside>
                <h1><i class="fas fa-paw"></i> Hotel Pet</h1>
                <div id="box">
                    <br/>
                    <Link to="/Pet" className="menu-button" style={{ textDecoration: 'none' }}>
                        <icon><FaDog/></icon>Pet
                    </Link>
                    <br/>   
                    <Link to="/Usuario" className="menu-button" style={{ textDecoration: 'none' }}>
                        <icon><FaUser/></icon>Usuários
                    </Link>
                    <br/>
                    <Link to="/Configuracoes" className="menu-button" style={{ textDecoration: 'none' }}>
                        <icon><FaCog/></icon>Configurações
                    </Link>
                    <br/>
                    <Link to="/Reserva" className="menu-button" style={{ textDecoration: 'none' }}>
                        <icon><FaBookOpen/></icon>Reservas
                    </Link>
                </div>
            </aside>	
        </header>
    ); 
}