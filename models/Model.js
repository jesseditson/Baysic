var pluralize = require('pluralize');

function Model(){};

var undef = function(val){
  return typeof val === 'undefined' || val === null;
}

var setProperties = function(schema,model,defaults){
  Object.keys(schema || {}).forEach(function(name){
    var property = schema[name];
    if(!(typeof property === 'object')){
      throw new Error('Tried to initialize non-object property for model ' + (model && model.constructor.prototype.name) + '.' + name);
    }
    if(property.type){
      if(!property.get){
        property.get = function(){
          return defaults[name];
        }
      }
      if(!property.set){
        property.set = function(val){
          if(!undef(val) && val.constructor !== property.type){
            throw new Error('Tried to set property ' + name + ' to an object of invalid type ' + val.constructor.name + '. (Must be of type '+property.type.name+')');
          }
          defaults[name] = val;
        }
      }
      Object.defineProperty(model,name,{
        get : property.get,
        set : property.set,
        enumerable : true,
        configurable : false
      });
      // define the default value if it exists
      if(defaults[name]){
        model[name] = defaults[name];
      }
    } else {
      model[name] = setProperties(schema[name],model[name],defaults[name]);
    }
  });
  return model;
};

module.exports = function(name,schema,collection){
  var SubModel = function(object){
    var sub = Model.call(this);
    var values = object || {};
    setProperties(schema,this,values);
    return sub;
  };
  SubModel.prototype = Object.create(Model.prototype);
  SubModel.prototype.constructor = SubModel;
  SubModel.prototype.collection = collection || pluralize(name).toLowerCase();
  SubModel.prototype.constructor.prototype.name = name;
  return SubModel;
};
