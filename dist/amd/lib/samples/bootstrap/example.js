define(function (require, exports, module) {var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var PrismCode = require("./prism");

module.exports = React.createClass({displayName: "exports",
    getInitialState: function() {
      return { toggled: false }  
    },
    
    render: function() {
      var toggleButton = this.state.toggled ? "Hide code" : "Show code";
      
      return (
          React.createElement("div", {className: "fu-example-container"}, 
            React.createElement("div", {className: "fu-example"}, 
               this.props.children
            ), 
             
              this.state.toggled && 
              React.createElement("div", {className: "fu-example-code"}, 
                React.createElement(PrismCode, {className: "language-javascript"}, 
                   this.props.source
                )
              ), 
            
            React.createElement("a", {href: "#", className: "fu-example-toggle small", onClick:  this._handleToggle}, 
              toggleButton 
            )
          )
        );
    },
    
    _handleToggle: function(event) {
      this.setState({ toggled: !this.state.toggled });
      event.preventDefault();
      event.stopPropagation();
    } 
  });
});
