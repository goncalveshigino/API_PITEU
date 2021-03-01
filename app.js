var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var usersRouter = require('./src/routes/users.router');
var productsRouter = require('./src/routes/product.router');

//var categoryRouter = require('./src/routes/product.router');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
//app.use('/api/category', categoryRouter);
module.exports = app;