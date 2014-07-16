var Resource = require('express-resource');
var db = require('../../lib/db');
var models = require('../../lib/models');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var basePath = '/api/';
var resources = {};

// set up resources for our models
Object.keys(models).forEach(function(key){
  var model = models[key];
  var name = model.prototype.collection;
  var resource = {};
  var resourceFile = path.join(__dirname,name + '.js');
  if(fs.existsSync(resourceFile)){
    resource = require(resourceFile);
  }
  // Add some sensible defaults if necessary
  var collection = db[name];
  resources[name] = _.extend({
      index : function(req,res){
        collection.findArray({},function(err,arr){
          if(err){
            res.send(500,err);
          } else {
            res.json(arr);
          }
        });
      },
      create : function(req,res){
        var newResource = new resource(req.body);
        collection.insert(newResource,function(err){
          if (err) {
            res.send(500,err);
          } else {
            res.json(newResource);
          }
        });
      },
      show : function(req,res){
        collection.findOne(req.params[0],function(err,item){
          if(err){
            res.send(500,err);
          } else {
            res.json(item);
          }
        });
      },
      update : function(req,res){
        collection.findAndModifyById(req.params[0],req.body,function(err,item){
          if(err){
            res.send(500,err);
          } else {
            res.json(item);
          }
        });
      },
      destroy : function(req,res){
        try {
          var _id = db.id(req.params[0]);
        } catch(e){
          return res.send(406,'{"error" : "invalid id"}');
        }
        collection.remove({_id : _id},function(err){
          if(err){
            res.send(500,err);
          } else {
            res.send(204);
          }
        });
      }
    },resource);
});

module.exports = function(app){
  Object.keys(resources).forEach(function(name){
    var services = resources[name];
    services.base = basePath;
    app.resource(name,services);
  });
}
