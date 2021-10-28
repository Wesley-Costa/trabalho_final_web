import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import api from "../../services/api";
import '../../styles/pages/login.css';
import logoImg from '../../img/pet.jpg';
import googleImg from '../../img/google.png';
import facebookImg from '../../img/facebook.png';
import twitterImg from '../../img/twitter.png';
// import StoreContext from '../../components/Store/Context'

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
        const response = await api.get('/users/auth', user)
        if (response.status === 200) {
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("senha", response.data.senha);

            window.location.href = "/app";
            console.log(response)
            return { token: user.id }
        } else {
            alert("Usuário não encontrado!");
            console.log(response)
        }

    }

    // const { setToken } = useContext(StoreContext);
    // function onSubmit(event) {
    //     event.preventDefault();
    //     const token = login();

    //     if (token) {
    //         setToken(token);
    //         return history.push('/app');
    //     }
    //     setUser(initUser);
    // }

    return (
        <div id='container'>
            <div className="menu">
                <p><img src={logoImg} alt="" /></p>
            </div>
            <main>
                <div className="contents">
                    <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                    <form className='login-form' onSubmit={login}>
                        <fieldset>
                            <label>Login</label>
                            <input className='inputtext' id='email' name='email' onChange={onChange} autoComplete='email' maxLength={255} value={user.email} />
                            <label>Senha</label>
                            <input className='inputtext' id='senha' name='senha' type='password' onChange={onChange} autoComplete='current-senha' minLength={8} maxLength={255} value={user.senha} />
                        </fieldset>
                    </form>
                    <p><input type="checkbox" /> mantenha-me conectado</p>
                    <Link to="/">Esqueci a senha</Link>
                    <p>-----------------------------------ou-------------------------------------</p>
                    <p><img className="imagefloat" src={googleImg} alt="" /></p>
                    <p><img className="imagefloat" src={facebookImg} alt="" /></p>
                    <p><img className="imagefloat" src={twitterImg} alt="" /></p>
                    <form className='login-form' onSubmit={login}>
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