const config = require("config");
const { bgBlue, bgYellow, bgRed } = require("colors");

if (config.get("colors.enabled") == 1) {
  function info(initParam, msg) {
    console.log(`${bgBlue(`${initParam}:`)} ${msg}`);
  }

  function warn(initParam, msg) {
    console.error(`${bgYellow(`${initParam}:`)} ${msg}`);
  }

  function error(initParam, msg) {
    console.error(`${bgRed(`${initParam}:`)} ${msg}`);
  }
} else if (config.get("colors.enabled") == 0) {
  function info(initParam, msg) {
    console.log(`${initParam}:${msg}`);
  }

  function warn(initParam, msg) {
    console.error(`${initParam}:${msg}`);
  }

  function error(initParam, msg) {
    console.error(`${initParam}:${msg}`);
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
