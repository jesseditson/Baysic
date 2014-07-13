var Resource = require('express-resource');
var debug = require('debug')('Resources');
var db = require('../../lib/db');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var resources = {};

// set up resources for our models
db.models.forEach(function(model){
  debug('Loading resources for model : ',model.prototype.name);
  var name = model.prototype.collection;
  var resource = {};
  var resourceFile = path.join(__dirname,name + '.js');
  if(fs.existsSync(resourceFile)){
    resource = require(resourceFile);
  }
  // Add some sensible defaults if necessary
  var collection = db.db[name];
  resources[name] = _.extend({
      index : function(req,res){
        collection.findArray({},function(err,arr){
          if(err){
            res.send(500,err);
          } else {
            var o = {};
            o[name] = arr;
            res.json(o);
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
          var _id = db.db.id(req.params[0]);
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
    console.log('Adding resource endpoints for ' + name);
    var services = resources[name];
    app.resource(name,services);
  });
}