import axios from 'axios';

//setando a url de consumo para o axios e passando para a constante API
const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;