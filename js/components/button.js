var React = require("react/addons");
var options = require("./base").options;

module.exports = React.createClass({
    propTypes: {
      caption: React.PropTypes.string,
      onClick: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        caption: "",
        onClick: function() { console.log("Clicked Button"); }
      };
    },
    
    render: function() {
      var { onClick, className, ...other } = this.props;
      var cx = React.addons.classSet;
      
      /** assemble class name */
      var classes = {
        "ui-control": true,
        "ui-control-button": true
      };
  
      if (className) { classes[className] = true; }
      
      
      
      return (
          <button className={ cx(classes) } { ...other } onClick={ this._onClickHandler }>
            <span className="left-icon">
              { 
                React.Children.map(this.props.children, function(child, index) {
                  if (child && child.props.position == "left") {
                    return child;
                  } else {
                    return undefined;
                  }
                })
              }
            </span>
            { this.props.caption }
            <span className="right-icon">
              { 
                React.Children.map(this.props.children, function(child, index) {
                  if (child && child.props.position != "left") {
                    return child;
                  } else {
                    return undefined;
                  }
                })
              }
            </span>
          </button>
        );
    },
    
    _onClickHandler: function(event) {
      this.props.onClick();
    }
  });