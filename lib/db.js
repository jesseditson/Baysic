var mongo = require('mongo-wrapper');
var fs = require('fs');
var config = require('../config');
var path = require('path');
var wrench = require('wrench');
var modelFolder = path.join(__dirname,'../models');

mongo.setup(config.db);

var models = [];

// load in all our models and set them up in the db
var files = wrench.readdirSyncRecursive(modelFolder).filter(function(file){
  return file != 'Model.js';
});
files.forEach(function(file){
  var model = require(path.join(modelFolder,file));
  mongo.db.add(model.prototype.collection);
  models.push(model);
});

module.exports = {
  db : mongo.db,
  models : models
};
