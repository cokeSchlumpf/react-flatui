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
      var cx = React.addons.classSet;
      
      /** assemble class name */
      var classes = {
        "ui-control": true,
        "ui-control-textbox": true
      };

      if (className) { classes[className] = true; }
      
      return (
          <input className={ cx(classes) } onChange={ this._onChangeHandler } { ...other } />
        );
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })