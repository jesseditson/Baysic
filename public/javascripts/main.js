var selectElements = require('qwery');
var domready = require('domready');
var routes = require('./routes');
var models = require('./lib/models');
var currentRoutes = [];

var reloadViewModels = function(){
  currentRoutes.forEach(function(route){
    selectElements(route.selector).forEach(function(element){
      ko.cleanNode(element);
    });
  });
  routes.forEach(function(route){
    selectElements(route.selector).forEach(function(element){
      currentRoutes.push(route);
      ko.applyBindings(route.viewModel,element);
    });
  });
};

domready(reloadViewModels);
