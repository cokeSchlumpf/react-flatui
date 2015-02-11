var React = require("react/addons");
var App = require("./appui");
var ExampleStore = require("./store");
var ExampleActions = require("./actions");

function getExampleState() {
  return {
    data: ExampleStore.getData()
  };
}

var ExampleApp = React.createClass({
    
    getInitialState: function() {
      return getExampleState();
    },
    
    componentDidMount: function() {
      ExampleStore.addChangeListener(this._onChange); 
    },
    
    componentWillUnmount: function() {
      ExampleStore.removeChangeListener(this._onChange);
    },
    
    render: function() {
      return (
        <App className="myApp" layout="border">
          <App.Panel position="top" size="auto" style={ { backgroundColor: "#ff0000" } }>
            <App.Titlebar>
              <App.Text className="title">Online Notes</App.Text>
              <App.Text className="subtitle">Lorem Ipsum Dolor</App.Text>
              <App.Text className="user">Bla bla</App.Text>
            </App.Titlebar>
            <App.Toolbar>
              <App.Text>Hallo { this.state.data.name }!</App.Text>
            </App.Toolbar>
          </App.Panel>
          <App.Panel position="left" id="sidebar">LEFT</App.Panel>
          <App.Panel position="center" id="main">
            <App.Form.Textfield id="username" label="Your Name" value={ this.state.data.name } onChange={ this._onNameChange } />
            <App.Form.Textfield id="hobbies" label="Your Hobbies" value={ this.state.data.hobbies } onChange={ this._onHobbiesChange } />
          </App.Panel>
        </App>
      );
    },
    
    _onChange: function() {
      this.setState(getExampleState());
    },
    
    _onNameChange: function(name) {
      ExampleActions.update(name, this.state.data.hobbies);
    },
    
    _onHobbiesChange: function(hobbies) {
      ExampleActions.update(this.state.data.name, hobbies)
    }
  })
  
React.render(<ExampleApp />, document.body);