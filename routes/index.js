var site = require('./site');
var admin = require('./admin');
var setupResources = require('./resources');

module.exports = function(app){
  // main site
  app.get('/',site.home);
  app.get('/artists',site.artists);

  // admin
  app.get('/admin',admin.home);
  app.get('/admin/posts',admin.posts);

  setupResources(app);
}
