var express = require('express');
var router = express.Router();

var Twit = require('twit');

var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:query', function(req, res, next) {
  let query = req.params.query;
  T.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
    if (err) {
      res.json({'error': true, msg: err});
      return;
    }
    res.json(data);
  });
});

module.exports = router;
