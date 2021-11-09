import './cadastrarPet.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSave, FaEraser } from 'react-icons/fa';
import Menu from '../../components/menu';
import User from '../../components/user';
import api from '../../services/api'

export default function CadastrarPet() {

    const history = useHistory();
    const [image, setImage] = useState('')
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const initPet = {
        id: '',
        raca: '',
        tamanho: '',
        nome: '',
        tipo: '',
        usuario_id: ''
    }
    const [pet, setPet] = useState(initPet);

    async function onSubmit(ev) {
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

        await api.post('/pets', formData, headers).then((response) => {
            history.push('/Pet')
            console.log(response)
        })
        // .then((response) => {
        //     setStatus({
        //         type: 'success',
        //         mensagem: response.data.mensagem
        //     });
        // }).catch((err) => {
        //     if (err.response) {
        //         setStatus({
        //             type: 'error',
        //             mensagem: err.response.data.mensagem
        //         });
        //     } else {
        //         setStatus({
        //             type: 'error',
        //             mensagem: "Erro: Tente mais tarde!"
        //         });
        //     }
        // });
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setPet({ ...pet, [name]: value })
    }

    function limpar() {
        setPet(initPet)
    }

    if(localStorage.getItem('funcao') === 'Cliente'){

        const idUser = localStorage.getItem('id');
        pet.usuario_id = idUser; 
        return (
            <div>
                <User />
                <Menu />
                <div id="main-cadastrarPet">
                    <h2>Cadastrar Pet</h2>
                    <form onSubmit={onSubmit}>
                        <label>Imagem:</label><br />
                        <input className="inputfile" type="file" name="imagem" onChange={e => setImage(e.target.files[0])} /><br /><br />
                        <label>Nome*</label>
                        <input class="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                        <label>Raça*</label>
                        <input class="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                        <label>Tipo*</label>
                        <input class="inputtext" type="char" name="tipo" id="tipo" onChange={onChange} value={pet.tipo} />
                        <label>Tamanho*</label>
                        <input class="inputtext" type="char" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
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
    }else{
        return (
            <div>
                <User />
                <Menu />
                <div id="main-cadastrarPet">
                    <h2>Cadastrar Pet</h2>
                    <form onSubmit={onSubmit}>
                        <label>Imagem:</label><br />
                        <input className="inputfile" type="file" name="imagem" onChange={e => setImage(e.target.files[0])} /><br /><br />
                        <label>Proprietário ID*</label>
                        <input class="inputtext" type="char" name="usuario_id" id="usuario_id" onChange={onChange} value={pet.usuario_id} />
                        <label>Nome*</label>
                        <input class="inputtext" type="char" name="nome" id="nome" onChange={onChange} value={pet.nome} />
                        <label>Raça*</label>
                        <input class="inputtext" type="char" name="raca" id="raca" onChange={onChange} value={pet.raca} />
                        <label>Tipo*</label>
                        <input class="inputtext" type="char" name="tipo" id="tipo" onChange={onChange} value={pet.tipo} />
                        <label>Tamanho*</label>
                        <input class="inputtext" type="char" name="tamanho" id="tamanho" onChange={onChange} value={pet.tamanho} />
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