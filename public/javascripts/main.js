var selectElements = require('qwery');
var domready = require('domready');
var ko = require('knockout');
var routes = require('./routes');
var async = require('async');
var currentRoutes, currentViewModels, currentElements;

var reloadViewModels = function(){
  (currentRoutes || []).forEach(function(info){
    selectElements(info.route.selector).forEach(function(element){
      ko.cleanNode(element);
    });
  });
  currentRoutes = [];
  routes.forEach(function(route){
    selectElements(route.selector).forEach(function(element){
      currentRoutes.push({route : route, element : element});
    });
  });
  async.forEach(currentRoutes,function(info,ready){
    ko.applyBindings(new (info.route.viewModel)(ready),info.element);
  },function(){
    console.log('completed loading all routes.');
    // all routes loaded and prepared.
    if(typeof window.ready === 'function'){
      window.ready();
    }
  });
};

domready(reloadViewModels);
