var Model = require('./Model.js');

var User = module.exports = new Model('User',{
  _id : {
    editable : false
  },
  username : {
    type : String
  },
  email : {
    type : String
  }
});
