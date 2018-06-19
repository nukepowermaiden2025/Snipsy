const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// Require all models
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Snipsy";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

mongoose.connect("mongodb://localhost/Snipsy");

// Use morgan logger for logging requests& bodyparser middleware as well
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// Use static directory
app.use(express.static("public"));

//Set View engine to handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
//NEW
const appRoutes = require("./routes/appRoutes");
app.use("/", appRoutes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
