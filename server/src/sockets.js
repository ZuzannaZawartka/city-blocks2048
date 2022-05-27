const { Server } = require("socket.io");
let io;

const socketsInit = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

}


module.exports = socketsInit