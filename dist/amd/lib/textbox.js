define(function (require, exports, module) {var React = require("react");
var Bootstrap = require("react-bootstrap");
var Listbox = require("./listbox");

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var helper = require("./helper");

var BLUR_TIMEOUT = 100;
var blurTimeout;

var keyHandlers = {
  38: '_handleKeyUp',
  40: '_handleKeyDown',
  13: '_handleKeyEnter',
  27: '_handleKeyEsc'
}

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      autocompleteList: React.PropTypes.array,
      autocompleteMode: React.PropTypes.string, // none, startsWith or contains
      rows: React.PropTypes.number,
      type: React.PropTypes.string,
      
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onFocus: React.PropTypes.func,
      onKeyDown: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        autocompleteList: [],
        autocompleteMode: "contains",
        type: "text",
        rows: 1
      }; 
    },
    
    getInitialState: function() {
      return {
        autocompleteSelected: undefined,
        hasFocus: false
      }
    },
    
    _createAutocompleteData: function() {
      var 
        i,
        list = this.props.autocompleteList,
        mode = this.props.autocompleteMode,
        value = this.props.value,
        output = {};
        
      for (i = 0; i < list.length; i++) {
        var item = list[i];
        
        switch(mode) {
          case "none":
            output[item] = { title: item };
            break;
          case "contains":
            if (item.toLowerCase().indexOf(value.toLowerCase()) > -1) output[item] = { title: item };
            break;
          case "startsWith":
            if (item.toLowerCase().indexOf(value.toLowerCase()) == 0) output[item] = { title: item };
            break; 
        }
        
        if (output[item]) output[item].selected = (item == this.state.autocompleteSelected);
      }
      
      if (Object.keys(output).length == 1 && output[value]) {
        output = {};
      }
      
      return output;
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-textbox": true,
          "fu-textbox-focused": this.state.hasFocus
        };

      return classnames(className, classes);
    },
    
    render: function() {
      var 
        $__0=          this.props,autocompleteList=$__0.autocompleteList,autocompleteMode=$__0.autocompleteMode,rows=$__0.rows,onBlur=$__0.onBlur,onChange=$__0.onChange,onFocus=$__0.onFocus,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{autocompleteList:1,autocompleteMode:1,rows:1,onBlur:1,onChange:1,onFocus:1}),
        autocompleteData = this._createAutocompleteData();
        
        this.nextSelection = helper.calculateNextAndPreviousSelectionIndex(autocompleteData, this.state.autocompleteSelected);
      
      return (
          React.createElement("div", {className:  this._getClassName() }, 
            React.createElement(Bootstrap.Input, React.__spread({},   other , {onBlur:  this._handleBlur, onChange:  this._handleChange, onFocus:  this._handleFocus, ref: "textbox", onKeyDown:  this._handleKeyDownEvent})), 
             this.state.hasFocus && Object.keys(autocompleteData).length > 0 && rows == 1 &&
              React.createElement(Listbox, {value: autocompleteData, onChange:  this._handleAutocompleteClick, scrollToSelection: true})
            
          )
        )
    },
    
    _handleAutocompleteClick: function(value, key, selected, event) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      this.setState({ autocompleteSelected: undefined }, function() {
        if (this.props.onChange) this.props.onChange(key, event);
      });
      
      this._select();
    },
    
    _handleBlur: function(event) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      blurTimeout = setTimeout(function() {
        self.setState({ hasFocus: false }, function() {
          if (self.props.onBlur) self.props.onBlur(event);
        })
      }, BLUR_TIMEOUT);
    },
    
    _handleChange: function(event) {
      if (this.props.onChange) this.props.onChange(event.target.value, event); 
    },
    
    _handleFocus: function(event) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      this.setState({ hasFocus: true }, function() {
        if (self.props.onFocus) self.props.onFocus(event);
      })
    },
    
    _handleKeyDown: function(event) {
      this._selectAutocompleteItem(this.nextSelection.next);
    },
    
    _handleKeyDownEvent: function(event) {
      if (event && this[keyHandlers[event.which]]) {
        this[keyHandlers[event.which]](event);
        event.preventDefault();
      } else if (this.props.onKeyDown) {
        this.props.onkeydown(event);
      }
    },
    
    _handleKeyEnter: function(event) {
      if (this.state.autocompleteSelected) {
        var self = this;
        var selected = this.state.autocompleteSelected;
        
        this.setState({ autocompleteSelected: undefined }, function() {
          if (self.props.onChange) self.props.onChange(selected, event);
          self._select();
        });
      }  
    },
    
    _handleKeyEsc: function(event) {
      if (this.state.autocompleteSelected) {
        var self = this;
        var selected = this.state.autocompleteSelected;
        
        this.setState({ autocompleteSelected: undefined }, function() {
          self._select();
        });
      }  
    },
    
    _handleKeyUp: function(event) {
      this._selectAutocompleteItem(this.nextSelection.previous);
    },
    
    nextSelection: {
      next: undefined,
      previous: undefined
    },
    
    _select: function() {
      this.refs.textbox.getDOMNode().firstChild.focus();
      this.refs.textbox.getDOMNode().firstChild.select();
    },
    
    _selectAutocompleteItem: function(item) {
      if (item) {
        this.setState({ autocompleteSelected: item }, this._select)
      }
    }
  });
});
