class Ui {
    constructor() {
        this.w1_displayed = document.getElementById('window_score1').style.display
        this.w2_displayed = document.getElementById('window_score2').style.display
        this.init()
    }


    init() {
        document.getElementById('window_score1').style.display = "none"
        document.getElementById('window_score2').style.display = "none"
    }


    hideLogin() {
        document.getElementById("window_log").style.display = "none"

        this.waitingForOpponent()
    }

    waitingForOpponent() {
        document.getElementById("opponent_text").innerHTML = "WAITING FOR OPPONENT"
        document.getElementById("bg_log").style.backgroundColor = "rgba(2,100,100,0.6)"
    }

    delwaitingForOpponent(user, users) {
        document.getElementById("bg_log").style.display = "none"

        document.getElementById('window_score1').style.display = this.w1_displayed
        document.getElementById('window_score2').style.display = this.w2_displayed
        document.getElementById('nick1').innerText = user
        document.getElementById('nick2').innerText = users.filter(usr => usr != user)[0]
    }

    setScore() {

    }
}

export default Ui