var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var Base = require("../components/base");
var App = Base.App;

module.exports = React.createClass({
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