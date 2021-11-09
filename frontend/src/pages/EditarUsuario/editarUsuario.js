import './editarUsuario.css';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import { FaSave, FaEraser, FaTrash } from 'react-icons/fa';
import api from '../../services/api'

export default function EditarUsuario() {

    const { id } = useParams()
    const history = useHistory();
    var date = new Date();
    const [image, setImage] = useState('')
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

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

    async function handleDelete(id) {
        console.log(id)
        try {
            
            await api.delete(`/users/profile/delete/${id}`).then((response) => {
                history.push('/Usuario')
            })
        } catch (err) {
            alert('Erro ao deletar!!!');
        }
    }

    function onSubmit(ev) {
        ev.preventDefault();
        if(user.id === id){
            localStorage.setItem("nome", user.nome);
            localStorage.setItem("sobrenome", user.sobrenome);
        }
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

        api.put(`/users/${id}`, formData, headers).then((response) => {
            history.push('/Home')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setUser({ ...user, [name]: value })
    }

    function limpar() {
        setUser(initUsuario)
    }

    if (localStorage.getItem('funcao') === 'Gerente') {
        return (
            <div>
                <User />
                <Menu />
                <div id="main-editUsuario">
                    <h2>Editar Perfil</h2>
                    <form onSubmit={onSubmit}>
                        <label>Imagem:</label><br/>
                        <input className="inputfile" type="file" name="imagem" onChange={e => setImage(e.target.files[0])}/><br/><br/>
                        <label>E-mail*</label>
                        <input className="inputtext" type="char" name="email" id="email" onChange={onChange} value={user.email} />
                        <label>Nome*</label>
                        <input className="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={user.nome} />
                        <label>Sobrenome*</label>
                        <input className="inputtext" type="char" name="sobrenome" id="sobrenome" onChange={onChange} value={user.sobrenome} />
                        <label>Telefone*</label>
                        <input className="inputtext" type="char" name="telefone" id="telefone" onChange={onChange} value={user.telefone} />
                        <label>Senha*</label>
                        <input className="inputtext" type="password" name="senha" id="senha" onChange={onChange} value={user.senha} />
                        <label>Função*</label><br />
                        <select type="char" name="funcao" id="funcao" onChange={onChange} value={user.funcao} >
                            <option>Selecione</option>
                            <option>Gerente</option>
                            <option>Funcionário</option>
                            <option>Cliente</option>
                        </select><br /><br /><br />
                        <button className="confirm-button" type='submit'><icon><FaSave /></icon>Salvar</button>
                    </form>
                    <button className="confirm-button" onClick = {()=>handleDelete(id)}>
                        <icon><FaTrash /></icon>Deletar
                    </button>
                    <div className="actions">
                        <button className="confirm-button" onClick={limpar}>
                            <icon><FaEraser /></icon>Limpar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <User />
                <Menu />
                <div id="main-editUsuario">
                    <h2>Editar Perfil</h2>
                    <form onSubmit={onSubmit}>
                    <label>Imagem:</label><br/>
                        <input className="inputfile" type="file" name="imagem" onChange={e => setImage(e.target.files[0])}/><br/><br/>
                        <label>E-mail*</label>
                        <input className="inputtext" type="char" name="email" id="email" onChange={onChange} value={user.email} />
                        <label>Nome*</label>
                        <input className="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={user.nome} />
                        <label>Sobrenome*</label>
                        <input className="inputtext" type="char" name="sobrenome" id="sobrenome" onChange={onChange} value={user.sobrenome} />
                        <label>Telefone*</label>
                        <input className="inputtext" type="char" name="telefone" id="telefone" onChange={onChange} value={user.telefone} /><br />
                        <button className="confirm-button" type='submit'><icon><FaSave /></icon>Salvar</button>
                    </form>
                    <button className="confirm-button" onClick={handleDelete}>
                        <icon><FaTrash /></icon>Deletar
                    </button>
                    <div className="actions">
                        <button className="confirm-button" onClick={limpar}>
                            <icon><FaEraser /></icon>Limpar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}