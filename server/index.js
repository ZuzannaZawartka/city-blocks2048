const http = require('http');
const recognizeRouter = require("./src/recogniseRequestRouter")
// const usersRouter = require("./app/usersRouter")
const fs = require('fs');
const PORT = 3000;


http.createServer(async (req, res) => {

    //images

    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            recognizeRouter(req, res)

            break;

        case "POST":
            // odbiór posta
            serverResponse(req, res)
            break;
    }
})
    .listen(PORT, () => console.log(`listen on ${PORT}`))



async function serverResponse(req, res) {


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
}