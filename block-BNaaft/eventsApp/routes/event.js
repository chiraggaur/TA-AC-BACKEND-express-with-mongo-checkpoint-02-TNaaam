var express = require("express");
var router = express.Router();
var Event = require("../models/events");
/* GET events listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* Post events listing. */
router.post("/register", function (req, res, next) {
  let data = req.body;
  Event.create(data);
  res.send("registered successfully");
});

module.exports = router;
