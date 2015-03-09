var React = require("react/addons");
var options = require("./base").options;

module.exports = React.createClass({
    propTypes: {
      value: React.PropTypes.string
    },
    
    getDefaultProps: function() {
      return {
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    render: function() {
      var { onChange, className, ...other } = this.props;
      
      return (
          <input className={ this._getClassName() } onChange={ this._onChangeHandler } { ...other } />
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-controlgroup": true
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })