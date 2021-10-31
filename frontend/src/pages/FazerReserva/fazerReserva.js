import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import User from '../../components/user';
import './fazerReserva.css';

export default function FazerReserva() {
    
    const {id} = useParams()
    console.log(id)
    
    return (
        <div>
            <User />
            <Menu />
            <div >
                <br/>
                <strong>Fazer reserva</strong>
            </div>
        </div>
    )
}