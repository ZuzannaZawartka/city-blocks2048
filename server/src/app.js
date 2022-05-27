const express = require("express");
const path = require("path");

const indexRouter = require("./routes");

const app = express();

app.use(express.json());
app.use("/api", indexRouter);
app.use(express.static(path.join(__dirname, "../../client/src")));

app.get("/gamePage", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/src/pages/gamePage.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/src/pages/loginPage.html"));
});

module.exports = app;