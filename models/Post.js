var Model = require('./Model.js');

var Post = module.exports = new Model('Post',{
  _id : {
    type : String,
    editable : false
  },
  title : {
    type : String
  },
  body : {
    type : String
  }
});
