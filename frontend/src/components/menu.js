import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/menu.css';
import { FaUser, FaDog, FaCog, FaBookOpen, FaPaw} from 'react-icons/fa';

export default function Menu(){
   
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