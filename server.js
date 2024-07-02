const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const passport = require("./auth");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//middleware 

const logRequest = (req, res, next) => {
  console.log(
    `  ${new Date().toLocaleString()}  Requests Made  to : ${req.originalUrl} `
  );

  next(); // inthe case of Midlleware next function calling is very important always.
  //very importany To skip the rest of the middleware functions from a router middleware stack, call next('route') to pass control to the next route. NOTE: next('route') will work only in middleware functions that were loaded by using the app.METHOD() or router.METHOD() functions.
};

app.use(logRequest);

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to our Hotels "); 
});

///post with the help of this we save the data
//get with the help of this we get data .

//these operations of model are basically api

//creating api for getting  data and saving created from front end

//There are many HTTP methods when request by front end then server will data as per the requsey from the servere , it is same place where we will gve data from databases , api by uisng middleware.

//Get method to get the Data

//we cannot set endpoints for each and every link , better we are using in ters of params or parameters

//api for menu

app.use(passport.initialize());

const personRoutes = require("./routes/personRoutes");

app.use("/person", localAuthMiddleware, personRoutes);

const menuRoutes = require("./routes/menuItemRoutes");


app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`The app is running at http://localhost:${PORT}`);
});

//mongodb://127.0.0.1:27017/db




