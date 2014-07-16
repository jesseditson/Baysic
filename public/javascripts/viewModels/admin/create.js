var helpers = require('./helpers');

function CreateItemAdminViewModel() {
  var Model = helpers.currentModel();
  var self = this;
  self.model = new Model();
  self.fields = helpers.parseSchema(self.model.schema);
  self.save = function(){
    self.model.save(function(saved){
      self.model = new Model(saved);
    },function(){
      console.error(arguments);
    });
  };
};

module.exports = CreateItemAdminViewModel;
