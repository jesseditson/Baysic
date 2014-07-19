var Model = require('./Model.js');

var Post = module.exports = new Model('Post',{
  _id : {
    type : 'Any',
    editable : false
  },
  title : {
    type : String
  },
  body : {
    text: true,
    type : String
  }
});
