import './editarPet.css';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import User from '../../components/user';
import api from '../../services/api'
import { FaEraser, FaSave, FaTrash } from 'react-icons/fa';

export default function EditarPet() {

    const history = useHistory();
    const { id } = useParams();
    const [image, setImage] = useState('')

    const initPet = {
        raca: '',
        tamanho: '',
        nome: '',
        tipo: ''
    }

    const [pet, setPet] = useState([initPet]);

    useEffect(() => {
        if (id) {
            api.get(`/pets/profile/${id}`).then(response => {
                setPet(...response.data)
            })
        }
    }, []);

    function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('nome', pet.nome);
        formData.append('raca', pet.raca);
        formData.append('tamanho', pet.tamanho);
        formData.append('tipo', pet.tipo);
        formData.append('usuario_id', pet.usuario_id);

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        api.put(`/pets/${id}`, formData, headers).then((response) => {
            history.push('/Pet')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setPet({ ...pet, [name]: value })
    }

    async function handleDelete(id) {
        try {
            if (id) {
                await api.delete(`/pets/profile/delete/${id}`).then((response) => {
                    history.push('/Pet');
                })
            }
        } catch (err) {
            alert('Erro ao deletar!!!');
        }
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
                    <label>Imagem:</label><br />
                    <input className="inputfile" type="file" name="imagem" onChange={e => setImage(e.target.files[0])} /><br /><br />
                    <label>Nome*</label>
                    <input className="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                    <label>Raça*</label>
                    <input className="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                    <label>Tipo*</label>
                    <input className="inputtext" type="char" name="tipo" id="tipo" onChange={onChange} value={pet.tipo} />
                    <label>Tamanho*</label>
                    <input className="inputtext" type="char" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
                    <button className="confirm-button" type='submit' >
                        <icon><FaSave /></icon>Salvar</button>
                </form>
                <div className="actions">
                    <button className="confirm-button"  onClick = {()=>handleDelete(id)}>
                        <icon><FaTrash /></icon>Deletar
                    </button>
                    <button className="confirm-button" onClick={limpar}>
                        <icon><FaEraser /></icon>Limpar
                    </button>
                </div>
            </div>
        </div>
    )

}