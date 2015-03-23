define(function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var classnames = require("./util/classnames/index");

var AbstractBox = function(multiple) {
    return React.createClass({
      propTypes: {
        multiple: React.PropTypes.bool,
        title: React.PropTypes.string,
        value: React.PropTypes.string,
        selected: React.PropTypes.bool,
        
        onChange: React.PropTypes.func
      },
      
      getDefaultProps: function() {
        return {
          multiple: multiple,
          selected: false
        };
      },
      
      _getClassName: function() {
        var className = {
          "checkbox": this.props.multiple,
          "radio": !this.props.multiple,
          "fu-selectbox": true,
          "fu-selectbox-radio": !this.props.multiple,
          "fu-selectbox-checkbox": this.props.multiple
        };
        
        return classnames(this.props.className, className)
      },
      
      render: function() {
        var 
          $__0=          this.props,className=$__0.className,multiple=$__0.multiple,title=$__0.title,value=$__0.value,selected=$__0.selected,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiple:1,title:1,value:1,selected:1,onChange:1}),
          type = multiple ? "checkbox" : "radio",
          id = this.props.id ? this.props.id : this.props.name;
        
        if (selected) {
          other.checked = true;
          other["data-checked"] = "Hallo";
        }
        
        return (
            React.createElement("div", {className:  this._getClassName() }, 
              React.createElement("label", {htmlFor: id }, 
                React.createElement("input", React.__spread({type: type, onChange:  this._onChangeHandler, value: value, id: id },   other )), 
                title 
              )
            )
          );
      },
      
      _onChangeHandler: function(event) {
        if (this.props.onChange) {
          this.props.onChange(event.target.checked, event.target.value, event);
        }
      }
    })
  }
  
module.exports = {
  Checkbox: AbstractBox(true),
  Radiobox: AbstractBox(false)
}
});
