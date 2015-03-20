var React = require("react/addons");
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
  Textbox: require("./textbox"),
  "Check- & Radiobox": require("./selectbox")
};

module.exports = React.createClass({  
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
          
        navitems["c-" + index] = <NavItem { ...props }>{ name }</NavItem>
      })
      
      return (
        <Nav stacked>
          { navitems }
        </Nav>)
    },
    
    _renderComponents: function() {
      var
        self = this,
        navitems = {};
        
      $.each(Object.keys(components), function(index, name) {
        var Component = components[name];
        
        navitems["n-" + index] =
          <div>
            <a name={ self._createLink(name).replace("#", "") }></a>
            { <Component /> }
          </div>;
      })
      
      return navitems;
    },
  
    render: function() {
      return (
        <div>
          <Jumbotron>
            <Grid>
              <Row>
                <Col md={ 12 }>
                  <h1>Components</h1>
                  <p>
                    Flat UI Components based on React, Bootstrap and React Bootstrap.
                  </p>
                </Col>
              </Row>
            </Grid>
          </Jumbotron>
          
          <main>
            <Grid>
              <Row>
                <Col md={ 10 }>
                  { this._renderComponents() }
                </Col>
                <Col md={ 2 } className="aside">
                  { this._renderNav() }
                </Col>
              </Row>
            </Grid>
          </main>
        </div>); 
    },
    
    _handleNavClick: function(index) {
      var self = this;
      
      return function(event) {
        self.setState({ currentComponent: index });  
      };
    }
  });