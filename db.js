const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/db";

mongoose.connect(mongoURL);

//get the default connection
//mongoose maintains default connection object representing mongoDb connection

const db = mongoose.connection;

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
