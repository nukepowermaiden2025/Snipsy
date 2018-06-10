const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

/* GET home page. */

router.get('/',function(req,res, next){
    db.Article.find({})
    .then(function(dbArticle){
        var hbsObject = {
            dbArticle: dbArticle
          };
          console.log(hbsObject);
        res.render('index', hbsObject)

    })
    .catch(function(err){res.json(err)})

});


module.exports = router;