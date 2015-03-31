var React = require("react");
var Bootstrap = require("react-bootstrap");
var App = require("../../../../dist/lib/main");
var Example = require("../util/example");

var Form = App.Form;
var Textbox = App.Textbox;
var Fieldset = App.Fieldset;

var simpleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        value: {\n          firstName: \"Florian\",\n          lastName: \"Müller\",\n          additional: {\n            hobbies: \"\"\n          }\n        }\n      }  \n    },\n    \n    render: function() {\n      return (\n          <Example source={ simpleExampleSource }>\n            <Form value={ this.state.value } onChange={ this._handleChange } className='form-horizontal'>\n              <Textbox name=\"firstName\" label=\"First Name\" labelClassName=\"col-xs-2\" wrapperClassName=\"col-xs-10\" />\n              <Textbox name=\"lastName\" label=\"Last Name\" labelClassName=\"col-xs-2\" wrapperClassName=\"col-xs-10\" />\n              \n              <Fieldset label=\"Additional Information\" name=\"additional\">\n                <Textbox name=\"hobbies\" label=\"What do you like?\" labelClassName=\"col-xs-2\" wrapperClassName=\"col-xs-10\" />\n              </Fieldset>\n            </Form>\n            \n            <Bootstrap.Alert>\n              <strong>Current value:</strong><br />\n              <pre>{ JSON.stringify(this.state.value, null, \"  \") }</pre>\n            </Bootstrap.Alert>\n          </Example>\n        );\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });";


var SimpleExample = React.createClass({
    getInitialState: function() {
      return {
        value: {
          firstName: "Florian",
          lastName: "Müller",
          additional: {
            hobbies: ""
          }
        }
      }  
    },
    
    render: function() {
      return (
          <Example source={ simpleExampleSource }>
            <Form value={ this.state.value } onChange={ this._handleChange } className='form-horizontal'>
              <Textbox name="firstName" label="First Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
              <Textbox name="lastName" label="Last Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
              
              <Fieldset label="Additional Information" name="additional">
                <Textbox name="hobbies" label="What do you like?" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
              </Fieldset>
            </Form>
            
            <Bootstrap.Alert>
              <strong>Current value:</strong><br />
              <pre>{ JSON.stringify(this.state.value, null, "  ") }</pre>
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
            <h2>Forms</h2>
            <p>You can also use <code>Form</code> and <code>Fieldset</code> to handle values.</p>
            <SimpleExample />
          </article>
        )
    }
    
  });