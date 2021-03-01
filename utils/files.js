var fs = require("fs");
var helperLogging = require("../helpers/logging");

const saveBufferToFile = (buffer, filePath) => {
    var folderPath = filePath.substring(0, filePath.lastIndexOf("/") + 1);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    fs.open(filePath, "w", function (err, fd) {
        if (err) {
            helperLogging.logFileWriteError(filePath, err);
        }
        else {
            // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
            fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                if (err) {
                    helperLogging.logFileWriteError(filePath, err);
                }

                fs.close(fd, function () {
                    helperLogging.logFileWriteSuccess(filePath);
                });
            });
        }
    });
};

const readBufferFromFile = (filePath, onRead) => {
    fs.readFile(filePath, onRead);
};

module.exports = {
    saveBufferToFile,
    readBufferFromFile
};
