import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/menu';
import User from '../../components/user';
import '../../styles/pages/reserva.css';
import { FaPlus} from 'react-icons/fa';

export default function Reserva() {
    
    
    
    return (
        <div>
            <User />
            <Menu />
            <div id = "main-reserva">
                <h2>Reservas</h2>
                <Link to="/Pet" className="new-button" >
                    <icon><FaPlus/></icon>Nova reserva
                </Link> 
                <br/>
                <br/>
                <br/>
                <label>Id</label><label1>Período:</label1>
                <form action="">
                    <input class="inputtext" type="char" name="" id="" value=""/>
                </form>
                <form-inline action="">
                    <input class="inputdate" type="date" name="" id="" value=""/>
                </form-inline>
                <form-inline action="">
                    <input class="inputdate" type="date" name="" id="" value=""/>
                </form-inline>
                <label>Proprietário</label><label3>Total R$</label3>
                <form action="">
                    <input class="inputtext" type="char" name="" id="" value=""/>
                </form>
                <form-inline action="">
                    <input class="inputtext" type="value" name="" id="" value=""/>
                </form-inline>
                <label>Status</label><label2>Pet</label2>
                <form action="">
                    <input class="inputtext" type="datalis" name="" id="" value=""/>
                </form>
                <form-inline action="">
                    <input class="inputtext" type="char" name="" id="" value=""/>
                </form-inline>
                <form action="">
                    <input class="confirm-button" type='submit' value="Pesquisar" formaction=""/>
                </form>
                <form action="">
                    <input class="confirm-button" type='submit' value="Limpar" formaction=""/>
                </form>
            </div>
        </div>
    )
}