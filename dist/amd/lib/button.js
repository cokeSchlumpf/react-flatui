define(function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Selectgroup = require("./selectgroup");

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

var Button = React.createClass({displayName: "Button",
    propTypes: {
      toggle: React.PropTypes.bool,
      value: React.PropTypes.bool,
      
      onChange: React.PropTypes.func
    },
    
    defaultProps: function() {
      return {
        toggle: false,
        value: false
      };
    },
    
    render: function() {
      var $__0=       this.props,toggle=$__0.toggle,value=$__0.value,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{toggle:1,value:1,onChange:1});
      if (toggle && value) other.active = true;
      
      return (
          React.createElement(Bootstrap.Button, React.__spread({},   other , {onClick:  this._handleClick, ref: "button"}),  this.props.children)
        )
    },
    
    _handleClick: function(event) {
      if (this.props.onChange) this.props.onChange(this.props.toggle ? !this.props.value : this.props.value, event);
      if (this.props.onClick) this.props.onClick();
      this.refs.button.getDOMNode().blur();
    }
  });
  
var DropdownButton = React.createClass({displayName: "DropdownButton",
  propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      splitter: React.PropTypes.bool,
      title: React.PropTypes.string,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    defaultProps: function() {
      return {
        multiselect: false,
        splitter: false
      };
    },
    
    _getClassName: function() {
      var className = {
        "fu-dropdown-multiple": this.props.multiselect,
        "fu-dropdown-single": !this.props.multiselect
      };
      
      return classnames(this.props.className, className);
    },
    
    _getItemClassName: function(selected) {
      var className = {
        "fu-dropdown-item-selected": selected
      };
      
      return classnames(className);
    },
    
    _renderItems: function() {
      var
        self = this,
        items = {};
        
      $.each(Object.keys(this.props.value), function(index, key) {
        var $__0=      self.props.value[key],title=$__0.title,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{title:1,selected:1});
        items["i" + key] = React.createElement(Bootstrap.MenuItem, {className:  self._getItemClassName(selected), onSelect:  self._onChangeHandler(key, !selected) }, title )
      });
      
      return items;
    },
    
    render: function() {
      var 
        $__0=          this.props,className=$__0.className,multiselect=$__0.multiselect,name=$__0.name,splitter=$__0.splitter,title=$__0.title,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,name:1,splitter:1,title:1,value:1}),
        BsButton = splitter ? Bootstrap.SplitButton : Bootstrap.DropdownButton;
      
      return (
          React.createElement(BsButton, React.__spread({title: title, className:  this._getClassName() },   other ), 
            this._renderItems() 
          )
        );
    },
    
    _onChangeHandler: function(key, selected) {
      var self = this;
      return function() {
        if (self.props.onChange) {
          self.props.onChange(updateListValue(self.props.value, self.props.multiselect, key, selected), key, selected);
        }
      }
    }
});
  
var ButtonGroup = React.createClass({displayName: "ButtonGroup",
  propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    defaultProps: function() {
      return {
        multiple: false
      };
    },
    
    _getClassName: function() {
      var className = {
        "fu-buttongroup": true
      };
      
      return classnames(this.props.className, className)
    },
    
    _renderItems: function() {
      var 
        self = this,
        items = {};
      
      $.each(Object.keys(this.props.value), function(index, key) {
        var $__0=      self.props.value[key],title=$__0.title,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{title:1,selected:1});
        items["i" + key] = React.createElement(Button, React.__spread({onChange:  self._onChangeHandler(key) },   other , {toggle: true, value: selected }), title )
      });
      
      return items;
    },
    
    render: function() {
      var $__0=        this.props,className=$__0.className,multiselect=$__0.multiselect,name=$__0.name,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,multiselect:1,name:1,value:1});
      
      return (
          React.createElement(Bootstrap.ButtonGroup, {className:  this._getClassName() }, 
             this._renderItems(), 
            React.createElement("div", {style: { display: "none"}}, 
              React.createElement(Selectgroup, React.__spread({},   this.props ))
            )
          )
        );
    },
    
    _onChangeHandler: function(key) {
      var self = this;
      return function(selected, event) {
        if (self.props.onChange) {
          self.props.onChange(updateListValue(self.props.value, self.props.multiselect, key, selected), key, selected, event);
        }
      }
    }
})
  
module.exports = {
  Button: Button,
  ButtonGroup: ButtonGroup,
  DropdownButton: DropdownButton
}
});
