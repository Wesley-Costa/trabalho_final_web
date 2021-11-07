import './editarUsuario.css';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import { FaSave, FaEraser } from 'react-icons/fa';
import api from '../../services/api'

export default function EditarUsuario() {

    const {id} = useParams()
    const history = useHistory();
    var date = new Date();

    const initUsuario = {
        email: '', 
        senha: '', 
        nome: '', 
        sobrenome: '', 
        telefone: '',  
        funcao: '', 
        dataCadastro: date.getDate(), 
        imagem: '', 
        status: 'Ativo'
    }
    const [user, setUser] = useState(initUsuario);

    useEffect(() => {
        if (id) {
            api.get(`/users/${id}`).then(response => {
                setUser(...response.data)
            })
        }
    }, []);

    function onSubmit(ev) {
        ev.preventDefault();
        api.put(`/users/${id}`, user).then((response) => {
            history.push('/Usuario')
        })
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
            <div id="main-editUsuario">
                <h2>Editar Perfil</h2>
                <form onSubmit={onSubmit}>
                    {/* <label>Imagem:</label><br/>
                    <input className="inputfile" type="file" name="imagem"/><br/><br/> */}
                    <label>E-mail*</label>
                    <input className="inputtext" type="char" name="email" id="email" onChange={onChange} value={user.email} />
                    <label>Nome*</label>
                    <input className="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={user.nome} />
                    <label>Sobrenome*</label>
                    <input className="inputtext" type="char" name="sobrenome" id="sobrenome" onChange={onChange} value={user.sobrenome} />
                    <label>Telefone*</label>
                    <input className="inputtext" type="char" name="telefone" id="telefone" onChange={onChange} value={user.telefone} />
                    <label>Função*</label><br/>
                    <select type="char" name="funcao" id="funcao" onChange={onChange} value={user.funcao} >
                        <option>Selecione</option>
                        <option>Gerente</option>
                        <option>Funcionário</option>
                        <option>Cliente</option>
                    </select><br/><br/><br/>
                    <button className="confirm-button" type='submit'><icon><FaSave/></icon>Salvar</button>
                </form>
                <div className="actions">
                    <button className="confirm-button" onClick={limpar}>
                        <icon><FaEraser/></icon>Limpar
                    </button>
                </div>
            </div>
        </div>
    )
}