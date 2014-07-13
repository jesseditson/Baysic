var site = require('./site');
var setupResources = require('./resources');

module.exports = function(app){
  app.get('/',site.home);
  app.get('/artists',site.artists);
  setupResources(app);
}
