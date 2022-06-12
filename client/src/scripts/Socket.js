class Socket {

    constructor(socket, ui) {
        this.socket = socket
        this.ui = ui
        this.username = undefined
        this.room = undefined
        this.isGameStarted = false
        this.init()
        this.game = undefined
    }

    start(game) {
        this.game = game
    }

    init() {
        this.socket.on('message', msg => {
            console.log(msg)
        });

        this.socket.on('roomUsers', ({ room, users }) => {

            this.socket.emit('message', "room" + room + " users: " + users);
        });


        this.socket.on('play', ({ user, users }) => {
            this.game.start()
            this.room = user.room
            this.socket.emit('message', "WE START PLAY in room " + user.room);
            this.isGameStarted = true
            this.ui.delwaitingForOpponent()
            this.ui.setScore(this.username, users)
            this.ui.waitingForTurn()
        });

        this.socket.on('turn', () => {
            console.log("Moj ruch to jest gosciu")
            this.ui.delwaitingForOpponent()
        });

    }

    joinRoom(username) {
        this.username = username
        this.socket.emit('joinRoom', { username });
    }

    nextTurn() {
        this.ui.waitingForTurn()
        let username = this.username
        this.socket.emit('turn', username);
    }


}

export default Socket