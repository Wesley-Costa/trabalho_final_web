import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
//import api from "../../services/api";
import '../../styles/pages/login.css';
import logoImg from '../../img/pet.jpg';
import googleImg from '../../img/google.png';
import facebookImg from '../../img/facebook.png';
import twitterImg from '../../img/twitter.png';

export default function Login() {

    function initUser() {
        return {
            email: '',
            senha: ''
        }
    }

    const [user, setUser] = useState(initUser);
    const history = useHistory();

    function onChange(event) {
        const { value, name } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    async function login(e) {
        e.preventDefault();
        history.push("/Home");
            
    }
    
    return (
        <div id='login-page'>
            <div className="logo">
                <p><img src={logoImg} alt="" /></p>
            </div>
            <div className="login-main">
                <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                <form className='login-form' onSubmit={login}>
                    <fieldsetLogin>
                        <label>Login</label>
                        <input className='inputtextLogin' id='email' name='email' onChange={onChange} autoComplete='email' maxLength={255} value={user.email} />
                    </fieldsetLogin>
                    <br/>
                    <fieldsetLogin>    
                        <label>Senha</label>
                        <input className='inputtextLogin' id='senha' name='senha' type='password' onChange={onChange} autoComplete='current-senha' minLength={8} maxLength={255} value={user.senha} />
                    </fieldsetLogin>
                </form>
                <p><input type="checkbox" /> mantenha-me conectado</p>
                <Link to="/Login">Esqueci a senha</Link>
                <p>------------------------------ou------------------------------</p>
                <p><img className="imagefloat" src={googleImg} alt="" /></p>
                <p><img className="imagefloat" src={facebookImg} alt="" /></p>
                <p><img className="imagefloat" src={twitterImg} alt="" /></p>
                
                <button className="button-Login" type='submit' onSubmit={login}>
                    Enviar
                </button>
                
                <Link to="/CriarConta" className="register">
                    Criar uma conta
                </Link>
            </div>
        </div>
    )
}