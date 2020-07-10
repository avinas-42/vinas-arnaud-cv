var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cv', function(req, res, next) {
  res.render('cv');
});

router.get('/pandesim', function(req, res, next) {
  res.render('pandesim');
});
module.exports = router;
