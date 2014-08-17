var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');

var setupRoutes = require('./routes/index');

var app = express();

var ejs = require('ejs');
var cp = require('child_process');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(require('express-ejs-layouts'));
app.use(function(req,res,next){
  res.locals.url = url.parse('http' + (req.connection.secure ? 's' : '') + '://' + req.headers.host + req.url);
  res.locals.headers = req.headers;
  next();
});
app.engine('ejs', function(filename,options,callback){
  if(/\/layout\.ejs$/.test(filename)){
    var oCallback = callback;
    callback = function(err,html){
      var client = cp.fork(path.join(__dirname,'lib/client.js'));
      client.send({
        url : options.url,
        html : html
      });
      client.on('message',function(output){
        oCallback(null,output)
      });
    };
  }
  ejs.renderFile(filename,options,callback);
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
