var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var Base = require("../components/base");
var App = Base.App;

module.exports = React.createClass({
    propTypes: {
      onChange: React.PropTypes.func  
    },
    
    getDefaultProps: function() {
      return {
        type: "text"
      }; 
    },
    
    render: function() {
      var { onChange, ...other } = this.props;
      
      return (
          <Bootstrap.Input { ...other } onChange={ this._handleChange } />
        )
    },
    
    _handleChange: function(event) {
      if (this.props.onChange) this.props.onChange(event.target.value, event); 
    }
  });