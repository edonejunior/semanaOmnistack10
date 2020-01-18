const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')
const {findConnections, sendMessage} = require('../websocket')

module.exports = {

    //Essa rota busca todos os devs, criamos como index.
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    //Pego tudo que veio da rota e jogo no Controller, isso por que ele que tem que fazer o trabalho
    //Tiro a arrow function e ela vira uma função, eu dei o nome de store
    async store(request, response) {
        //Desestruturamos e pegamos o git username e tecs dentro do body da requisição
        const {github_username, techs, latitude, longitude} = request.body;

        //Busco dentro do banco o username, declaro como let para ser sobreposta:
        let dev = await Dev.findOne({github_username});

        //Se não existir eu faço tudo o que preciso
        if (!dev) {
            //Coloco o await para aguardar finalizar a chamada pra continuar
            const ApiResponse = await axios.get(`https://api.github.com/users/${github_username}`) ;
        
            //Aqui ja pegamos a resposta e desestruturamos como queremos, inclusive ja substituindo
            //o name pelo login se n existir.
            const {name = login, avatar_url, bio} = ApiResponse.data;
        
            //Dividi o array que chegou com o split
            //Ja percorrendo cada campo com o MAP e realizando uma ação que no caso é o Trim que
            //retira o espaço de cada campo.
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point', 
                coordinates: [longitude, latitude]
            }
        
            //criamos uma chamada no no model DEV 
            // Salvo o retorno
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs : techsArray,
                location
            })


            const sendSocketMessageTo = findConnections(
                {latitude, longitude}, 
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'newDev', dev)
        }
        
    //Pego o retorno desse cadastro
        return response.json(dev);
    },

    async update(request, response){
        const {_id} = request.query;
        //utilizo o findById para localizar o ID que veio pelo query e passo o .body para 
        //ele verificar o campo que existe e atualizar, e o último parametro é para devolver
        //o cadastro atualizado.
        const devUpdate = await Dev.findByIdAndUpdate({_id}, request.body, {new: true})
        return response.json({devUpdate});
    },

    async destroy(request, response){
        const {_id} = request.query;
        const devDelete = await Dev.findByIdAndDelete({_id});
        return response.json('DevDeletado');
    }
}