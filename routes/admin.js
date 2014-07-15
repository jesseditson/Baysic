
exports.home = function(req,res,next){
  res.render('admin/admin');
};

exports.posts = function(req,res,next){
  res.render('admin/posts');
}
