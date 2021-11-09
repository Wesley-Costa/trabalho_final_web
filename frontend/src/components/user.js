import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/authContext';
import '../styles/components/user.css';
import { FaSignOutAlt} from 'react-icons/fa';
import api from '../services/api';

export default function User(){

    const { handleLogout } = useContext(Context);
    const nome = localStorage.getItem('nome');
    const sobrenome = localStorage.getItem('sobrenome');
    const id = localStorage.getItem('id');

    const [user, setUser] = useState('');

    useEffect(() => {
        if (id) {
            api.get(`/users/profile/${id}`).then(response => {
                setUser(...response.data)
            })
        }
    }, []);

    return(
        <user>
            <Link to={`/EditarUsuario/${id}`} className="user-button">
                <img src ={`http://localhost:3001/files/${user.imagem}`} alt = "" />
                {nome + ' ' + sobrenome}</Link>
            <button className="user-logout" type="button" onClick={handleLogout}>
                Sair<icon><FaSignOutAlt/></icon>
            </button>
        </user>
    ); 
}