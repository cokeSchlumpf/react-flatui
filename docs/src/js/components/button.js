var React = require("react");
var Bootstrap = require("react-bootstrap");
var Example = require("../util/example");

var FlatUI = require("../../../../dist/lib/main");
var Button = FlatUI.Button;
var DropdownButton = FlatUI.DropdownButton;
var ButtonGroup = FlatUI.ButtonGroup;

var Col = Bootstrap.Col;
var Row = Bootstrap.Row;

var simpleExampleSource = "React.createClass({\n    render: function() {\n      return (\n          <div>\n            <p>\n              <Button>Default</Button> &nbsp;\n              <Button bsStyle=\"primary\">Primary</Button> &nbsp;\n              <Button bsStyle=\"success\">Success</Button> &nbsp;\n              <Button bsStyle=\"info\">Info</Button> &nbsp;\n              <Button bsStyle=\"warning\">Warning</Button> &nbsp;\n              <Button bsStyle=\"primary\">Danger</Button> &nbsp;\n              <Button bsStyle=\"link\">Link</Button>\n            </p>\n          </div>\n        );\n    }\n  });";

var toggleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: false\n      };\n    },\n    \n    render: function() {\n      return (\n          <div>\n            <p>\n              <Button toggle={ true } value={ this.state.value } onChange={ this._handleChange }>\n                { this.state.value ? \"On\" : \"Off\" }\n              </Button>\n            </p>\n            <Bootstrap.Alert>\n              <strong>Button value: <code>{ this.state.value.toString() }</code></strong>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });"

var buttonGroupSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        valueSingle: {\n          y: { title: \"Y\", selected: true },\n          m: { title: \"M\", selected: false },\n          c: { title: \"C\", selected: false },\n          a: { title: \"A\", selected: false }\n        },\n        valueMulti: {\n          t: { title: \"T\", selected: true },\n          g: { title: \"G\", selected: false },\n          i: { title: \"I\", selected: true },\n          f: { title: \"F\", selected: true }\n        }\n      }; \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <Row>\n              <Col md={ 6 }>\n                <p>\n                  <ButtonGroup \n                    value={ this.state.valueSingle } name=\"ymca\" \n                    onChange={ this._handleSingleValueChange } />\n                </p>\n              </Col>\n              <Col md={ 6 }>\n                <p>\n                  <ButtonGroup \n                    value={ this.state.valueMulti } multiselect={ true } name=\"tgif\"\n                    onChange={ this._handleMultiValueChange } />\n                </p>\n              </Col>\n            </Row>\n             <Bootstrap.Alert>\n              <Row>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Singleselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueSingle, null, \"  \") }</pre>\n                  </p>\n                </Col>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Multiselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueMulti, null, \"  \") }</pre>\n                  </p>\n                </Col>\n              </Row>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleSingleValueChange: function(value) {\n      this.setState({ valueSingle: value });\n    },\n    \n    _handleMultiValueChange: function(value) {\n      this.setState({ valueMulti: value });\n    }\n  });"

var dropdownSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        valueSingle: {\n          y: { title: \"Y\", selected: true },\n          m: { title: \"M\", selected: false },\n          c: { title: \"C\", selected: false },\n          a: { title: \"A\", selected: false }\n        },\n        valueMulti: {\n          t: { title: \"T\", selected: true },\n          g: { title: \"G\", selected: false },\n          i: { title: \"I\", selected: true },\n          f: { title: \"F\", selected: true }\n        }\n      }; \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <Row>\n              <Col md={ 6 }>\n                <p>\n                  <DropdownButton \n                    value={ this.state.valueSingle } title=\"YMCA\" name=\"ymca\" \n                    onChange={ this._handleSingleValueChange } />\n                </p>\n              </Col>\n              <Col md={ 6 }>\n                <p>\n                  <DropdownButton \n                    value={ this.state.valueMulti } multiselect={ true } title=\"TGIF\" name=\"tgif\"\n                    onChange={ this._handleMultiValueChange } />\n                </p>\n              </Col>\n            </Row>\n             <Bootstrap.Alert>\n              <Row>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Singleselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueSingle, null, \"  \") }</pre>\n                  </p>\n                </Col>\n                <Col md={ 6 }>\n                  <p>\n                    <strong>Multiselect value:</strong> \n                    <pre>{ JSON.stringify(this.state.valueMulti, null, \"  \") }</pre>\n                  </p>\n                </Col>\n              </Row>\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleSingleValueChange: function(value) {\n      this.setState({ valueSingle: value });\n    },\n    \n    _handleMultiValueChange: function(value) {\n      this.setState({ valueMulti: value });\n    }\n  });"

var SimpleExample = React.createClass({
    render: function() {
      return (
          <Example source={ simpleExampleSource }>
            <p>
              <Button>Default</Button> &nbsp;
              <Button bsStyle="primary">Primary</Button> &nbsp;
              <Button bsStyle="success">Success</Button> &nbsp;
              <Button bsStyle="info">Info</Button> &nbsp;
              <Button bsStyle="warning">Warning</Button> &nbsp;
              <Button bsStyle="primary">Danger</Button> &nbsp;
              <Button bsStyle="link">Link</Button>
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
              <Button toggle={ true } value={ this.state.value } onChange={ this._handleChange }>
                { this.state.value ? "On" : "Off" }
              </Button>
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
                  <ButtonGroup 
                    value={ this.state.valueSingle } name="ymca" 
                    onChange={ this._handleSingleValueChange } />
                </p>
              </Col>
              <Col md={ 6 }>
                <p>
                  <ButtonGroup 
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
          <Example source={ dropdownSource }>
            <Row>
              <Col md={ 6 }>
                <p>
                  <DropdownButton 
                    value={ this.state.valueSingle } title="YMCA" name="ymca" 
                    onChange={ this._handleSingleValueChange } />
                </p>
              </Col>
              <Col md={ 6 }>
                <p>
                  <DropdownButton 
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
  
var TestButton = React.createClass({displayName: "Button",
    propTypes: {
      toggle: React.PropTypes.bool,
      value: React.PropTypes.bool,
      
      onChange: React.PropTypes.func
    },
    
    defaultProps: function() {
      return {
        toggle: false,
        value: false
      };
    },
    
    render: function() {
      var $__0=       this.props,toggle=$__0.toggle,value=$__0.value,onChange=$__0.onChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{toggle:1,value:1,onChange:1});
      if (toggle && value) other.active = true;
      
      return (
          React.createElement(Bootstrap.Button, React.__spread({},   other , {onClick:  this._handleClick, ref: "button"}),  this.props.children)
        )
    },
    
    _handleClick: function(event) {
      if (this.props.onChange) this.props.onChange(this.props.toggle ? !this.props.value : this.props.value, event);
      if (this.props.onClick) this.props.onClick();
      this.refs.button.getDOMNode().blur();
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