var models = require('../../models');

function AdminViewModel(ready) {
  var modelNames = Object.keys(models).map(function(name){
    return models[name].prototype.collection;
  });
  this.models = [];
  ready();
}

module.exports = AdminViewModel;
