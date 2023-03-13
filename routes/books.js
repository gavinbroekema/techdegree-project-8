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
  res.render('new-book');
});

/* POST create new book page */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    if(req.body.title === "" && req.body.author === "") {
      res.render('new-book', {error: true})
    } else {
      await book.update(req.body);
      res.redirect("/"); 
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("/new")
    } else {
      throw error;
    }  
  }
}));

/* GET single book listing */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  // console.log(book);
  res.render('book', {data: book});
}));

/* GET - update book form. */
router.get("/:id/update", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("update-book", { book, title: "Delete Book" });
  } else {
    res.sendStatus(404);
  }
}));

/* POST - update book info */
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      if(req.body.title !== "" && req.body.author !== "") {
        await book.update(req.body);
        res.redirect("/"); 
      } else {
        res.render('update-book', {error: true})
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("/")
    } else {
      throw error;
    }
  }
}));

/* GET - delete book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("delete", { book, title: "Delete Book" });
  } else {
    res.sendStatus(404);
  }
}));

/* POST - delete individual book. */
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