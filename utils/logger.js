const config = require("config");
const colors = require("colors");
const fs = require("fs");
const path = require("path");

const rootFolder = path.resolve(__dirname, "../");
const logsInfoPath = path.join(rootFolder, "logs/info.log");
const logsErrorsPath = path.join(rootFolder, "logs/errors.log");

//! Перевіряємо, чи є папка та файли
if (!fs.existsSync(logsInfoPath) && !fs.existsSync(logsErrorsPath)) {
  const directory = path.join(rootFolder, "logs");
  fs.mkdir(directory, (err) => {
    if (err) throw err;
  });
}

// ! Функції які логають події стрімів
function StreamFinishLog() {
  console.log("Data has been written to the destination file.");
}

function streamErrorLog(error) {
  console.error(
    `${colors.bgRed(`Error writing to the destination file:`)} ${error}}`
  );
}

// ! створюємо стріми
const writeInfoStream = fs.createWriteStream(logsInfoPath,{flags:'a'});
const writeErrorsStream = fs.createWriteStream(logsErrorsPath,{flags:'a'});

writeInfoStream.on("error", streamErrorLog);
writeInfoStream.on("finish", StreamFinishLog);
writeErrorsStream.on("error", streamErrorLog);
writeErrorsStream.on("finish", StreamFinishLog);

// ! закриття стрімів
process.on("beforeExit", () => {
  writeInfoStream.end();
  writeErrorsStream.end();
});

if (config.get("colors") == 1) {
  colors.enable();
} else {
  colors.disable();
}

// ! Функції з стрімами
function info(initParam, msg) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  writeInfoStream.write(`${isoDate} ${initParam}: ${msg}\n`);

  if (config.get("logLevel") === "info") {
    console.log(`${colors.bgBlue(`${initParam}:`)} ${msg}`);
  }
}

function warn(initParam, msg) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  writeErrorsStream.write(`${isoDate} ${initParam}:${msg}\n`);
  if (config.get("logLevel") === "info" || "warn") {
    console.error(`${colors.bgYellow(`${initParam}:`)} ${msg}`);
  }
}

function error(initParam, msg) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  writeErrorsStream.write(`${isoDate} ${initParam}: ${msg}\n`);
  if (config.get("logLevel") === "info" || "warn" || "error") {
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
