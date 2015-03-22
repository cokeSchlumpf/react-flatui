var $ = require("jquery");

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
    }
  }