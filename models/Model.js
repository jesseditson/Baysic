var pluralize = require('pluralize');

function Model(){};

var undef = function(val){
  return typeof val === 'undefined' || val === null;
}

var setProperties = function(schema,model,defaults){
  Object.keys(schema || {}).forEach(function(name){
    var property = schema[name];
    console.log(property);
    if(!(typeof property === 'object')){
      throw new Error('Tried to initialize non-object property for model ' + (model && model.constructor.prototype.name) + '.' + name);
    }
    if(property.type){
      var getter = function(){
        if(property.get){
          return property.get.call(this);
        } else {
          return defaults[name];
        }
      }
      var setter = function(val){
        if(!undef(val) && property.type !== 'Any' && val.constructor !== property.type){
          throw new Error('Tried to set property ' + name + ' to an object of invalid type ' + val.constructor.name + '. (Must be of type '+property.type.name+')');
        }
        // on the client, map this to a ko observable if not explicitly set to non-observable.
        if(typeof ko !== 'undefined' && property.observable !== false){
          val = Array.isArray(val) ? ko.observableArray(val) : ko.observable(val);
        }
        if(property.set){
          property.set.call(this,val);
        } else {
          defaults[name] = val;
        }
      }

      Object.defineProperty(model,name,{
        get : getter,
        set : setter,
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
  SubModel.prototype.constructor.prototype.name = name;
  SubModel.prototype.schema = schema;
  SubModel.prototype.collection = collection || pluralize(name).toLowerCase();
  return SubModel;
};
