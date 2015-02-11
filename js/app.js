var React = require("react/addons");
var App = require("./appui");
var Flux = require("flux");

var AppDispatcher = new Dispatcher();

React.render(
  <App className="myApp" layout="border">
    <App.Panel position="top" size="auto" style={ { backgroundColor: "#ff0000" } }>
      <App.Titlebar>
        <App.Text className="title">Online Notes</App.Text>
        <App.Text className="subtitle">Lorem Ipsum Dolor</App.Text>
        <App.Text className="user">Bla bla</App.Text>
      </App.Titlebar>
      <App.Toolbar>
        <App.Text>Hallo Freunde!</App.Text>
      </App.Toolbar>
    </App.Panel>
    <App.Panel position="left" id="sidebar">LEFT</App.Panel>
    <App.Panel position="center" id="main">
      <App.Form.Textfield id="username" label="Your Name" value="Horst Kevin" />
      <App.Form.Textfield id="hobbies" label="Your Hobbies" value="Ball spielen" />
    </App.Panel>
  </App>, document.body);