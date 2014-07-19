var helpers = require('./lib/helpers');

function AdminIndexViewModel() {
  var Model = helpers.currentModel();
  var self = this;
  self.items = ko.observableArray();
  self.collection = helpers.currentCollection();
  self.remove = function(info){
    if(confirm('Are you sure you want to delete this item? This cannot be undone.')){
      var item = new Model(info);
      item.destroy(function(){
        reload();
      },function(){
        console.error(arguments);
      });
    }
  };

  var reload = function(){
    Model.index(function(items){
      self.items(items);
    },function(){
      console.error(arguments);
    });
  }

  reload();
}

module.exports = AdminIndexViewModel;
