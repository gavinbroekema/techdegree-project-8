var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});

router.post('/new', function(req, res, next) {
  res.render('new-book', { title: 'Express' });
});

router.get('/:id', function(req, res, next) {
  res.render('form-error', { title: 'Express' });
});

router.post('/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/:id/delete', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
