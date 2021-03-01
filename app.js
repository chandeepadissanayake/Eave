var config = require("./config");
var helperLogging = require("./helpers/logging");
var net = require("net");
var helperBuffer = require("./helpers/buffer");

var web = require("./web");

const server = net.createServer((connection) => {
    helperLogging.logIncomingConnection(connection);

    connection.on("data", (data) => {
        helperBuffer.handleData(connection, data);
    });

    connection.on("end", () => {
        helperLogging.logConnectionClosure(connection);
    });
});

server.listen(config.getPort(), config.getHost(), () => {
    helperLogging.logServerBound();
});

web.initWebServer();
