const express = require("express");
const router = express.Router();

router.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/src/pages/loginPage.html"));
});

router.get("/gamePage", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/src/pages/gamePage.html"));
});

module.exports = router;