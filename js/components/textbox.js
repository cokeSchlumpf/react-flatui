var React = require("react/addons");
var options = require("./base").options;

module.exports = React.createClass({
    propTypes: {
      name: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string,
      type: React.PropTypes.string
    },
    
    getDefaultProps: function() {
      return {
        type: "text",
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    render: function() {
      var { onChange, className, value, ...other } = this.props;
      var cx = React.addons.classSet;
      
      /** assemble class name */
      var classes = {
        "ui-control": true,
        "ui-control-textbox": true
      };

      if (className) { classes[className] = true; }
      
      return (
          <input className={ cx(classes) } onChange={ this._onChangeHandler } { ...other } id={ this.props.id ? this.props.id : this.props.name } defaultValue={ value } />
        );
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })