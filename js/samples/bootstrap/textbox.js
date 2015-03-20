var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var simpleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: \"\"\n      }  \n    },\n    \n    render: function() {\n      return \n        <div>\n          <App.Textbox \n            name=\"textbox\" value={ this.state.value } \n            addonBefore=\"Enter something\" onChange={ this._handleChange } />\n\n          <Bootstrap.Alert>\n            <strong>Current Value:</strong> { this.state.value }\n          </Bootstrap.Alert>\n        </div>;\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });";


var SimpleExample = React.createClass({
    getInitialState: function() {
      return {
        value: ""
      }  
    },
    
    render: function() {
      return (
          <Example source={ simpleExampleSource }>
            <App.Bootstrap.Textbox name="textbox" value={ this.state.value } addonBefore="Enter something" onChange={ this._handleChange } />
            <Bootstrap.Alert>
              <strong>Current Value:</strong> { this.state.value }
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
            <h2>Textbox</h2>
            <p>The Textbox renders a <a href="http://react-bootstrap.github.io/components.html#input" target="_blank">React Bootstrap Input</a>. You can register an <code>onChange(value, event)</code> event handler to react to users input.</p>
            <SimpleExample />
          </article>
        )
    }
    
  });