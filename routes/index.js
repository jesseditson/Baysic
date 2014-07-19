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
    var Model = models[name];
    var collection = Model.prototype.collection;
    app.get('/admin/' + collection,admin.index);
    app.get('/admin/' + collection + '/create',admin.create);
    app.get('/admin/' + collection + '/:id',admin.update);
  });

  setupResources(app);
}
