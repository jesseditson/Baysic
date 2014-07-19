var qwery = require('qwery');
var bonzo = require('bonzo');

module.exports = function(selector){
  qwery(selector).forEach(function(element){
    var boundElement = bonzo(element).previous();
    var textBox = qwery('.editor',element)[0];
    var editor = new Quill(textBox,{
      modules: {
        'toolbar': {
          'container' : qwery('.toolbar',element)[0]
        },
        'link-tooltip': true
      },
      theme: 'snow'
    });
    editor.on('text-change', function(delta, source) {
      boundElement.val(source);
    });
  });
};
