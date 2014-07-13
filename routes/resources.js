var Resource = require('express-resource');
// var path = require('path');
// var db = require('mongo-wrapper').db.add('posts');

var Post = require('../models/Post');

var postServices = {
  index : function(req,res,next){
    var posts = [
      new Post({title : 'test'}),
      new Post({title : 'another test'})
    ];
    // db.posts.findArray(function(err,posts){
    //
    // });
    res.json(posts);
  }
}

module.exports = function(app){
  app.resource('posts',postServices);
}
