var helpers = require('./helpers');

function CreateItemAdminViewModel() {
  var Model = helpers.currentModel();
  var self = this;
  var newModel = new Model();
  self.model = ko.observable(newModel);
  self.fields = helpers.parseSchema(newModel.schema);
  self.save = function(){
    self.model().save(function(saved){
      self.model(new Model(saved));
      window.location = '/admin/' + Model.collection + '/' + saved._id;
    },function(){
      console.error(arguments);
    });
  };
};

module.exports = CreateItemAdminViewModel;
