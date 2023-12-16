const express = require("express");
var router = express.Router();
var Remark = require("../models/remarks");
/* GET all remarks page. */

router.get("/", function (req, res, next) {
  //   res.render("respond with a resource");
  console.log("testing");
});
router.post("/add", function (req, res, next) {
  let data = req.body;
  Remark.create(data);
  //   res.render(data.author);
  console.log("data Rendered");
});

module.exports = router;
