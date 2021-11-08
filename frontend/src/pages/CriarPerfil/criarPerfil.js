import './criarPerfil.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import { FaSave, FaEraser } from 'react-icons/fa';
import api from '../../services/api';

export default function CriarPerfil() {

    const history = useHistory();
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano4 = date.getFullYear();
    const [image, setImage] = useState('')
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const initUsuario = {
        id: '',
        email: '',
        senha: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        funcao: '',
        dataCadastro: dia + '/' + (mes + 1) + '/' + ano4,
        status: 'Ativo'
    }
    const [user, setUser] = useState(initUsuario);

    function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('email', user.email);
        formData.append('senha', user.senha);
        formData.append('nome', user.nome);
        formData.append('sobrenome', user.sobrenome);
        formData.append('telefone', user.telefone);
        formData.append('funcao', user.funcao);
        formData.append('dataCadastro', user.dataCadastro);
        formData.append('status', user.status);

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        api.post('/users', formData, headers).then((response) => {
            history.push('/Usuario')
            console.log(response)
        })
        // .then((response) => {
        //     setStatus({
        //         type: 'success',
        //         mensagem: response.data.mensagem
        //     });
        // }).catch((err) => {
        //     if (err.response) {
        //         setStatus({
        //             type: 'error',
        //             mensagem: err.response.data.mensagem
        //         });
        //     } else {
        //         setStatus({
        //             type: 'error',
        //             mensagem: "Erro: Tente mais tarde!"
        //         });
        //     }
        // });
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setUser({ ...user, [name]: value })
    }

    function limpar() {
        setUser(initUsuario)
    }

    return (
        <div>
            <User />
            <Menu />
            <div id="main-criarConta">
                <h2>Criar Perfil</h2>
                <form onSubmit={onSubmit}>
                    <label>Imagem:</label><br />
                    <input className="inputfile" type="file" name="imagem" onChange={e => setImage(e.target.files[0])} /><br /><br />
                    <label>E-mail*</label>
                    <input className="inputtext" type="char" name="email" id="email" onChange={onChange} value={user.email} />
                    <label>Nome*</label>
                    <input className="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={user.nome} />
                    <label>Sobrenome*</label>
                    <input className="inputtext" type="char" name="sobrenome" id="sobrenome" onChange={onChange} value={user.sobrenome} />
                    <label>Telefone*</label>
                    <input className="inputtext" type="char" name="telefone" id="telefone" onChange={onChange} value={user.telefone} />
                    <label>Função*</label><br />
                    <select type="char" name="funcao" id="funcao" onChange={onChange} value={user.funcao} >
                        <option>Selecione</option>
                        <option>Gerente</option>
                        <option>Funcionário</option>
                        <option>Cliente</option>
                    </select><br /><br /><br />
                    <button className="confirm-button" type='submit'><icon><FaSave /></icon>Salvar</button>
                </form>
                <div className="actions">
                    <button className="confirm-button" onClick={limpar}>
                        <icon><FaEraser /></icon>Limpar
                    </button>
                </div>
            </div>
        </div>
    )

}