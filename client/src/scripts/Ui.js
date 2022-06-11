class Ui {
    constructor() {

    }


    hideLogin() {
        document.getElementById("window_log").style.display = "none"
        this.waitingForOpponent()
    }

    waitingForOpponent() {
        document.getElementById("opponent_text").innerHTML = "WAITING FOR OPPONENT"
        document.getElementById("bg_log").style.backgroundColor = "rgba(2,100,100,0.6)"
    }

    delwaitingForOpponent() {
        document.getElementById("bg_log").style.display = "none"
    }
}

export default Ui