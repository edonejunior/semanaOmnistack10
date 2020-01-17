//UseEffect é para disparar uma função especifica 
//UseState para armazenar valores, no caso especifico latitude e longitude. 

import React, {useState ,useEffect} from 'react';
import api from './services/api';
//Importar CSS dentro do JavaScript
import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {


  //Crio um state para armazenar os devs, e inicio com array
  const [devs, setDevs] = useState([]);

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
    async function handleAddDev(data){
    //aqui fazemos a consulta a API
    const response = await api.post('/devs', data)
    
    //aqui adicionamos o novo dev a lista de devs, isso por que ele tem de carregar a lista de 
    //devs e por após a lista esse novo dev.
    setDevs([...devs, response.data]);
  }

    
  return (
    <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <DevForm onSubmit={handleAddDev} />
    </aside>
    <main>
      <ul> 
        {devs.map(dev => (
          <DevItem key={dev._id} dev={dev} />
        ))}
        
      </ul>
    </main>
  </div>
  )
}
export default App;
