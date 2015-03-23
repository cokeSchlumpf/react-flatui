var React = require("react");
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

module.exports = React.createClass({
    render: function() {
      return (
        <div>
          <Jumbotron>
            <Grid>
              <Row>
                <Col md={ 12 }>
                  <h1>Getting Started</h1>
                  <p>
                    An overview of React Flat UI, how to download and to use it.
                  </p>
                </Col>
              </Row>
            </Grid>
          </Jumbotron>
          
          <main>
            <Grid>
              <Row>
                <Col md={ 10 }>
                  <h2>Setup</h2>
                  <p>Lorem ipsum dolor</p>
                </Col>
                <Col md={ 2 }>
                  <h2>Test</h2>
                </Col>
              </Row>
            </Grid>
          </main>
        </div>); 
    }
  });