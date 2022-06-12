class Socket {

    constructor(socket, ui) {
        this.socket = socket
        this.ui = ui
        this.username = undefined
        this.room = undefined
        this.isGameStarted = false
        this.game = undefined
        this.users = undefined
        this.init()

    }

    start(game) {
        this.game = game
    }

    init() {
        this.socket.on('message', msg => {
            console.log(msg)
        });

        this.socket.on('users', (msg) => {
            this.users = msg
        });

        this.socket.on('roomUsers', ({ room, users }) => {

            this.socket.emit('message', "room" + room + " users: " + users);
        });


        this.socket.on('play', ({ user, users }) => {
            this.game.start()
            this.users = users
            this.room = user.room
            this.socket.emit('message', "WE START PLAY in room " + user.room);
            this.isGameStarted = true
            this.ui.delwaitingForOpponent()
            this.ui.setScore(this.username, users)
            this.ui.waitingForTurn()
        });

        this.socket.on('turn', async (board) => {
            console.log(board)
            if (board != undefined && board.length > 0)
                board.forEach(element => {
                    this.game.addingHouseUpdate(this.game.board.fields[element.fieldRow][element.fieldColumn].mesh.position.x, this.game.board.fields[element.fieldRow][element.fieldColumn].mesh.position.y, this.game.board.fields[element.fieldRow][element.fieldColumn].mesh.position.z, element.level)
                });
            this.ui.delwaitingForOpponent()
            this.game.yourTurn = true
        });


        this.socket.on('disconnectUser', () => {
            this.isGameStarted = false
            this.ui.noPlayers()
        });

    }

    joinRoom(username) {
        this.username = username

        if (!this.users.find(usr => usr.username == this.username)) {
            this.socket.emit('joinRoom', { username });
            return true
        } else {
            alert("Taki nick juz istnieje")
            return false
        }

    }

    nextTurn(board) {
        this.ui.waitingForTurn()
        let username = this.username

        this.socket.emit('turn', { username, board });
    }
}

export default Socket