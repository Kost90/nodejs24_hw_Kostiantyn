require("dotenv").config();

const { port } = require("config");

const express = require("express");
const accessLogger = require("./utils/morganLogger");

const userRoutes = require("./routes/users");
const logger = require("./utils/logger")("express srv");

const app = express();

app.listen(port, () => logger.info(`server is listening on [${port}] port`));

app.use(express.json());

app.use(accessLogger);

app.use("/users", userRoutes);
