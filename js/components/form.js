var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var objectAssign = require('object-assign');
var abstract = require("./_abstractFormContainer");

var form = React.createClass({
  render: function() {
    return <form { ... this.props }>{ this.props.children }</form>
  }
});

module.exports = React.createClass(objectAssign({}, abstract, {
    render: function() {
      var { onChange, className, value, ...other } = this.props;
      
      return (
          <App.Panel element={ form } className={ this._getClassName() } { ...other }>
            { this._modifyChildren() }
          </App.Panel>
        );
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
    }
  }));