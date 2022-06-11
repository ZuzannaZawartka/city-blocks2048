class Socket {

    constructor(socket, ui) {
        this.socket = socket
        this.ui = ui
        this.init()
    }

    init() {
        this.socket.on('message', msg => {
            console.log(msg)
        });

        this.socket.on('roomUsers', ({ room, users }) => {
            this.socket.emit('message', "room" + room + " users: " + users);
        });


        this.socket.on('play', (room) => {
            this.socket.emit('message', "WE START PLAY in room " + room);
            this.ui.delwaitingForOpponent()
            console.log("dzieje sie")
        });

        this.socket.on('turn', (room) => {
            this.socket.emit('turn', "WE START PLAY in room " + room);

        });

    }

    joinRoom(username) {
        this.socket.emit('joinRoom', { username });

    }


}

export default Socket