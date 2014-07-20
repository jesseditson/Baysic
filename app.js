var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var setupRoutes = require('./routes/index');

var app = express();

var ejs = require('ejs');
var benv = require('benv');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(require('express-ejs-layouts'));
app.engine('ejs', function(filename,options,callback){
  ejs.renderFile(filename,options,function(err,html){
    benv.setup(function(){
      document.documentElement.innerHTML = html;
      require('./public/javascripts/main');
      setTimeout(function(){
        callback(null,document.documentElement.innerHTML);
      },3000);
    });
  });
});
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('node-compass')({
  mode: 'expanded',
  css: 'build/css'
}));
app.use(express.static(path.join(__dirname, 'public')));

setupRoutes(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
