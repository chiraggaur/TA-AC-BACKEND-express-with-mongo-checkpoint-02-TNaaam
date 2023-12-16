const express = require("express");
const Router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// Router.get("/", (req, res, next) => {
//   console.log(req.session);
//   res.render();
// });
Router.get("/", async (req, res) => {
  res.send({
    token: req.token,
    message: "check if token comes",
  });
});
Router.get("/login", async (req, res) => {
  let error = req.flash("warning")[0];
  res.send(error);
});

Router.post("/register", async (req, res, next) => {
  try {
    let data = req.body;
    await User.create(data);
    res.send("Database created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

Router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("warning", "Email/Password Field is missing");
      return res.redirect("/api/user/login");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not registered");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match - login successful
      // You can create a session or generate a token here

      // session based authentication
      // set unique userid to session
      // req.session.userId = user._id;
      // res.redirect("/api/user/"); // how to send this to browzerfrom frontend side

      // Token based authentication
      // generating authentication

      async function jwtSign() {
        var payload = { email: email, password: password };
        try {
          var Token = jwt.sign(payload, process.env.SECRET);
          return Token;
        } catch (err) {
          return err;
        }
      }

      let token = jwtSign();
      console.log(token);
    } else {
      // Passwords do not match
      return res.status(401).send("Incorrect password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = Router;
