var React = require("react/addons");
var App = require("../../appui");
var base = require("./base");
var Container = base.container;
var Console = base.console;
var Example = base.example;
var Properties = base.properties;
var Events = base.events;

var SimpleExample = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    }  
  },
  
  render: function() {
    var self = this;
    
    var source = "React.createClass({\n  getInitialState: function() {\n    return { value: \"\" }  \n  },\n  \n  render: function() {\n    var self = this;\n    return (\n        <div>\n          <App.Textbox \n            name=\"textbox\" value={ this.state.value } placeholder=\"Enter your name\" \n            onChange={ function(newValue) { self.setState({ value: newValue }); } } />\n          <span>Hello { this.state.value }!</span>\n        </div>\n      );\n  }\n});";
    
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

var AutocompleteExample = React.createClass({
  getInitialState: function() {
    return {
      value: "",
      mode: {
        contains: { title: "contains", selected: true },
        startsWith: { title: "startsWith" },
        none: { title: "none" }
      }
    }
  },
  
  autocompleteData: [ "Germany", "France", "Italy", "Japan", "Canada", "United Kingdom", "United States" ],
  
  render: function() {
    var
      self = this, 
      selectedMode = App.Helper.getSelectedItem(this.state.mode).key,
      source = "React.createClass({\n  getInitialState: function() {\n    return {\n      value: \"\",\n      mode: {\n        contains: { title: \"contains\", selected: true },\n        startsWith: { title: \"startsWith\" },\n        none: { title: \"none\" }\n      }\n    }\n  },\n  \n  autocompleteData: [ \n    \"Germany\", \"France\", \"Italy\", \"Japan\", \n    \"Canada\", \"United Kingdom\", \"United States\" ],\n  \n  render: function() {\n    var\n      self = this, \n      selectedMode = App.Helper.getSelectedItem(this.state.mode).key;\n    \n    return (\n        <div>\n          <App.Textbox name=\"autocompletionTextbox\" value={ this.state.value } \n            autocompleteMode={ selectedMode } autocompleteList={ this.autocompleteData }\n            placeholder=\"Enter something\" \n            onChange={ function(newValue) { self.setState({ value: newValue }); } } />\n\n          <App.Selectgroup value={ this.state.mode } \n            onChange={ function(newValue) { self.setState({ mode: newValue }); } } />\n        </div>\n      );\n  }\n});";
    
    return (
      <Container>
        <h4>Autocompletion Example</h4>
        <Example>
          <div size="auto">
            <App.Textbox name="autocompletionTextbox" value={ this.state.value } autocompleteMode={ selectedMode } autocompleteList={ this.autocompleteData } placeholder="Enter something" onChange={ function(newValue) { self.setState({ value: newValue }); } } />
            <br />
            <App.Selectgroup value={ this.state.mode } onChange={ function(newValue) { self.setState({ mode: newValue }); } } />
          </div>
        </Example>
        <Console ratio="2">
          { source }
        </Console>
      </Container>
      );
  }
});

var AddonExample = React.createClass({
  getInitialState: function() {
    return {
      value: 42
    }
  },
  
  render: function() {
    var 
      self = this
      source = "React.createClass({\n  getInitialState: function() {\n    return { value: 42 }\n  },\n  \n  render: function() {\n    var \n      self = this;\n    \n    return (\n        <App.Textbox \n          name=\"autocompletionTextbox\" value={ this.state.value } placeholder=\"Enter something\" \n          onChange={ function(newValue) { self.setState({ value: newValue }); } }>\n          \n        <App.Button title=\"+\" position=\"left\" onClick={ self.add } />\n          <App.Button title=\"-\" onClick={ self.subtract } />\n        </App.Textbox>\n      );\n  },\n  \n  add: function() {\n    this.setState({ value: this.state.value + 1 });\n  },\n  \n  subtract: function() {\n    this.setState({ value: this.state.value - 1 });\n  }\n});";
    
    return (
      <Container>
        <h4>Addon Example</h4>
        <Example>
          <div size="auto">
            <App.Textbox name="autocompletionTextbox" value={ this.state.value } placeholder="Enter something" onChange={ function(newValue) { self.setState({ value: newValue }); } }>
              <App.Button title="+" position="left" onClick={ self.add } />
              <App.Button title="-" onClick={ self.subtract } />
            </App.Textbox>
          </div>
        </Example>
        <Console ratio="2">
          { source }
        </Console>
      </Container>
      );
  },
  
  add: function() {
    this.setState({ value: this.state.value + 1 });
  },
  
  subtract: function() {
    this.setState({ value: this.state.value - 1 });
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
  
  events: {
    onChange: {
        desc: "Triggered when Textfield value changes.",
        parameters: {
          value: { type: "String", desc: "The new value of the textfield." },
          event: { type: "Native Event", desc: "The native browser event." }
        }
      }
  },
  
  childrenProps: {
    position: {
      type: "left | right",
      desc: <p>The position of the addon within the textfield.</p>,
      default: "right"
    }
  },
  
  render: function() {
    return (
        <div>
          <p><span className="code">App.Textbox</span> renders an input box with some additional features like addons and autocompletion.</p>
          <Properties properties={ this.properties } />
          <Events events={ this.events } />
          <Properties properties={ this.childrenProps } isProperties={ false }>
            <p>If you add children properties to a textbox they will be rendered as addons to the textfield.</p>
          </Properties>
          <h4>Examples</h4>
          <SimpleExample />
          <AutocompleteExample />
          <AddonExample />
        </div>
      );
  }
});