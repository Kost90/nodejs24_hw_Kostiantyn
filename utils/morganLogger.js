const morgan = require("morgan");
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

  const consoleLogger = morgan(':date :method :url :status');
  const streamLogger = morgan(':date :method :url :status',{stream:writeInfoStream});

  function accessLogger(tokens, req, res){
    consoleLogger(tokens, req, res);
    streamLogger(tokens, req, res);
  }

  module.exports = accessLogger;
