const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

//defino a rota (Primeiro parametro é onde vai ficar, a segunda é uma função, arrow function)
//nessa função eu faço uma requisição no caso é request. Tudo que vem do front.
//Response é como vamos devolver a resposta.
//Colocamos o async por que a chamada pode demorar um tempo e por isso fazemos assincrono.
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);

//exportar o objeto routes aqui de dentro
module.exports = routes;