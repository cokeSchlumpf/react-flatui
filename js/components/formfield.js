var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;

module.exports = React.createClass({
    propTypes: {
      element:      React.PropTypes.any.isRequired,
      error:        React.PropTypes.string,
      info:         React.PropTypes.string,
      label:        React.PropTypes.string,
      orientation:  React.PropTypes.string
    },
    
    getDefaultProps: function() {
      return {
        orientation: "horizontal"
      };
    },
    
    render: function() {
      var { info, label, error, className, element, orientation, ...other } = this.props;
      var 
        componentKeys = Object.keys(element.propTypes),
        componentProps = {
          className: this._getControlClassName()
        },
        fieldProps = {};
        
      Object.keys(other).forEach(function(key) {
        if (componentKeys.indexOf(key) > -1) {
          componentProps[key] = other[key];
        } else {
          fieldProps[key] = other[key];
        }
      });
      
      return (
          <App.Panel layout={ orientation } className={ this._getClassName() } { ...fieldProps }>
            { label &&
              <App.Panel className="ui-controlgroup-label" { ... this._getLabelProps() }>
                <label htmlFor={ this.props.name }>
                  { label }
                  { info &&
                    <small className="ui-controlgroup-info">&nbsp;{ info }</small>
                  }
                </label>
              </App.Panel>
            }
            
            <App.Panel className="ui-controlgroup-control" layout="vertical" { ... this._getControlgroupProps() }>
              <this.props.element size="auto" { ...componentProps }>
                { this.props.children }
              </this.props.element>
              { error &&
                <small className="ui-controlgroup-errortext" size="auto">{ error }</small>
              }
            </App.Panel>
          </App.Panel>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-controlgroup": true,
          "ui-controlgroup-horizontal": this.props.orientation == "horizontal",
          "ui-controlgroup-vertical": this.props.orientation == "vertical",
          "ui-controlgroup-error": this.props.error != undefined
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _getControlClassName: function() {
      var 
        cx = React.addons.classSet,
        classes = {
          "ui-control-error": this.props.error != undefined
        }
        
      return cx(classes);
    },
    
    _getControlgroupProps: function() {
      var props = {};
      if (this.props.orientation == "horizontal") {
        props.ratio = "8";
        props.style = {
          height: "auto"
        }
      } else {
        props.size = "auto";
      }
      return props;
    },
    
    _getLabelProps: function() {
      var props = {};
      if (this.props.orientation == "horizontal") {
        props.ratio = "2";
        props.style = {
          minWidth: "150px"
        }
      } else {
        props.size = "auto";
      }
      return props;
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })