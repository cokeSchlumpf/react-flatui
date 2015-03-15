var React = require("react/addons");
var App = require("../../appui");
var base = require("./base");
var Container = base.container;
var Console = base.console;
var Example = base.example;
var Properties = base.properties;

var SimpleExample = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    }  
  },
  
  render: function() {
    var self = this;
    
    var source = "React.createClass({\n  getInitialState: function() {\n    return { value: \"\" }  \n  },\n  \n  render: function() {\n    var self = this;\n    return (\n        <div>\n          <App.Textbox \n            name=\"textbox\" value={ this.state.value } placeholder=\"Enter your name\" \n            onChange={ function(newValue) { self.setState({ value: newValue }); } } />\n\n          { this.state.value.length > 0 ? <span>Hello { this.state.value }!</span> : <span>Hello!</span> }\n        </div>\n      );\n  }\n});";
    
    return (
        <Container>
          <h4>Simple Example</h4>
          <Example>
              <div size="auto">
                <App.Textbox name="textbox" value={ this.state.value } placeholder="Enter your name" onChange={ function(newValue) { self.setState({ value: newValue }); } } />
                <br />
                { this.state.value.length > 0 ? <span>Hello { this.state.value }!</span> : <span>Hello!</span> }
              </div>
          </Example>
          <Console ratio="2">
            { source }
          </Console>
        </Container>
      );
  }
});

module.exports = React.createClass({
  properties: {
    autocompleteList: {
      type: "Array[String]",
      desc: <p>A list of values for autocompletion.</p>
    },
    autocompleteMode: {
      type: "String",
      default: "contains",
      desc: <p>Bla Bla</p>,
      values: [ "none", "contains", "startsWith" ]
    },
    name: {
      type: "String",
      required: true,
      desc: <p>The name of the control.</p>
    },
    onChange: {
      type: "Func",
      desc: <p>Handler which will be called when the value changes.</p>,
      parameters: [ "newValue" ]
    },
    rows: {
      type: "Number",
      default: 1,
      desc: <p>The number of lines. If larger than 1, a Textarea will be rendered.</p>
    },
    type: {
      type: "String",
      default: "text",
      desc: <p>A HTML5 valid input type.</p>
    },
    value: {
      type: "String",
      desc: <p>The current value of the text field.</p>
    }
  },
  
  render: function() {
    console.log(App.Textbox.propTypes.autocompleteList);
    return (
        <div>
          <p><span className="code">App.Textbox</span> renders an input box with some additional features like addons and autocompletion.</p>
          <Properties properties={ this.properties } />
          <SimpleExample />
          <SimpleExample />
        </div>
      );
  }
});