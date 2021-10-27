import React from 'react';
import '../styles/components/header.css';
import { FaUser, FaDog, FaCog, FaBookOpen } from 'react-icons/fa';

export default function Header(){
   
    return(
        <header id="main-header">
            <title>Hotel Pet</title>
            <user>
                <form action="">	
                    <button className="user-button" type='submit' formaction="editarPerfil.html">
                    <icon><FaUser/></icon> Usuário </button>
                </form>
            </user>
            <aside>
                <h1><i class="fas fa-paw"></i> Hotel Pet</h1>
                <form action="">
                    <button className="menu-button" type='submit' formaction="pets.html">
                        <icon><FaDog/></icon>Pet</button>
                    <button className="menu-button" type='submit' formaction="usuarios.html"> 
                        <icon><FaUser/></icon>Usuários</button>
                    <button className="menu-button" type='submit' formaction="configuracoes.html">
                        <icon><FaCog/></icon>Configurações</button>
                    <button className="menu-button" type='submit' formaction="reservas.html">
                        <icon><FaBookOpen/></icon>Reservas</button>
                </form>
            </aside>	
        </header>
    ); 
}