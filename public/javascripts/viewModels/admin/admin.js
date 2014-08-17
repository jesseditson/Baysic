var ko = require('knockout');
var models = require('../../models');

function AdminViewModel(ready) {
  var modelNames = Object.keys(models).map(function(name){
    return models[name].prototype.collection;
  });
  this.models = ko.observableArray(modelNames);
  ready();
}

module.exports = AdminViewModel;
