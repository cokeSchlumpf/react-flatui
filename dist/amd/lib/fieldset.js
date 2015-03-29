define(function (require, exports, module) {var React = require("react");
var $ = require("jquery");
var abstract = require("./helper").formcontainer;
var classnames = require("./util/classnames/index");

module.exports = React.createClass($.extend(true, {}, abstract(), {
    propTypes: $.extend(true, {}, abstract().propTypes, {
      border: React.PropTypes.bool,
      label: React.PropTypes.string
    }),
    
    getDefaultProps: function() {
      return $.extend(true, {}, abstract().getDefaultProps(), {
        border: true
      });
    },
  
    render: function() {
      var $__0=         this.props,border=$__0.border,className=$__0.className,label=$__0.label,onChange=$__0.onChange,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{border:1,className:1,label:1,onChange:1,value:1});
      
      return (
          React.createElement("fieldset", React.__spread({className:  this._getClassName() },   other ), 
             label &&
              React.createElement("legend", null, label ), 
            
            
             this._modifyChildren() 
          )
        );
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "ui-control-fieldset": true,
          "ui-control-fieldset-haslabel": this.props.label != undefined,
          "ui-control-fieldset-hasborder": this.props.border
        };
        
      return classnames(className, classes);
    }
  }));
});
