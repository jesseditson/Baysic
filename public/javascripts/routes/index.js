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
  selector : '#admin-menu',
  viewModel : require('../viewModels/admin/admin')
});

routes.push({
  selector : '#admin-index',
  viewModel : require('../viewModels/admin/index')
});

routes.push({
  selector : '#admin-create',
  viewModel : require('../viewModels/admin/create')
});

routes.push({
  selector : '#admin-update',
  viewModel : require('../viewModels/admin/update')
});
