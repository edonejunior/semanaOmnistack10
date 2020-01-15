//importando expresss, mongoose e Rotas
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')

//instanciando o express
const app = express();
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
app.listen(3333);

