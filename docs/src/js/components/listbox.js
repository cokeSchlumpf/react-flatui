var React = require("react");
var Bootstrap = require("react-bootstrap");
var App = require("../../../../dist/lib/main");
var Example = require("../util/example");

var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

var simpleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        singleTeam: {\n          fcb: { title: \"FC Bayern München\", selected: true },\n          rmd: { title: \"Real Madrid\", selected: false },\n          atl: { title: \"Atletico Madrid\", selected: false },\n          por: { title: \"FC Porto\", selected: false },\n          psg: { title: \"Paris\", selected: false },\n          bar: { title: \"FC Barcelona\", selected: false },\n          juv: { title: \"Juventus Turin\", selected: false },\n          mon: { title: \"AS Monaco\", selected: false }\n        },\n        multiTeam: {\n          fcb: { title: \"FC Bayern München\", selected: true },\n          rmd: { title: \"Real Madrid\", selected: false },\n          atl: { title: \"Atletico Madrid\", selected: true },\n          por: { title: \"FC Porto\", selected: false },\n          psg: { title: \"Paris\", selected: false },\n          bar: { title: \"FC Barcelona\", selected: false },\n          juv: { title: \"Juventus Turin\", selected: false },\n          mon: { title: \"AS Monaco\", selected: false }\n        }\n      };\n    },\n    \n    render: function() {\n      return (\n          <div>\n            <Row>\n              <Col md={ 6 }>\n                <App.Listbox \n                  value={ this.state.singleTeam } name=\"singleTeam\" bordered\n                  onChange={ this._handleSingleTeamChange } />\n              </Col>\n              \n              <Col md={ 6 }>\n                <App.Listbox\n                  value={ this.state.multiTeam } name=\"multiTeam\" \n                  multiselect={ true } onChange={ this._handleMultiTeamChange } />\n              </Col>\n            </Row>\n          </div>\n        ); \n    },\n    \n    _handleSingleTeamChange: function(value) {\n      this.setState({ singleTeam: value });\n    },\n    \n    _handleMultiTeamChange: function(value) {\n      this.setState({ multiTeam: value });\n    }\n  });";


var SimpleExample = React.createClass({
    getInitialState: function() {
      return {
        singleTeam: {
          fcb: { title: "FC Bayern München", selected: true },
          rmd: { title: "Real Madrid", selected: false },
          atl: { title: "Atletico Madrid", selected: false },
          por: { title: "FC Porto", selected: false },
          psg: { title: "Paris", selected: false },
          bar: { title: "FC Barcelona", selected: false },
          juv: { title: "Juventus Turin", selected: false },
          mon: { title: "AS Monaco", selected: false }
        },
        multiTeam: {
          fcb: { title: "FC Bayern München", country: "Germany", selected: true },
          rmd: { title: "Real Madrid", country: "Spain", selected: false },
          atl: { title: "Atletico Madrid", country: "Spain", selected: true },
          por: { title: "FC Porto", country: "Portugal", selected: false },
          psg: { title: "Paris", country: "France", selected: false },
          bar: { title: "FC Barcelona", country: "Spain", selected: false },
          juv: { title: "Juventus Turin", country: "Italy", selected: false },
          mon: { title: "AS Monaco", country: "Monaco", selected: false }
        }
      };
    },
    
    complexListItem: function() {
      return React.createClass({
        render: function() {
          return (
              <div>
                <strong>{ this.props.value.title }</strong><br />
                <small>{ this.props.value.country }</small>
              </div>
            )
        }
      });
    },
    
    render: function() {
      return (
          <Example source={ simpleExampleSource }>
            <Row>
              <Col md={ 6 }>
                <App.Listbox 
                  value={ this.state.singleTeam } name="singleTeam" bordered
                  onChange={ this._handleSingleTeamChange } style={{ height: "150px" }} />
              </Col>
              
              <Col md={ 6 }>
                <App.Listbox
                  value={ this.state.multiTeam } name="multiTeam" renderWith={ this.complexListItem() }
                  multiselect={ true } onChange={ this._handleMultiTeamChange } style={{ height: "150px" }} />
              </Col>
            </Row>
          </Example>
        ); 
    },
    
    _handleSingleTeamChange: function(value) {
      this.setState({ singleTeam: value });
    },
    
    _handleMultiTeamChange: function(value) {
      this.setState({ multiTeam: value });
    }
  });

module.exports = React.createClass({
    
    render: function() {
      var self = this;
      
      return (
          <article>
            <h2>Listbox</h2>
            <p>The listbox works similar to other React Flat UI selection components. The <code>onChange(newValue, selectedKey, selected, event)</code>-Handler is called when the data changes. You can specify with the <code>multiselect</code> property if the listbox allows multi selection. To create custom styled list entries use the <code>renderWith</code> property which expects an React class (as shown in the example below).</p>
            <SimpleExample />
          </article>
        )
    }
    
  });