import React, {useState, useEffect} from 'react';

function DevForm({onSubmit}) {

//Com o conceito de imutabilidade crio a variavel e seu valor para setar utilizando o Use State
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

//Captura latitude e longitude do user, que é só para o usuário no form
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

  async function handleAddSubmit(){
      e.preventDefault();
      await onSubmit({
        github_username, techs, latitude, longitude
      });
    //limpar campos
    setGithub_username('');
    setTechs('');

  }


    return (
        <form onSubmit={handleAddSubmit}>

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
    )
}

export default DevForm;