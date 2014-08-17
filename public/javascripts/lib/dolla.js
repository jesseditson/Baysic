Object.defineProperty(module,'exports',{
  get : function(){
    console.log(global);
    if(typeof window != 'undefined'){
      return require('./ender');
    } else {
      return require('cheerio').load(global.options.html);
    }
  }
});
