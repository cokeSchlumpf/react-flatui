var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var objectAssign = require('object-assign');

module.exports = {
    propTypes: {
      value: React.PropTypes.object,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        
      };
    },
    
    _modifyChildren: function() {
      var 
        self = this,
        value = this.props.value,
        keys = Object.keys(value ? value : {});
        
      return React.Children.map(this.props.children, function(child) {
          if (child && child.props && child.props.name && child.type && keys.indexOf(child.props.name) > -1) {
            var 
              childOnChange = child.props.onChange,
              childKey = child.props.key,
              childRef = child.props.ref;
              
            return React.addons.cloneWithProps(child, {
              key: childKey,
              ref: childRef,
              onChange: self._getChildOnChange(childOnChange, child.props.name),
              value: self.props.value[child.props.name]
            });
          } else {
            return child;
          }
        });
    },
    
    _getChildOnChange: function(childOnChange, fieldName) {
      var self = this;
      
      return function(value, a, b, c) {
          var data = objectAssign({}, self.props.value)
          data[fieldName] = value;
          
          if (childOnChange) childOnChange(value, a, b, c);
          if (self.props.onChange) self.props.onChange(data);
      };
    }
  }