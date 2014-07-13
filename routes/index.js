var site = require('./site');
var setupResources = require('./resources');

module.exports = function(app){
  app.get('/',site.home);
  setupResources(app);
}
