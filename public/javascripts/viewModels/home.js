var models = require('../models');

function HomeViewModel() {
  var Post = models.Post;
  var self = this;
  self.posts = ko.observableArray();
  Post.index(function(list){
    self.posts(list);
  },function(){
    console.error(arguments);
  })
}

module.exports = HomeViewModel;
