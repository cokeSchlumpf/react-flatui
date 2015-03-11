var React = require("react/addons");
var options = require("./base").options;
var objectAssign = require('object-assign');
var abstract = require("./_abstractFormContainer");

module.exports = React.createClass(objectAssign({}, abstract, {
    propTypes: objectAssign({}, abstract.propTypes, {
      border: React.PropTypes.bool,
      label: React.PropTypes.string
    }),
    
    getDefaultProps: function() {
      return objectAssign({}, abstract.getDefaultProps(), {
        border: true
      });
    },
    
    render: function() {
      var { className, label, onChange, ...other } = this.props;
      
      return (
          <fieldset className={ this._getClassName() } { ...other }>
            { label &&
              <legend>{ label }</legend>
            }
            
            { this._modifyChildren() }
          </fieldset>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control-fieldset": true,
          "ui-control-fieldset-haslabel": this.props.label != undefined,
          "ui-control-fieldset-hasborder": this.props.border
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    }
  }));