var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/save-article/:id', function(req, res, next) {
  db.Article.findOneAndUpdate(
    { _id: req.params.id },
    { note: dbNote._id }, 
    { new: true }//return the newest change
);;

  
  res.send('respond with a resource of saved article');
});

module.exports = router;
db.Article.findOneAndUpdate(
    { _id: req.params.id },
    { note: dbNote._id }, 
    { new: true }//return the newest change
);
