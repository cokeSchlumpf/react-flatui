var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var PrismCode = require("./prism");

module.exports = React.createClass({
    getInitialState: function() {
      return { toggled: false }  
    },
    
    render: function() {
      var toggleButton = this.state.toggled ? "Hide code" : "Show code";
      
      return (
          <div className="fu-example-container">
            <div className="fu-example">
              { this.props.children }
            </div>
            { 
              this.state.toggled && 
              <div className="fu-example-code">
                <PrismCode className="language-javascript">
                  { this.props.source }
                </PrismCode>
              </div> 
            }
            <a href="#" className="fu-example-toggle small" onClick={ this._handleToggle }>
              { toggleButton }
            </a>
          </div>
        );
    },
    
    _handleToggle: function(event) {
      this.setState({ toggled: !this.state.toggled });
      event.preventDefault();
      event.stopPropagation();
    } 
  });