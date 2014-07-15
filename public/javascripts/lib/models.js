var reqwest = require('reqwest');

var wrapSuccess = function(success,response){
  var observableResponse = response;
  if(observableResponse){
    observableResponse = Array.isArray(observableResponse) ? ko.observableArray(observableResponse) : ko.observable(observableResponse);
  }
  success.call(this,observableResponse);
}

var generateModel = function(Model){
  var collection = Model.prototype.collection;
  Model.index = function(success,error){
    reqwest({
      url : '/api/' + collection,
      type : 'json',
      method : 'get',
      success : wrapSuccess.bind(this,success),
      error : error
    });
  };
  Model.show = function(id,success,error){
    reqwest({
      url : '/api/' + collection + '/' + id,
      type : 'json',
      method : 'get',
      success : wrapSuccess.bind(this,success),
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
      success : wrapSuccess.bind(this,success),
      error : error
    });
  };
  Model.prototype.destroy = function(success,error){
    reqwest({
      url : '/api/' + collection + '/' + this._id,
      type : 'json',
      method : 'delete',
      success : wrapSuccess.bind(this,success),
      error : error
    });
  };
  return Model;
};

module.exports = {
  Post : generateModel(require('../../../models/Post')),
  User : generateModel(require('../../../models/User'))
}
