import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/authContext';
import '../styles/components/user.css';
import { FaSignOutAlt} from 'react-icons/fa';
import api from '../services/api';
import userImg from '../img/user.jpg';

export default function User(){

    const { handleLogout } = useContext(Context);
    const nome = localStorage.getItem('nome');
    const sobrenome = localStorage.getItem('sobrenome');
    const id = localStorage.getItem('id');

    const initUsuario = {
        email: '',
        senha: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        funcao: '',
        dataCadastro: '',
        imagem: '',
        status: 'Ativo'
    }
    const [user, setUser] = useState(initUsuario);

    useEffect(() => {
        if (id) {
            api.get(`/users/profile/${id}`).then(response => {
                setUser(...response.data)
            })
        }
    }, []);

    var imagem = user.imagem;
    console.log(imagem)

    return(
        <user>
            <Link to={`/EditarUsuario/${id}`} className="user-button">
                <img src ={userImg} alt = "" />
                {nome + ' ' + sobrenome}</Link>
            <button className="user-logout" type="button" onClick={handleLogout}>
                Sair<icon><FaSignOutAlt/></icon>
            </button>
        </user>
    ); 
}