const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article-controller.js");
const noteController = require("../controllers/note-controller.js");

//Articles
// router.get("/", articleController.renderHomePage);

router.get("/", articleController.getArticles);

router.delete("/delete-article/:id", articleController.deleteArticle); //TODO

router.post("/save-article/:id", articleController.saveArticle); //TODO

router.get("/show-savedarticles", articleController.showSavedArticles); //TODO

router.get("/articles/:id", articleController.populateArticle); //

router.get("/scrape", articleController.scrapeArticles);

//Notes
router.post("/articles/:id", noteController.saveNote);

router.delete("/delete-note/:id", noteController.deleteNote);

router.put("/update-note/:id", noteController.updateNote);

module.exports = router;
