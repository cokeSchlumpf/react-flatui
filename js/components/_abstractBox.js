var React = require("react/addons");
var options = require("./base").options;

module.exports = function(type) {
    return React.createClass({
      propTypes: {
        caption: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        value: React.PropTypes.string,
        selected: React.PropTypes.bool
      },
      
      getDefaultProps: function() {
        return {
          selected: false,
          value: "Check me!",
          onChange: function(checked, value) { console.log(value + ": " + checked); }
        };
      },
      
      render: function() {
        var { onChange, className, selected, ...other } = this.props;
        var cx = React.addons.classSet;
        
        /** assemble class name */
        var classes = {
          "ui-control": true
        };
  
        classes["ui-control-" + type] = true;
        if (className) { classes[className] = true; }
        
        if (selected) {
          other["checked"] = "checked";
        }
        
        return (
            <div className={ cx(classes) }>
              <input type={ type } onChange={ this._onChangeHandler } { ...other } id={ this.props.id ? this.props.id : this.props.name } />
              <label htmlFor={ this.props.id ? this.props.id : this.props.name }><span className="ui-control-display-element"  />{ this.props.caption }</label>
            </div>
          );
      },
      
      _onChangeHandler: function(event) {
        this.props.onChange(event.target.checked, event.target.value);
      }
    })
  }