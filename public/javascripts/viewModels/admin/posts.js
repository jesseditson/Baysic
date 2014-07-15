var Post = require('../../lib/models').Post;

function PostsAdminViewModel() {
  var self = this;
  self.posts = ko.observableArray();
  Post.index(function(posts){
    self.posts(posts);
  },function(){
    console.error(arguments);
  });
}

module.exports = PostsAdminViewModel;
