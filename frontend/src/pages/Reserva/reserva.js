import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/menu';
import User from '../../components/user';
import '../../styles/pages/reserva.css';
import { FaPlus } from 'react-icons/fa';
import api from '../../services/api'

export default function Reserva() {

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
    // const history = useHistory()

    // useEffect(() => {
    //     if (id) {
    //         api.get(`/configuracao/${id}`).then(response => {
    //             setConfig(...response.data)
    //         })
    //     }
    // }, [id]);

    function onSubmit(ev, ind) {
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
        </div>
    )
}