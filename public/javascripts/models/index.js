var reqwest = require('arequest');
var models = require('../../../lib/models');
var url = require('url');

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
      url : url.resolve(window.location.href,'/api/' + collection),
      type : 'json',
      method : 'get',
      success : success,
      error : error
    });
  };
  Model.show = function(id,success,error){
    reqwest({
      url : url.resolve(window.location.href,'/api/' + collection + '/' + id),
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
      url : url.resolve(window.location.href,'/api/' + collection + (data._id ? '/' + data._id : '')),
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
      url : url.resolve(window.location.href,'/api/' + collection + '/' + data._id),
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
