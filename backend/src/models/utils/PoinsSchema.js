const mongoose = require('mongoose');

//Crio um esquema para a localização
const PointSchema = new mongoose.Schema({
    type: {
        type:String,
        enum: ['Point'],
        required:true,
    },
    coordinates: {
        type: [Number], 
        required: true,
    }
})

module.exports = PointSchema