import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/authContext';
import '../styles/components/user.css';
import { FaUser , FaSignOutAlt} from 'react-icons/fa';

export default function User(){

    const { handleLogout } = useContext(Context);

    return(
       
        <user>
            <Link to="/EditarUsuario" className="user-button">
                <icon><FaUser/></icon> Usuário
            </Link>
            <button className="user-logout" type="button" onClick={handleLogout}>
                Sair<icon><FaSignOutAlt/></icon>
            </button>
        </user>
            
    ); 
}