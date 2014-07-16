module.exports.home = function(req,res,next){
  res.render('admin/admin');
};

module.exports.index = function(req,res,next){
  res.render('admin/index');
};
