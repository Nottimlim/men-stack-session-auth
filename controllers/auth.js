const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
module.exports = router;

router.get("/sign-up", async (req, res) => {
    res.render("auth/sign-up.ejs");
    const userInDatabase = await User.findOne({ username: req.body.username });
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    es.send(`Thanks for signing up ${user.username}`);
    req.body.password = hashedPassword;
    if (userInDatabase) {
    return res.send("Username already taken.");
    if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }
}});
  
  router.post("/sign-up", async (req, res) => {
    res.send("Form submission accepted!");
  });