const { Server } = require("socket.io");
let io;

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getToRoom,
    getRoomUsers
} = require('./users');


let botName = "Grzes"

const socketsInit = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("joinRoom", ({ username }) => {
            const user = userJoin(socket.id, username);
            if (user) {

                socket.join(user.room);
                socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

                socket.broadcast
                    .to(user.room)
                    .emit(
                        'message',
                        formatMessage(botName, `${user.username} has joined the chat`)
                    );

                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            }

        })

        socket.on('chatMessage', msg => {
            const user = getCurrentUser(socket.id);

            io.to(user.room).emit('message', formatMessage(user.username, msg));
        });


        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(user.room).emit(
                    'message',
                    formatMessage(botName, `${user.username} has left the chat`)
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


function formatMessage(username, text) {
    return {
        username,
        text,
    };
}

module.exports = socketsInit