var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var objectAssign = require('object-assign');

var form = React.createClass({
  render: function() {
    return <form { ... this.props }>{ this.props.children }</form>
  }
});

module.exports = React.createClass({
    propTypes: {
      data: React.PropTypes.object,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        onChange: function(newValue) { console.log("Form value changed: "); console.log(newValue); }
      };
    },
    
    render: function() {
      var { onChange, className, data, ...other } = this.props;
      var 
        self = this,
        keys =  data ? Object.keys(data) : {};
      
      return (
          <App.Panel element={ form } className={ this._getClassName() } { ...other }>
            { 
              React.Children.map(this.props.children, function(child) {
                if (child && child.props && child.props.name && keys.indexOf(child.props.name) > -1) {
                  var 
                    childOnChange = child.props.onChange,
                    childKey = child.props.key,
                    childRef = child.props.ref;
                    
                  return React.addons.cloneWithProps(child, {
                    key: childKey,
                    ref: childRef,
                    onChange: self._getChildOnChange(childOnChange, child.props.name),
                    value: self.props.data[child.props.name]
                  });
                } else {
                  return child;
                }
              })
            }
          </App.Panel>
        );
    },
    
    _getChildOnChange: function(childOnChange, fieldName) {
      var self = this;
      
      return function(value, a, b, c) {
          var data = objectAssign({}, self.props.data)
          data[fieldName] = value;
          
          if (childOnChange) childOnChange(value, a, b, c);
          if (self.props.onChange) self.props.onChange(data);
      };
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-form": true
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })