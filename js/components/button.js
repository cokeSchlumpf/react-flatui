var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;


var BLUR_TIMEOUT = 100;
var blurTimeout;


module.exports = React.createClass({
    propTypes: {
      dropdown: React.PropTypes.element,
      dropdownStyle: React.PropTypes.string,
      label: React.PropTypes.string,
      title: React.PropTypes.string,
      labelToggled: React.PropTypes.string,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      onClick: React.PropTypes.func,
      toggle: React.PropTypes.bool,
      value: React.PropTypes.bool
    },
    
    getDefaultProps: function() {
      return {
        dropdownStyle: "triangle",
        label: undefined,
        title: "",
        labelToggled: "",
        toggle: false,
        value: false
      };
    },
    
    getInitialState: function() {
      return {
        dropdownVisible: false  
      };
    },
    
    render: function() {
      var { onClick, className, label, title, labelToggled, value, dropdown, name, ...other } = this.props;
      
      if (dropdown && typeof value === "object") {
        dropdown = React.addons.cloneWithProps(dropdown, { value: value, onChange: this._handleDropdownChange });
      }
      
      if (!label) label = title;
      
      return (
          <App.Panel className="ui-control-container ui-control-button-container" layout="vertical" align="stretch">
            <button className={ this._getClassname() } id={ this.props.id ? this.props.id : name } name={ name } onClick={ this._onClickHandler } onBlur={ this._handleButtonBlur } { ...other }>
              <span className="left-icon">
                { 
                  React.Children.map(this.props.children, function(child, index) {
                    if (child && child.props.position == "left") {
                      return child;
                    } else {
                      return undefined;
                    }
                  })
                }
              </span>
              { !value ? label : (labelToggled && labelToggled.length > 0 ? labelToggled : label) }
              <span className="right-icon">
                { 
                  React.Children.map(this.props.children, function(child, index) {
                    if (child && child.props.position != "left") {
                      return child;
                    } else {
                      return undefined;
                    }
                  })
                }
              </span>
            </button>
            
            { this.state.dropdownVisible && dropdown && dropdown }
          </App.Panel>
        );
    },
    
    _getButton: function() {
      return document.getElementById(this.props.id ? this.props.id : this.props.name);
    },
    
    _getClassname: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-button": true,
          "ui-control-button-toggle": this.props.toggle,
          "ui-control-button-toggle-on": this.props.toggle && this.props.value,
          "ui-control-button-toggle-off": this.props.toggle && !this.props.value,
          "ui-control-button-dropdown": this.props.dropdown != undefined
        }
        
      if (className) { classes[className] = true; }
      classes["ui-control-button-dropdown-" + this.props.dropdownStyle] = this.props.dropdown != undefined;
      
      
      return cx(classes);
    },
    
    _handleButtonBlur: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      blurTimeout = setTimeout(function() {
        if (self.state.dropdownVisible) {
          self.setState({ dropdownVisible: false });
        }  
      }, BLUR_TIMEOUT);
    },
    
    _handleDropdownChange: function(value) {
      if (blurTimeout) clearTimeout(blurTimeout);
      if (this.props.onChange) this.props.onChange(value);
      this._getButton().focus();
    },
    
    _onClickHandler: function(event) {
      var 
        self = this,
        value = this.props.value;
      
      if (this.props.dropdown) {
        this.setState({ dropdownVisible: !this.state.dropdownVisible }, function() {
            if (self.state.dropdownVisible) self._getButton().focus();
          });
      } else {
        if (this.props.toggle) value = !value;
        if (this.props.onChange) this.props.onChange(value, event);
        if (this.props.onClick) this.props.onClick();
      }
    }
  });