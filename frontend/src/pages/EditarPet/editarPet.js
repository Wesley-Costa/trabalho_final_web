import './editarPet.css';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import User from '../../components/user';
import api from '../../services/api'

export default function EditarPet() {
    
    const history = useHistory();
    const {id} = useParams();
    console.log(id)

    const initPet = {
        raca: '',
        tamanho: '',
        nome: '',
        tipo: '',
    }

    const [pet, setPet] = useState(initPet);

   useEffect(() => {
       if (id) {
           api.get(`/pets/profile/${id}`).then(response => {
               console.log(response.data)
               setPet(...response.data)
           })
       }
   }, []);
    
    function onSubmit(ev) {
        ev.preventDefault();
        api.put(`/pets/${id}`, pet).then((response)=>{
            history.push('/Pet')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setPet({ ...pet, [name]: value })
    }

    function limpar() {
        setPet(initPet)
    }
    
    return (
        <div>
            <User />
            <Menu />
            <div id="main-editarPet">
                <h2>Editar Pet</h2>
                <form onSubmit={onSubmit}>
                    <label>Nome*</label>
                    <input className="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                    <label>Raça*</label>
                    <input className="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                    <label>Tipo*</label>
                    <input className="inputtext" type="char" name="tipo" id="tipo" onChange={onChange} value={pet.tipo} />
                    <label>Tamanho*</label>
                    <input className="inputtext" type="char" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
                    <button className="confirm-button" type='submit' >
                        Salvar
                    </button>
                </form>
                <div className="actions">
                    <button className="confirm-button" onClick={limpar}>
                        Limpar
                    </button>
                </div>
            
                <div id="image">
                    <label>Imagem</label>
                    <img class="imagephoto" src="../img/image.png" alt=""></img>
                </div>
            </div>
        </div>
    )

}