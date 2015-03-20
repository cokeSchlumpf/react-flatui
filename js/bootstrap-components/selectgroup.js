var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var Base = require("../components/base");
var App = Base.App;
var Checkbox = require("./selectbox").Checkbox;
var Radiobox = require("./selectbox").Radiobox;

var $ = require("jquery");
var classnames = require("classnames");
var updateListValue = require("./helper").updateListValue;

module.exports = React.createClass({
    propTypes: {
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.object,

      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        multiple: false
      };
    },
    
    _getClassName: function() {
      var className = {
        "fu-selectgroup": true
      };
      
      return classnames(this.props.className, className)
    },
    
    _renderItems: function() {
      var 
        self = this,
        items = {},
        Box = this.props.multiselect ? Checkbox : Radiobox,
        name = this.props.multiselect ? this.props.name + "[]" : this.props.name,
        id = this.props.name + "_";
      
      $.each(Object.keys(this.props.value), function(index, key) {
        items["i" + key] = <Box onChange={ self._onChangeHandler(key) } name={ name } value={ key } id={ id + key } { ...self.props.value[key] } />
      });
      
      return items;
    },
    
    render: function() {
      var { className, multiselect, value, ...other } = this.props;
      
      return (
          <div className={ this._getClassName() }> 
            { this._renderItems() }
          </div>
        );
    },
    
    _onChangeHandler: function(key) {
      var self = this;
      
      return function(selected, value, event) {
        if (self.props.onChange) {
          self.props.onChange(updateListValue(self.props.value, self.props.multiselect, key, selected), key, event);
        }
      }
    }
  })