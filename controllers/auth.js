const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
module.exports = router;

router.get("/sign-up", async (req, res) => {
    res.render("auth/sign-up.ejs");
    const userInDatabase = await User.findOne({ username: req.body.username });
if (userInDatabase) {
  return res.send("Username already taken.");
}
  });
  
  router.post("/sign-up", async (req, res) => {
    res.send("Form submission accepted!");
  });