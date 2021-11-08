import './editarReserva.css';
import Menu from '../../components/menu';
import User from '../../components/user';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { FaSave, FaEraser, FaTrash } from 'react-icons/fa';
import api from '../../services/api'

export default function EditarReserva() {
    
    const {id} = useParams()
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
    const initConfig = {
        valorDiaria: '',
        vagas: ''
    }
    const [config, setConfig] = useState(initConfig);
    const idConfig = 'bd971c32';

    useEffect(() => {
        if (id) {
            api.get(`/reserva/profile/${id}`).then(response => {
                setReserva(...response.data)
            })
        }
    }, []);

    async function handleDelete(id){
        try{
            await api.delete(`/reserva/${id}`).then((response)=>{
                history.push('/Home')
            })
        }catch(err){
            alert('Erro ao deletar!!!');
        }
    }

    function onSubmit(ev) {
        ev.preventDefault();
        api.put(`/reserva/${id}`, reserva).then((response) => {
            history.push('/Home')
        })
    }

    function onChange(ev) {
        calcValorDiaria()
        const { name, value } = ev.target;
        setReserva({ ...reserva, [name]: value })
    }

    function limpar() {
        setReserva(initReserva)
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

    return (
        <div>
            <User />
            <Menu />
            <div id="main-editarReserva">
                <h2>Editar Reserva</h2>
                <form onSubmit={onSubmit}>
                    <label>Proprietário*</label>
                    <input className="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.proprietario} />
                    <label>Pet*</label>
                    <input className="inputtext" type="char" name="pet" id="pet" onChange={onChange} value={reserva.pet} />
                    <label>Período*</label><br/>
                    <input className="inputdate" type="date" name="inicio" id="inicio" onChange={onChange} value={reserva.inicio} />
                    <input className="inputdate" type="date" name="fim" id="fim" onChange={onChange} value={reserva.fim} /><br/><br/>
                    <label>Notas*</label>
                    <input className="inputnote" type="char" name="notas" id="notas" onChange={onChange} value={reserva.notas} />
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
                    <button className="confirm-button" onClick={handleDelete}>
                            <icon><FaTrash/></icon>Deletar
                    </button>
                    <button className="confirm-button" onClick={limpar}>
                        <icon><FaEraser/></icon>Limpar
                    </button>
                </div>
            </div>
        </div>
    )

}