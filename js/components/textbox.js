var React = require("react/addons");
var options = require("./base").options;

module.exports = React.createClass({
    propTypes: {
      name: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func,
      rows: React.PropTypes.number,
      value: React.PropTypes.string,
      type: React.PropTypes.string
    },
    
    getDefaultProps: function() {
      return {
        rows: 1,
        type: "text",
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    render: function() {
      var { onChange, className, value, rows, ...other } = this.props;
      var cx = React.addons.classSet;
      
      /** assemble class name */
      var classes = {
        "ui-control": true,
        "ui-control-textbox": true
      };

      if (className) { classes[className] = true; }
      
      var output;
      
      if (rows == 1) {
        output =  <input className={ cx(classes) } onChange={ this._onChangeHandler } { ...other } id={ this.props.id ? this.props.id : this.props.name } defaultValue={ value } />
      } else {
        output = <textarea className={ cx(classes) } onChange={ this._onChangeHandler } { ...other } id={ this.props.id ? this.props.id : this.props.name } defaultValue={ value } rows={ this.props.rows } />
      }
      
      return output;
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })