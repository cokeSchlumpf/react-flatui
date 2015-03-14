var React = require("react/addons");
var App = require("../appui");

var menu = <App.Menu size="auto">
    <App.Button label="Fett" />
    <App.Button label="Kursiv" name="kursiv" toggle="true" toggle={ true } value={ true } />
    <App.Menu.Separator />
    <App.Button label="Unterstrichen" />
  </App.Menu>
  
var filter_1 = function(value) { return value.indexOf("FC") > - 1 }
var filter_2 = function(value) { return value.indexOf("burg") > -1 }

var filters = {
  filter_1: { title: "Filter FC", filter: filter_1, selected: false },
  filter_2: { title: "Filter burg", filter: filter_2, selected: false }
}
  
var table = {
  columns: {
    id:       { label: "#", size: 50, className: "text-center", sortable: true, sorted: "asc" },
    team:     { label: "Team", ratio: 2, sortable: true, filter: filters },
    games:    { label: "Games" },
    plus:     { label: "+", filter: true },
    minus:    { label: "-" },
    diff:     { label: "Diff."},
    points:   { label: "Points", sortable: true }
  },
  
  value: {
    1: { value: { id: 1, team: "FC Bayern München", games: 10, plus: 28, minus: 3, diff: 25, points: 27 }, className: "", selected: false },
    2: { value: { id: 2, team: "Borussia Dortmund", games: 10, plus: 21, minus: 8, diff: 13, points: 25 }, className: "", selected: false },
    3: { value: { id: 3, team: "VfB Stuttgart", games: 10, plus: 10, minus: 39, diff: -29, points: 8 }, className: "", selected: false },
    4: { value: { id: 1, team: "SC Freiburg", games: 10, plus: 28, minus: 3, diff: 25, points: 27 }, className: "", selected: false },
    5: { value: { id: 2, team: "Vfl Wolfsburg", games: 10, plus: 21, minus: 8, diff: 13, points: 25 }, className: "", selected: true },
    6: { value: { id: 3, team: "Hamburger SV", games: 10, plus: 10, minus: 39, diff: -29, points: 8 }, className: "", selected: false },
    7: { value: { id: 1, team: "TSG Hoffenheim", games: 10, plus: 28, minus: 3, diff: 25, points: 27 }, className: "", selected: false },
    8: { value: { id: 2, team: "1. FC Köln", games: 10, plus: 21, minus: 8, diff: 13, points: 25 }, className: "", selected: false },
    9: { value: { id: 3, team: "SC Paderborn", games: 10, plus: 10, minus: 39, diff: -29, points: 8 }, className: "", selected: false }
  }
}

module.exports = React.createClass({
  
  getInitialState: function() {
    return {
      value: {
        table: table.value,
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
          },
          schule: {
            1: { title: "Grundschule" },
            2: { title: "Mittelschule" },
            3: { title: "Gymnasium" }
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
            <App.Form value={ this.state.value } onChange={ this._handleFormChange } layout="vertical" justify="start">
              <App.Formfield name="firstName" element={ App.Textbox } size="auto" label="First Name" autocompleteList={ [ "Mario", "Michi", "Karla", "Gert" ] } autocompleteMode="contains" />
              <App.Formfield name="lastName" element={ App.Textbox } size="auto" label="Last Name" />

              <App.Fieldset label="Additional information" border={ true } name="additional" layout="horizontal">
                <App.Formfield name="age" element={ App.Textbox } orientation="vertical" label="Age" />
                <App.Formfield name="sex" element={ App.Combobox } multiselect={ true } orientation="vertical" label="Sex" />
                <App.Formfield name="schule" element={ App.Buttongroup } orientation="vertical" label="Hobbies" multiselect={ false } />
              </App.Fieldset>
              
              <App.Fieldset layout="horizontal" border={ false } justify="start" size="auto" name="buttons">
                <App.Button label="Select" name="fonts" size={ "auto" } dropdown={ menu } />
              </App.Fieldset>

              <App.Table columns={ table.columns } name="table" multiselect={ true } />
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