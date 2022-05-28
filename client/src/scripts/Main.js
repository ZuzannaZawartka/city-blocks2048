//import Game from "./Game.js"
import Login from "./Login.js"
import Net from "./Net.js"
import Ui from "./Ui.js"
import Socket from "./Socket.js"

class Main {
    constructor() {

        this.users = []
        this.net = new Net()
        this.ui = new Ui()
        //this.socket = new Socket()
        this.login = new Login(this);
    }

}
let main = new Main()

