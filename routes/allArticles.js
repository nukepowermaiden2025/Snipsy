const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

/* GET home page. */

router.get('/',(req,res, next)=>{
    db.Article.find({})
    .then((dbArticle)=>res.json(dbArticle))
    .catch((err)=>res.json(err))

});






module.exports = router;