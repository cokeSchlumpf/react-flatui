var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var App = require("../../appui");
var Example = require("./example");

var singleCheckboxSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        license: false,\n        newsletterSelected: true\n      }  \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <App.Bootstrap.Checkbox \n              title=\"Yes, send me a newsletter\" name=\"newsletter\" \n              value=\"newsletter\" onChange={ this._handleNewsletterChange } \n              selected={ this.state.newsletterSelected } />\n\n            <App.Bootstrap.Checkbox \n              title=\"Accept license\" name=\"license\" value=\"license\" \n              onChange={ this._handleLicenseChange } \n              selected={ this.state.licenseSelected } />\n\n            <Bootstrap.Alert>\n              <strong>Newsletter:</strong> { this.state.newsletterSelected ? \"Yes\" : \"No\" }, \n              <strong>License:</strong> { this.state.license ? \"Yes\" : \"No\" }\n            </Bootstrap.Alert>\n          </div>\n        );\n    },\n    \n    _handleLicenseChange: function(selected) {\n      this.setState({ license: selected });\n    },\n    \n    _handleNewsletterChange: function(selected) {\n      this.setState({ newsletterSelected: selected });\n    }\n  });";

var singleRadioboxSource = "React.createClass({\n    getInitialState: function() {\n      return {\n        sex: \"female\"\n      }  \n    },\n    \n    render: function() {\n      return (\n          <div>\n            <App.Bootstrap.Radiobox \n              title=\"Female\" name=\"sex\" id=\"female\"\n              value=\"female\" onChange={ this._handleChange } \n              selected={ this.state.sex == \"female\" } />\n            \n            <App.Bootstrap.Radiobox \n              title=\"Male\" name=\"sex\" id=\"male\"\n              value=\"male\" onChange={ this._handleChange } \n              selected={ this.state.sex == \"male\" } />\n          </div>\n        );\n    },\n    \n    _handleChange: function(selected, value) {\n      this.setState({ sex: value });\n    }\n  });"

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
            <App.Bootstrap.Checkbox title="Yes, send me a newsletter" name="newsletter" value="newsletter" onChange={ this._handleNewsletterChange } selected={ this.state.newsletterSelected } />
            <App.Bootstrap.Checkbox title="Accept license" name="license" value="license" onChange={ this._handleLicenseChange } selected={ this.state.licenseSelected } />
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
            <App.Bootstrap.Radiobox 
              title="Female" name="sex" id="female"
              value="female" onChange={ this._handleChange } 
              selected={ this.state.sex == "female" } />
            
            <App.Bootstrap.Radiobox 
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
          </article>
        )
    }
    
  });