var helpers = require('./helpers');

function CreateItemAdminViewModel() {
  var Model = helpers.currentModel();
  this.model = new Model();
  console.log(this.model);
}

module.exports = CreateItemAdminViewModel;
