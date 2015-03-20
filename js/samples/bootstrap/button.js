var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var simpleExampleSource = "React.createClass({\n    render: function() {\n      return (\n          <div>\n            <p>\n              <App.Bootstrap.Button>Default</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"primary\">Primary</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"success\">Success</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"info\">Info</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"warning\">Warning</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"primary\">Danger</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"link\">Link</App.Bootstrap.Button>\n            </p>\n          </div>\n        );\n    }\n  });";


var SimpleExample = React.createClass({
    render: function() {
      return (
          <Example source={ simpleExampleSource }>
            <p>
              <App.Bootstrap.Button>Default</App.Bootstrap.Button> &nbsp;
              <App.Bootstrap.Button bsStyle="primary">Primary</App.Bootstrap.Button> &nbsp;
              <App.Bootstrap.Button bsStyle="success">Success</App.Bootstrap.Button> &nbsp;
              <App.Bootstrap.Button bsStyle="info">Info</App.Bootstrap.Button> &nbsp;
              <App.Bootstrap.Button bsStyle="warning">Warning</App.Bootstrap.Button> &nbsp;
              <App.Bootstrap.Button bsStyle="primary">Danger</App.Bootstrap.Button> &nbsp;
              <App.Bootstrap.Button bsStyle="link">Link</App.Bootstrap.Button>
            </p>
          </Example>
        );
    }
  });
  
var ToggleExample = React.createClass({
    getInitialState: function() {
      return {
        value: false
      };
    },
    
    render: function() {
      return (
          <Example source="">
            <p>
              <App.Bootstrap.Button toggle={ true } value={ this.state.value } onChange={ this._handleChange }>
                { this.state.value ? "On" : "Off" }
              </App.Bootstrap.Button>
            </p>
            <Bootstrap.Alert>
              <strong>Button value: <code>{ this.state.value.toString() }</code></strong>
            </Bootstrap.Alert>
          </Example>
        );
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    }
  });

module.exports = React.createClass({
    
    render: function() {
      var self = this;
      
      return (
          <article>
            <h2>Buttons <small>single buttons, toggles and buttongroups</small></h2>
            <p>The button component wraps a <a href="http://react-bootstrap.github.io/components.html#buttons" target="_blank">React Bootstraps button</a>. This means you can apply all known bootstrap styles to it. In addition React Flat UI adds some special handlers which are useful for using buttons with React Flat UIs forms.</p>
            <SimpleExample />

            <p>Use the <code>toggle</code> property to indicate, that the button is a toggle button. The <code>onChange(value, event)</code> event can be used to listen to changes.</p>
            <ToggleExample />
          </article>
        )
    }
    
  });