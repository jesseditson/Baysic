var helpers = require('./helpers');

function AdminIndexViewModel() {
  var Model = helpers.currentModel();
  var self = this;
  self.items = ko.observableArray();
  self.collection = helpers.currentCollection();

  // retrieve info
  Model.index(function(items){
    self.items(items);
  },function(){
    console.error(arguments);
  });
}

module.exports = AdminIndexViewModel;
