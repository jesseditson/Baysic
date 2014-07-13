var Model = require('./Model.js');

var Post = module.exports = new Model('Post',{
  title : {
    type : String
  },
  body : {
    type : String
  }
});
