var site = require('./site');
var admin = require('./admin');
var setupResources = require('./resources');
var models = require('../lib/models');

module.exports = function(app){
  // main site
  app.get('/',site.home);
  app.get('/artists',site.artists);

  // admin
  app.get('/admin',admin.home);
  Object.keys(models).forEach(function(name){
    var model = models[name];
    app.get('/admin/' + model.prototype.collection,admin.index);
  });

  setupResources(app);
}
