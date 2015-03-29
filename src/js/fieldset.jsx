var React = require("react");
var $ = require("jquery");
var abstract = require("./helper").formcontainer;
var classnames = require("./util/classnames/index");

module.exports = React.createClass($.extend(true, {}, abstract(), {
    propTypes: $.extend(true, {}, abstract().propTypes, {
      border: React.PropTypes.bool,
      label: React.PropTypes.string
    }),
    
    getDefaultProps: function() {
      return $.extend(true, {}, abstract().getDefaultProps(), {
        border: true
      });
    },
  
    render: function() {
      var { border, className, label, onChange, value, ...other } = this.props;
      
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
        className = this.props.className,
        classes = {
          "ui-control-fieldset": true,
          "ui-control-fieldset-haslabel": this.props.label != undefined,
          "ui-control-fieldset-hasborder": this.props.border
        };
        
      return classnames(className, classes);
    }
  }));