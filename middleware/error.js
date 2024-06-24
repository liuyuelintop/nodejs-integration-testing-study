const logger = require("../startup/logging");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err); // 使用 logger.error 记录错误信息

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
};
