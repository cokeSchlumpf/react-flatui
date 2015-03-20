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
    } 
  }