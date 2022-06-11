class Login {
    constructor(main) {
        this.net = main.net
        this.ui = main.ui
        this.main = main
        this.login()
    }

    login() {
        document.getElementById("join_to_room").addEventListener("click", async () => {
            try {
                this.main.socketClass.joinRoom((document.getElementById("nick").value).toString())
                this.ui.hideLogin()
            } catch (error) { }
        })
    }



}


export default Login