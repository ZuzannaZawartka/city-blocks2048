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
    readyToPlay,
    checkRoom,
} = require('./users');


let botName = "Grzes"

let board = "to jest nasz board na serwerze"

const socketsInit = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
        io.emit('users', users);

        socket.on("joinRoom", ({ username }) => {
            io.emit('users', users);
            const user = userJoin(socket.id, username);
            if (user) {
                socket.join(user.room);

                //sprawadfzamy czy mamy dwoch graczy w grupie
                if (readyToPlay(user.room)) {
                    let users = getRoomUsers(user.room)
                    io.to(user.room).emit('play', ({ user, users }));

                    console.log("to jest ro ")
                    console.log(user.room)
                    socket.broadcast
                        .to(user.room)
                        .emit(
                            'turn', board
                        );
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

        socket.on('turn', ({ username, board }) => {

            console.log(board)
            let user = users.find(usr => usr.username == username);
            //sprawdzamy czy gracze sa w pokoju
            if (checkRoom(user)) {
                socket.broadcast.to(user.room).emit('turn', board);
            } else {
                io.to(user.room).emit('disconnectUser');
            }
        });


        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(user.room).emit(
                    'disconnectUser'
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