
class Socket {

    constructor(socket) {

        this.socket = socket


    }

    joinRoom(username) {
        this.socket.emit('joinRoom', { username });
    }
}

export default Socket