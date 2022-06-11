const express = require("express");
const path = require("path");
const app = express();
let users = []

app.use(express.static(path.join(__dirname, "../../client/src")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/src/pages/loginPage.html"));
})

app.post('/login', (req, res) => {
    let flag = false
    let body = "";
    req.on("data", function (data) {
        body += data.toString();
    })
    req.on("end", function (data) {
        body = JSON.parse(body)
        if (users.length > 0) {
            users.forEach(user => {
                if (user.nick == body.nick) {
                    flag = true
                }
            })
        }
        if (!flag) {
            users.push(body)
        }
        res.end(JSON.stringify({ users }, null, 5))
    })

})



app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/src/pages/gamePage.html"));
})


module.exports = app;