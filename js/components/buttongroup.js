var React = require("react/addons");
var base = require("./base");
var App = base.App;
var Button = require("./button");

module.exports = React.createClass({
    propTypes: {
      multiselect: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      orientation: React.PropTypes.string,
      value: React.PropTypes.string
    },
    
    getDefaultProps: function() {
      return {
        multiselect: false,
        onChange: function(newValue) { console.log(newValue); },
        orientation: "horizontal"
      };
    },
    
    _renderButtons: function() {
      var 
        self = this,
        value = this.props.value,
        keys = Object.keys(value),
        result = {};
        
      keys.forEach(function(key) {
        var
          id = "button-" + key,
          props = value[key];
          
        result[id] = <Button title="" onChange={ self._handleButtonClick(key) } toggle={ true } { ...props }/>
      });
      
      return result;
    },
    
    render: function() {
      var { className, multiselect, onChange, orientation, value, ...other } = this.props;
      
      return (
          <App.Panel className={ this._getClassName() } layout={ orientation } align="stretch" { ...other }>
            { this._renderButtons() }
          </App.Panel>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-buttongroup": true
        };
      classes["ui-control-buttongroup-" + this.props.orientation] = true;
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _handleButtonClick: function(key) {
      var self = this;
      
      return function(value) {
          if (self.props.onChange) {
            var 
              data = self.props.value,
              keys = Object.keys(data);
              
            if (self.props.multiselect) {
              data[key].value = value;
            } else {
              keys.forEach(function(k) {
                data[k].value = k == key && value;
              });
            }
            
            self.props.onChange(data);
          }
      };
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })