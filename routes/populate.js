const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");


// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id",function(req,res,next){
  db.Article.findOne({ _id:req.params.id})
  
    .populate("note")
    .then(function(dbArticle) {
      
      res.json(dbArticle);
    })
    .catch(function(err) {
   
      res.json(err);
    });
});
    
module.exports = router


//FROM SERVER

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   db.Article.findOne({ _id: req.params.id })
//     // ..and populate all of the notes associated with it
//     .populate("note")
//     .then(function(dbArticle) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });