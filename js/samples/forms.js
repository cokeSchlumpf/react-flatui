var React = require("react/addons");
var App = require("../appui");

var menu = <App.Menu size="auto">
    <App.Button label="Fett" />
    <App.Button label="Kursiv" name="kursiv" toggle="true" toggle={ true } value={ true } />
    <App.Menu.Separator />
    <App.Button label="Unterstrichen" />
  </App.Menu>
  
var table = {
  columns: {
    id:       { label: "#" },
    team:     { label: "Team" },
    games:    { label: "Games" },
    plus:     { label: "+" },
    minus:    { label: "-" },
    diff:     { label: "Diff."},
    points:   { label: "Points" }
  },
  
  value: {
    1: { id: 1, team: "FC Bayern München", games: 10, plus: 28, minus: 3, diff: 25, points: 27 },
    2: { id: 2, team: "Borussia Dortmund", games: 10, plus: 21, minus: 8, diff: 13, points: 25 },
    3: { id: 3, team: "VfB Stuttgart", games: 10, plus: 10, minus: 39, diff: -29, points: 8 },
    4: { id: 1, team: "SC Freiburg", games: 10, plus: 28, minus: 3, diff: 25, points: 27 },
    5: { id: 2, team: "Vfl Wolfsburg", games: 10, plus: 21, minus: 8, diff: 13, points: 25 },
    6: { id: 3, team: "Hamburger SV", games: 10, plus: 10, minus: 39, diff: -29, points: 8 },
    7: { id: 1, team: "TSG Hoffenheim", games: 10, plus: 28, minus: 3, diff: 25, points: 27 },
    8: { id: 2, team: "1. FC Köln", games: 10, plus: 21, minus: 8, diff: 13, points: 25 },
    9: { id: 3, team: "SC Paderborn", games: 10, plus: 10, minus: 39, diff: -29, points: 8 },
  }
}

module.exports = React.createClass({
  
  getInitialState: function() {
    return {
      value: {
        buttons: {
          fonts: {
            kursiv: false
          }
        },
        lastName: "Horst",
        firstName: "Michael",
        additional: {
          age: "12",
          sex: {
            1: { title: "male", selected: true },
            2: { title: "female" }
          },
          hobbies: {
            1: { title: "Fussball" },
            2: { title: "Tennis" },
            3: { title: "Badminton" }
          }
        }
      }
    };
  },
  
  render: function() {
    return (
        <App layout="border">
          <App.Panel position="left" />
          <App.Panel position="center" layout="vertical" scrollable="true">
            <App.Panel size="auto">
              <h1>Forms Sample <small>Subtitle</small></h1>
              <p className="lead">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </App.Panel>
            <App.Form value={ this.state.value } onChange={ this._handleFormChange } layout="vertical" justify="start" style={{ height: "auto" }} size="auto">
              <App.Formfield name="firstName" element={ App.Textbox } size="auto" label="First Name" autocompleteList={ [ "Mario", "Michi", "Karla", "Gert" ] } autocompleteMode="contains" />
              <App.Formfield name="lastName" element={ App.Textbox } size="auto" label="Last Name" />

              <App.Fieldset label="Additional information" border={ true } name="additional" layout="horizontal">
                <App.Formfield name="age" element={ App.Textbox } orientation="vertical" label="Age" />
                <App.Formfield name="sex" element={ App.Combobox } orientation="vertical" label="Sex" />
                <App.Formfield name="hobbies" element={ App.Selectgroup } orientation="vertical" label="Hobbies" multiselect={ false } />
              </App.Fieldset>
              
              <App.Fieldset layout="horizontal" border={ false } justify="start" size="auto" name="buttons">
                <App.Button label="Select" name="fonts" size={ 300 } dropdown={ menu } />
              </App.Fieldset>

              <App.Table columns={ table.columns } value={ table.value } />
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