const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello mUkesh Kumar this is great step by you ");
});

///post with the help of this we save the data
//get with the help of this we get data .

//these operations of model are basically api

//creating api for getting  data and saving created from front end

//There are many HTTP methods when request by front end then server will data as per the requsey from the servere , it is same place where we will gve data from databases , api by uisng middleware.

//Get method to get the Data

//we cannot set endpoints for each and every link , better we are using in ters of params or parameters

//api for menu

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuRoutes = require("./routes/menuItemRoutes");
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`The app is running at http://localhost:${PORT}`);
});
