var React = require("react/addons");
var base = require("./base");
var Checkbox = require("./checkbox");
var Radiobox = require("./radiobox");
var App = base.App;

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
        items[id] = <Box value={ key } name={ name + "." + id } caption={ value[key].title } selected={ value[key].selected } onChange={ self._onChangeHandler } />
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
          "ui-controlgroup": true
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _onChangeHandler: function(selected, value) {
      this.props.onChange(event.target.value);
    }
  })