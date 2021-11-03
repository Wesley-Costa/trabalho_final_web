import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import moment from 'moment';
import { FaSave, FaEraser } from 'react-icons/fa';
import api from '../../services/api'
import './fazerReserva.css';

export default function FazerReserva() {

    // const [data, setData] = useState([]);
    const history = useHistory();

    const initReserva = {
        id: '',
        proprietario: '',
        pet: '',
        inicio: '',
        fim: '',
        notas: '',
        status: 'Aguardando',
        valor: ''
    }
    const [reserva, setReserva] = useState(initReserva);

    const initConfig = {
        valorDiaria: '',
        vagas: ''
    }
    const [config, setConfig] = useState(initConfig);
    const idConfig = 'bd971c32';

    function onSubmit(ev) {
        ev.preventDefault();
        api.post('/reserva', reserva).then((response) => {
            // setData(response.data)
            history.push('/Home')
        })
    }
    
    function onChange(ev) {
        const { name, value } = ev.target;
        calcValorDiaria()
        setReserva({ ...reserva, [name]: value })
    }

    function limpar() {
        setReserva(initReserva);
    }

    function calcValorDiaria() {
        const now = moment(reserva.fim, "YYYY-MM-DD"); 
        const past = moment(reserva.inicio, "YYYY-MM-DD"); 
        const duration = moment.duration(now.diff(past));
        const days = duration.asDays();

        api.get(`/configuracao/${idConfig}`).then(response => {
            setConfig(...response.data)
        })
        console.log(reserva.fim)
        reserva.valor = parseInt(days) * parseFloat(config.valorDiaria)
    }

    return (
        <div>
            <User />
            <Menu />
            <div id="main-fazerReserva">
                <h2>Fazer Reserva</h2>
                <form onSubmit={onSubmit}>
                    <label>Pet*</label>
                    <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} /><br />
                    <label>Período*</label><br />
                    <input class="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                    <input class="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br /><br />
                    <label>Notas*</label>
                    <input class="inputnote" type="char" name="notas" id="notas" onChange={onChange} value={reserva.notas} /><br />
                    <label>Total das diárias*: R$ {reserva.valor}</label>
                    <br /><br /><br />
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