const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");


router.post("/articles/:id",(req,res,next)=>{
    //Add the body from the form
    db.Note.create(req.body)
    .then((dbNote)=>{
        //find the Article and update that particular note
    return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id }, 
        { new: true }//return the newest change
        );
    })
    .then((dbArticle)=>res.json(dbArticle))//send back the updated article
    .catch((err)=>res.json(err))

});


module.exports = router;

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//       .then(function(dbNote) {
//         // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//         // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//         // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//         return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//       })
//       .then(function(dbArticle) {
//         // If we were able to successfully update an Article, send it back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });