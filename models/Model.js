function Model(){};

var ivarName = function(name){
  return '_' + name;
}

var undef = function(val){
  return typeof val === 'undefined' || val === null;
}

var setProperties = function(object,model){
  Object.keys(object || {}).forEach(function(name){
    var property = object[name];
    if(!(typeof property === 'object')){
      throw new Error('Tried to initialize non-object property for model ' + model.constructor.prototype.name + '.' + name);
    }
    if(!property.get){
      property.get = function(){
        return this[ivarName(name)];
      }
    }
    if(!property.set){
      property.set = function(val){
        if(!undef(val) && property.type && val.constructor !== property.type){
          throw new Error('Tried to set property ' + name + ' to an object of invalid type ' + val.constructor.name + '. (Must be of type '+property.type.name+')');
        }
        this[ivarName(name)] = val;
      }
    }
    Object.defineProperty(model,name,{
      get : property.get,
      set : property.set,
      writeable : false,
      enumerable : true,
      configurable : false
    })
  });
  return model;
};

module.exports = function(name,object){
  var SubModel = function(){
    var sub = Model.call(this);
    setProperties(object,this);
    return sub;
  };
  SubModel.prototype = Object.create(Model.prototype);
  SubModel.prototype.constructor = SubModel;
  SubModel.prototype.constructor.prototype.name = name;
  return SubModel;
};
