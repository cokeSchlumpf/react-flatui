var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var simpleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: \"\"\n      }  \n    },\n    \n    render: function() {\n      return \n        <div>\n          <App.Textbox \n            name=\"textbox\" value={ this.state.value } \n            addonBefore=\"Enter something\" onChange={ this._handleChange } />\n\n          <Bootstrap.Alert>\n            <strong>Current Value:</strong> { this.state.value }\n          </Bootstrap.Alert>\n        </div>;\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });";

var autocompleteExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: \"\",\n        mode: \"contains\"\n      }\n    },\n    \n    _autocompleteList: [ \"FC Bayern München\", \"Real Madrid\", \"Atletico Madrid\", \"FC Porto\", \"Paris SG\", \"FC Barcelona\", \"Juventus Turin\", \"AS Monaco\" ],\n    \n    render: function() {\n      var modes = {\n        contains: { title: \"contains\" },\n        startsWith: { title: \"startsWith\" },\n        none: { title: \"none\" }\n      };\n      \n      modes[this.state.mode].selected = true;\n      \n      return (\n          <div>\n            <App.Textbox \n              name=\"autocompleteTextbox\" value={ this.state.value } \n              onChange={ this._handleChange } autocompleteList={ this._autocompleteList } \n              autocompleteMode={ this.state.mode } />\n            \n            <p>Select the autocompletion mode:</p>\n            <App.Selectgroup value={ modes } onChange={ this._handleModeChange } name=\"autocompleteMode\" />\n          </div>   \n        )\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    },\n    \n    _handleModeChange: function(value, key) {\n      this.setState({ mode: key });\n    }\n  });";


var SimpleExample = React.createClass({displayName: "SimpleExample",
    getInitialState: function() {
      return {
        value: ""
      }  
    },
    
    render: function() {
      return (
          React.createElement(Example, {source: simpleExampleSource }, 
            React.createElement(App.Textbox, {name: "textbox", value:  this.state.value, addonBefore: "Enter something", onChange:  this._handleChange}), 
            React.createElement(Bootstrap.Alert, null, 
              React.createElement("strong", null, "Current Value:"), " ",  this.state.value
            )
          )
        );
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    }
  });
  
var AutocompletionExample = React.createClass({displayName: "AutocompletionExample",
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
          React.createElement(Example, {source: autocompleteExampleSource }, 
            React.createElement(App.Textbox, {
              name: "autocompleteTextbox", value:  this.state.value, 
              onChange:  this._handleChange, autocompleteList:  this._autocompleteList, 
              autocompleteMode:  this.state.mode}), 
            
            React.createElement("p", null, "Select the autocompletion mode:"), 
            React.createElement(App.Selectgroup, {value: modes, onChange:  this._handleModeChange, name: "autocompleteMode"})
          )   
        )
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    },
    
    _handleModeChange: function(value, key) {
      this.setState({ mode: key });
    }
  });

module.exports = React.createClass({displayName: "exports",
    
    render: function() {
      var self = this;
      
      return (
          React.createElement("article", null, 
            React.createElement("h2", null, "Textbox"), 
            React.createElement("p", null, "The Textbox renders a ", React.createElement("a", {href: "http://react-bootstrap.github.io/components.html#input", target: "_blank"}, "React Bootstrap Input"), ". You can register an ", React.createElement("code", null, "onChange(value, event)"), " event handler to react to users input."), 
            React.createElement(SimpleExample, null), 
            
            React.createElement("p", null, "If you supply a string list for the property ", React.createElement("code", null, "autocompleteList"), " an autocompletion textfield will be rendered. There are three different autocompletion modes:"), 
            React.createElement("ul", null, 
              React.createElement("li", null, React.createElement("strong", null, "contains"), " (default) - The list will be filtered for items which contain the current textbox value."), 
              React.createElement("li", null, React.createElement("strong", null, "startsWith"), " - The list will be filtered for items which start with the current textbox value."), 
              React.createElement("li", null, React.createElement("strong", null, "none"), " - The list will not be filtered.")
            ), 
            React.createElement(AutocompletionExample, null)
          )
        )
    }
    
  });