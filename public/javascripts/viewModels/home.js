var models = require('../models');

function HomeViewModel(ready) {
  var Post = models.Post;
  var self = this;
  self.posts = [];
  Post.index(function(list){
    self.posts = list;
    console.log(self.posts);
  },function(){
    console.error(arguments);
  },ready);
}

module.exports = HomeViewModel;
