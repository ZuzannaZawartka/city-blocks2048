const dotenv = require('dotenv');
dotenv.config({ path: "./src/plik.env" });
const app = require("./src/app");
const PORT = 3000;


const http = require('http');
const server = http.createServer(app);

app.set("port", PORT);

server.listen(process.env.APP_PORT || PORT, () => {
    console.log(`listen on ${process.env.APP_PORT}`)
});








