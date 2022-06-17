const dotenv = require('dotenv');
dotenv.config({ path: "./src/plik.env" });
const app = require("./src/app");
const socketsInit = require("./src/sockets");
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);

socketsInit(server)

server.listen(process.env.PORT || PORT, () => {
    console.log(`listen on ${process.env.APP_PORT}`)
});












