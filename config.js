require('dotenv').config();

const ENV_DEVELOPMENT = "development";
const ENV_PRODUCTION = "production";

const CommonConfig = {
    temp_dir: "./tmp"
};

const Configuration = {
    [ENV_DEVELOPMENT]: Object.assign({
        host: "0.0.0.0",
        port: 8080,
        log_level: "debug",
        auth_code: "abc123",
        web_port: 80
    }, CommonConfig),
    [ENV_PRODUCTION]: Object.assign({
        host: "0.0.0.0",
        port: 8080,
        log_level: "info",
        auth_code: "3sr6K^*xY6",
        web_port: 80
    }, CommonConfig)
};

const getHost = () => {
    return Configuration[process.env.NODE_ENV]["host"];
}

const getPort = () => {
    return Configuration[process.env.NODE_ENV]["port"];
}

const getLogLevel = () => {
    return Configuration[process.env.NODE_ENV]["log_level"];
};

const getAuthCode = () => {
    return Configuration[process.env.NODE_ENV]["auth_code"];
};

const getTempStorageDirectory = () => {
    return Configuration[process.env.NODE_ENV]["temp_dir"];
};

const getWebPort = () => {
    return Configuration[process.env.NODE_ENV]["web_port"];
};

module.exports = {
    getHost,
    getPort,
    getLogLevel,
    getAuthCode,
    getTempStorageDirectory,
    getWebPort
};
