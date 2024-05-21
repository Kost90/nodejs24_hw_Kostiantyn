const express = require("express");
const router = express.Router();
const validateUserData = require("../midleware/validators");
const UserIdChecker = require("../midleware/userIdChecker");

router.get("/", (req, res) => {
  const result = [];
  res.send(result);
});
router.post("/user", validateUserData, (req, res) => {
  res.send("User created");
});
router.get("/user/:userId", UserIdChecker, (req, res) => {
  const userId = res.body;
  res.send({ userId: userId });
});
router.delete("/user/:userId", UserIdChecker, (req, res) => {
  res.status(204);
});

module.exports = router;
