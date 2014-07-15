var reqwest = require('reqwest');

var generateModel = function(Model){
  var collection = Model.collection;
  Model.index = function(success,error){
    reqwest({
      url : '/api/' + collection,
      type : 'json',
      method : 'get',
      success : success,
      error : error
    });
  };
  Model.show = function(id,success,error){
    reqwest({
      url : '/api/' + collection + '/' + id,
      type : 'json',
      method : 'get',
      success : success,
      error : error
    });
  };
  Model.prototype.save = function(success,error){
    method = !!this._id ? 'put' : 'post';
    reqwest({
      url : '/api/' + collection,
      type : 'json',
      method : method,
      data : ko.toJSON(this),
      success : success,
      error : error
    });
  };
  Model.prototype.destroy = function(success,error){
    reqwest({
      url : '/api/' + collection + '/' + this._id,
      type : 'json',
      method : 'delete',
      success : success,
      error : error
    });
  };
  console.log(Model);
  return Model;
};

module.exports = {
  Post : generateModel(require('../../../models/Post')),
  User : generateModel(require('../../../models/User'))
}
