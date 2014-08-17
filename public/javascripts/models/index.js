var reqwest = require('arequest');
var models = require('../../../lib/models');
var url = require('url');

var completeFn = function(fn,complete){
  return function(){
    fn.apply(this,arguments);
    complete();
  };
}

var generateModel = function(Model){
  var collection = Model.prototype.collection;
  Model.index = function(success,error,complete){
    reqwest({
      url : url.resolve(window.location.href,'/api/' + collection),
      type : 'json',
      method : 'get',
      success : completeFn(success,complete),
      error : completeFn(error,complete)
    });
  };
  Model.show = function(id,success,error,complete){
    reqwest({
      url : url.resolve(window.location.href,'/api/' + collection + '/' + id),
      type : 'json',
      method : 'get',
      success : completeFn(success,complete),
      error : completeFn(error,complete)
    });
  };
  Model.prototype.save = function(success,error,complete){
    var data = this.toObject();
    method = !!data._id ? 'put' : 'post';
    reqwest({
      url : url.resolve(window.location.href,'/api/' + collection + (data._id ? '/' + data._id : '')),
      type : 'json',
      method : method,
      data : data,
      success : completeFn(success,complete),
      error : completeFn(error,complete)
    });
  };
  Model.prototype.destroy = function(success,error,complete){
    var data = this.toObject();
    reqwest({
      url : url.resolve(window.location.href,'/api/' + collection + '/' + data._id),
      type : 'json',
      method : 'delete',
      success : completeFn(success,complete),
      error : completeFn(error,complete)
    });
  };
  return Model;
};

module.exports = Object.keys(models).reduce(function(map,name){
  var model = models[name];
  map[name] = generateModel(model);
  return map;
},{});
