import './criarConta.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logoImg from '../../img/pet.jpg';
import api from '../../services/api'

export default function CriarConta() {
    const history = useHistory();
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano4 = date.getFullYear();

    const initUsuario = {
        email: '', 
        senha: '', 
        nome: '', 
        sobrenome: '', 
        telefone: '',  
        funcao: 'Cliente', 
        dataCadastro: dia + '/' + (mes+1) + '/' + ano4, 
        imagem: '', 
        status: 'Ativo'
    }
    const [user, setUser] = useState(initUsuario);

    function onSubmit(ev) {
        ev.preventDefault();
        api.post('/users', user).then((response) => {
            history.push('/Usuario')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setUser({ ...user, [name]: value })
    }

    return (
        <div>
            <div id='register-page'>
                <div className="logo">
                    <p><img src={logoImg} alt="" /></p>
                </div>
                <div className="register-main">
                    <h1><icon><FaPaw /></icon> Hotel Pet</h1>
                    <form className='register-form' onSubmit={onSubmit}>
                        <fieldsetLogin>
                            <label>Login(email)</label><br/>
                            <input className='inputtextRegister' id='email' name='email' autoComplete='email' onChange={onChange} value={user.email} required /><br/>   
                            <label>Senha</label><br/>
                            <input className='inputtextRegister' id='senha' name='senha' type='password' autoComplete='senha' minLength={8} onChange={onChange} value={user.senha} required /><br/>
                            <label>Nome</label><br/>
                            <input className='inputtextRegister' id='nome' name='nome' type='nome' autoComplete='nome' onChange={onChange} value={user.nome} required /><br/>
                            <label>Sobrenome</label><br/>
                            <input className='inputtextRegister' id='sobrenome' name='sobrenome' type='sobrenome' autoComplete='sobrenome' onChange={onChange} value={user.sobrenome} required /><br/>
                            <label>Telefone</label><br/>
                            <input className='inputtextRegister' id='telefone' name='telefone' type='telefone' autoComplete='telefone' minLength={11} onChange={onChange} value={user.telefone} required /><br/>
                        </fieldsetLogin>
                        <button className="button-Register" type='submit'>
                            Criar Conta
                        </button>
                    </form>
                    <Link to="/" className="register">
                        Já tem uma conta? Login
                    </Link>
                </div>
            </div>
        </div>
    )

}