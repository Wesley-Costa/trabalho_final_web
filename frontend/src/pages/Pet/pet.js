import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import './pet.css';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import MaterialTable from '@material-table/core';
import { localizationBR } from '../../components/localization';
import api from '../../services/api'

export default function Pet() {
    
    const [data, setData] = useState([]);

    const initPet = {
        id: '',
        raca: '',
        tamanho: '',
        nome: '',
        tipo: '',
        imagem: '',
        usuario_id: ''
    }
    const [pet, setPet] = useState(initPet);

    function onSubmit(ev) {
        ev.preventDefault();
        api.post('/pet/pesquisa', pet).then((response) => {
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
                <br />
                <label>Id</label><label1>Raça:</label1>
                <form onSubmit={onSubmit}>
                    <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={pet.id} />
                    <input class="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                    <label>Nome</label><label3>Tamanho</label3>
                    <input class="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                    <input class="inputtext" type="value" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
                    <br/>
                    <button class="confirm-button" type='submit'>
                        Pesquisar
                    </button>
                </form>
                <div className="actions">
                    <button className="confirm-button" onClick={limpar}>
                        Limpar
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
                        { title: 'Tamanho', field: 'status', align: 'center' },
                    ]}
                    data={ data }
                    options={{
                        actionsColumnIndex: -1,
                        toolbar:false,
                        paginationPosition: false,
                        headerStyle: {
                        backgroundColor: '#ACDBEB',
                        color: 'rgb(10, 41, 82)',
                        },
                        
                        columnsButton: true,
                        showFirstLastPageButtons: true,
                        grouping: false,
                    }}
                    actions={[
                        {
                        icon: FaPen,
                        tooltip: 'Editar Usuário',
                        onClick: (event, rowData) => alert("Ir para Editar ")
                        },
                        {
                        icon: FaSearch,
                        tooltip: 'Visualizar',
                        onClick: (event, rowData) => alert("ir para visualizar ")
                        },
                    ]}
                />
            </div>
        </div>
    )
}