var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var objectAssign = require('object-assign');
var abstract = require("./_abstractFormContainer");

var separator = React.createClass({
  propTypes: {
    title: React.PropTypes.string  
  },
  
  render: function() {
    return (<div className={ this._getClassName() }>{ this.props.title }</div>);
  },
  
   _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control-separator": true,
          "ui-control-separator-label": this.props.label
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    }
});

module.exports = React.createClass(objectAssign({}, abstract, {
    render: function() {
      var { className, ...other } = this.props;
      
      return (
          <App.Panel layout="vertical" align="stretch" justify="start" className={ this._getClassName() }>
            {
              React.Children.map(this._modifyChildren(), function(child, index) {
                var 
                  key = child.props.key,
                  ref = child.props.ref;
                  
                if (child && child.type != separator) {
                  return React.addons.cloneWithProps(child, { key: key, ref: ref, size: "auto" });
                } else if (child && child.type == separator) {
                  return React.addons.cloneWithProps(child, { key: key, ref: ref, size: "1" });
                } else {
                  return child;
                }
              })
            }
          </App.Panel>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-menu": true
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    }
  }));
  
module.exports.Separator = separator;