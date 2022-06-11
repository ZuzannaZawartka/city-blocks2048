class Login {
    constructor(main) {
        this.net = main.net
        this.ui = main.ui
        this.main = main
        this.login()
    }

    login() {
        document.getElementById("join_to_room").addEventListener("click", async () => {
            if (this.IsUniqeName) {
                console.log(this.main.socket)
                this.main.socketClass.socket.emit("login", document.getElementById("nick").value);
                let promise = await this.net.login()
            }
        })
    }

    IsUniqeName() {
        this.main.users.forEach(user => {
            if (user.nick == document.getElementById("nick").value) {
                return false
            }
        });
        return true
    }

}


export default Login