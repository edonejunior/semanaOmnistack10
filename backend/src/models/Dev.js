const mongoose = require('mongoose');
//Importando o point schema
const PointSchema = require('./utils/PoinsSchema')

//Informamos os campos que um usuario vai ter. Com o tipo do campo.
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        //Quando trabalhamos com localização temos que criar um indice.
        index: ['2dsphere']
    }
})

//Exportando o model
module.exports = mongoose.model('Dev',DevSchema);