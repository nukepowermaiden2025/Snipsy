const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

/* GET home page. */
// exports.renderHomePage = function(req, res) {
//   res.redirect("/");
// };

exports.getArticles = function(req, res, next) {
  db.Article.find({})
    .then(function(dbArticle) {
      var hbsObject = {
        dbArticle: dbArticle
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
};

exports.deleteArticle = function(req, res, next) {
  //TODO
  res.send("respond with a deleted article from saved articles");
}; //TODO

exports.saveArticle = function(req, res, next) {
  db.Article.findOneAndUpdate(
    { _id: req.params.id },
    { note: dbNote._id },
    { new: true } //return the newest change
  );

  res.send("respond with a resource of saved article");
}; //TODO

exports.showSavedArticles = function(req, res, next) {
  res.send("respond with a resource of all saved articles");
}; //TODO

exports.populateArticle = function(req, res, next) {
  db.Article.findOne({ _id: req.params.id })

    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
};

exports.scrapeArticles = function(req, res, next) {
  // First, we grab the body of the html with request
  axios.get("https://www.npr.org/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
      // Save an empty result object
      let result = {};

      // Add the text,href,summary in the obj
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

      result.summary = $(this)
        .children(".story-wrap")
        .children(".story-text")
        .children("a:nth-of-type(2)")
        .find("p")
        .text();

      result.img = $(this)
        .children(".story-wrap")
        .children(".thumb-image")
        .children(".bucketwrap.homeThumb")
        .children(".imagewrap")
        .children("a")
        .find("img")
        .attr("alt");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.redirect("/");
  });
};
