var reqwest = require('reqwest');
var models = require('../../../lib/models');

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
    var data = this.toObject();
    method = !!data._id ? 'put' : 'post';
    reqwest({
      url : '/api/' + collection + (data._id ? '/' + data._id : ''),
      type : 'json',
      method : method,
      data : data,
      success : success,
      error : error
    });
  };
  Model.prototype.destroy = function(success,error){
    var data = this.toObject();
    reqwest({
      url : '/api/' + collection + '/' + data._id,
      type : 'json',
      method : 'delete',
      success : success,
      error : error
    });
  };
  return Model;
};

module.exports = Object.keys(models).reduce(function(map,name){
  var model = models[name];
  map[name] = generateModel(model);
  return map;
},{});
