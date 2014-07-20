var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var setupRoutes = require('./routes/index');

var app = express();

var FruitLoops = require('fruit-loops');
var _ = require('underscore');
var url = require('url');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(require('express-ejs-layouts'));
app.use(function(req,res,next){
  var originalRender = res.render;
  res.render = function(){
    var args = Array.prototype.slice.call(arguments);
    args[1] = _.extend(args[1] || {},{req : req});
    originalRender.apply(this,args);
  };
  next();
});
app.engine('ejs',function(filename,options,callback){
  var uri = url.parse(options.req.originalUrl);
  FruitLoops.page({
    index: filename,
    host : uri.host,
    path : uri.path,
    protocol : uri.protocol,
    resolver: function(href,page){
      console.log('href: ',href);
      return href;
    },
    callback: function(err,html){
      if(err){
        callback(err);
      } else {
        callback(null,html);
      }
    }
  });
});
app.set('view engine','ejs');
// app.engine('html', require('ejs').renderFile);

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
