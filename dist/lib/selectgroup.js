var React = require("react");
var Bootstrap = require("react-bootstrap");
var Checkbox = require("./selectbox").Checkbox;
var Radiobox = require("./selectbox").Radiobox;

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiple: false
      };
    },
    
    _getClassName: function() {
      var className = {
        "fu-selectgroup": true
      };
      
      return classnames(this.props.className, className)
    },
    
    _renderItems: function() {
      var 
        self = this,
        items = {},
        Box = this.props.multiselect ? Checkbox : Radiobox,
        name = this.props.multiselect ? this.props.name + "[]" : this.props.name,
        id = this.props.name + "_";
      
      $.each(Object.keys(this.props.value), function(index, key) {
        items["i" + key] = React.createElement(Box, React.__spread({onChange:  self._onChangeHandler(key), name: name, value: key, id:  id + key},   self.props.value[key] ))
      });
      
      return items;
    },
    
    render: function() {
      var $__0=        this.props,className=$__0.className,multiselect=$__0.multiselect,value=$__0.value,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,value:1,onChange:1});
      return (
          React.createElement("div", React.__spread({className:  this._getClassName() },   other ), 
             this._renderItems() 
          )
        );
    },
    
    _onChangeHandler: function(key) {
      var self = this;
      
      return function(selected, value, event) {
        if (self.props.onChange) {
          var newData = updateListValue(self.props.value, self.props.multiselect, key, selected);
          self.props.onChange(newData, key, selected, event);
        }
      }
    }
  })