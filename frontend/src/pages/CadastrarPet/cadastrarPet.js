import './cadastrarPet.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSave, FaEraser } from 'react-icons/fa';
import Menu from '../../components/menu';
import User from '../../components/user';
import api from '../../services/api'

export default function CadastrarPet() {
    
    const history = useHistory();

    const initPet = {
        id: '',
        raca: '',
        tamanho: '',
        nome: '',
        tipo: '',
        usuario_id: '',
        imagem: '',
    }
    const [pet, setPet] = useState(initPet);

    function onSubmit(ev) {
        ev.preventDefault();
        

        api.post('/pets', pet).then((response) => {
            history.push('/Pet')
        })
    }

    function onChange(ev) {
        console.log(document.getElementById("image"))
        console.log(pet.imagem)
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
            <div id="main-cadastrarPet">
                <h2>Cadastrar Pet</h2>
                <form onSubmit={onSubmit}>
                    <label>Imagem:</label><br/>
                    <input className="inputfile" type="file" name="imagem" onChange={onChange} value={pet.imagem}/><br/><br/>
                    <label>Proprietário*</label>
                    <input class="inputtext" type="char" name="usuario_id" id="usuario_id" onChange={onChange} value={pet.usuario_id} />
                    <label>Nome*</label>
                    <input class="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                    <label>Raça*</label>
                    <input class="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                    <label>Tipo*</label>
                    <input class="inputtext" type="char" name="tipo" id="tipo" onChange={onChange} value={pet.tipo} />
                    <label>Tamanho*</label>
                    <input class="inputtext" type="char" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
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