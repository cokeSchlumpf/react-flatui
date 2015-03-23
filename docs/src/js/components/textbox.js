var React = require("react");
var Bootstrap = require("react-bootstrap");
var App = require("../../../../dist/lib/main");
var Example = require("../util/example");

var simpleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: \"\"\n      }  \n    },\n    \n    render: function() {\n      return \n        <div>\n          <App.Textbox \n            name=\"textbox\" value={ this.state.value } \n            addonBefore=\"Enter something\" onChange={ this._handleChange } />\n\n          <Bootstrap.Alert>\n            <strong>Current Value:</strong> { this.state.value }\n          </Bootstrap.Alert>\n        </div>;\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });";

var autocompleteExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: \"\",\n        mode: \"contains\"\n      }\n    },\n    \n    _autocompleteList: [ \"FC Bayern München\", \"Real Madrid\", \"Atletico Madrid\", \"FC Porto\", \"Paris SG\", \"FC Barcelona\", \"Juventus Turin\", \"AS Monaco\" ],\n    \n    render: function() {\n      var modes = {\n        contains: { title: \"contains\" },\n        startsWith: { title: \"startsWith\" },\n        none: { title: \"none\" }\n      };\n      \n      modes[this.state.mode].selected = true;\n      \n      return (\n          <div>\n            <App.Textbox \n              name=\"autocompleteTextbox\" value={ this.state.value } \n              onChange={ this._handleChange } autocompleteList={ this._autocompleteList } \n              autocompleteMode={ this.state.mode } />\n            \n            <p>Select the autocompletion mode:</p>\n            <App.Selectgroup value={ modes } onChange={ this._handleModeChange } name=\"autocompleteMode\" />\n          </div>   \n        )\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    },\n    \n    _handleModeChange: function(value, key) {\n      this.setState({ mode: key });\n    }\n  });";


var SimpleExample = React.createClass({
    getInitialState: function() {
      return {
        value: ""
      }  
    },
    
    render: function() {
      return (
          <Example source={ simpleExampleSource }>
            <App.Textbox name="textbox" value={ this.state.value } addonBefore="Enter something" onChange={ this._handleChange } />
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
  
var AutocompletionExample = React.createClass({
    getInitialState: function() {
      return {
        value: "",
        mode: "contains"
      }
    },
    
    _autocompleteList: [ "FC Bayern München", "Real Madrid", "Atletico Madrid", "FC Porto", "Paris SG", "FC Barcelona", "Juventus Turin", "AS Monaco" ],
    
    render: function() {
      var modes = {
        contains: { title: "contains" },
        startsWith: { title: "startsWith" },
        none: { title: "none" }
      };
      
      modes[this.state.mode].selected = true;
      
      return (
          <Example source={ autocompleteExampleSource } >
            <App.Textbox 
              name="autocompleteTextbox" value={ this.state.value } 
              onChange={ this._handleChange } autocompleteList={ this._autocompleteList } 
              autocompleteMode={ this.state.mode } />
            
            <p>Select the autocompletion mode:</p>
            <App.Selectgroup value={ modes } onChange={ this._handleModeChange } name="autocompleteMode" />
          </Example>   
        )
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    },
    
    _handleModeChange: function(value, key) {
      this.setState({ mode: key });
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
            
            <p>If you supply a string list for the property <code>autocompleteList</code> an autocompletion textfield will be rendered. There are three different autocompletion modes:</p>
            <ul>
              <li><strong>contains</strong> (default) - The list will be filtered for items which contain the current textbox value.</li>
              <li><strong>startsWith</strong> - The list will be filtered for items which start with the current textbox value.</li>
              <li><strong>none</strong> - The list will not be filtered.</li>
            </ul>
            <AutocompletionExample />            
          </article>
        )
    }
    
  });