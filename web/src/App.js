//UseEffect é para disparar uma função especifica 
//UseState para armazenar valores, no caso especifico latitude e longitude. 

import React, {useState ,useEffect} from 'react';
import api from './services/api';
//Importar CSS dentro do JavaScript
import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

function App() {
  //Com o conceito de imutabilidade crio a variavel e seu valor para setar utilizando o Use State
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  //Crio um state para armazenar os devs, e inicio com array
  const [devs, setDevs] = useState([]);

  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(()=> {
    //Função nativa do HTML para pegar a posição do usuário.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //Pego as duas posições dentro do position que é o retorno da função.
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

      },
      (err) => {
        console.log(err);
      },{
        timeout:30000,
      }
    );
  }, [])

  //quero que funciona apenas uma vez
  useEffect(()=>{
    //uso uma função para fazer o load
    async function loadDevs(){
      //faço uma constante que armazena a conulta de api.get
      const response = await api.get('/devs');

      setDevs(response.data)
    }
    loadDevs();
  },[])

  //função que rola por conta do form 
  async function handleAddDev(e){
    e.preventDefault();
    //aqui fazemos a consulta a API
    const response = await api.post('/devs', {
      github_username, techs, latitude, longitude
    })
    //limpar campos
    setGithub_username('');
    setTechs('');

    //aqui adicionamos o novo dev a lista de devs, isso por que ele tem de carregar a lista de 
    //devs e por após a lista esse novo dev.
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <form onSubmit={handleAddDev}>

        <div className="input-block">
          <label htmlFor="github_username">Usuario do Github</label>
          <input 
          name="github_username" 
          id="github_username" 
          required
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
          name="techs" 
          id="techs" 
          required
          value={techs}
          onChange = {e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="Latitude">Latitude</label>
            <input 
            type="number" 
            name="Latitude" 
            id="Latitude" 
            required 
            value={latitude}
            onChange = {e => setLatitude(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="Longitude">Longitude</label>
            <input 
            type="number" 
            name="Longitude" 
            id="Longitude" 
            required 
            value={longitude}
            onChange = {e => setLongitude(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Salvar</button>

      </form>
    </aside>
    <main>
      <ul> 
        {devs.map(dev => (
          <li key={dev._id} className="dev-item">
          <header>
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
          </header>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`} >Acessar Perfil Github</a>
        </li>
        ))}
        
      </ul>
    </main>
  </div>
  )
}
export default App;
