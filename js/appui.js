var React = require("react/addons");
var Base = require("./components/base");

var App = Base.App;
App.Textbox = require("./components/textbox");
App.Checkbox = require("./components/checkbox");
App.Radiobox = require("./components/radiobox");
App.Button = require("./components/button");

module.exports = App

/**
  * Flat UI
  */
/*
App.Titlebar = React.createClass({
  getDefaultProps: function() {
    return { 
      layout:   "horizontal",
      size:     "20",
      justify:  "space-between",
      align:    "center"
    }
  },
  
  render: function() {
    var className = this.props.className;
    
    return (
        <App.Panel { ...this.props } className={ extendClassNameWith("titlebar", className) }>{ this.props.children }</App.Panel>
      );
  }
})

App.Text = React.createClass({
  render: function() {
    return (
        <div { ...this.props }>{ this.props.children }</div>
      );
  }
})

App.Toolbar = React.createClass({
  getDefaultProps: function() {
    return {
      layout:   "horizontal",
      size:     "100",
      justify:  "start",
      align:    "center"
    }
  },
  
  render: function() {
    var className = this.props.className;
    
    return (
        <App.Panel { ...this.props } className={ extendClassNameWith("toolbar", className) }>{ this.props.children }</App.Panel>
      );
  }
})

App.Form = React.createClass({
  render: function() {
    return (<form { ...this.props }>{ this.props.children }</form>);
  }
})

App.Form.Textfield = React.createClass({
  
  getDefaultProps: function() {
    return {
      layout:   "horizontal",
      justify:  "space-between",
      align:    "center",
      size:     "auto"
    }
  },
  
  render: function() {
    var 
      className = extendClassNameWith("control", this.props.className),
      label = undefined;
  
    if (this.props.label) {
      label = <label forName={ this.props.id } ratio="1">{ this.props.label }</label>
    }
    
    return (
        <App.Panel layout={ this.props.layout } className={ className } ratio={ this.props.ratio } size={ this.props.size }>
          { label }
          <input type="text" name={ this.props.id } defaultValue={ this.props.value } ratio="4" onChange={ this._onChange } />
        </App.Panel>
      );
  },
  
  _onChange: function(event) {
    this.props.onChange(event.target.value);
  }
})

module.exports = App;*/