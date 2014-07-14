var gulp = require('gulp');
var wiredep = require('wiredep');
var startServer = require('./bin/www');
var path = require('path');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

// Bower install - updates index.ejs with the latest from your bower.json, along with your app scripts from bower.json.
gulp.task('bower-install', function(){
  wiredep({
    cwd: 'public',
    src: 'views/layout.ejs',
    ignorePath: '../public',
    devDependencies: true,
    includeSelf: true
  });
});

// Browserify - concatenates the browserify files and dumps them in app.js
gulp.task('browserify', function() {
  gulp.src(['public/javascripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('main.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('public/build/js'));
});

// Rebuild - re builds the dev environment
gulp.task('rebuild', ['browserify','bower-install']);

// Watch - watches files for changes and recompiles them.
gulp.task('watch',function(){
  gulp.watch([
    'public/javascripts/*.js','public/javascripts/**/*.js',
    'public/stylesheets/*.scss','public/stylesheets/**/*.scss',
    'views/*.ejs',
    'views/**/*.ejs'
  ], ['rebuild']);
});

// Serve - starts the express server
gulp.task('serve',['rebuild','watch'],function(){
  startServer(true);
});

// Default
gulp.task('default',['serve']);
