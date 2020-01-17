//importando expresss, mongoose e Rotas
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket');

//instanciando o express
const app = express();

//Estou retirando as requisições do express para poder trabalhar com elas
const server = http.Server(app);

setupWebsocket(server);
//Connectionstring
mongoose.connect('mongodb+srv://userApps:userApps@cluster0-59wew.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//Cors libera acesso externo para toda aplicação.
app.use(cors())
app.use(express.json());
app.use(routes);

//Definindo a porta
//Trocando por server pois funcionará da mesma maneira
server.listen(3333);

