var express = require('express');
var router = express.Router();

/* GET users listing. */
router.delete('/delete-article/:id', function(req, res, next) {
  res.send('respond with a deleted article from saved articles');
});

module.exports = router;