const http = require('http');
const imageRouter = require("./app/imageRouter")
const usersRouter = require("./app/usersRouter")
const PORT = 3000;


http.createServer(async (req, res) => {

    //images

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }

    //tags

    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }

    //mails

    else if (req.url.search("/api/user") != -1) {
        await usersRouter(req, res)
    }

})
    .listen(PORT, () => console.log(`listen on ${PORT}`))