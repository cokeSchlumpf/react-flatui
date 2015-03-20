var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var Base = require("../components/base");
var App = Base.App;

var classnames = require("classnames");

var AbstractBox = function(multiple) {
    return React.createClass({
      propTypes: {
        multiple: React.PropTypes.bool,
        title: React.PropTypes.string,
        value: React.PropTypes.string,
        selected: React.PropTypes.bool,
        
        onChange: React.PropTypes.func
      },
      
      getDefaultProps: function() {
        return {
          multiple: multiple,
          selected: false
        };
      },
      
      _getClassName: function() {
        var className = {
          "checkbox": this.props.multiple,
          "radio": !this.props.multiple,
          "fu-selectbox": true,
          "fu-selectbox-radio": !this.props.multiple,
          "fu-selectbox-checkbox": this.props.multiple
        };
        
        return classnames(this.props.className, className)
      },
      
      render: function() {
        var 
          { className, multiple, title, value, selected, onChange, ...other } = this.props,
          type = multiple ? "checkbox" : "radio",
          id = this.props.id ? this.props.id : this.props.name;
        
        if (selected) other.checked = "checked";
        
        return (
            <div className={ this._getClassName() }>
              <label htmlFor={ id }>
                <input type={ type } onChange={ this._onChangeHandler } value={ value } id={ id } { ...other } />
                { this.props.title }
              </label>
            </div>
          );
      },
      
      _onChangeHandler: function(event) {
        if (this.props.onChange) {
          this.props.onChange(event.target.checked, event.target.value, event);
        }
      }
    })
  }
  
module.exports = {
  Checkbox: AbstractBox(true),
  Radiobox: AbstractBox(false)
}