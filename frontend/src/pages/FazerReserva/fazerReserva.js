import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import moment from 'moment';
import { FaSave, FaEraser } from 'react-icons/fa';
import api from '../../services/api'
import './fazerReserva.css';

export default function FazerReserva() {

    const [data, setData] = useState([]);
    const history = useHistory();

    const initReserva = {
        id: '',
        proprietario: '',
        pet: '',
        inicio: '',
        fim: '',
        notas: '',
        status: '',
        valor: ''
    }
    const [reserva, setReserva] = useState(initReserva);

    function onSubmit(ev) {
        ev.preventDefault();
        api.post('/reserva', reserva).then((response) => {
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
    }
    
    //VER COMO FAZER ISSO
    
         //Cálculo da quantidade de dias da reserva para caucular valor Total
         const now = moment(reserva.fim); // Data
         const past = moment(reserva.inicio); // Outra data no passado
         const duration = moment.duration(now.diff(past));
         // Mostra a diferença em dias
         const days = duration.asDays();
         console.log(days)
         //PEGAR A QUANTIDADE DE DIAS E O VALOR DA DIÁRIA DO BANCO DE DADOS, PARA RETORNAR O VALOR
        
    

    return (
        <div>
            <User />
            <Menu />
            <div id="main-fazerReserva">
                <h2>Fazer Reserva</h2>
                <form onSubmit={onSubmit}>
                    <label>Pet*</label>
                    <input class="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} /><br/>
                    <label>Período*</label><br/>
                    <input class="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                    <input class="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br/><br/>
                    <label>Notas*</label>
                    <input class="inputnote" type="char" name="notas" id="notas" onChange={onChange} value={reserva.notas} /><br/>
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