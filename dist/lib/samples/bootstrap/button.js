var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var Col = Bootstrap.Col;
var Row = Bootstrap.Row;

var simpleExampleSource = "React.createClass({\n    render: function() {\n      return (\n          <div>\n            <p>\n              <App.Button>Default</App.Button> &nbsp;\n              <App.Button bsStyle=\"primary\">Primary</App.Button> &nbsp;\n              <App.Button bsStyle=\"success\">Success</App.Button> &nbsp;\n              <App.Button bsStyle=\"info\">Info</App.Button> &nbsp;\n              <App.Button bsStyle=\"warning\">Warning</App.Button> &nbsp;\n              <App.Button bsStyle=\"primary\">Danger</App.Button> &nbsp;\n              <App.Button bsStyle=\"link\">Link</App.Button>\n            </p>\n          </div>\n        );\n    }\n  });";

var toggleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: false\n      };\n    },\n    \n    render: function() {\n      return (\n          <div>\n            <p>\n              <App.Button toggle={ true } value={ this.state.value } onChange={ this._handleChange }>\n                { this.state.value ? \"On\" : \"Off\" }\n              </App.Button>\n            </p>\n            <Bootstrap.Alert>\n              <strong>Button value: <code>{ this.state.value.toString() }</code></strong>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });"

var buttonGroupSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        valueSingle: {\n          y: { title: \"Y\", selected: true },\n          m: { title: \"M\", selected: false },\n          c: { title: \"C\", selected: false },\n          a: { title: \"A\", selected: false }\n        },\n        valueMulti: {\n          t: { title: \"T\", selected: true },\n          g: { title: \"G\", selected: false },\n          i: { title: \"I\", selected: true },\n          f: { title: \"F\", selected: true }\n        }\n      }; \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <Row>\n              <Col md={ 6 }>\n                <p>\n                  <App.ButtonGroup \n                    value={ this.state.valueSingle } name=\"ymca\" \n                    onChange={ this._handleSingleValueChange } />\n                </p>\n              </Col>\n              <Col md={ 6 }>\n                <p>\n                  <App.ButtonGroup \n                    value={ this.state.valueMulti } multiselect={ true } name=\"tgif\"\n                    onChange={ this._handleMultiValueChange } />\n                </p>\n              </Col>\n            </Row>\n             <Bootstrap.Alert>\n              <Row>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Singleselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueSingle, null, \"  \") }</pre>\n                  </p>\n                </Col>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Multiselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueMulti, null, \"  \") }</pre>\n                  </p>\n                </Col>\n              </Row>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleSingleValueChange: function(value) {\n      this.setState({ valueSingle: value });\n    },\n    \n    _handleMultiValueChange: function(value) {\n      this.setState({ valueMulti: value });\n    }\n  });"

var dropdownSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        valueSingle: {\n          y: { title: \"Y\", selected: true },\n          m: { title: \"M\", selected: false },\n          c: { title: \"C\", selected: false },\n          a: { title: \"A\", selected: false }\n        },\n        valueMulti: {\n          t: { title: \"T\", selected: true },\n          g: { title: \"G\", selected: false },\n          i: { title: \"I\", selected: true },\n          f: { title: \"F\", selected: true }\n        }\n      }; \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <Row>\n              <Col md={ 6 }>\n                <p>\n                  <App.DropdownButton \n                    value={ this.state.valueSingle } title=\"YMCA\" name=\"ymca\" \n                    onChange={ this._handleSingleValueChange } />\n                </p>\n              </Col>\n              <Col md={ 6 }>\n                <p>\n                  <App.DropdownButton \n                    value={ this.state.valueMulti } multiselect={ true } title=\"TGIF\" name=\"tgif\"\n                    onChange={ this._handleMultiValueChange } />\n                </p>\n              </Col>\n            </Row>\n             <Bootstrap.Alert>\n              <Row>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Singleselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueSingle, null, \"  \") }</pre>\n                  </p>\n                </Col>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Multiselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueMulti, null, \"  \") }</pre>\n                  </p>\n                </Col>\n              </Row>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleSingleValueChange: function(value) {\n      this.setState({ valueSingle: value });\n    },\n    \n    _handleMultiValueChange: function(value) {\n      this.setState({ valueMulti: value });\n    }\n  });"

var SimpleExample = React.createClass({displayName: "SimpleExample",
    render: function() {
      return (
          React.createElement(Example, {source: simpleExampleSource }, 
            React.createElement("p", null, 
              React.createElement(App.Button, null, "Default"), "  ", 
              React.createElement(App.Button, {bsStyle: "primary"}, "Primary"), "  ", 
              React.createElement(App.Button, {bsStyle: "success"}, "Success"), "  ", 
              React.createElement(App.Button, {bsStyle: "info"}, "Info"), "  ", 
              React.createElement(App.Button, {bsStyle: "warning"}, "Warning"), "  ", 
              React.createElement(App.Button, {bsStyle: "primary"}, "Danger"), "  ", 
              React.createElement(App.Button, {bsStyle: "link"}, "Link")
            )
          )
        );
    }
  });
  
var ToggleExample = React.createClass({displayName: "ToggleExample",
    getInitialState: function() {
      return {
        value: false
      };
    },
    
    render: function() {
      return (
          React.createElement(Example, {source: toggleExampleSource }, 
            React.createElement("p", null, 
              React.createElement(App.Button, {toggle: true, value:  this.state.value, onChange:  this._handleChange}, 
                 this.state.value ? "On" : "Off"
              )
            ), 
            React.createElement(Bootstrap.Alert, null, 
              React.createElement("strong", null, "Button value: ", React.createElement("code", null,  this.state.value.toString() ))
            )
          )
        );
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    }
  });
  
var ButtonGroupExample = React.createClass({displayName: "ButtonGroupExample",
    getInitialState: function() {
      return {
        valueSingle: {
          y: { title: "Y", selected: true },
          m: { title: "M", selected: false },
          c: { title: "C", selected: false },
          a: { title: "A", selected: false }
        },
        valueMulti: {
          t: { title: "T", selected: true },
          g: { title: "G", selected: false },
          i: { title: "I", selected: true },
          f: { title: "F", selected: true }
        }
      }; 
    },
    
    render: function() {
      return (
          React.createElement(Example, {source: buttonGroupSource }, 
            React.createElement(Row, null, 
              React.createElement(Col, {md: 6 }, 
                React.createElement("p", null, 
                  React.createElement(App.ButtonGroup, {
                    value:  this.state.valueSingle, name: "ymca", 
                    onChange:  this._handleSingleValueChange})
                )
              ), 
              React.createElement(Col, {md: 6 }, 
                React.createElement("p", null, 
                  React.createElement(App.ButtonGroup, {
                    value:  this.state.valueMulti, multiselect: true, name: "tgif", 
                    onChange:  this._handleMultiValueChange})
                )
              )
            ), 
             React.createElement(Bootstrap.Alert, null, 
              React.createElement(Row, null, 
                React.createElement(Col, {md: 6 }, 
                  React.createElement("p", null, 
                    React.createElement("strong", null, "Singleselect value:"), 
                    React.createElement("pre", null,  JSON.stringify(this.state.valueSingle, null, "  ") )
                  )
                ), 
                React.createElement(Col, {md: 6 }, 
                  React.createElement("p", null, 
                    React.createElement("strong", null, "Multiselect value:"), 
                    React.createElement("pre", null,  JSON.stringify(this.state.valueMulti, null, "  ") )
                  )
                )
              )
            )
          )
        );
    },
    
    _handleSingleValueChange: function(value) {
      this.setState({ valueSingle: value });
    },
    
    _handleMultiValueChange: function(value) {
      this.setState({ valueMulti: value });
    }
  });

var DropdownExample = React.createClass({displayName: "DropdownExample",
    getInitialState: function() {
      return {
        valueSingle: {
          y: { title: "Y", selected: true },
          m: { title: "M", selected: false },
          c: { title: "C", selected: false },
          a: { title: "A", selected: false }
        },
        valueMulti: {
          t: { title: "T", selected: true },
          g: { title: "G", selected: false },
          i: { title: "I", selected: true },
          f: { title: "F", selected: true }
        }
      }; 
    },
    
    render: function() {
      return (
          React.createElement(Example, {source: dropdownSource }, 
            React.createElement(Row, null, 
              React.createElement(Col, {md: 6 }, 
                React.createElement("p", null, 
                  React.createElement(App.DropdownButton, {
                    value:  this.state.valueSingle, title: "YMCA", name: "ymca", 
                    onChange:  this._handleSingleValueChange})
                )
              ), 
              React.createElement(Col, {md: 6 }, 
                React.createElement("p", null, 
                  React.createElement(App.DropdownButton, {
                    value:  this.state.valueMulti, multiselect: true, title: "TGIF", name: "tgif", 
                    onChange:  this._handleMultiValueChange})
                )
              )
            ), 
             React.createElement(Bootstrap.Alert, null, 
              React.createElement(Row, null, 
                React.createElement(Col, {md: 6 }, 
                  React.createElement("p", null, 
                    React.createElement("strong", null, "Singleselect value:"), 
                    React.createElement("pre", null,  JSON.stringify(this.state.valueSingle, null, "  ") )
                  )
                ), 
                React.createElement(Col, {md: 6 }, 
                  React.createElement("p", null, 
                    React.createElement("strong", null, "Multiselect value:"), 
                    React.createElement("pre", null,  JSON.stringify(this.state.valueMulti, null, "  ") )
                  )
                )
              )
            )
          )
        );
    },
    
    _handleSingleValueChange: function(value) {
      this.setState({ valueSingle: value });
    },
    
    _handleMultiValueChange: function(value) {
      this.setState({ valueMulti: value });
    }
  });

module.exports = React.createClass({displayName: "exports",
    
    render: function() {
      var self = this;
      
      return (
          React.createElement("article", null, 
            React.createElement("h2", null, "Buttons ", React.createElement("small", null, "single buttons, toggles and buttongroups")), 
            React.createElement("p", null, "The button component wraps a ", React.createElement("a", {href: "http://react-bootstrap.github.io/components.html#buttons", target: "_blank"}, "React Bootstraps button"), ". This means you can apply all known bootstrap styles to it. In addition React Flat UI adds some special handlers which are useful for using buttons with React Flat UIs forms."), 
            React.createElement(SimpleExample, null), 

            React.createElement("p", null, "Use the ", React.createElement("code", null, "toggle"), " property to indicate, that the button is a toggle button. The ", React.createElement("code", null, "onChange(value, event)"), " event can be used to listen to changes."), 
            React.createElement(ToggleExample, null), 
            
            React.createElement("p", null, "Buttons can be assembled in a buttongroup for single- or multiselect values. The ", React.createElement("code", null, "onChange(newValue, selectedKey, selected, event)"), "-Handler is called when the data changes. You can also use the ButtonGroup within a ", React.createElement("code", null, "form"), "-element since it renders hidden ", React.createElement("code", null, "input"), " elements into the DOM."), 
            React.createElement(ButtonGroupExample, null), 
            
            React.createElement("p", null, "Buttons can also be used as Dropdown Buttons, simply attach a menu to them:"), 
            React.createElement(DropdownExample, null)
          )
        )
    }
    
  });