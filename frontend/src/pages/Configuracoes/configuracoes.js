import React from 'react';
import Menu from '../../components/menu';
import User from '../../components/user';
import '../../styles/pages/configuracoes.css';

export default function Configuracoes() {
    
    
    
    return (
        <div id = "config-page">
            <User />
            <Menu />
            <div id = "main-config">
                <h2>Configurações</h2>
                <label>Valor da diária</label>
                <form action="">
                    <input class="inputtext" type="char" name="" id="" value=""></input>
                </form>
                <br/>
                <label>Vagas Disponíveis</label><form action="">
                    <input class="inputtext" type="char" name="" id="" value=""></input>
                </form>
                <br/>
                <button className="confirm-button" type='submit' >
                    Salvar
                </button>

                <button className="confirm-button" type='submit' >
                    Limpar
                </button>
            </div >
        </div>
    )
}