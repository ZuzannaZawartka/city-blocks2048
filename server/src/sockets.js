const { Server } = require("socket.io");
const Datastore = require('nedb')
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

let boardOnServer;
let boards = []
let scorex = 0;
let user;

const socketsInit = (server) => {
    const base = new Datastore({
        filename: 'kolekcja.db',
        autoload: true
    });

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
                            'turn', [], scorex
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

        socket.on('endGame', ({ points, opoints }) => {
            console.log("END Z SOCKETU")
            console.log(points + "/" + opoints)
            const user = getCurrentUser(socket.id);

            const doc = {
                user: users[0],
                points: points
            }

            base.insert(doc, function (err, newDoc) {
                console.log("dodano dokument (obiekt):")
                console.log(newDoc)
                console.log("losowe id dokumentu: " + newDoc._id)
            });

            socket.broadcast.to(user.room).emit('endGame', ({ points, opoints }));
        });

        socket.on('turn', ({ username, board, score }) => {

            console.log(board.length)
            boardOnServer = board
            let user = users.find(usr => usr.username == username);
            //sprawdzamy czy gracze sa w pokoju
            if (checkRoom(user)) {
                socket.broadcast.to(user.room).emit('turn', boardOnServer, score);
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