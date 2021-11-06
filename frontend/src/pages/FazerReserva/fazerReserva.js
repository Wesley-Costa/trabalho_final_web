import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import { FaSave, FaEraser } from 'react-icons/fa';
import api from '../../services/api'
import './fazerReserva.css';

export default function FazerReserva() {

    const history = useHistory();
    const [data, setData] = useState('');

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
            history.push('/Home')
        })
    }
    
    function onChange(ev) {
        calcValorDiaria()
        const { name, value } = ev.target;
        setReserva({ ...reserva, [name]: value })
    }

    function limpar() {
        setReserva(initReserva);
    }

    function calcValorDiaria() {
        var fim = new Date(document.getElementById("fim").value);
        var inicio = new Date(document.getElementById("inicio").value);
        var diff = Math.abs(fim - inicio);
        var days = diff/(1000 * 3600 * 24)

        api.get(`/configuracao/${idConfig}`).then(response => {
            setConfig(...response.data)
        })
        
        reserva.valor = parseInt(days) * parseFloat(config.valorDiaria)
    }
    if(localStorage.getItem('funcao') === 'cliente'){
        return (
            <div>
                <User />
                <Menu />
                <div id="main-fazerReserva">
                    <h2>Fazer Reserva</h2>
                    <form onSubmit={onSubmit}>
                        <label>Proprietário*</label>
                        <input className="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} /><br />
                        <label>Pet*</label>
                        <input className="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} /><br />
                        <label>Período*</label><br />
                        <input className="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                        <input className="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br /><br />
                        <label>Notas*</label>
                        <input className="inputnote" type="char" name="notas" id="notas" onChange={onChange} value={reserva.notas} /><br />
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
    else{
        
        const nome = localStorage.getItem('nome');
        const UserId = localStorage.getItem('id');
        api.post('/pets/pesquisa', UserId).then(response=>{
            setData(response.data);
            console.log(data)
        })
        const pet = data.pet;

        return (
            <div>
                <User />
                <Menu />
                <div id="main-fazerReserva">
                    <h2>Fazer Reserva</h2>
                    <form onSubmit={onSubmit}>
                        <label>Proprietário*</label>
                        <input className="inputtext" type="char" name="proprietario" id="proprietario" onChange={onChange} value={nome} /><br />
                        <label>Pet*</label>
                        <input className="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={pet} /><br />
                        <label>Período*</label><br />
                        <input className="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                        <input className="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br /><br />
                        <label>Notas*</label>
                        <input className="inputnote" type="char" name="notas" id="notas" onChange={onChange} value={reserva.notas} /><br />
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
}