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
const all= require("./routes/all.js")
const scrape= require("./routes/scrape.js");
const populate= require("./routes/populate.js");
// const saveArticle = require("./routes/saveArticle.js")//TODO
// const saved = require("./routes/saved.js");//TODO
// const deleteArticle = require("./routes/deleteArticle.js")//TODO

const saveNote= require("./routes/saveNote.js")
// const deleteNote= require("./routes/deleteNote.js") //TODO


const index= require("./routes/index.js");//TODO- makehomepage


app.use("/articles",all);
app.use("/scrape",scrape);
app.use(populate);
// app.use("/saved",saved);
// app.use(saveArticle);
// app.use(deleteArticle);

app.use(saveNote);
// app.use(deleteNote);



app.use("/",index);




// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
