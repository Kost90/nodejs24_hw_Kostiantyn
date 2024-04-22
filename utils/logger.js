function info(initParam, msg) {
  console.log(`${initParam}: ${msg}`);
}

function warn(initParam,msg) {
  console.error(`${initParam}: ${msg}`);
}

function error(initParam,msg) {
  console.error(`${initParam}: ${msg}`);
}

function getLogger(initParam) {
  return {
    info: (msg) => info(initParam, msg),
    warn: (msg) => warn(initParam,msg),
    error: (msg) => error(initParam,msg),
  };
}

module.exports = getLogger;
