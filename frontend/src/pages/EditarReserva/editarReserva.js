import './editarReserva.css';
import Menu from '../../components/menu';
import User from '../../components/user';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment';
import { FaSave, FaEraser } from 'react-icons/fa';
import api from '../../services/api'

export default function EditarReserva() {
    
    const {id} = useParams()
    console.log(id)

    const [data, setData] = useState([]);
    const history = useHistory();

    const initReserva = {
        proprietario: '',
        pet: '',
        inicio: '',
        fim: '',
        notas: '',
        status: '',
        valor: ''
    }
    const [reserva, setReserva] = useState(initReserva);

    useEffect(() => {
        if (id) {
            api.get(`/reserva/profile/${id}`).then(response => {
                setReserva(...response.data)
            })
        }
    }, []);

    function onSubmit(ev) {
        ev.preventDefault();
        api.put(`/reserva/${id}`, reserva).then((response) => {
            setData(response.data)
            history.push('/Home')
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

    return (
        <div>
            <User />
            <Menu />
            <div id="main-editarReserva">
                <h2>Editar Reserva</h2>
                <form onSubmit={onSubmit}>
                    <label>Proprietário*</label>
                    <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.proprietario} />
                    <label>Pet*</label>
                    <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} />
                    <label>Período*</label><br/>
                    <input class="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                    <input class="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br/><br/>
                    <label>Notas*</label>
                    <input class="inputnote" type="char" name="notas" id="notas" onChange={onChange} value={reserva.notas} />
                    <label>Status*</label><br/>
                    <select type="char" name="status" id="status" onChange={onChange} value={reserva.status} >
                        <option>Selecione</option>
                        <option>Reservado</option>
                        <option>Em andamento</option>
                        <option>Cancelada</option>
                        <option>Finalizada</option>
                    </select><br/><br/><br/>
                    <label>Total das diárias*: R$ {reserva.valor}</label>
                    <br/><br/><br/>
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