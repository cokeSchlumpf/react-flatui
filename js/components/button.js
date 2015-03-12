var React = require("react/addons");
var options = require("./base").options;

module.exports = React.createClass({
    propTypes: {
      label: React.PropTypes.string,
      labelToggled: React.PropTypes.string,
      onChange: React.PropTypes.func,
      onClick: React.PropTypes.func,
      toggle: React.PropTypes.bool,
      value: React.PropTypes.bool
    },
    
    getDefaultProps: function() {
      return {
        label: "",
        labelToggled: "",
        onClick: function() { console.log("Clicked Button"); },
        toggle: false,
        value: false
      };
    },
    
    render: function() {
      var { onClick, className, label, labelToggled, value, ...other } = this.props;
      
      return (
          <button className={ this._getClassname() } { ...other } onClick={ this._onClickHandler }>
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
        );
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
          "ui-control-button-toggle-off": this.props.toggle && !this.props.value
        }
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _onClickHandler: function(event) {
      var value = this.props.value;
      
      if (this.props.toggle) value = !value;
      if (this.props.onChange) this.props.onChange(value, event);
      if (this.props.onClick) this.props.onClick();
    }
  });