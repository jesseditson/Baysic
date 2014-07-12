var gulp = require('gulp');
var wiredep = require('wiredep');
var startServer = require('./bin/www');
var path = require('path');

// Bower install - updates index.ejs with the latest from your bower.json, along with your app scripts from bower.json.
gulp.task('bower-install', function(){
  wiredep({
    cwd: 'public',
    src: 'views/index.ejs',
    ignorePath: '../public',
    devDependencies: true,
    includeSelf: true
  });
});

// Rebuild - re builds the dev environment
gulp.task('rebuild', ['bower-install']);

// Serve - starts the express server
gulp.task('serve',['rebuild'],function(){
  startServer(true);
});
