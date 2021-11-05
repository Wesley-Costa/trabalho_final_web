import React, { useState, useContext } from 'react';
import { Context } from '../../context/authContext';
import { Link , useHistory} from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import './login.css';
import api from '../../services/api';
import logoImg from '../../img/pet.jpg';
import googleImg from '../../img/google.png';
import facebookImg from '../../img/facebook.png';
import twitterImg from '../../img/twitter.png';

export default function Login() {
    const history =  useHistory();
    const { handleLogin } = useContext(Context);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    async function login(e){
        e.preventDefault();
        const dados = {email, senha};
        
        //api.post(`/users/authenticate`, dados).then(response => {
        //    console.log(response.data);
        //})
        
        const response = api.post(`/users/authenticate`, dados)
        console.log(response.data);
        if (response.status === 200) {
            localStorage.setItem("nome", response.data.nome);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("funcao", response.data.funcao);
            handleLogin();
        }else{
            alert("Usuário não encontrado!");
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