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

/* GET all book listings. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]]});
  res.render('layout', {data: books});
}));


/* GET create new book form */
router.get('/new', function(req, res, next) {
  res.render('new-book', { title: 'Express' });
});

/* POST create new book page */
router.post('/new', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});

/* GET single book listing */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  // console.log(book);
  res.render('book', {data: book});
}));

/* UPDATE update book info */
router.post('/:id', function(req, res, next) {
  res.render('book', { title: 'Express' });
});

/* Delete book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("delete", { book, title: "Delete Book" });
  } else {
    res.sendStatus(404);
  }
}));

/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;