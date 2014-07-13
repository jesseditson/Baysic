
exports.home = function(req,res,next){
  res.render('index');
};

exports.artists = function(req,res,next){
  res.render('artists');
}
