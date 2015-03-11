var React = require("react/addons");
var base = require("./base");
var Checkbox = require("./checkbox");
var Radiobox = require("./radiobox");
var App = base.App;
var objectAssign = require('object-assign');

module.exports = React.createClass({
    propTypes: {
      multiselect: React.PropTypes.bool.isRequired,
      name: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func.isRequired,
      value: React.PropTypes.object.isRequired
    },
    
    getDefaultProps: function() {
      return {
        multiselect: false
      };
    },
    
    render: function() {
      var { multiselect, name, onChange, value, className, ...other } = this.props;
      var 
        self = this,
        items = {},
        keys = Object.keys(value),
        Box = multiselect ? Checkbox : Radiobox;
      
      keys.forEach(function(key) {
        var id = "id-" + key;
        items[id] = <Box value={ key } name={ multiselect ? name + "." + id : name } id={ id } caption={ value[key].title } selected={ value[key].selected } onChange={ self._onChangeHandler } />
      });
      
      return (
          <App.Panel className={ this._getClassName() } { ...other }>
            { items }
          </App.Panel>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-selectgroup": true
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _onChangeHandler: function(selected, value) {
      var 
        self = this,
        newvalue = objectAssign({}, this.props.value),
        keys = Object.keys(newvalue);
        
      keys.forEach(function(key) {
        if (key == value) {
          newvalue[key].selected = selected;
        } else if (!self.props.multiselect) {
          newvalue[key].selected = false;
        }
      });
      
      if (this.props.onChange) this.props.onChange(newvalue);
    }
  })