const e = require("express");
const fs = require("fs");



const recognizeRouter = (req, res) => {

    if (req.url.indexOf('.') !== -1) {
        typeRouter(req, res)
    } else if (req.url == "/") {
        fs.readFile('./client/src/pages/loginPage.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
            res.end();
        });
    } else {
        res.end();
    }


}

const typeRouter = (req, res) => {

    if (req.url.indexOf('.') !== -1) {
        let request_url_after_dot = req.url.substr(req.url.indexOf('.') + 1);
        let content_type;

        if (request_url_after_dot === "html") {
            content_type = { 'Content-Type': 'text/html' }
        }
        else if (request_url_after_dot === "css") {
            content_type = { 'Content-Type': 'text/css' }
        }
        else if (request_url_after_dot === "js") {
            content_type = { 'Content-Type': 'application/javascript' }
        } else {
            content_type = { 'Content-Type': 'text/plain' }
        }

        console.log(content_type)

        fs.readFile('./client/src/pages/' + req.url, null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.writeHead(200, content_type);
                res.write(data);
            }
            res.end();
        });
    }

}

module.exports = recognizeRouter