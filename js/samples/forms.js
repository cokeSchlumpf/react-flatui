var React = require("react/addons");
var App = require("../appui");

module.exports = React.createClass({
  
  getInitialState: function() {
    return {
      value: {
        lastName: "Horst",
        firstName: "Michael",
        additional: {
          age: "12",
          sex: {
            1: { title: "male", selected: true },
            2: { title: "female" }
          }
        }
      }
    };
  },
  
  render: function() {
    return (
        <App layout="border">
          <App.Panel position="left" />
          <App.Panel position="center" layout="vertical">
            <App.Panel size="auto">
              <h1>Forms Sample <small>Subtitle</small></h1>
              <p className="lead">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </App.Panel>
            <App.Form value={ this.state.value } onChange={ this._handleFormChange } layout="vertical" justify="start" style={{ height: "auto" }}>
              <App.Formfield name="firstName" element={ App.Textbox } size="auto" label="First Name" />
              <App.Formfield name="lastName" element={ App.Textbox } size="auto" label="Last Name" />

              <App.Fieldset label="Additional information" border={ true } name="additional" layout="horizontal">
                <App.Formfield name="age" element={ App.Textbox } orientation="vertical" label="Age" />
                <App.Formfield name="sex" element={ App.Combobox } orientation="vertical" label="Sex" />
              </App.Fieldset>
            </App.Form>
            
            
          </App.Panel>
          <App.Panel position="right" />
        </App>
      );
  },
  
  _handleFormChange: function(data) {
    console.log(data);
    this.setState({ value: data });
  }
});