class Socket {

    constructor(socket, ui) {
        this.socket = socket
        this.ui = ui
        this.username = undefined
        this.init()
    }

    init() {
        this.socket.on('message', msg => {
            console.log(msg)
        });

        this.socket.on('roomUsers', ({ room, users }) => {
            this.socket.emit('message', "room" + room + " users: " + users);
        });


        this.socket.on('play', ({ user, users }) => {
            this.socket.emit('message', "WE START PLAY in room " + user.room);
            this.ui.delwaitingForOpponent(this.username, users)
        });

        this.socket.on('turn', (room) => {
            this.socket.emit('turn', "WE START PLAY in room " + room);

        });

    }

    joinRoom(username) {
        this.username = username
        this.socket.emit('joinRoom', { username });
    }


}

export default Socket