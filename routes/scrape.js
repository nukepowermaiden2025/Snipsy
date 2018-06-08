const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

/* GET home page. */
router.get('/', (req, res, next)=> {
   // First, we grab the body of the html with request
   axios.get("http://www.echojs.com/").then((response)=> {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each((i, element)=> {
      // Save an empty result object
      const result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then((dbArticle)=> console.log(dbArticle))
        .catch((err)=> res.json(err));
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

module.exports = router;



// app.get("/scrape", function(req, res) {
   
//   });