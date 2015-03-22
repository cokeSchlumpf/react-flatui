var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var Table = Bootstrap.Table;

var simpleExampleSource = "var filter_1 = function(value) { return value.indexOf(\"FC\") > - 1 }\nvar filter_2 = function(value) { return value.indexOf(\"burg\") > -1 }\n\nvar filters = {\n  filter_1: { title: \"Filter FC\", filter: filter_1, selected: false },\n  filter_2: { title: \"Filter burg\", filter: filter_2, selected: false }\n}\n\nvar table = {\n  columns: {\n    id:       { title: \"#\", width: 50, className: \"text-center\", sortable: true, sorted: \"asc\" },\n    team:     { title: \"Team\", width: \"2*\", sortable: true, filter: filters },\n    games:    { title: \"Games\" },\n    plus:     { title: \"+\", filter: true },\n    minus:    { title: \"-\" },\n    diff:     { title: \"Diff.\"},\n    points:   { title: \"Points\", sortable: true }\n  },\n  \n  value: {\n    1: { value: { id: 1, team: \"FC Bayern München\", games: 10, plus: 28, minus: 3, diff: 25, points: 27 }, className: \"\", selected: false },\n    2: { value: { id: 2, team: \"Borussia Dortmund\", games: 10, plus: 21, minus: 8, diff: 13, points: 25 }, className: \"\", selected: false },\n    3: { value: { id: 3, team: \"VfB Stuttgart\", games: 10, plus: 10, minus: 39, diff: -29, points: 8 }, className: \"\", selected: false },\n    4: { value: { id: 1, team: \"SC Freiburg\", games: 10, plus: 28, minus: 3, diff: 25, points: 27 }, className: \"\", selected: false },\n    5: { value: { id: 2, team: \"Vfl Wolfsburg\", games: 10, plus: 21, minus: 8, diff: 13, points: 25 }, className: \"\", selected: true },\n    6: { value: { id: 3, team: \"Hamburger SV\", games: 10, plus: 10, minus: 39, diff: -29, points: 8 }, className: \"\", selected: false },\n    7: { value: { id: 1, team: \"TSG Hoffenheim\", games: 10, plus: 28, minus: 3, diff: 25, points: 27 }, className: \"\", selected: false },\n    8: { value: { id: 2, team: \"1. FC Köln\", games: 10, plus: 21, minus: 8, diff: 13, points: 25 }, className: \"\", selected: false },\n    9: { value: { id: 3, team: \"SC Paderborn\", games: 10, plus: 10, minus: 39, diff: -29, points: 8 }, className: \"\", selected: false }\n  }\n}\n\nvar SimpleExample = React.createClass({\n    getInitialState: function() {\n      return {\n        value: table.value,\n        style: {\n          condensed: { title: \"Condensed\", selected: true },\n          bordered: { title: \"Bordered\", selected: true },\n          striped: { title: \"Striped\", selected: true },\n          noHeader: { title: \"No Header\", selected: false }\n        }\n      }  \n    },\n    \n    render: function() {\n      var \n        other = {}\n        self = this;\n      \n      if (this.state.style.condensed.selected) other.condensed = true;\n      if (this.state.style.bordered.selected) other.bordered = true;\n      if (this.state.style.striped.selected) other.striped = true;\n      if (this.state.style.noHeader.selected) other.noHeader = true;\n      \n      return (\n          <div>\n            <App.Bootstrap.Grid \n              columns={ table.columns } value={ this.state.value } \n              onChange={ this._handleChange } multiselect={ true }\n              { ...other } />\n              \n            <p>\n              Style your table:\n            </p>\n            \n            <App.Bootstrap.Selectgroup \n              value={ this.state.style } name=\"styleSelect\" multiselect={ true }\n              onChange={ function(value) { self.setState({ style: value }) } } />\n          </div>\n        );\n    },\n    \n    _handleChange: function(value) {\n      this.setState({ value: value });\n    }\n  });";

var filter_1 = function(value) { return value.indexOf("FC") > - 1 }
var filter_2 = function(value) { return value.indexOf("burg") > -1 }

var filters = {
  filter_1: { title: "Filter FC", filter: filter_1, selected: false },
  filter_2: { title: "Filter burg", filter: filter_2, selected: false }
}

var table = {
  columns: {
    id:       { title: "#", width: 50, className: "text-center", sortable: true, sorted: "asc" },
    team:     { title: "Team", width: "2*", sortable: true, filter: filters },
    games:    { title: "Games" },
    plus:     { title: "+", filter: true },
    minus:    { title: "-" },
    diff:     { title: "Diff."},
    points:   { title: "Points", sortable: true }
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

var SimpleExample = React.createClass({
    getInitialState: function() {
      return {
        value: table.value,
        style: {
          condensed: { title: "Condensed", selected: true },
          bordered: { title: "Bordered", selected: true },
          striped: { title: "Striped", selected: true },
          noHeader: { title: "No Header", selected: false }
        }
      }  
    },
    
    render: function() {
      var 
        other = {}
        self = this;
      
      if (this.state.style.condensed.selected) other.condensed = true;
      if (this.state.style.bordered.selected) other.bordered = true;
      if (this.state.style.striped.selected) other.striped = true;
      if (this.state.style.noHeader.selected) other.noHeader = true;
      
      return (
          <Example source={ simpleExampleSource }>
            <App.Bootstrap.Grid 
              columns={ table.columns } value={ this.state.value } 
              onChange={ this._handleChange } multiselect={ true }
              { ...other } />
              
            <p>
              Style your table:
            </p>
            
            <App.Bootstrap.Selectgroup 
              value={ this.state.style } name="styleSelect" multiselect={ true }
              onChange={ function(value) { self.setState({ style: value }) } } />
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
            <h2>Grid-Control</h2>
            <p>
              Grids are built upon <a href="http://react-bootstrap.github.io/components.html#tables" target="_blank">React Bootstrap Tables</a>. React Flat UI offers you several features to build complex tables:
            </p>
            <ul>
              <li><strong>Selection.</strong> You can add an <code>onChange(value, clickedRowKey, clickedRowSelected, event)</code>-Handler to create a selectable table. With the <code>multiselect</code> property you can also create a multi-selectable table.</li>
              <li><strong>Sorting.</strong> You can configure each column to be sortable or not.</li>
              <li><strong>Filters.</strong> Each column can define its own filters, if you just set the <code>filter</code> property to <code>true</code> default filters for the range of all available values in the dataset will be created for you.</li>
              <li><strong>Column-Sizing.</strong> You can set the default width of each column, but the user is able to change the widths. Vertical scrolling within the table is not supported yet.</li>
              <li><strong>Server mode.</strong> Just add the <code>server</code> property to the table to handle the events to filters and sorting on your own. You can do this by implementing an event-handler for <code>onColumnConfigurationChange(columnConfiguration)</code>. This is senseful if you only display a subset of your data within your grid component.</li>
            </ul>
            
            <SimpleExample />
          </article>
        )
    }
    
  });