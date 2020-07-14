var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cv', function(req, res, next) {
  var ua = req.header('user-agent');
  // Check the user-agent string to identyfy the device. 
  if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
    res.render('cv', {isMobile: true});
  } else {
    res.render('cv', {isMobile: false});
  }
  
});

router.get('/pandesim', function(req, res, next) {
  res.render('pandesim');
});
module.exports = router;
