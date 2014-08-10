var models = require('../../models');
var ko = require('knockout');

function AdminViewModel() {
  var modelNames = Object.keys(models).map(function(name){
    return models[name].prototype.collection;
  });
  this.models = ko.observableArray(modelNames);
}

module.exports = AdminViewModel;
