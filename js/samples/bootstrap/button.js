var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var Col = Bootstrap.Col;
var Row = Bootstrap.Row;

var simpleExampleSource = "React.createClass({\n    render: function() {\n      return (\n          <div>\n            <p>\n              <App.Bootstrap.Button>Default</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"primary\">Primary</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"success\">Success</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"info\">Info</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"warning\">Warning</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"primary\">Danger</App.Bootstrap.Button> &nbsp;\n              <App.Bootstrap.Button bsStyle=\"link\">Link</App.Bootstrap.Button>\n            </p>\n          </div>\n        );\n    }\n  });";

var toggleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: false\n      };\n    },\n    \n    render: function() {\n      return (\n          <div>\n            <p>\n              <App.Bootstrap.Button toggle={ true } value={ this.state.value } onChange={ this._handleChange }>\n                { this.state.value ? \"On\" : \"Off\" }\n              </App.Bootstrap.Button>\n            </p>\n            <Bootstrap.Alert>\n              <strong>Button value: <code>{ this.state.value.toString() }</code></strong>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });"

var buttonGroupSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        valueSingle: {\n          y: { title: \"Y\", selected: true },\n          m: { title: \"M\", selected: false },\n          c: { title: \"C\", selected: false },\n          a: { title: \"A\", selected: false }\n        },\n        valueMulti: {\n          t: { title: \"T\", selected: true },\n          g: { title: \"G\", selected: false },\n          i: { title: \"I\", selected: true },\n          f: { title: \"F\", selected: true }\n        }\n      }; \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <Row>\n              <Col md={ 6 }>\n                <p>\n                  <App.Bootstrap.ButtonGroup \n                    value={ this.state.valueSingle } name=\"ymca\" \n                    onChange={ this._handleSingleValueChange } />\n                </p>\n              </Col>\n              <Col md={ 6 }>\n                <p>\n                  <App.Bootstrap.ButtonGroup \n                    value={ this.state.valueMulti } multiselect={ true } name=\"tgif\"\n                    onChange={ this._handleMultiValueChange } />\n                </p>\n              </Col>\n            </Row>\n             <Bootstrap.Alert>\n              <Row>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Singleselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueSingle, null, \"  \") }</pre>\n                  </p>\n                </Col>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Multiselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueMulti, null, \"  \") }</pre>\n                  </p>\n                </Col>\n              </Row>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleSingleValueChange: function(value) {\n      this.setState({ valueSingle: value });\n    },\n    \n    _handleMultiValueChange: function(value) {\n      this.setState({ valueMulti: value });\n    }\n  });"


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
          <Example source={ toggleExampleSource }>
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
  
var ButtonGroupExample = React.createClass({
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
          <Example source={ buttonGroupSource }>
            <Row>
              <Col md={ 6 }>
                <p>
                  <App.Bootstrap.ButtonGroup 
                    value={ this.state.valueSingle } name="ymca" 
                    onChange={ this._handleSingleValueChange } />
                </p>
              </Col>
              <Col md={ 6 }>
                <p>
                  <App.Bootstrap.ButtonGroup 
                    value={ this.state.valueMulti } multiselect={ true } name="tgif"
                    onChange={ this._handleMultiValueChange } />
                </p>
              </Col>
            </Row>
             <Bootstrap.Alert>
              <Row>
                <Col md={ 6 }>
                  <p>
                    <strong>Singleselect value:</strong> 
                    <pre>{ JSON.stringify(this.state.valueSingle, null, "  ") }</pre>
                  </p>
                </Col>
                <Col md={ 6 }>
                  <p>
                    <strong>Multiselect value:</strong> 
                    <pre>{ JSON.stringify(this.state.valueMulti, null, "  ") }</pre>
                  </p>
                </Col>
              </Row>
            </Bootstrap.Alert>
          </Example>
        );
    },
    
    _handleSingleValueChange: function(value) {
      this.setState({ valueSingle: value });
    },
    
    _handleMultiValueChange: function(value) {
      this.setState({ valueMulti: value });
    }
  });

var DropdownExample = React.createClass({
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
          <Example source={ buttonGroupSource }>
            <Row>
              <Col md={ 6 }>
                <p>
                  <App.Bootstrap.DropdownButton 
                    value={ this.state.valueSingle } title="YMCA" name="ymca" 
                    onChange={ this._handleSingleValueChange } />
                </p>
              </Col>
              <Col md={ 6 }>
                <p>
                  <App.Bootstrap.DropdownButton 
                    value={ this.state.valueMulti } multiselect={ true } title="TGIF" name="tgif"
                    onChange={ this._handleMultiValueChange } />
                </p>
              </Col>
            </Row>
             <Bootstrap.Alert>
              <Row>
                <Col md={ 6 }>
                  <p>
                    <strong>Singleselect value:</strong> 
                    <pre>{ JSON.stringify(this.state.valueSingle, null, "  ") }</pre>
                  </p>
                </Col>
                <Col md={ 6 }>
                  <p>
                    <strong>Multiselect value:</strong> 
                    <pre>{ JSON.stringify(this.state.valueMulti, null, "  ") }</pre>
                  </p>
                </Col>
              </Row>
            </Bootstrap.Alert>
          </Example>
        );
    },
    
    _handleSingleValueChange: function(value) {
      this.setState({ valueSingle: value });
    },
    
    _handleMultiValueChange: function(value) {
      this.setState({ valueMulti: value });
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
            
            <p>Buttons can be assembled in a buttongroup for single- or multiselect values. The <code>onChange(newValue, selectedKey, selected, event)</code>-Handler is called when the data changes. You can also use the ButtonGroup within a <code>form</code>-element since it renders hidden <code>input</code> elements into the DOM.</p>
            <ButtonGroupExample />
            
            <p>Buttons can also be used as Dropdown Buttons, simply attach a menu to them:</p>
            <DropdownExample />
          </article>
        )
    }
    
  });