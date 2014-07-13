var routes = module.exports = [];

// home
routes.push({
  path : /^\/?$/,
  viewModels : [
    require('../viewModels/home')
  ]
});


// artists
routes.push({
  path : /^\/artists$/i,
  viewModels : [
    require('../viewModels/artists')
  ]
});
