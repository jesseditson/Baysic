var models = require('../../models');
var url = require('url');

var helpers = module.exports = {};

var currentCollection = helpers.currentCollection = function(){
  var match = url.parse(window.location.href).pathname.match(/\/admin\/([^\/]+)/);
  return match ? match[1] : null;
};

helpers.currentModel = function(){
  var collection = currentCollection();
  var model = Object.keys(models).reduce(function(previous,name){
    var model = models[name];
    return (model.prototype.collection == collection) ? model : previous;
  },{});
  return model;
};
