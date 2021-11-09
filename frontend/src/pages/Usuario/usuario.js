import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import './usuario.css';
import { FaCheck, FaPen, FaUserMinus, FaSearch, FaUserPlus, FaEraser, FaEye } from 'react-icons/fa';
import MaterialTable from '@material-table/core';
import { localizationBR } from '../../components/localization';
import api from '../../services/api';

export default function Usuario() {
    
    const [data, setData] = useState([]);
    const history = useHistory();

    const initUsuario = {
        id: '',
        email: '', 
        senha: '', 
        nome: '', 
        sobrenome: '', 
        telefone: '',  
        funcao: '', 
        dataCadastro: '', 
        imagem: '', 
        status: ''
    }
    const [user, setUser] = useState(initUsuario);

    function onSubmit(ev) {
        ev.preventDefault();
        api.post('/users/pesquisa', user).then((response) => {
            setData(response.data)
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setUser({ ...user, [name]: value })

    }

    function limpar() {
        setUser(initUsuario)
        setData([])
    }
    
    return (
        <div>
            <User />
            <Menu />
            <div id="main-usuario">
                <h2>Usuários</h2>
                <Link to="/CriarPerfil"  className="new-button" >
                    <icon><FaUserPlus /></icon>Novo
                </Link>
                <button class="new-button" type='submit'> <icon><FaUserMinus /></icon> Remover</button>
                <button class="new-button" type='submit'><icon><FaCheck /></icon> Mudar Status</button>
                <br />
                <div id="select-button">
                <label>Visualizar por: </label>
                <button class="select-button" type='submit'>Usuários</button>
                <button class="select-button" type='submit'>Função</button>
                </div>
                <br />
                <br />
                <label>Id:</label><label1>Criado em:</label1>
                <form onSubmit={onSubmit}>
                    <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={user.id} />
                    <input class="inputdate" type="date" name="dataCadastro" id="dataCadastro" onChange={onChange} value={user.dataCadastro} />
                    <br/>
                    <label>Nome:</label><label3>E-mail:</label3>
                    <input class="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={user.nome} />
                    <input class="inputtext" type="char" name="email" id="email" onChange={onChange} value={user.email} />
                    <br/>
                    <label>Status:</label><label4>Função:</label4>
                    <br/>
                    <select type="char" name="status" id="status" onChange={onChange} value={user.status} >
                        <option>Selecione</option>
                        <option>Ativo</option>
                        <option>Intivo</option>
                    </select>
                    <select type="char" name="funcao" id="funcao" onChange={onChange} value={user.funcao} >
                        <option>Selecione</option>
                        <option>Gerente</option>
                        <option>Funcionário</option>
                        <option>Cliente</option>
                    </select>
                    <br/>
                    <button class="confirm-button" type='submit'>
                        <icon><FaSearch/></icon>Pesquisar
                    </button>
                </form>
                <div className="actions">
                    <button className="confirm-button" onClick={limpar}>
                        <icon><FaEraser/></icon>Limpar
                    </button>
                </div>
            </div>
            <div id="table-usuario">
                <MaterialTable
                    localization={localizationBR}
                    columns={[
                        { 
                            title: 'Foto',
                            field: 'imagem',
                            render: rowData => (
                                <img
                                    style={{ height: 36, borderRadius: '50%' }}
                                    src ={`http://localhost:3001/files/${rowData.imagem}`}
                                    alt = "" 
                                />
                            ),
                        },
                        { title: 'E-mail', field: 'email', align: 'center' },
                        { title: 'Nome', field: 'nome', align: 'center' },                             
                        { title: 'Função', field: 'funcao', align: 'center' },
                        { title: 'Status', field: 'status', align: 'center' },
                        { title: 'Criado em', field: 'dataCadastro', align: 'center' },
                    ]}
                    data={ data }
                    options={{
                        actionsColumnIndex: -1,
                        toolbar:false,
                        headerStyle: {
                        backgroundColor: '#194759',
                        color: '#FFFF',
                        },
                        
                        columnsButton: true,
                        showFirstLastPageButtons: true,
                        grouping: false,
                    }}
                    //options={{
                    //    selection: true
                    //}}
                    actions={[
                        {
                        icon: FaPen,
                        tooltip: 'Editar Usuário',
                        onClick: (event, rowData) => history.push(`/EditarUsuario/${rowData.id}`)
                        },
                        {
                        icon: FaEye,
                        tooltip: 'Visualizar',
                        },
                    ]}
                />
            </div>
        </div>
    )
}