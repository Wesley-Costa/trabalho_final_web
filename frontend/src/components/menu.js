import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/menu.css';
import { FaUser, FaDog, FaCog, FaBookOpen, FaPaw} from 'react-icons/fa';

export default function Menu(){

    if(localStorage.getItem('funcao') === 'Cliente'){
        return(
            <menu id="main-menu">
                <aside>
                    <div id = "title">
                    <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                    </div>
                    <Link to="/Pet" className="menu-button" >
                        <icon><FaDog/></icon>Pet
                    </Link>          
                    <Link to="/Reserva" className="menu-button">
                        <icon><FaBookOpen/></icon>Reservas
                    </Link>
                </aside>	
            </menu>
        ); 
    }
    else if(localStorage.getItem('funcao') === 'Funcionário'){
        return(
            <menu id="main-menu">
                <aside>
                    <div id = "title">
                    <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                    </div>
                    <Link to="/Pet" className="menu-button" >
                        <icon><FaDog/></icon>Pet
                    </Link>          
                    <Link to="/Usuario" className="menu-button">
                        <icon><FaUser/></icon>Usuários
                    </Link>          
                    <Link to="/Reserva" className="menu-button">
                        <icon><FaBookOpen/></icon>Reservas
                    </Link>
                </aside>	
            </menu>
        ); 
    }
    if(localStorage.getItem('funcao') === 'Gerente'){
        return(
            <menu id="main-menu">
                <aside>
                    <div id = "title">
                    <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                    </div>
                    <Link to="/Pet" className="menu-button" >
                        <icon><FaDog/></icon>Pet
                    </Link>          
                    <Link to="/Usuario" className="menu-button">
                        <icon><FaUser/></icon>Usuários
                    </Link>          
                    <Link to="/Configuracoes" className="menu-button">
                        <icon><FaCog/></icon>Configurações
                    </Link>
                    <Link to="/Reserva" className="menu-button">
                        <icon><FaBookOpen/></icon>Reservas
                    </Link>
                </aside>	
            </menu>
        ); 
    }
}