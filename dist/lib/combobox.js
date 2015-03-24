var React = require("react");
var Bootstrap = require("react-bootstrap");
var Textbox = require("./textbox");
var Listbox = require("./listbox");

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
      multiselect: React.PropTypes.bool,
      renderWith: React.PropTypes.any,
      value: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiselect: false,
        renderWith: undefined
      }; 
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-combobox": true
        };

      return classnames(className, classes);
    },
    
    render: function() {
      var 
        $__0=         this.props,className=$__0.className,multiselect=$__0.multiselect,renderWith=$__0.renderWith,onChange=$__0.onChange,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,renderWith:1,onChange:1,value:1}),
        button = React.createElement(Bootstrap.Button, null, React.createElement("span", {className: "glyphicon glyphicon-triangle-bottom"}));
            
      return (
          React.createElement("div", {className:  this._getClassName() }, 
            React.createElement(Textbox, React.__spread({onChange:  this._handleChange},   other , {addonAfter: button }))
          )
        )
    },
    
    _handleChange: function(value, key, selected, event) {
      
    }
  });