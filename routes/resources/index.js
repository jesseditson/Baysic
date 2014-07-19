var Resource = require('express-resource');
var db = require('../../lib/db');
var models = require('../../lib/models');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var basePath = '/api/';
var resources = {};

var parseId = function(id){
  try {
    return db.id(id);
  } catch(e){
    return null;
  }
}

// set up resources for our models
Object.keys(models).forEach(function(key){
  var Model = models[key];
  var name = Model.prototype.collection;
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
        var newResource = new Model(req.body);
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
        var id = parseId(req.params[key.toLowerCase()]);
        if(!id){
          res.send(406,'{"error" : "invalid id"}');
        } else {
          // don't allow update on id
          delete req.body._id;
          var info = new Model(req.body);
          collection.findAndModifyById(id,null,{$set:info.toObject()},{new:true},function(err,item){
            if(!err && !item){
              res.send(404,'Item not found');
            } else if(err){
              res.send(500,err);
            } else {
              res.json(item);
            }
          });
        }
      },
      destroy : function(req,res){
        var id = parseId(req.params[key.toLowerCase()]);
        if(!id){
          res.send(406,'{"error" : "invalid id"}');
        } else {
          collection.remove({_id : id},function(err){
            if(err){
              res.send(500,err);
            } else {
              res.send(204);
            }
          });
        }
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
