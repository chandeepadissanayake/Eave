var helperLogging = require("./helpers/logging");

var io = null;

const initWebSockets = (http) => {
    io = require('socket.io')(http);

    io.on("connection", (socket) => {
        helperLogging.logWebInfo("A WebSocket User Connected.");

        socket.on("disconnect", () => {
            helperLogging.logWebInfo("A WebSocket User Disconnected.");
        });
    });
};

const sendUpdateEvent = (imageBase64) => {
    io.emit("imageUpdate", "data:image/jpeg;base64," + imageBase64);
}

module.exports = {
    initWebSockets,
    sendUpdateEvent
};
