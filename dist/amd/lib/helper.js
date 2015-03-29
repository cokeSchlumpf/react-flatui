define(function (require, exports, module) {var $ = require("jquery");
var React = require("react/addons");

module.exports = {
    updateListValue: function(value, multiselect, key, selected) {
      var newValue = $.extend(true, {}, value);
      
      if (multiselect) {
        newValue[key].selected = selected;
      } else {
        $.each(Object.keys(newValue), function(index, iKey) {
          newValue[iKey].selected = iKey == key && selected;
        });
      }
      
      return newValue;
    },
    
    getSelectedValue: function(value, multiselect) {
      var selected = [];
      
      $.each(Object.keys(value), function(index, key) {
        if (multiselect && value[key].selected) {
          selected.push(key)
        } else if (!multiselect && value[key].selected && selected.length == 0) {
          selected = [ key ];
        }
      });
      
      return selected;
    },
    
    calculateNextAndPreviousSelectionIndex: function(data, selectedKey) {
      var 
        next = undefined,
        previous = undefined,
        keys = Object.keys(data);
        
      if (keys.length > 0) {        
        if (selectedKey) {
          var index = keys.indexOf(selectedKey);
          next = index < keys.length - 1 ? keys[index + 1] : undefined;
          previous = index > 0 ? keys[index - 1] : undefined;
        } else {
          next = keys[0];
          previous = undefined;
        }
      }
      
      return {
        next: next,
        previous: previous
      }
    },
    
    formcontainer: function() {
      return {
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
              var data = $.extend(true, {}, self.props.value)
              data[fieldName] = value;
              
              if (childOnChange) childOnChange(value, a, b, c);
              if (self.props.onChange) self.props.onChange(data);
          };
        }
      };
    }
  }
});
