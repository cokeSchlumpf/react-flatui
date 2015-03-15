var React = require("react/addons");
var App = require("../appui");

var Textbox = require("./sampler/textbox");



module.exports = React.createClass({
  
  render: function() {
    return (
        <App layout="border" scrollable={ true }>
          <App.Panel position="left" />
          <App.Panel position="right" />
          <App.Panel position="center">
            <h2>Getting started</h2>
            <h3>Basic Principles</h3>
            
            <h2>Formcontrols <small>Rendering data</small></h2>
            <h3>Textbox</h3>
            <Textbox />
            <h3>Combobox</h3>
            <h3>Listbox</h3>
            <h3>Table</h3>
            <h3>Check- &amp; Radiobox</h3>
            <h3>Selectgroup</h3>
            <h3>Buttongroup</h3>
            <h3>Button</h3>
            <h3>Formfield</h3>
            
            <h2>Containers</h2>
            <h3>Form</h3>
            <h3>Fieldset</h3>
            <h3>Tabs</h3>
            
            <h2>Miscellaneous</h2>
            <h3>Menu</h3>
            
            <h2>Layouts</h2>
            <h3>No Layout</h3>
            <h3>Horizontal &amp; Vertical Layout</h3>
            <h3>Border Layout</h3>
          </App.Panel>
        </App>
      );
  }
  
});