import React, { useState, useContext } from 'react';
import { Context } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import './login.css';
import api from '../../services/api';
import logoImg from '../../img/pet.jpg';
import googleImg from '../../img/google.png';
import facebookImg from '../../img/facebook.png';
import twitterImg from '../../img/twitter.png';

export default function Login() {
    const { handleLogin } = useContext(Context);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [resp, setResp] = useState('');
    
    async function login(e){
        e.preventDefault();
        const dados = {email, senha};
        await api.post('/users/auth', dados).then(response => {
            setResp(response.data)
        })
       
        if (resp[0] !== undefined) {
            localStorage.setItem("id", resp[0].id);
            localStorage.setItem("nome", resp[0].nome);
            localStorage.setItem("sobrenome", resp[0].sobrenome);
            localStorage.setItem("funcao", resp[0].funcao);
            handleLogin();
        }
        else{
            //alert('usuário não encontrado')
            setEmail('');
            setSenha('');
        }
    }

    return (
        <div id='login-page'>
            <div className="logo">
                <p><img src={logoImg} alt="" /></p>
            </div>
            <div className="login-main">
                <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                <form className='login-form'>
                    <fieldsetLogin>
                        <label>Login</label>
                        <input className='inputtextLogin' id='email' name='email' autoComplete='email' maxLength={255}  value={email} onChange={e => setEmail(e.target.value)} required />
                    </fieldsetLogin>
                    <br/>
                    <fieldsetLogin>    
                        <label>Senha</label>
                        <input className='inputtextLogin' id='senha' name='senha' type='password' autoComplete='current-senha' minLength={8} maxLength={255} value={senha} onChange={e => setSenha(e.target.value)} required />
                    </fieldsetLogin>
                </form>
                <p><input type="checkbox" /> mantenha-me conectado</p>
                <Link to="/Login">Esqueci a senha</Link>
                <p>------------------------------ou------------------------------</p>
                <p><img className="imagefloat" src={googleImg} alt="" /></p>
                <p><img className="imagefloat" src={facebookImg} alt="" /></p>
                <p><img className="imagefloat" src={twitterImg} alt="" /></p>
                
                <button className="button-Login" type='button' onClick={login}>
                    Enviar
                </button>
                
                <Link to="/CriarConta" className="register">
                    Criar uma conta
                </Link>
            </div>
        </div>
    )
}