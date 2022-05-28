const { Server } = require("socket.io");
let io;

const socketsInit = (server) => {
    io = new Server(server);



    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.emit("hello", "world");

        joinRoom(socket)

        socket.on('chat message', function (msg) {
            console.log(msg)
        });


        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });



}

joinRoom = (socket) => {
    socket.join("some room");


}


module.exports = socketsInit