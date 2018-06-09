var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/save-article/:id', function(req, res, next) {
  res.send('respond with a resource of saved article');
});

module.exports = router;