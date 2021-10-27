import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import api from "../../services/api";
import '../../styles/pages/login.css';
import logoImg from '../../img/pet.jpg';
import googleImg from '../../img/google.png';
import facebookImg from '../../img/facebook.png';
import twitterImg from '../../img/twitter.png';
import axios from 'axios';

export default function Login() {
    // const [email, setEmail] = useState<string>("");
    // const [senha, setSenha] = useState<string>("");

    // async function Login(e){
    //     e.preventDefault();
    //     const response = await api.post("/sessions", { 
    //         email, senha
    //     })
    //     if (response.status === 200) {
    //         localStorage.setItem("email", response.data.email);
    //         localStorage.setItem("senha", response.data.senha);

    //         window.location.href = "/app";
    //     }else{
    //         alert("Usuário não encontrado!");
    //     }

    // }

    // useEffect(()=>{
    //     const name = localStorage.getItem("name");
    //     if (nome){
    //         window.location.href = "/app";
    //     }
    // },[])

    const initUser = {
        email: '',
        senha: ''
    }
    const [user, setUser] = useState(initUser);

    function onChange(ev) {
        const { name, value } = ev.target;
        setUser({ ...user, [name]: value })
    }

    return (
        <div id='container'>
            <div className="menu">
                <p><img src={logoImg} alt="" /></p>
            </div>
            <main>
                <div className="contents">
                    <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                    <form className='login-form' onSubmit={Login}>
                        <fieldset>
                            <label>Login</label>
                            <input class='inputtext' id='email' name='email' onChange={onChange} autoComplete='email' maxLength={255} value={user.email} />
                            <label>Senha</label>
                            <input class='inputtext' id='senha' name='senha' type='senha' onChange={onChange} autoComplete='current-senha' maxLength={255} value={user.senha} />
                        </fieldset>
                    </form>
                    <p><input type="checkbox" /> mantenha-me conectado</p>
                    <Link to="/">Esqueci a senha</Link>
                    <p>-----------------------------------ou-------------------------------------</p>
                    <p><img class="imagefloat" src={googleImg} alt="" /></p>
                    <p><img class="imagefloat" src={facebookImg} alt="" /></p>
                    <p><img class="imagefloat" src={twitterImg} alt="" /></p>
                    <form className='login-form' onSubmit={Login}>
                        <button className='confirm-button' type='submit'>
                            Enviar
                        </button>
                    </form>
                    <div className="input-group">
                        <Link to="/CriarConta" className="register">
                            Criar uma conta
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}