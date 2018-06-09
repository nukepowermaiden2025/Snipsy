var express = require('express');
var router = express.Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

/* GET home page. */
router.get('/', function (req, res, next){
   // First, we grab the body of the html with request
   axios.get("https://www.npr.org/").then(function(response){
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article").each(function(i, element){
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children(".story-wrap")
        .children(".story-text")
        .children("a:first-of-type")
        .find("h3")
        .text();
      result.link = $(this)
        .children(".story-wrap")
        .children(".story-text")
        .children("a:first-of-type")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle){console.log(dbArticle)})
        .catch(function(err){res.json(err)});
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

module.exports = router;



// app.get("/scrape", function(req, res) {
   
//   });