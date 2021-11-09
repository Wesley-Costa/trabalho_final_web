import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import './pet.css';
import { FaPen, FaPlus, FaSearch, FaEraser, FaEye } from 'react-icons/fa';
import MaterialTable from '@material-table/core';
import { localizationBR } from '../../components/localization';
import api from '../../services/api'

export default function Pet() {
    
    const [data, setData] = useState([]);
    const history = useHistory();
    const UserId = localStorage.getItem('id');

    const initPet = {
        id: '',
        raca: '',
        tamanho: '',
        nome: '',
        usuario_id: '',
    }

    const [pet, setPet] = useState(initPet);

    function onSubmit(ev) {
        ev.preventDefault();
        
        api.post('/pets/pesquisa', pet).then((response) => {
            setData(response.data)
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setPet({ ...pet, [name]: value })
    }

    function limpar() {
        setPet(initPet)
        setData([])
    }
    
    if(localStorage.getItem('funcao') === 'Cliente'){
        const id = localStorage.getItem('id');
        pet.usuario_id = id;
        return (
            <div>
                <User />
                <Menu />
                <div id="main-pet">
                    <h2>Pets</h2>
                    <Link to="/cadastrarPet" className="new-button" >
                        <icon><FaPlus /></icon>Novo Pet
                    </Link>
                    <br />
                    <br />
                    <label>Id:</label><label1>Raça:</label1>
                    <form onSubmit={onSubmit}>
                        <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={pet.id} />
                        <input class="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                        <label>Nome:</label><label3>Tamanho:</label3>
                        <input class="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                        <input class="inputtext" type="char" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
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
                <div id="table-pet">
                    <MaterialTable
                        localization={localizationBR}
                        columns={[
                            { title: 'Id', field: 'id', align: 'center' },
                            { title: 'Nome', field: 'nome', align: 'center' },
                            { title: 'Tipo', field: 'tipo', align: 'center' },                             
                            { title: 'Raça', field: 'raca', align: 'center' },
                            { title: 'Tamanho', field: 'tamanho', align: 'center' },
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
                        actions={[
                            {
                            icon: FaPen,
                            tooltip: 'Editar Pet',
                            onClick: (event, rowData) => history.push(`/EditarPet/${rowData.id}`)
                            },
                            {
                            icon: FaEye,
                            tooltip: 'Visualizar',
                            onClick: (event, rowData) => history.push(`/VisualizarPet/${rowData.id}`)
                            },
                        ]}
                    />
                </div>
            </div>
        )
    }
    else{
        return (
            <div>
                <User />
                <Menu />
                <div id="main-pet">
                    <h2>Pets</h2>
                    <Link to="/cadastrarPet" className="new-button" >
                        <icon><FaPlus /></icon>Novo Pet
                    </Link>
                    <br />
                    <br />
                    <label>Id:</label><label1>Raça:</label1>
                    <form onSubmit={onSubmit}>
                        <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={pet.id} />
                        <input class="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                        <label>Nome:</label><label3>Tamanho:</label3>
                        <input class="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                        <input class="inputtext" type="char" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
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
                <div id="table-pet">
                    <MaterialTable
                        localization={localizationBR}
                        columns={[
                            { title: 'Id', field: 'id', align: 'center' },
                            { title: 'Nome', field: 'nome', align: 'center' },
                            { title: 'Tipo', field: 'tipo', align: 'center' },                             
                            { title: 'Raça', field: 'raca', align: 'center' },
                            { title: 'Tamanho', field: 'tamanho', align: 'center' },
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
                        actions={[
                            {
                            icon: FaPen,
                            tooltip: 'Editar Pet',
                            onClick: (event, rowData) => history.push(`/EditarPet/${rowData.id}`)
                            },
                            {
                            icon: FaEye,
                            tooltip: 'Visualizar',
                            onClick: (event, rowData) => history.push(`/VisualizarPet/${rowData.id}`)
                            },
                        ]}
                    />
                </div>
            </div>
        )
    }
}