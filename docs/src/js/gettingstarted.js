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
                    React FlatUI is a UI component library based on <a href="http://facebook.github.io/react/index.html">React</a> and <a href="http://react-bootstrap.github.io/" target="_blank">React Bootstrap</a>. It is still experimental and under active development, APIs may change.
                  </p>
                </Col>
              </Row>
            </Grid>
          </Jumbotron>
          
          <main>
            <Grid>
              <Row>
                <Col md={ 12 }>
                  <h2>Setup</h2>
                  <p>
                    React Flat UI is available via <a href="https://www.npmjs.com/package/react-flatui" target="_blank">npm</a> for NodeJS and JavaScript development. The frontend dependencies can be loaded via <a href="https://github.com/cokeSchlumpf/react-flatui-bower">bower</a>.
                  </p>
                  <p>
                    An example project will be published soon!
                  </p>
                </Col>
                <Col md={ 12 }>
                  <h2>Contribution</h2>
                  <p>
                    Yes please! Checkout the <a href="https://github.com/cokeSchlumpf/react-flatui" target="_blank">git repository</a>.
                  </p>
                </Col>
              </Row>
            </Grid>
          </main>
        </div>); 
    }
  });