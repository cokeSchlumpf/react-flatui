var React = require("react/addons");
var Bootstrap = require("react-bootstrap");
var $ = require("jquery");

var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Jumbotron = Bootstrap.Jumbotron;
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

var GettingStarted = { title: "Getting Started", template: require("./gettingstarted"), url: "getting-started" };
var Components = { title: "Components", template: require("./components"), url: "components" };

var Pages = [ GettingStarted, Components ]

module.exports = React.createClass({
  
    getInitialState: function() {   
      var activePage = 0;
      if (location.hash) { $.each(Pages, function(index, page) { if (location.hash.indexOf("#" + page.url) == 0) activePage = index }) }
           
      return {
        activePage: activePage
      };
    },
    
    _renderNav: function() {
      var
        self = this, 
        navitems = {};
      
      $.each(Pages, function(index, page) {
        var props = { href: page.url }
        if (self.state.activePage == index) props.active = true
        
        navitems["p-" + index] = <NavItem { ... props } onClick={ self._handleNavClick(index) }>{ page.title }</NavItem>
      });
      
      return (
          <Nav>
            { navitems }
          </Nav>
        );
    },
    
    render: function() {
      var CurrentPage = Pages[this.state.activePage].template;
      
      location.hash = Pages[this.state.activePage].url;
      
      return (
          <div>
            <Navbar brand={ <a href="http://cokeschlumpf.github.io/react-flatui/">React Flat UI</a> } inverse>
              { this._renderNav() }
            </Navbar>
            
            <CurrentPage urlHash={ Pages[this.state.activePage].url } />
            
            <footer>
              <div className="container">
                <div className="fu-docs-social">
                  <ul className="fu-docs-social-buttons">
                    <li>
                      <iframe className="github-btn" src={'http://ghbtns.com/github-btn.html?user=cokeSchlumpf&repo=react-flatui&type=watch&count=true'} width={95} height={20} title="Star on GitHub" />
                    </li>
                    <li>
                      <iframe className="github-btn" src={'http://ghbtns.com/github-btn.html?user=cokeSchlumpf&repo=react-flatui&type=fork&count=true'} width={92} height={20} title="Fork on GitHub" />
                    </li>
                  </ul>
                </div>
                <p>Code licensed under <a href="https://github.com/cokeSchlumpf/react-flatui/blob/master/LICENSE" target="_blank">MIT</a>.</p>
                <ul className="fu-docs-footer-links muted">
                  <li><a href="https://github.com/cokeSchlumpf/react-flatui">GitHub</a></li>
                  <li>·</li>
                  <li><a href="https://github.com/cokeSchlumpf/react-flatui/issues?state=open">Issues</a></li>
                  <li>·</li>
                  <li><a href="https://github.com/cokeSchlumpf/react-flatui/releases">Releases</a></li>
                </ul>
              </div>
            </footer>
          </div>
        )
    },
    
    _handleNavClick: function(index) {
      var self = this;
      
      return function(event) {
        event.preventDefault();
        event.stopPropagation();
        self.setState({ activePage: index });  
      };
    }
});