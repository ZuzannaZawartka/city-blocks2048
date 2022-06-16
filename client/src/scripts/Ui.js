class Ui {
    constructor() {
        this.w1_displayed = document.getElementById('window_score1').style.display
        this.w2_displayed = document.getElementById('window_score2').style.display
        this.bg = document.getElementById('bg_log').style.display
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

    moveLogo() {
        document.getElementById("brand").style.transition = "all 0.5s ease-out";
        document.getElementById("brand").style.transform = "scale(0.45, 0.45)";
        document.getElementById("brand").style.top = "-17vh"
    }

    waitingForOpponent() {
        document.getElementById("opponent_text").innerHTML = "Waiting for opponent"
        document.getElementById("bg_log").style.backgroundColor = "rgba(2,100,100,0.6)"
    }

    waitingForTurn() {
        document.getElementById("bg_log").style.display = this.bg
        document.getElementById("opponent_text").innerHTML = "Waiting for turn"
        document.getElementById("bg_log").style.backgroundColor = "rgba(2,100,100,0.6)"
    }

    noPlayers() {
        document.getElementById("bg_log").style.display = this.bg
        document.getElementById("opponent_text").innerHTML = "Your opponent is gone, wait for player"
        document.getElementById("bg_log").style.backgroundColor = "rgba(2,100,100,0.6)"
    }


    winWindow(points, opoints) {
        this.crowd = new Audio('../sounds/crowd.wav');
        this.crowd.play()
        console.log("OKNO WYGRYWAJACE")
        document.getElementById("bg_log").style.display = this.bg
        document.getElementById("opponent_text").innerHTML = "You have won, you got " + points + " and your opponent got " + opoints
        document.getElementById("bg_log").style.backgroundColor = "rgba(2,100,100,0.6)"
    }


    looseWindow(points, opoints) {
        this.crowd = new Audio('../sounds/boo.wav');
        this.crowd.play()
        document.getElementById("bg_log").style.display = this.bg
        document.getElementById("opponent_text").innerHTML = "You have lost, you got " + opoints + " and your opponent got " + points
        document.getElementById("bg_log").style.backgroundColor = "rgba(2,100,100,0.6)"
    }

    delwaitingForOpponent() {
        document.getElementById("bg_log").style.display = "none"

    }


    setScore(user, users) {
        document.getElementById('window_score1').style.display = this.w1_displayed
        document.getElementById('window_score2').style.display = this.w2_displayed
        document.getElementById('nick1').innerText = user
        document.getElementById('nick2').innerText = users.filter(usr => usr != user)[0]
    }

    showPoints(points1, points2) {

        let maxScore = 3000
        let proportion1 = (points1 * 20) / maxScore
        let proportion2 = (points2 * 20) / maxScore
        document.getElementById('score_1_num').innerHTML = points1
        document.getElementById('score_2_num').innerHTML = points2
        document.getElementById('score_1_2').style.width = `${proportion1}vw`
        document.getElementById('score_2_2').style.width = `${proportion2}vw`
    }

    showLeaderboard(data) {
        document.getElementById("brand").style.left = "5vw"
        console.log(data)
        data.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
        document.getElementById("opponent_text").style.display = "none"
        const tbl = document.createElement("table");
        let i = 0;
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        cell1.innerHTML = "Nick"
        cell2.innerHTML = "Score"
        row.append(cell1)
        row.append(cell2)
        tbl.append(row)
        for (let i = 0; i < 10; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 2; j++) {
                const cell = document.createElement("td");
                if (j == 0) {
                    cell.innerHTML = data[i].user.username
                }
                else {
                    cell.innerHTML = data[i].points
                }
                row.append(cell)
            }
            console.log(data[i])
            tbl.append(row)
        }
        document.getElementById("leaderboard").append(tbl)
    }
}

export default Ui