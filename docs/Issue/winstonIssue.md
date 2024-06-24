### Summary of Winston Issues, Causes, and Solutions

#### Issues Faced

1. **Winston logger not logging messages to the console and files.**
2. **Errors indicating undefined properties when attempting to use `logger.info`.**
3. **Errors related to invalid transport configurations.**

#### Causes

1. **Improper Setup and Configuration**: The initial setup did not correctly instantiate and configure Winston transports.
2. **Incorrect Exporting and Importing**: The logger instance was not properly exported from the `logging.js` file and consequently was undefined when imported in `index.js`.
3. **Incorrect Handling of Transports**: Incorrect usage of `winston.add` method and misconfiguration of exception handling.

#### Solutions

1. **Correctly Instantiate and Configure the Logger**:

   - Use `winston.createLogger` to create a logger instance.
   - Properly set up transports to log to both files and the console.
   - Ensure transports are configured with the correct format and log levels.

2. **Properly Handle Exceptions and Rejections**:

   - Use `winston.exceptions.handle` to manage uncaught exceptions.
   - Use `process.on('unhandledRejection', ...)` to handle unhandled promise rejections by throwing them as exceptions.

3. **Ensure Proper Export and Import**:

   - Export the configured logger instance from `logging.js`.
   - Import and use the logger instance in `index.js`.

#### Final `logging.js` Configuration

```js
const winston = require("winston");
require("express-async-errors");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

winston.exceptions.handle(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.prettyPrint()
    ),
  }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

module.exports = logger;
```

#### Final `index.js` Usage

```js
const express = require("express");
const app = express();
const logger = require("./startup/logging"); // Import the logger

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  logger.info(`Listening on port ${port}...`); // Use the logger
});

module.exports = server;
```

### Conclusion

By correctly setting up Winston, properly configuring transports, and ensuring the logger instance is correctly exported and imported, you can effectively log messages and handle exceptions in your Node.js application. This setup ensures that logs are properly recorded to both console and file outputs, providing robust logging capabilities for your application.
