var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('layout');
});

router.get('/books', function(req, res, next) {
  res.render('form-error', { title: 'Express' });
});

router.post('/books/new', function(req, res, next) {
  res.render('new-book', { title: 'Express' });
});

router.get('/books/:id', function(req, res, next) {
  res.render('form-error', { title: 'Express' });
});

router.post('/books/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/books/:id/delete', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
