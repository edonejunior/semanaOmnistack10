import React from 'react';
import api from '../../services/api';

import './style.css';

//Usamos a desestruturação para pegar o dev.
function DevItem({dev}){

  

    async function excluirDev(props){
      await api.delete(`/devs?_id=${props.target.value}`);
      document.location.reload(true);
      }

    return (
        <li  className="dev-item">
          <header>
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
          </header>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`} >Acessar Perfil Github</a>
          <p><button onClick={excluirDev} value={dev._id}>Excluir Dev</button></p>
        </li>
    )
}

export default DevItem