const express = require("express");
const pagesRouter = express.Router();
const usersServices = require("../services/usersServices");

pagesRouter.get("/", (req, res) => {
  const usersList = usersServices.getUserList();
  res.render("index", { usersList });
});

module.exports = pagesRouter;
