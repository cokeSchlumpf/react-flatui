var React = require("react");
var Bootstrap = require("react-bootstrap");
var Combobox = require("../../../../dist/lib/main").Combobox;
var Example = require("../util/example");

var Col = Bootstrap.Col;
var Row = Bootstrap.Row;

var simpleExampleSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        singleTeam: {\n          fcb: { title: \"FC Bayern München\", selected: true },\n          rmd: { title: \"Real Madrid\", selected: false },\n          atl: { title: \"Atletico Madrid\", selected: false },\n          por: { title: \"FC Porto\", selected: false },\n          psg: { title: \"Paris\", selected: false },\n          bar: { title: \"FC Barcelona\", selected: false },\n          juv: { title: \"Juventus Turin\", selected: false },\n          mon: { title: \"AS Monaco\", selected: false }\n        },\n        multiTeam: {\n          fcb: { title: \"FC Bayern München\", shorttitle: \"FCB\", selected: true },\n          rmd: { title: \"Real Madrid\", shorttitle: \"Real\", selected: false },\n          atl: { title: \"Atletico Madrid\", shorttitle: \"Atletico\", selected: true },\n          por: { title: \"FC Porto\", shorttitle: \"Porto\", selected: false },\n          psg: { title: \"Paris\", shorttitle: \"PSG\", selected: false },\n          bar: { title: \"FC Barcelona\", shorttitle: \"Barca\", selected: false },\n          juv: { title: \"Juventus Turin\", shorttitle: \"Juve\", selected: false },\n          mon: { title: \"AS Monaco\", shorttitle: \"Monaco\", selected: false }\n        }\n      };\n    },\n    \n    complexListItem: function() {\n      return React.createClass({\n        render: function() {\n          return (\n              <div>\n                <strong>{ this.props.value.title }</strong><br />\n                <small>{ this.props.value.country }</small>\n              </div>\n            )\n        }\n      });\n    },\n    \n    render: function() {\n      return (\n          <div>\n            <Row>\n              <Col md={ 6 }>\n                <Combobox \n                  value={ this.state.singleTeam } name=\"singleTeam\"\n                  onChange={ this._handleSingleTeamChange } />\n              </Col>\n              \n              <Col md={ 6 }>\n                <Combobox\n                  value={ this.state.multiTeam } name=\"multiTeam\" renderWith={ this.complexListItem() }\n                  multiselect={ true } onChange={ this._handleMultiTeamChange } />\n              </Col>\n            </Row>\n          </div>\n        ); \n    },\n    \n    _handleSingleTeamChange: function(value) {\n      this.setState({ singleTeam: value });\n    },\n    \n    _handleMultiTeamChange: function(value) {\n      this.setState({ multiTeam: value });\n    }\n  });";

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
          fcb: { title: "FC Bayern München", shorttitle: "FCB", selected: true },
          rmd: { title: "Real Madrid", shorttitle: "Real", selected: false },
          atl: { title: "Atletico Madrid", shorttitle: "Atletico", selected: true },
          por: { title: "FC Porto", shorttitle: "Porto", selected: false },
          psg: { title: "Paris", shorttitle: "PSG", selected: false },
          bar: { title: "FC Barcelona", shorttitle: "Barca", selected: false },
          juv: { title: "Juventus Turin", shorttitle: "Juve", selected: false },
          mon: { title: "AS Monaco", shorttitle: "Monaco", selected: false }
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
                <Combobox 
                  value={ this.state.singleTeam } name="singleTeam"
                  onChange={ this._handleSingleTeamChange } />
              </Col>
              
              <Col md={ 6 }>
                <Combobox
                  value={ this.state.multiTeam } name="multiTeam" renderWith={ this.complexListItem() }
                  multiselect={ true } onChange={ this._handleMultiTeamChange } />
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
  
var AutocompletionExample = React.createClass({
    getInitialState: function() {
      return {
        value: "",
        mode: "contains"
      }
    },
    
    _autocompleteList: [ "FC Bayern München", "Real Madrid", "Atletico Madrid", "FC Porto", "Paris SG", "FC Barcelona", "Juventus Turin", "AS Monaco" ],
    
    render: function() {
      var modes = {
        contains: { title: "contains" },
        startsWith: { title: "startsWith" },
        none: { title: "none" }
      };
      
      modes[this.state.mode].selected = true;
      
      return (
          <Example source={ autocompleteExampleSource } >
            <App.Textbox 
              name="autocompleteTextbox" value={ this.state.value } 
              onChange={ this._handleChange } autocompleteList={ this._autocompleteList } 
              autocompleteMode={ this.state.mode } />
            
            <p>Select the autocompletion mode:</p>
            <App.Selectgroup value={ modes } onChange={ this._handleModeChange } name="autocompleteMode" />
          </Example>   
        )
    },
    
    _handleChange: function(value) {
      this.setState({ value: value });
    },
    
    _handleModeChange: function(value, key) {
      this.setState({ mode: key });
    }
  });

module.exports = React.createClass({
    
    render: function() {
      var self = this;
      
      return (
          <article>
            <h2>Combobox</h2>
            <p>The Textbox renders a <a href="http://react-bootstrap.github.io/components.html#input" target="_blank">React Bootstrap Input</a>. You can register an <code>onChange(value, event)</code> event handler to react to users input.</p>
            
            <SimpleExample />
                     
          </article>
        )
    }
    
  });