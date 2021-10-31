import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/user.css';
import { FaUser } from 'react-icons/fa';

export default function User(){
   
    return(
       
        <user>
            <Link to="/EditarUsuario" className="user-button">
                <icon><FaUser/></icon> Usuário
            </Link>
        </user>
            
    ); 
}