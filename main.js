const dotenv = require("dotenv");
dotenv.config();
const logger = require("./utils/logger")("main");
const fileSync = require("./file_sync")();

fileSync.start();
