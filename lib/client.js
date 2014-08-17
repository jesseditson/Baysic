var benv = require('benv');

process.on('message',function(options){
  benv.setup(function(){
    window.ready = function(){
      var output = document.documentElement.innerHTML;
      process.send(output);
      benv.teardown();
      process.exit(0);
    };
    window.location = options.url;
    document.documentElement.innerHTML = options.html;
    require('../public/javascripts/main');
  });
});
