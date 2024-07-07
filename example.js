// this is server file with proper commenting done with  help  of  chatgpt

// Import necessary modules
const express = require("express");
const app = express();
const db = require("./db"); // Import your database connection file
require("dotenv").config(); // Load environment variables from a .env file
const bodyParser = require("body-parser");
const passport = require("./auth"); // Import your authentication setup

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to log each request to the console
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Requests Made to: ${req.originalUrl}`
  );
  next(); // Call next() to pass control to the next middleware function
};

// Use the logRequest middleware for all routes
app.use(logRequest);

// Middleware for local authentication using Passport.js
const localAuthMiddleware = passport.authenticate("local", { session: false });

// Simple route to serve the home page
app.get("/", (req, res) => {
  res.send("Welcome to our Hotels");
});

// Initialize Passport.js middleware
app.use(passport.initialize());

// Import route handlers
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuItemRoutes");

// Use the imported route handlers for specific paths
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`The app is running at http://localhost:${PORT}`);
});
