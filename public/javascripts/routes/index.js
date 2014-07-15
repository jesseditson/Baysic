var routes = module.exports = [];

// home
routes.push({
  selector : '#home',
  viewModel : require('../viewModels/home')
});


// artists
routes.push({
  selector : '#artists',
  viewModel : require('../viewModels/artists')
});
