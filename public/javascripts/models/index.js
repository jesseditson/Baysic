var reqwest = require('reqwest');
var models = require('../../../lib/models');

var wrapSuccess = function(success,response){
  var observableResponse = response;
  if(observableResponse){
    observableResponse = Array.isArray(observableResponse) ? ko.observableArray(observableResponse) : ko.observable(observableResponse);
  }
  success.call(this,observableResponse);
}

var getJS = function(model){
  var object = Object.keys(model).reduce(function(o,key){
    if(model[key]){
      o[key] = model[key]();
    }
    return o;
  },{});
  return object;
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
    method = !!this._id ? 'put' : 'post';
    reqwest({
      url : '/api/' + collection,
      type : 'json',
      method : method,
      data : getJS(this),
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
  return Model;
};

module.exports = Object.keys(models).reduce(function(map,name){
  var model = models[name];
  map[name] = generateModel(model);
  return map;
},{});
