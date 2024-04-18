function info(initParam, msg) {
  console.log(`${initParam}: ${msg}`);
}

function warn(initParam) {
  console.error(`${initParam}: warn error`);
}

function error(initParam) {
  console.error(`${initParam}: error`);
}

function getLogger(initParam) {
  return {
    info: (msg) => info(initParam, msg),
    warn: () => warn(initParam),
    error: () => error(initParam),
  };
}

module.exports = (initParam) => getLogger(initParam);
