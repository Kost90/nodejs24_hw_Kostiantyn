const dotenv = require("dotenv");
dotenv.config();

const http = require("http");

const logger = require("./utils/logger")("server");

const port = 3001;

const srv = http.createServer();

srv.listen(port);

srv.on("listening", () => logger.info(`Server listening on port [${port}]`));

srv.on("request", (req, res) => {
  res.setHeader("content-type", "text/html");

  //   Check endpoint
  if (req.url === "/healthcheck") {
    // Check request method
    if (req.method === "GET") {
      res.statusCode = 200;
      res.write("healthcheck passed");
      res.end();
      logger.info(`{${req.method}} {${req.url}} {${res.statusCode}}`);
      return;
    }
  } else {
    // For all other endpoints
    res.statusCode = 404;
    res.end();
    logger.warn(`{${req.method}} {${req.url}} {${res.statusCode}}`);
    return;
  }
});
