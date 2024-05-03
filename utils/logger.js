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
  fs.writeFile(logsInfoPath, "", (error) => {
    throw error;
  });
  fs.writeFile(logsErrorsPath, "", (error) => {
    throw error;
  });
}

// ! створюємо стріми
const writeInfoStream = fs.createWriteStream(logsInfoPath);
const writeErrorsStream = fs.createWriteStream(logsErrorsPath);

writeInfoStream.on("error", (error) => {
  console.error(
    `${colors.bgRed(`Error writing to the destination file:`)} ${error}}`
  );
});

writeInfoStream.on("finish", () => {
  console.log("Data has been written to the destination file.");
});

writeErrorsStream.on("error", (error) => {
  console.error(
    `${colors.bgRed(`Error writing to the destination file:`)} ${error}}`
  );
});

writeErrorsStream.on("finish", () => {
  console.log("Data has been written to the destination file.");
});

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
  const isoDate = currentDate.toISOString().split("T")[0];

  writeInfoStream.write(`${isoDate} ${initParam}: ${msg}\n`);

  if (config.get("logLevel") === "info") {
    console.log(`${colors.bgBlue(`${initParam}:`)} ${msg}`);
  }
}

function warn(initParam, msg) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString().split("T")[0];
  writeErrorsStream.write(`${isoDate} ${initParam}:${msg}\n`);
  if (config.get("logLevel") === "info" || "warn") {
    console.error(`${colors.bgYellow(`${initParam}:`)} ${msg}`);
  }
}

function error(initParam, msg) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString().split("T")[0];
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
