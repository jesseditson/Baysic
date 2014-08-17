var selectElements = require('qwery');
var domready = require('domready');
var routes = require('./routes');
var async = require('async');
var eggs = require('eggs');
var currentRoutes, currentViewModels, currentElements;

var reloadViewModels = function(){
  (currentRoutes || []).forEach(function(info){
    selectElements(info.route.selector).forEach(function(element){
      eggs.unbind(info.viewModel,element);
    });
  });
  currentRoutes = [];
  routes.forEach(function(route){
    selectElements(route.selector).forEach(function(element){
      currentRoutes.push({route : route, element : element});
    });
  });
  async.forEach(Object.keys(currentRoutes),function(idx,ready){
    var info = currentRoutes[idx];
    var vm = new (info.route.viewModel)(ready);
    currentRoutes[idx].viewModel = vm;
    eggs.bind(vm,info.element,{ attr : 'data-bind' });
  },function(){
    console.log('completed loading all routes.');
    // all routes loaded and prepared.
    if(typeof window.ready === 'function'){
      window.ready();
    }
  });
};

domready(reloadViewModels);
