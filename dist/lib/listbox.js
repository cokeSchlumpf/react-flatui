var React = require("react");
var Bootstrap = require("react-bootstrap");
var Grid = require("./grid");

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

var ListItem = React.createClass({displayName: "ListItem",
  render: function() {
    return (
        React.createElement("span", null,  this.props.value.title)
      );
  }
})

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      bordered: React.PropTypes.bool,
      multiselect: React.PropTypes.bool,
      renderWith: React.PropTypes.any,
      value: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func
    },
    
    columns: function() {
      return {
          column: {
            title: "",
            renderWith: this.props.renderWith
          }
        }
    },
    
    getDefaultProps: function() {
      return {
        bordered: true,
        multiselect: false,
        renderWith: ListItem
      }; 
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-listbox": true,
          "fu-listbox-bordered": this.props.bordered
        };

      return classnames(className, classes);
    },
    
    _prepareValue: function() {
      var 
        self = this,
        result = {};
      
      $.each(Object.keys(this.props.value), function(index, key) {
          var value = self.props.value[key];
          
          result[key] = {
            selected: value.selected,
            value: { column: value }
          }
      });
      
      return result;
    },
    
    render: function() {
      var $__0=           this.props,bordered=$__0.bordered,className=$__0.className,multiselect=$__0.multiselect,name=$__0.name,renderWith=$__0.renderWith,value=$__0.value,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{bordered:1,className:1,multiselect:1,name:1,renderWith:1,value:1,onChange:1});
      
      return (
          React.createElement(Grid, React.__spread({noHeader: true, className:  this._getClassName(), columns:  this.columns(), value:  this._prepareValue(), onChange:  this._handleChange},   other ))
        )
    },
    
    _handleChange: function(value, key, selected, event) {
      if (this.props.onChange) {
        var newData = updateListValue(this.props.value, this.props.multiselect, key, selected);
        this.props.onChange(newData, key, selected, event);
      }
    }
  });