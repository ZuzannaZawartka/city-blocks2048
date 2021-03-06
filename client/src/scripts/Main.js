import Game from "./Game.js"
import Login from "./Login.js"
import Net from "./Net.js"
import Ui from "./Ui.js"
import Socket from "./Socket.js"

class Main {
    constructor() {
        const socket = io(); // podłączenie socektu do strony (jak wyswietla blad ze nie ma socketu to podepnij skrypt z loginPage)
        let users = [];
        let rooms = []
        this.socket = socket
        //gf
        this.net = new Net()
        this.ui = new Ui()
        this.socketClass = new Socket(this.socket, this.ui)
        this.login = new Login(this);
        this.game = new Game(this.socketClass)
    }

}
let main = new Main()

