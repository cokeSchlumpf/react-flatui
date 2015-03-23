var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var Base = require("../components/base");
var App = Base.App;
var Selectgroup = require("./selectgroup");

var $ = require("jquery");
var classnames = require("classnames");
var updateListValue = require("./helper").updateListValue;

var Button = React.createClass({
    propTypes: {
      toggle: React.PropTypes.bool,
      value: React.PropTypes.bool,
      
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        toggle: false,
        value: false
      };
    },
    
    render: function() {
      var { toggle, value, onChange, ...other } = this.props;
      if (toggle && value) other.active = true;
      
      return (
          <Bootstrap.Button { ...other } onClick={ this._handleClick } ref="button">{ this.props.children }</Bootstrap.Button>
        )
    },
    
    _handleClick: function(event) {
      if (this.props.onChange) this.props.onChange(this.props.toggle ? !this.props.value : this.props.value, event);
      if (this.props.onClick) this.props.onClick();
      this.refs.button.getDOMNode().blur();
    }
  });
  
var DropdownButton = React.createClass({
  propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      splitter: React.PropTypes.bool,
      title: React.PropTypes.string,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
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
        var { title, selected, ...other } = self.props.value[key];
        items["i" + key] = <Bootstrap.MenuItem className={ self._getItemClassName(selected) } onSelect={ self._onChangeHandler(key, !selected) }>{ title }</Bootstrap.MenuItem>
      });
      
      return items;
    },
    
    render: function() {
      var 
        { className, multiselect, name, splitter, title, value, ...other } = this.props,
        BsButton = splitter ? Bootstrap.SplitButton : Bootstrap.DropdownButton;
      
      return (
          <BsButton title={ title } className={ this._getClassName() } { ...other }>
           { this._renderItems() }
          </BsButton>
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
  
var ButtonGroup = React.createClass({
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
        "fu-buttongroup": true
      };
      
      return classnames(this.props.className, className)
    },
    
    _renderItems: function() {
      var 
        self = this,
        items = {};
      
      $.each(Object.keys(this.props.value), function(index, key) {
        var { title, selected, ...other } = self.props.value[key];
        items["i" + key] = <Button onChange={ self._onChangeHandler(key) } { ...other } toggle={ true } value={ selected }>{ title }</Button>
      });
      
      return items;
    },
    
    render: function() {
      var { className, multiselect, name, value, ...other } = this.props;
      
      return (
          <Bootstrap.ButtonGroup className={ this._getClassName() }> 
            { this._renderItems() }
            <div style={{ display: "none" }}>
              <Selectgroup { ...this.props } />
            </div>
          </Bootstrap.ButtonGroup>
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