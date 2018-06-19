const express = require("express");
const router = express.Router();
const db = require("../models");

exports.saveNote = function(req, res, next) {
  //Add the body from the form
  db.Note.create(req.body)
    .then(function(dbNote) {
      //find the Article and update that particular note
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true } //return the newest change
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    }) //send back the updated article
    .catch(function(err) {
      res.json(err);
    });
};

exports.deleteNote = function(req, res, next) {
  res.send("respond with a deleted Note");
}; //TODO

exports.updateNote = function(req, res, next) {
  res.send("respond with an updated Notes.");
}; //TODO
