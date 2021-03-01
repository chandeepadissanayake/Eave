var app = require('express')();

var config = require("./config");
var helperLogging = require("./helpers/logging");
var webSockets = require("./sockets");

const initWebServer = () => {
    const http = require('http').createServer(app);

    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/static/index.html");
    });

    webSockets.initWebSockets(http);

    http.listen(config.getWebPort(), () => {
        helperLogging.logWebInfo("Web Interface Listening on Port: " + config.getWebPort().toString());
    });
};

module.exports = {
    initWebServer
};
