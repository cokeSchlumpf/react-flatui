define(function (require, exports, module) {var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var $ = require("jquery");
var PrismCode = require("./prism");
var App = require("../../appui");

var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Jumbotron = Bootstrap.Jumbotron;
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

var components = {
  Buttons: require("./button"),
  "Check- & Radiobox": require("./selectbox"),
  "Grid Control": require("./grid"),
  Listbox: require("./listbox"),
  Textbox: require("./textbox")
};

module.exports = React.createClass({displayName: "exports",  
    propTypes: {
      urlHash: React.PropTypes.string
    },
    
    getInitialState: function() {
      var 
        self = this,
        currentComponent = 0;
        
      $.each(Object.keys(components), function(index, name) {
        if (location.hash.indexOf("#" + self._createLink(name)) == 0) currentComponent = index;
      });
    
      return {
        currentComponent: currentComponent
      }
    },
    
    _createLink: function(to) {
      return "#" + this.props.urlHash + "," + to;
    },
    
    _renderNav: function() {
      var 
        self = this,
        navitems = {};
        
      $.each(Object.keys(components), function(index, name) {
        var 
          component = components[name],
          props = { href: self._createLink(name), onClick: self._handleNavClick(index) }
          if (self.state.currentComponent == index) props.active = true
          
        navitems["c-" + index] = React.createElement(NavItem, React.__spread({},   props ), name )
      })
      
      return (
        React.createElement(Nav, {stacked: true}, 
          navitems 
        ))
    },
    
    _renderComponents: function() {
      var
        self = this,
        navitems = {};
        
      $.each(Object.keys(components), function(index, name) {
        var Component = components[name];
        
        navitems["n-" + index] =
          React.createElement("div", null, 
            React.createElement("a", {name:  self._createLink(name).replace("#", "") }), 
            React.createElement(Component, null)
          );
      })
      
      return navitems;
    },
  
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement(Jumbotron, null, 
            React.createElement(Grid, null, 
              React.createElement(Row, null, 
                React.createElement(Col, {md: 12 }, 
                  React.createElement("h1", null, "Components"), 
                  React.createElement("p", null, 
                    "Flat UI Components based on React, Bootstrap and React Bootstrap."
                  )
                )
              )
            )
          ), 
          
          React.createElement("main", null, 
            React.createElement(Grid, null, 
              React.createElement(Row, null, 
                React.createElement(Col, {md: 10 }, 
                   this._renderComponents() 
                ), 
                React.createElement(Col, {md: 2, className: "aside"}, 
                   this._renderNav() 
                )
              )
            )
          )
        )); 
    },
    
    _handleNavClick: function(index) {
      var self = this;
      
      return function(event) {
        self.setState({ currentComponent: index });  
      };
    }
  });
});
