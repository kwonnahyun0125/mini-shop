var createError = require('http-errors');
var express = require('express');
var logger = require('./utils/logger');
var requestTime = require('./utils/requestTime');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var DocumentsRouter = require('./routes/Documents');



var app = express();


app.use(requestTime);
app.use(logger);
app.use(express.json());

// Documents/files/test.jpg
app.use('/Documents/files', express.static('uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/Documents/files', express.static('uploads'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send('ERROR: ' + err.message);
   
  });
module.exports = app;
