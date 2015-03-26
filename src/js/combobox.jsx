var React = require("react");
var Bootstrap = require("react-bootstrap");
var Textbox = require("./textbox");
var Listbox = require("./listbox");

var BLUR_TIMEOUT = 100;
var blurTimeout;

var $ = require("jquery");
var helper = require("./helper");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

var keyHandlers = {
  38: '_handleKeyUp',
  40: '_handleKeyDown',
  13: '_handleKeyEnter',
  27: '_handleKeyEsc'
}

var ListItem = React.createClass({
  render: function() {
    return (
        <span>{ this.props.value.title }</span>
      );
  }
})

module.exports = React.createClass({
    propTypes: {
      multiselect: React.PropTypes.bool,
      renderWith: React.PropTypes.any,
      value: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiselect: false,
        renderWith: undefined,
        value: {}
      }; 
    },
    
    getInitialState: function() {
      return {
        focus: false,
        value: undefined,
        selected: undefined
      }
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-combobox": true
        };

      return classnames(className, classes);
    },
    
    _getTextboxValue: function() {
      var
        value = this.props.value,
        multiselect = this.props.multiselect,
        selected = helper.getSelectedValue(value, multiselect),
        result;
        
      if (this.state.value != undefined) {
        result = this.state.value;
      } else if (!this.props.multiselect && selected.length > 0) {
        result = value[selected[0]].title;
      }
      
      return result;
    },
    
    _isListboxVisible: function() {
      return this.state.focus && this.state.value != undefined;
    },
    
    _renderListbox: function() {
      var 
        self = this,
        { value, multiselect, ...other } = this.props,
        selected = helper.getSelectedValue(value, multiselect),
        keys = Object.keys(value),
        items = {},
        selected = this.state.selected;
      
      keys.forEach(function(key) {     
        if (!selected && self.state.value && value[key].title.indexOf(self.state.value) == 0) { selected = key }
        
        items[key] = $.extend(true, {}, value[key], { selected: key == selected });
      });
      
      this.nextSelection = helper.calculateNextAndPreviousSelectionIndex(items, selected);
      this.nextSelection.current = selected;
      
      return <Listbox value={ items } onChange={ self._handleListboxChange } scrollToSelection />
    },
    
    _renderTextboxAddonBefore: function() {
      var
        { value, multiselect, ...other } = this.props,
        selected = helper.getSelectedValue(value, multiselect),
        result;
        
      if (this.props.multiselect && selected.length > 0) {
        var items = {};
        selected.forEach(function(key) {
          var title = value[key].shorttitle ? value[key].shorttitle : value[key].title;
          items["k" + key] = <span className="fu-combobox-selected-item">{ title }</span>
        });
        result = <span className="fu-combobox-selected-items">{ items }</span>
      }
      
      return result;
    },
    
    render: function() {
      var 
        { className, multiselect, renderWith, onChange, value, ...other } = this.props,
        button = <Bootstrap.Button onClick={ this._handleButtonClick }><span className="glyphicon glyphicon-triangle-bottom" /></Bootstrap.Button>;
        
      return (
          <div className={ this._getClassName() }>
            <Textbox { ...other } addonBefore={ this._renderTextboxAddonBefore() } addonAfter={ button } 
              ref="textbox" onFocus={ this._handleFocus } onBlur={ this._handleBlur } onKeyDown={ this._handleKeyDownEvent }
              onChange={ this._handleChange } value={ this._getTextboxValue() } />
            { this._isListboxVisible() && this._renderListbox() }
          </div>
        )
    },
    
    _handleBlur: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      blurTimeout = setTimeout(function() {
        self.setState({ focus: false, value: undefined }, function() {
          var selected = self.nextSelection.current;
          if (selected) self._handleSelect(selected);
        });
      }, BLUR_TIMEOUT);
    },
    
    _handleButtonClick: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      if (!this._isListboxVisible()) {
        selected = helper.getSelectedValue(self.props.value, self.props.multiselect);
        
        this.setState({ focus: true, selected: selected, value: self.props.value[selected].title }, function() {
          self._select();
        });
      } else {
        this.setState({ focus: true, selected: undefined, value: undefined }, function() {
          self._select();
        });
      }
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    },
    
    _handleFocus: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      this.setState({ focus: true }, function() {
        self._select();
      });
    },
    
    _handleListboxChange: function(value, key, selected) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      self.setState({ focus: true, selected: undefined, value: undefined }, function() {
        this._handleSelect(key);
      });
    },
    
    _handleKeyDown: function(event) {
      this._selectItem(this.nextSelection.next);
    },
    
    _handleKeyDownEvent: function(event) {
      if (event && this[keyHandlers[event.which]]) {
        this[keyHandlers[event.which]](event);
        event.preventDefault();
      } else {
        this.setState({ selected: undefined });
      }
      
      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }
    },
    
    _handleKeyEnter: function(event) {
      if (this.nextSelection.current) {
        var self = this;
        var selected = this.nextSelection.current;
        
        this.setState({ selected: undefined, value: undefined }, function() {
          if (selected) self._handleSelect(selected);
          self._select();
        });
      }  
    },
    
    _handleKeyEsc: function(event) {
      if (this.state.selected) {
        var self = this;
        
        this.setState({ selected: undefined }, function() {
          self._select();
        });
      }  
    },
    
    _handleKeyUp: function(event) {
      this._selectItem(this.nextSelection.previous);
    },
    
    _handleSelect: function(item) {
      if (this.props.onChange) {
        this.props.onChange(helper.updateListValue(this.props.value, this.props.multiselect, item, true));
      }
    },
    
    nextSelection: {
      next: undefined,
      current: undefined,
      previous: undefined
    },
    
    _select: function() {
      var self = this;
      setTimeout(function() {
        self.refs.textbox.getDOMNode().getElementsByTagName("input")[0].focus();
        self.refs.textbox.getDOMNode().getElementsByTagName("input")[0].select(); 
      }, 50);
    },
    
    _selectItem: function(item) {
      if (item) {
        this.setState({ selected: item, value: this.props.value[item].title }, this._select)
      }
    }
  });