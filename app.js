var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize = require('sequelize');
const pug = require('pug');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

var usersRouter = require('./routes/books');

var app = express();

app.get('/', function(req, res) {
  res.redirect('/books');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', usersRouter);

console.log('hi')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error();
  err.status = 404;
  err.message = "This page was not found.";
  res.render('page_not_found');
  return;
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Test Connection and Sync Tables
(async () => {
  await sequelize.sync({force: true});
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

module.exports = app;
