import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/menu';
import User from '../../components/user';
import './configuracoes.css';
import { FaSave, FaEraser } from 'react-icons/fa';
import api from '../../services/api'

export default function Configuracoes() {

    const history = useHistory();
    const id = 'bd971c32';

    const initConfig = {
        valorDiaria: '',
        vagas: ''
    }
    const [config, setConfig] = useState(initConfig);

    useEffect(() => {
        if (id) {
            api.get(`/configuracao/${id}`).then(response => {
                setConfig(...response.data)
            })
        }
    }, [id]);

    function onSubmit(ev) {
        ev.preventDefault();
        api.put(`/configuracao/${id}`, config).then((response) => {
            history.push('/Home')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setConfig({ ...config, [name]: value })
        console.log(config, '...')
    }

    function limpar() {
        setConfig(initConfig)
    }

    return (
        <div id="config-page">
            <User />
            <Menu />
            <div id="main-config">
                <h2>Configurações</h2>
                <form onSubmit={onSubmit}>
                    <label>Valor da diária R$</label>
                    <input className="inputtext" type="float" name="valorDiaria" id="valorDiaria" onChange={onChange} value={config.valorDiaria} />
                    <br />
                    <label>Vagas Disponíveis</label>
                    <input className="inputtext" type="integer" name="vagas" id="vagas" onChange={onChange} value={config.vagas} />
                    <br />
                    <button className="confirm-button" type='submit' >
                        <icon><FaSave/></icon>Salvar</button>
                </form>
                <div className="actions">
                    <button className="button" onClick={limpar}>
                    <icon><FaEraser/></icon>Limpar
                    </button>
                </div>
            </div >
        </div>
    )
}