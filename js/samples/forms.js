var React = require("react/addons");
var App = require("../appui");

module.exports = React.createClass({
  render: function() {
    return (
        <App layout="border">
          <App.Panel position="left" />
          <App.Panel position="center">
            <h1>Hallo Freunde!</h1>
          </App.Panel>
          <App.Panel position="right" />
        </App>
      );
  }
});