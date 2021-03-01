var config = require("./config");

// Logger
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = config.getLogLevel();

module.exports = logger;
