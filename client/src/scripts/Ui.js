class Ui {
    constructor() {
        this.init()
    }

    init() {
        this.login()
    }

    login() {
        document.getElementById("join_to_room").addEventListener("click", async () => {
            let join_to_room = await this.net.login()
        })
    }
}