var React = require("react");
var Bootstrap = require("react-bootstrap");
var Textbox = require("./textbox");
var Listbox = require("./listbox");

var $ = require("jquery");
var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;

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
        renderWith: undefined
      }; 
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-combobox": true
        };

      return classnames(className, classes);
    },
    
    render: function() {
      var 
        { className, multiselect, renderWith, onChange, value, ...other } = this.props,
        button = <Bootstrap.Button><span className="glyphicon glyphicon-triangle-bottom" /></Bootstrap.Button>;
            
      return (
          <div className={ this._getClassName() }>
            <Textbox onChange={ this._handleChange } { ...other } addonAfter={ button } />
          </div>
        )
    },
    
    _handleChange: function(value, key, selected, event) {
      
    }
  });