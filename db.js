const mongoose = require("mongoose");
require("dotenv").config();

//const mongoURL = "mongodb://127.0.0.1:27017/db"; //this is local database connection url

//This is local server Url
//when you want to save this to onlien Mongodb free server or   paid server than you can use this

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);

//get the default connection
//mongoose maintains default connection object representing mongoDb connection

const db = mongoose.connection;
//helelo

//define event listeneers for database connection
db.on("connected", () => {
  console.log("MongoDb Data base is connected");
});

db.on("error", (error) => {
  console.log("MongoDB connection error", error);
});

db.on("disconnected", () => {
  console.log("MongoDb Connection Disconnected");
});

//Exports  the Dabases connection

module.exports = db;
