require("dotenv").config();

const { port } = require("config");

const express = require("express");
const accessLogger = require("./utils/morganLogger");

const cors = require("cors");
const userRoutes = require("./routes/users");
const pagesRouter = require("./routes/pages");
const logger = require("./utils/logger")("express srv");

const app = express();

app.listen(port, () => logger.info(`server is listening on [${port}] port`));

app.set("view engine", "pug");

app.use(cors());
app.use(express.json());

app.use(accessLogger);

app.use(express.static("static"));

app.use("/users", userRoutes);

app.use("/", pagesRouter);
