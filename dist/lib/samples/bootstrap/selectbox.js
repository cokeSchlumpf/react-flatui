var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var Col = Bootstrap.Col;
var Row = Bootstrap.Row;

var singleCheckboxSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        license: false,\n        newsletterSelected: true\n      }  \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <App.Checkbox \n              title=\"Yes, send me a newsletter\" name=\"newsletter\" \n              value=\"newsletter\" onChange={ this._handleNewsletterChange } \n              selected={ this.state.newsletterSelected } />\n\n            <App.Checkbox \n              title=\"Accept license\" name=\"license\" value=\"license\" \n              onChange={ this._handleLicenseChange } \n              selected={ this.state.licenseSelected } />\n\n            <Bootstrap.Alert>\n              <strong>Newsletter:</strong> { this.state.newsletterSelected ? \"Yes\" : \"No\" }, \n              <strong>License:</strong> { this.state.license ? \"Yes\" : \"No\" }\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleLicenseChange: function(selected) {\n      this.setState({ license: selected });\n    },\n    \n    _handleNewsletterChange: function(selected) {\n      this.setState({ newsletterSelected: selected });\n    }\n  });";

var singleRadioboxSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        sex: \"female\"\n      }  \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <App.Radiobox \n              title=\"Female\" name=\"sex\" id=\"female\"\n              value=\"female\" onChange={ this._handleChange } \n              selected={ this.state.sex == \"female\" } />\n            \n            <App.Radiobox \n              title=\"Male\" name=\"sex\" id=\"male\"\n              value=\"male\" onChange={ this._handleChange } \n              selected={ this.state.sex == \"male\" } />\n          </div>\n        );\n    },\n    \n    _handleChange: function(selected, value) {\n      this.setState({ sex: value });\n    }\n  });";

var selectgroupSource = "React.createClass({\n  getInitialState: function() {\n    return {\n      singleTeam: {\n        fcb: { title: \"FC Bayern München\", selected: true },\n        rmd: { title: \"Real Madrid\", selected: false },\n        atl: { title: \"Atletico Madrid\", selected: false },\n        por: { title: \"FC Porto\", selected: false }\n      },\n      multiTeam: {\n        fcb: { title: \"FC Bayern München\", selected: true },\n        rmd: { title: \"Real Madrid\", selected: false },\n        atl: { title: \"Atletico Madrid\", selected: true },\n        por: { title: \"FC Porto\", selected: false }\n      }\n    };\n  },\n  \n  render: function() {\n    return (\n        <div>\n          <Row>\n            <Col md={ 6 }>\n              <App.Selectgroup \n                value={ this.state.singleTeam } name=\"singleTeam\" \n                onChange={ this._handleSingleTeamChange } />\n            </Col>\n            \n            <Col md={ 6 }>\n              <App.Selectgroup \n                value={ this.state.multiTeam } name=\"multiTeam\" \n                multiselect={ true } onChange={ this._handleMultiTeamChange } />\n            </Col>\n          </Row>\n          \n          <Bootstrap.Alert>\n            <Row>\n              <Col md={ 6 }>\n                <p>\n                  <strong>Singleselect value:</strong> \n                  <pre>{ JSON.stringify(this.state.singleTeam, null, \"  \") }</pre>\n                </p>\n              </Col>\n              <Col md={ 6 }>\n                <p>\n                  <strong>Multiselect value:</strong> \n                  <pre>{ JSON.stringify(this.state.multiTeam, null, \"  \") }</pre>\n                </p>\n              </Col>\n            </Row>\n          </Bootstrap.Alert>\n        </div>\n      ); \n  },\n  \n  _handleSingleTeamChange: function(value) {\n    this.setState({ singleTeam: value });\n  },\n  \n  _handleMultiTeamChange: function(value) {\n    this.setState({ multiTeam: value });\n  }\n});";

var SingleCheckboxExample = React.createClass({displayName: "SingleCheckboxExample",
    getInitialState: function() {
      return {
        license: false,
        newsletterSelected: true
      }  
    },
    
    render: function() {
      return (
          React.createElement(Example, {source: singleCheckboxSource }, 
            React.createElement(App.Checkbox, {title: "Yes, send me a newsletter", name: "newsletter", value: "newsletter", onChange:  this._handleNewsletterChange, selected:  this.state.newsletterSelected}), 
            React.createElement(App.Checkbox, {title: "Accept license", name: "license", value: "license", onChange:  this._handleLicenseChange, selected:  this.state.licenseSelected}), 
            React.createElement(Bootstrap.Alert, null, 
              React.createElement("strong", null, "Newsletter:"), " ",  this.state.newsletterSelected ? "Yes" : "No", ", ", React.createElement("strong", null, "License:"), " ",  this.state.license ? "Yes" : "No"
            )
          )
        );
    },
    
    _handleLicenseChange: function(selected) {
      this.setState({ license: selected });
    },
    
    _handleNewsletterChange: function(selected) {
      this.setState({ newsletterSelected: selected });
    }
  });
  
var SingleRadioboxExample = React.createClass({displayName: "SingleRadioboxExample",
    getInitialState: function() {
      return {
        sex: "female"
      }  
    },
    
    render: function() {
      return (
          React.createElement(Example, {source: singleRadioboxSource }, 
            React.createElement(App.Radiobox, {
              title: "Female", name: "sex", id: "female", 
              value: "female", onChange:  this._handleChange, 
              selected:  this.state.sex == "female"}), 
            
            React.createElement(App.Radiobox, {
              title: "Male", name: "sex", id: "male", 
              value: "male", onChange:  this._handleChange, 
              selected:  this.state.sex == "male"})
          )
        );
    },
    
    _handleChange: function(selected, value) {
      this.setState({ sex: value });
    }
  });

var SelectgroupExample = React.createClass({displayName: "SelectgroupExample",
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
          React.createElement(Example, {source: selectgroupSource }, 
            React.createElement(Row, null, 
              React.createElement(Col, {md: 6 }, 
                React.createElement(App.Selectgroup, {
                  value:  this.state.singleTeam, name: "singleTeam", 
                  onChange:  this._handleSingleTeamChange})
              ), 
              
              React.createElement(Col, {md: 6 }, 
                React.createElement(App.Selectgroup, {
                  value:  this.state.multiTeam, name: "multiTeam", 
                  multiselect: true, onChange:  this._handleMultiTeamChange})
              )
            ), 
            
            React.createElement(Bootstrap.Alert, null, 
              React.createElement(Row, null, 
                React.createElement(Col, {md: 6 }, 
                  React.createElement("p", null, 
                    React.createElement("strong", null, "Singleselect value:"), 
                    React.createElement("pre", null,  JSON.stringify(this.state.singleTeam, null, "  ") )
                  )
                ), 
                React.createElement(Col, {md: 6 }, 
                  React.createElement("p", null, 
                    React.createElement("strong", null, "Multiselect value:"), 
                    React.createElement("pre", null,  JSON.stringify(this.state.multiTeam, null, "  ") )
                  )
                )
              )
            )
          )
        ); 
    },
    
    _handleSingleTeamChange: function(value) {
      this.setState({ singleTeam: value });
    },
    
    _handleMultiTeamChange: function(value) {
      this.setState({ multiTeam: value });
    }
  });

module.exports = React.createClass({displayName: "exports",
    
    render: function() {
      var self = this;
      
      return (
          React.createElement("article", null, 
            React.createElement("h2", null, "Check- & Radioboxes"), 
            
            React.createElement("p", null, "You can render a single checkbox an listen to changes with the ", React.createElement("code", null, "onChange(selected, value, event)"), " handler."), 
            React.createElement(SingleCheckboxExample, null), 
            
            React.createElement("p", null, "Similar to the example above, you can create radioboxes:"), 
            React.createElement(SingleRadioboxExample, null), 
            
            React.createElement("p", null, "You can also use the ", React.createElement("code", null, "Selectgroup"), " component to create Radio- or Checkboxes. With this method you can handle data more easily similar to other select/ multiselect components. The ", React.createElement("code", null, "onChange(newValue, selectedKey, selected, event)"), "-Handler is called when the data changes."), 
            React.createElement(SelectgroupExample, null)
          )
        )
    }
    
  });