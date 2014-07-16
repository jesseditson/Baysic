var mongo = require('mongo-wrapper');
var fs = require('fs');
var config = require('../config');
var path = require('path');
var models = require('./models');

mongo.setup(config.db);

Object.keys(models).forEach(function(name){
  mongo.db.add(models[name].prototype.collection);
});

module.exports = mongo.db;
