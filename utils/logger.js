const config = require("config");
const colors = require("colors");

if (config.get("colors") == 1) {
  colors.enable();
} else {
  colors.disable();
}

function info(initParam, msg) {
  if (config.get("logLevel") === "info") {
    console.log(`${colors.bgBlue(`${initParam}:`)} ${msg}`);
  }
}

function warn(initParam, msg) {
  if (config.get("logLevel") === "warn" || "error") {
    console.error(`${colors.bgYellow(`${initParam}:`)} ${msg}`);
  }
}

function error(initParam, msg) {
  if (config.get("logLevel") === "warn" || "error") {
    console.error(`${colors.bgRed(`${initParam}:`)} ${msg}`);
  }
}

function getLogger(initParam) {
  return {
    info: (msg) => info(initParam, msg),
    warn: (msg) => warn(initParam, msg),
    error: (msg) => error(initParam, msg),
  };
}

module.exports = getLogger;
