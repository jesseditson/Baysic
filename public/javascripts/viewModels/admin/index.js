var models = require('../../models');
var url = require('url');

function AdminIndexViewModel() {
  var currentList = url.parse(window.location.href).pathname.split('/').pop();
  var model = Object.keys(models).reduce(function(previous,name){
    var model = models[name];
    return (model.prototype.collection == currentList.toLowerCase()) ? model : previous;
  });
  var self = this;
  self.items = ko.observableArray();
  model.index(function(items){
    self.items(items);
  },function(){
    console.error(arguments);
  });
}

module.exports = AdminIndexViewModel;
