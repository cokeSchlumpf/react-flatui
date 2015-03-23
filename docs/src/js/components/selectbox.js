var React = require("react");
var Bootstrap = require("react-bootstrap");
var App = require("../../../../dist/lib/main");
var Example = require("../util/example");

var Col = Bootstrap.Col;
var Row = Bootstrap.Row;

var singleCheckboxSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        license: false,\n        newsletterSelected: true\n      }  \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <App.Checkbox \n              title=\"Yes, send me a newsletter\" name=\"newsletter\" \n              value=\"newsletter\" onChange={ this._handleNewsletterChange } \n              selected={ this.state.newsletterSelected } />\n\n            <App.Checkbox \n              title=\"Accept license\" name=\"license\" value=\"license\" \n              onChange={ this._handleLicenseChange } \n              selected={ this.state.licenseSelected } />\n\n            <Bootstrap.Alert>\n              <strong>Newsletter:</strong> { this.state.newsletterSelected ? \"Yes\" : \"No\" }, \n              <strong>License:</strong> { this.state.license ? \"Yes\" : \"No\" }\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleLicenseChange: function(selected) {\n      this.setState({ license: selected });\n    },\n    \n    _handleNewsletterChange: function(selected) {\n      this.setState({ newsletterSelected: selected });\n    }\n  });";

var singleRadioboxSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        sex: \"female\"\n      }  \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <App.Radiobox \n              title=\"Female\" name=\"sex\" id=\"female\"\n              value=\"female\" onChange={ this._handleChange } \n              selected={ this.state.sex == \"female\" } />\n            \n            <App.Radiobox \n              title=\"Male\" name=\"sex\" id=\"male\"\n              value=\"male\" onChange={ this._handleChange } \n              selected={ this.state.sex == \"male\" } />\n          </div>\n        );\n    },\n    \n    _handleChange: function(selected, value) {\n      this.setState({ sex: value });\n    }\n  });";

var selectgroupSource = "React.createClass({\n  getInitialState: function() {\n    return {\n      singleTeam: {\n        fcb: { title: \"FC Bayern München\", selected: true },\n        rmd: { title: \"Real Madrid\", selected: false },\n        atl: { title: \"Atletico Madrid\", selected: false },\n        por: { title: \"FC Porto\", selected: false }\n      },\n      multiTeam: {\n        fcb: { title: \"FC Bayern München\", selected: true },\n        rmd: { title: \"Real Madrid\", selected: false },\n        atl: { title: \"Atletico Madrid\", selected: true },\n        por: { title: \"FC Porto\", selected: false }\n      }\n    };\n  },\n  \n  render: function() {\n    return (\n        <div>\n          <Row>\n            <Col md={ 6 }>\n              <App.Selectgroup \n                value={ this.state.singleTeam } name=\"singleTeam\" \n                onChange={ this._handleSingleTeamChange } />\n            </Col>\n            \n            <Col md={ 6 }>\n              <App.Selectgroup \n                value={ this.state.multiTeam } name=\"multiTeam\" \n                multiselect={ true } onChange={ this._handleMultiTeamChange } />\n            </Col>\n          </Row>\n          \n          <Bootstrap.Alert>\n            <Row>\n              <Col md={ 6 }>\n                <p>\n                  <strong>Singleselect value:</strong> \n                  <pre>{ JSON.stringify(this.state.singleTeam, null, \"  \") }</pre>\n                </p>\n              </Col>\n              <Col md={ 6 }>\n                <p>\n                  <strong>Multiselect value:</strong> \n                  <pre>{ JSON.stringify(this.state.multiTeam, null, \"  \") }</pre>\n                </p>\n              </Col>\n            </Row>\n          </Bootstrap.Alert>\n        </div>\n      ); \n  },\n  \n  _handleSingleTeamChange: function(value) {\n    this.setState({ singleTeam: value });\n  },\n  \n  _handleMultiTeamChange: function(value) {\n    this.setState({ multiTeam: value });\n  }\n});";

var SingleCheckboxExample = React.createClass({
    getInitialState: function() {
      return {
        license: false,
        newsletterSelected: true
      }  
    },
    
    render: function() {
      return (
          <Example source={ singleCheckboxSource }>
            <App.Checkbox title="Yes, send me a newsletter" name="newsletter" value="newsletter" onChange={ this._handleNewsletterChange } selected={ this.state.newsletterSelected } />
            <App.Checkbox title="Accept license" name="license" value="license" onChange={ this._handleLicenseChange } selected={ this.state.licenseSelected } />
            <Bootstrap.Alert>
              <strong>Newsletter:</strong> { this.state.newsletterSelected ? "Yes" : "No" }, <strong>License:</strong> { this.state.license ? "Yes" : "No" }
            </Bootstrap.Alert>
          </Example>
        );
    },
    
    _handleLicenseChange: function(selected) {
      this.setState({ license: selected });
    },
    
    _handleNewsletterChange: function(selected) {
      this.setState({ newsletterSelected: selected });
    }
  });
  
var SingleRadioboxExample = React.createClass({
    getInitialState: function() {
      return {
        sex: "female"
      }  
    },
    
    render: function() {
      return (
          <Example source={ singleRadioboxSource }>
            <App.Radiobox 
              title="Female" name="sex" id="female"
              value="female" onChange={ this._handleChange } 
              selected={ this.state.sex == "female" } />
            
            <App.Radiobox 
              title="Male" name="sex" id="male"
              value="male" onChange={ this._handleChange } 
              selected={ this.state.sex == "male" } />
          </Example>
        );
    },
    
    _handleChange: function(selected, value) {
      this.setState({ sex: value });
    }
  });

var SelectgroupExample = React.createClass({
    getInitialState: function() {
      return {
        singleTeam: {
          fcb: { title: "FC Bayern München", selected: true },
          rmd: { title: "Real Madrid", selected: false },
          atl: { title: "Atletico Madrid", selected: false },
          por: { title: "FC Porto", selected: false }
        },
        multiTeam: {
          fcb: { title: "FC Bayern München", selected: true },
          rmd: { title: "Real Madrid", selected: false },
          atl: { title: "Atletico Madrid", selected: true },
          por: { title: "FC Porto", selected: false }
        }
      };
    },
    
    render: function() {
      return (
          <Example source={ selectgroupSource }>
            <Row>
              <Col md={ 6 }>
                <App.Selectgroup 
                  value={ this.state.singleTeam } name="singleTeam" 
                  onChange={ this._handleSingleTeamChange } />
              </Col>
              
              <Col md={ 6 }>
                <App.Selectgroup 
                  value={ this.state.multiTeam } name="multiTeam" 
                  multiselect={ true } onChange={ this._handleMultiTeamChange } />
              </Col>
            </Row>
            
            <Bootstrap.Alert>
              <Row>
                <Col md={ 6 }>
                  <p>
                    <strong>Singleselect value:</strong> 
                    <pre>{ JSON.stringify(this.state.singleTeam, null, "  ") }</pre>
                  </p>
                </Col>
                <Col md={ 6 }>
                  <p>
                    <strong>Multiselect value:</strong> 
                    <pre>{ JSON.stringify(this.state.multiTeam, null, "  ") }</pre>
                  </p>
                </Col>
              </Row>
            </Bootstrap.Alert>
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
            <h2>Check- &amp; Radioboxes</h2>
            
            <p>You can render a single checkbox an listen to changes with the <code>onChange(selected, value, event)</code> handler.</p>
            <SingleCheckboxExample />
            
            <p>Similar to the example above, you can create radioboxes:</p>
            <SingleRadioboxExample />
            
            <p>You can also use the <code>Selectgroup</code> component to create Radio- or Checkboxes. With this method you can handle data more easily similar to other select/ multiselect components. The <code>onChange(newValue, selectedKey, selected, event)</code>-Handler is called when the data changes.</p>
            <SelectgroupExample />
          </article>
        )
    }
    
  });