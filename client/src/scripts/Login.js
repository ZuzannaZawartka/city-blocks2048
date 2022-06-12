class Login {
    constructor(main) {
        this.net = main.net
        this.ui = main.ui
        this.main = main
        this.login()
    }

    login() {
        document.getElementById("join_to_room").addEventListener("click", async () => {

            if (this.main.socketClass.joinRoom((document.getElementById("nick").value).toString())) {
                this.ui.hideLogin()
            } else {
                console.log("NIEZALOGOWANO")
            }

        })
    }



}


export default Login