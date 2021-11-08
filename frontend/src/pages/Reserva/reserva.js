import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import './reserva.css';
import { FaPen, FaPlus, FaSearch, FaEraser, FaEye } from 'react-icons/fa';
import MaterialTable from '@material-table/core';
import { localizationBR } from '../../components/localization';
import api from '../../services/api'

export default function Reserva() {

    const [data, setData] = useState([]);
    const history = useHistory();

    const initReserva = {
        id: '',
        proprietario: '',
        pet: '',
        inicio: '',
        fim: '',
        status: '',
        valor: ''
    }
    const [reserva, setReserva] = useState(initReserva);

    function onSubmit(ev) {
        ev.preventDefault();
        api.post('/reserva/pesquisa', reserva).then((response) => {
            setData(response.data)
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setReserva({ ...reserva, [name]: value })
    }

    function limpar() {
        setReserva(initReserva)
        setData([])
    }

    if(localStorage.getItem('funcao') === 'Cliente'){
        const nome = localStorage.getItem('nome');
        reserva.proprietario = nome;
       
        return (
            <div>
                <User />
                <Menu />
                <div id="main-reserva">
                    <h2>Reservas</h2>
                    <Link to="/FazerReserva" className="new-button" >
                        <icon><FaPlus /></icon>Nova reserva
                    </Link>
                    <br />
                    <br />
                    <label>Id:</label><label1>Período:</label1>
                    <form onSubmit={onSubmit}>
                        <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={reserva.id} />
                        <input class="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                        <input class="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br/><br/>
                        <label>Status:</label><label2>Pet:</label2>
                        <input class="inputtext" type="datalis" name="status" id="status" onChange={onChange} value={reserva.status} />
                        <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} /><br/><br/>
                        <label>Total R$</label><br/>
                        <input class="inputtext" type="value" name="valor" id="valor" onChange={onChange} value={reserva.valor} /><br/>
                        <br/><button class="confirm-button" type='submit'>
                            <icon><FaSearch/></icon>Pesquisar
                        </button>
                    </form>
                    <div className="actions">
                        <button className="confirm-button" onClick={limpar}>
                            <icon><FaEraser/></icon>Limpar
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
                            backgroundColor: '#194759',
                            color: '#FFFF',
                            },
                            
                            columnsButton: true,
                            showFirstLastPageButtons: true,
                            grouping: false,
                        }}
                        actions={[
                            rowData => ({
                                icon: FaPen,
                                tooltip: 'Editar Reserva',
                                onClick: (event, rowData) => (history.push(`/EditarReserva/${rowData.id}`)),
                                disabled: rowData.status === 'Finalizada'
                            }),
                            {
                                icon: FaEye,
                                tooltip: 'Visualizar',
                                onClick: (event, rowData) => history.push(`/VerReserva/${rowData.id}`)
                            }
                        ]}
                    />
                </div>
            </div>
        )
    }
    else if(localStorage.getItem('funcao') === 'Funcionário'){
        return (
            <div>
                <User />
                <Menu />
                <div id="main-reserva">
                    <h2>Reservas</h2>
                    <Link to="/FazerReserva" className="new-button" >
                        <icon><FaPlus /></icon>Nova reserva
                    </Link>
                    <br />
                    <br />
                    <label>Id:</label><label1>Período:</label1>
                    <form onSubmit={onSubmit}>
                        <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={reserva.id} />
                        <input class="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                        <input class="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br/><br/>
                        <label>Proprietário:</label><label3>Total R$</label3>
                        <input class="inputtext" type="char" name="proprietario" id="proprietario" onChange={onChange} value={reserva.proprietario} />
                        <input class="inputtext" type="value" name="valor" id="valor" onChange={onChange} value={reserva.valor} />
                        <br/>
                        <label>Status:</label><label2>Pet:</label2>
                        <input class="inputtext" type="datalis" name="status" id="status" onChange={onChange} value={reserva.status} />
                        <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} />
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
                            headerStyle: {
                            backgroundColor: '#194759',
                            color: '#FFFF',
                            },
                            
                            columnsButton: true,
                            showFirstLastPageButtons: true,
                            grouping: false,
                        }}
                        actions={[
                            rowData => ({
                                icon: FaPen,
                                tooltip: 'Editar Reserva',
                                onClick: (event, rowData) => (history.push(`/EditarReserva/${rowData.id}`)),
                                disabled: rowData.status === 'Finalizada'
                            }),
                            {
                                icon: FaEye,
                                tooltip: 'Visualizar',
                                onClick: (event, rowData) => history.push(`/VerReserva/${rowData.id}`)
                            }
                        ]}
                    />
                </div>
            </div>
        )
    }
    else if(localStorage.getItem('funcao') === 'Gerente'){
        return (
            <div>
                <User />
                <Menu />
                <div id="main-reserva">
                    <h2>Reservas</h2>
                    <Link to="/FazerReserva" className="new-button" >
                        <icon><FaPlus /></icon>Nova reserva
                    </Link>
                    <br />
                    <br />
                    <label>Id:</label><label1>Período:</label1>
                    <form onSubmit={onSubmit}>
                        <input class="inputtext" type="char" name="id" id="id" onChange={onChange} value={reserva.id} />
                        <input class="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                        <input class="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br/><br/>
                        <label>Proprietário:</label><label3>Total R$</label3>
                        <input class="inputtext" type="char" name="proprietario" id="proprietario" onChange={onChange} value={reserva.proprietario} />
                        <input class="inputtext" type="value" name="valor" id="valor" onChange={onChange} value={reserva.valor} />
                        <br/>
                        <label>Status:</label><label2>Pet:</label2>
                        <input class="inputtext" type="datalis" name="status" id="status" onChange={onChange} value={reserva.status} />
                        <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} />
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
                            tooltip: 'Editar Reserva',
                            onClick: (event, rowData) => (history.push(`/EditarReserva/${rowData.id}`)),
                            },
                            {
                                icon: FaEye,
                                tooltip: 'Visualizar',
                                onClick: (event, rowData) => history.push(`/VerReserva/${rowData.id}`)
                            }
                        ]}
                    />
                </div>
            </div>
        )
    }
}