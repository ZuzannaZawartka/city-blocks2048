const { Server } = require("socket.io");
let io;

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getToRoom,
    getRoomUsers,
    users,
    rooms,
    readyToPlay
} = require('./users');


let botName = "Grzes"

const socketsInit = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("joinRoom", ({ username }) => {
            console.log(username)
            const user = userJoin(socket.id, username);
            if (user) {
                socket.join(user.room);

                //sprawadfzamy czy mamy dwoch graczy w grupie
                if (readyToPlay(user.room)) {
                    io.to(user.room).emit('play', (user.room));
                }

                socket.broadcast
                    .to(user.room)
                    .emit(
                        'message',
                        user.username + " has joined the chat"
                    );

                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            }

        })

        socket.on('chatMessage', msg => {
            const user = getCurrentUser(socket.id);

            io.to(user.room).emit('message',);
        });

        socket.on('message', msg => {
            console.log(msg)
        });

        socket.on('turn', () => {
            console.log("Your turn")

        });


        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(user.room).emit(
                    'message',
                    user.username + "has left the chat" + user.room
                );

                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            }

            console.log("user disconnect")
        });


    });



}




module.exports = socketsInit