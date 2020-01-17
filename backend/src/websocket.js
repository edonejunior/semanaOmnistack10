const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')

//Registrar as conecções dentro de um array que pode ser um banco
const connections = [];

exports.setupWebsocket = (server) => {
    const io = socketio(server);

    io.on('connection', socket => {
        const {latitude, longitude, techs} = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                longitude:Number(longitude),
                latitude: Number(latitude),
            },
            techs:parseStringAsArray(techs)
        })

    })
};