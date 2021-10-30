import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import '../../styles/pages/reserva.css';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import MaterialTable from '@material-table/core';

import { localizationBR } from '../../components/localization';
import api from '../../services/api'

export default function Reserva() {

    const data = []

    const initReserva = {
        id: '',
        pet: '',
        inicio: '',
        fim: '',
        status: '',
        proprietario_id: '',
        valor: ''
    }
    const [reserva, setReserva] = useState(initReserva);

    function onSubmit(ev) {
        ev.preventDefault();
        api.post('/reserva/pesquisa', reserva).then((response) => {
            console.log(response.data)
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setReserva({ ...reserva, [name]: value })
    }

    function limpar() {
        setReserva(initReserva)
    }

    

    return (
        <div>
            <User />
            <Menu />
            <div id="main-reserva">
                <h2>Reservas</h2>
                <Link to="/Pet" className="new-button" >
                    <icon><FaPlus /></icon>Nova reserva
                </Link>
                <br />
                <br />
                <br />
                <label>Id</label><label1>Período:</label1>
                <form onSubmit={onSubmit}>
                    <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={reserva.id} />
                    <input class="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                    <input class="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} />

                    <label>Proprietário</label><label3>Total R$</label3>
                    <input class="inputtext" type="char" name="proprietario_id" id="proprietario_id" onChange={onChange} value={reserva.proprietario_id} />
                    <input class="inputtext" type="value" name="valor" id="valor" onChange={onChange} value={reserva.valor} />
                    <br/>
                    <label>Status</label><label2>Pet</label2>
                    <input class="inputtext" type="datalis" name="status" id="status" onChange={onChange} value={reserva.status} />
                    <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} />

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
            <div id="table-reserva">
                <MaterialTable
                    localization={localizationBR}
                    columns={[
                        { title: 'Id', field: 'id', align: 'center' },
                        { title: 'Pet', field: 'pet', align: 'center' },
                        { title: 'Chegada', field: 'inicio', type: 'date', align: 'center' },                             
                        { title: 'Partida', field: 'fim', type: 'date', align: 'center' },
                        { title: 'Status', field: 'status', align: 'center' },
                        { title: 'Total', field: 'valor', align: 'center' },
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