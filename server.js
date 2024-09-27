const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const authController = require("./controllers/auth.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const isSignedIn = require("./middleware/is-signed-in.js");

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests

app.use(morgan('dev'));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
    })
  );
  
app.use("/auth", authController);



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

app.get("/", (req, res) => {
    res.render("index.ejs", {
      user: req.session.user,
    });
  });
app.use(
    "/vip-lounge",
    (req, res, next) => {
      if (req.session.user) {
        res.locals.user = req.session.user; // Store user info for use in the next function
        next(); // Proceed to the next middleware or controller
      } else {
        res.redirect("/"); // Redirect unauthenticated users
      }
    },
    // vipsController // The controller handling the '/vip-lounge' route
  );
  
  app.get("/vip-lounge", isSignedIn, (req, res) => {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  });
  
  
  