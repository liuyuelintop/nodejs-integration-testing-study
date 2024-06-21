const express = require("express");
const genres = require("../routes/genres");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/users", users);
};
