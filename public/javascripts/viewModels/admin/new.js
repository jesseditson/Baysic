var Post = require('../../lib/models').Post;

function NewPostAdminViewModel() {
  this.post = new Post();
  console.log(this.post);
}

module.exports = NewPostAdminViewModel;
