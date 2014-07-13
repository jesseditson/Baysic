var Model = require('./Model.js');

var User = module.exports = new Model('User',{
  username : {
    type : String
  },
  email : {
    type : String
  }
});
