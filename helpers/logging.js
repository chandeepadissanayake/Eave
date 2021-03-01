var logger = require("../logger");

const logServerBound = () => {
    logger.info("Server bound and listening...");
};

const logIncomingConnection = (connection) => {
    logger.info("Connection from: " + connection.address().address);
};

const logConnectionClosure = (connection) => {
    logger.info("Connection closed from: " + connection.address().address);
};

const logConnectionAuthState = (connection, authState) => {
    logger.info("Connection (" + connection.address().address + ") Auth " + (authState ? "Succeeded" : "Failed"));
};

const logConnectionImageIDReceipt = (connection, imageID) => {
    logger.info("Connection (" + connection.address().address + ") Image ID: " + imageID + " received.");
};

const logConnectionImageIDFailure = (connection) => {
    logger.info("Connection (" + connection.address().address + ") Image ID receipt failure.");
};

const logConnectionImageConfigFailure = (connection) => {
    logger.info("Connection (" + connection.address().address + ") missing configuration failure.");
};

const logConnectionImageBufferReceipt = (connection) => {
    logger.info("Connection (" + connection.address().address + ") image buffer received.");
};

const logConnectionImageCompletion = (connection) => {
    logger.info("Connection (" + connection.address().address + ") image receipt complete.");
};

const logConnectionImageCompletionFailure = (connection) => {
    logger.info("Connection (" + connection.address().address + ") no image received to mark completion.");
};

const logFileWriteError = (filePath, error) => {
    logger.info("Failed to write to: " + filePath + " with error: " + error);
};

const logFileWriteSuccess = (filePath) => {
    logger.info("File Writing Succeeded: " + filePath);
};

const logWebInfo = (message) => {
    logger.info(message);
}

module.exports = {
    logServerBound,
    logIncomingConnection,
    logConnectionClosure,
    logConnectionAuthState,
    logConnectionImageIDReceipt,
    logConnectionImageIDFailure,
    logConnectionImageConfigFailure,
    logConnectionImageBufferReceipt,
    logConnectionImageCompletion,
    logConnectionImageCompletionFailure,
    logFileWriteError,
    logFileWriteSuccess,
    logWebInfo
};
