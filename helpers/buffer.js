var config = require("../config");
var helperLogging = require("../helpers/logging");
var utilsFiles = require("../utils/files");
var sockets = require("../sockets");

const PREFIX_COMMAND = "CMD";
const KEY_AUTHORIZATION = "Auth";
const KEY_IMAGE_ID = "ImageID";
const CMD_IMAGE_END = "END";

var connectionsMetadata = {
    authorization: {},
    imageIDs: {},
    images: {}
};

const handleData = (connection, data) => {
    let strData = data.toString("UTF-8");

    if (strData.startsWith(PREFIX_COMMAND)) {
        let remData = strData.replace(PREFIX_COMMAND + ":", "").replace("\r\n", "");

        if (remData.startsWith(KEY_AUTHORIZATION)) {
            let recAuthCode = remData.substring(remData.indexOf(":") + 1, remData.length);

            if (recAuthCode === config.getAuthCode()) {
                helperLogging.logConnectionAuthState(connection, true);
                connectionsMetadata.authorization[connection] = true;
            }
            else {
                helperLogging.logConnectionAuthState(connection, false);
                connection.destroy();
            }
        }
        else if (remData.startsWith(KEY_IMAGE_ID)) {
            if (connection in connectionsMetadata.authorization) {
                let recImageID = remData.substring(remData.indexOf(":") + 1, remData.length);
                connectionsMetadata.imageIDs[connection] = recImageID;
                helperLogging.logConnectionImageIDReceipt(connection, recImageID);
            }
            else {
                helperLogging.logConnectionImageIDFailure(connection);
                connection.destroy();
            }
        }
        else if (remData.startsWith(CMD_IMAGE_END)) {
            if (connection in connectionsMetadata.authorization && connection in connectionsMetadata.imageIDs && connection in connectionsMetadata.images) {
                helperLogging.logConnectionImageCompletion(connection);

                // TODO: Save the image here and do the rest of the processing.
                var pathTempFile = config.getTempStorageDirectory() + "/" + connectionsMetadata.imageIDs[connection] + ".jpg";
                utilsFiles.saveBufferToFile(connectionsMetadata.images[connection], pathTempFile);
                utilsFiles.readBufferFromFile(pathTempFile, (err, data) => {
                    if (err) {
                        helperLogging.logWebInfo("Error reading the latest image.");
                        return;
                    }

                    sockets.sendUpdateEvent(data.toString("base64"));
                });

                // Remove the data from the global array above.
                delete connectionsMetadata.authorization[connection];
                delete connectionsMetadata.imageIDs[connection];
                delete connectionsMetadata.images[connection];
            }
            else {
                helperLogging.logConnectionImageCompletionFailure(connection);
            }
        }
    }
    else {
        // Image Data
        if (connection in connectionsMetadata.authorization && connection in connectionsMetadata.imageIDs) {
            if (connection in connectionsMetadata.images) {
                connectionsMetadata.images[connection] = Buffer.concat([connectionsMetadata.images[connection], data]);
            }
            else {
                connectionsMetadata.images[connection] = data;
            }

            // helperLogging.logConnectionImageBufferReceipt(connection);
        }
        else {
            // No authorization and Image ID, close the connection.
            helperLogging.logConnectionImageConfigFailure(connection);
            connection.destroy();
        }
    }
};

module.exports = {
    handleData
};
