const express = require("express");
const app = express();

const logger = require("./startup/logging"); // Import the logger
logger.info("Winston logging initialized..."); // Use logger.info

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  logger.info(`Listening on port ${port}...`); // Use logger.info
});

module.exports = server;
