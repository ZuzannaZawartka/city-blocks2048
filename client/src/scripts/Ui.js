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
        console.log("ODPLAAMY UI")
        console.log(document.getElementById("bg_log"))
        document.getElementById("opponent_text").innerHTML = "WAITING FOR OPPONENT"
        document.getElementById("opponent_text").innerHTML = "CCD"
        document.getElementById("bg_log").style.display = "none"
        console.log(document.getElementById("bg_log"))
    }
}

export default Ui