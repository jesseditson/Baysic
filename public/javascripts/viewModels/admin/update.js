var helpers = require('./lib/helpers');
var installRichText = require('./lib/installRichText');

function UpdateItemAdminViewModel() {
  var Model = helpers.currentModel();
  var self = this;
  var newModel = new Model();
  self.model = ko.observable(newModel);
  self.fields = helpers.parseSchema(newModel.schema);
  Model.show(helpers.currentID(),function(info){
    self.model(new Model(info));
  },function(err){
    console.error(err);
  });
  self.save = function(){
    self.model().save(function(saved){
      self.model(new Model(saved));
    },function(){
      console.error(arguments);
    });
  };
  installRichText('.rich-text');
};

module.exports = UpdateItemAdminViewModel;
