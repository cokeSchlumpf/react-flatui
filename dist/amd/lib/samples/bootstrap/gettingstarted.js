define(function (require, exports, module) {var React = require("react/addons");
var Bootstrap = require("react-bootstrap");

var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Jumbotron = Bootstrap.Jumbotron;
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

module.exports = React.createClass({displayName: "exports",
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement(Jumbotron, null, 
            React.createElement(Grid, null, 
              React.createElement(Row, null, 
                React.createElement(Col, {md: 12 }, 
                  React.createElement("h1", null, "Getting Started"), 
                  React.createElement("p", null, 
                    "An overview of React Flat UI, how to download and to use it."
                  )
                )
              )
            )
          ), 
          
          React.createElement("main", null, 
            React.createElement(Grid, null, 
              React.createElement(Row, null, 
                React.createElement(Col, {md: 10 }, 
                  React.createElement("h2", null, "Setup"), 
                  React.createElement("p", null, "Lorem ipsum dolor")
                ), 
                React.createElement(Col, {md: 2 }, 
                  React.createElement("h2", null, "Test")
                )
              )
            )
          )
        )); 
    }
  });
});
