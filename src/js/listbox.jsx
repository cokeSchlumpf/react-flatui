var React = require("react");
var Bootstrap = require("react-bootstrap");
var Grid = require("./grid");

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
      bordered: React.PropTypes.bool,
      multiselect: React.PropTypes.bool,
      renderWith: React.PropTypes.any,
      value: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func
    },
    
    columns: function() {
      return {
          column: {
            title: "",
            renderWith: this.props.renderWith
          }
        }
    },
    
    getDefaultProps: function() {
      return {
        bordered: true,
        multiselect: false,
        renderWith: ListItem
      }; 
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-listbox": true,
          "fu-listbox-bordered": this.props.bordered
        };

      return classnames(className, classes);
    },
    
    _prepareValue: function() {
      var 
        self = this,
        result = {};
      
      $.each(Object.keys(this.props.value), function(index, key) {
          var value = self.props.value[key];
          
          result[key] = {
            selected: value.selected,
            value: { column: value }
          }
      });
      
      return result;
    },
    
    render: function() {
      var { bordered, className, multiselect, name, renderWith, value, onChange, ...other } = this.props;
      
      return (
          <Grid noHeader className={ this._getClassName() } columns={ this.columns() } value={ this._prepareValue() } onChange={ this._handleChange } { ...other } />
        )
    },
    
    _handleChange: function(value, key, selected, event) {
      if (this.props.onChange) {
        var newData = updateListValue(this.props.value, this.props.multiselect, key, selected);
        this.props.onChange(newData, key, selected, event);
      }
    }
  });