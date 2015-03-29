var React = require("react");
var $ = require("jquery");
var abstract = require("./helper").formcontainer;

module.exports = React.createClass($.extend(true, {}, abstract(), {
    render: function() {
      var $__0=      this.props,onChange=$__0.onChange,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onChange:1,value:1});
      
      return (
          React.createElement("form", React.__spread({},   other ), 
             this._modifyChildren() 
          )
        );
    },
  }));