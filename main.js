const dotenv = require("dotenv");
dotenv.config();

const config = require("config");

const logger = require("./utils/logger")("main");

const logLevel = config.get("logLevel");

if (logLevel === "info") {
  logger.info("the script is running!");
  logger.error("error: fail to running the script!");
  logger.warn("warn message!");
} else if (logLevel === "error") {
  logger.error("error: fail to running the script!");
} else {
  logger.error("error: fail to running the script!");
  logger.warn("warn message!");
}
