const dotenv = require("dotenv");
dotenv.config();
const logger = require("./utils/logger")("main");

logger.warn("warn message!");
logger.info("the script is running!");
logger.error("error: fail to running the script!");
