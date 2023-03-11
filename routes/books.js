var express = require('express');
var router = express.Router();

const { Book } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

/* GET books listing. */

router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]]});
  res.render('layout', {data: books});
}));

router.post('/new', function(req, res, next) {
  res.render('new-book', { title: 'Express' });
});

router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  console.log(book);
  res.render('book', {data: book});
}));

router.post('/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/:id/delete', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
