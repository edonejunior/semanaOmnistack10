const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io;
//Registrar as conecções dentro de um array que pode ser um banco
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

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

//Ele vai registrar as informações mas mais do que isso, filtrar:
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to,message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}