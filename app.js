const express = require("express");
const bodyParser = require("body-parser");

const foodRouter = require("./routes/foodRoutes");
const farmerRouter = require("./routes/farmerRoutes");

const app = express();

// Middleware to parse user information
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/commodity", foodRouter);
app.use("/api/v1/farmer", farmerRouter);

module.exports = app;
