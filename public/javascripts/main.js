// configure routes
var async = require('async');
var routes = require('./routes');
var currentViewModels = [];

var loadViewModels = function(viewModels){
  async.forEach(currentViewModels,function(viewModel,done){
    // TODO: should this be ko.cleanNode() instead?
    if(viewModel.tearDown){
      viewModel.tearDown(done);
    }
  },function(err){
    viewModels.forEach(function(ViewModel){
      ko.applyBindings(new ViewModel());
    });
  });
}

routes.forEach(function(route){
  if(route.path.test(window.location.pathname)){
    loadViewModels(route.viewModels);
  }
  // TODO: allow matching elements as well as paths?
});
