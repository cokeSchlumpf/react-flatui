var React = require("react/addons");
var options = require("./base").options;

module.exports = React.createClass({
    propTypes: {
      error:        React.PropTypes.string,
      info:         React.PropTypes.string,
      label:        React.PropTypes.string,
      orientation:  React.PropTypes.string
    },
    
    getDefaultProps: function() {
      return {
        
      };
    },
    
    render: function() {
      var { info, label, orientation, className, ...other } = this.props;
      
      return (
          <App.Panel layout={ orientation } className={ this._getClassName() } { ...other }>
            { label &&
              <App.Panel className="ui-controlgroup-label" { ... this._getLabelProps() }>
                <label for={ this.props.children[0].id }>
                  { label }
                  { info &&
                    <span className="ui-controlgroup-info">{ info }</span>
                  }
                </label>
              </App.Panel>
              <App.Panel className="ui-controlgroup-control">
                { children }
              </App.Panel>
            }
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
    
    _getControlgroupProps: function() {
      var props = {};
      if (this.props.orienttaion == "horizontal") {
        props.ratio = "7";
      } else {
        props.size = "auto";
      }
    },
    
    _getLabelProps: function() {
      var props = {};
      if (this.props.orientation == "horizontal") {
        props.ratio = "3";
      } else {
        props.size = "auto";
      }
      return props;
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value);
    }
  })