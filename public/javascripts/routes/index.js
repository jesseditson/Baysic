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

// admin
routes.push({
  selector : '#posts-admin',
  viewModel : require('../viewModels/admin/posts')
})
