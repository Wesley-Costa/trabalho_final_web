import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/authContext';
import '../styles/components/user.css';
import { FaUser , FaSignOutAlt} from 'react-icons/fa';

export default function User(){

    const { handleLogout } = useContext(Context);
    const nome = localStorage.getItem('nome');
    const sobrenome = localStorage.getItem('sobrenome');
    const id = localStorage.getItem('id');

    return(
       
        <user>
            <Link to={`/EditarUsuario/${id}`} className="user-button">
                {nome + ' ' + sobrenome}</Link>
            <button className="user-logout" type="button" onClick={handleLogout}>
                Sair<icon><FaSignOutAlt/></icon>
            </button>
        </user>
            
    ); 
}