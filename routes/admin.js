
exports.home = function(req,res,next){
  res.render('admin/admin');
};

exports.artists = function(req,res,next){
  res.render('admin/artists');
}
