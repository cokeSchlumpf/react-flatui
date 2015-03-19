var React = require("react/addons");
var App = require("../../appui");

var Container = React.createClass({
  render: function() {
    return(
        <App.Panel className="sampler-container" layout="horizontal">
          { this.props.children }
        </App.Panel>
      );
  }
});

var Console = React.createClass({
  render: function() {
    var { className, ...other } = this.props;
    
    return (
        <App.Panel className={ this._getClassname() } { ...other } layout="vertical">
          <pre>
            { this.props.children }
          </pre>
        </App.Panel>
      );
  },
  
  _getClassname: function() {
    var 
      cx = React.addons.classSet,
      className = this.props.className,
      classes = {
        "sampler-console": true
      }
    if (className) { classes[className] = true; }
    return cx(classes);
  }
})

var Example = React.createClass({
  
  render: function() {
    var { className, ...other } = this.props;
    
    return (
        <App.Panel layout="vertical" justify="space-around" className={ this._getClassname() } { ...other }>
          { this.props.children }
        </App.Panel>
      );
  },
  
  _getClassname: function() {
    var 
      cx = React.addons.classSet,
      className = this.props.className,
      classes = {
        "sampler-example": true
      }
    if (className) { classes[className] = true; }
    return cx(classes);
  }
});

var Events = React.createClass({
  render: function() {
    var 
      self = this,
      keys = Object.keys(this.props.events),
      rows = {};
      
    keys.forEach(function(key) {
      var
        event = self.props.events[key]
        parameters = Object.keys(event.parameters);
        
      rows[key] = <tr>
          <td rowSpan={ parameters.length + 1 }>{ key }</td>
          <td colSpan={ 3 }>{ event.desc }</td>
        </tr>
        
      parameters.forEach(function(param) {
        var
          parameter = event.parameters[param];
          
        rows[key + "." + param] = <tr>
            <td>{ param }</td>
            <td>{ parameter.type }</td>
            <td>{ parameter.desc }</td>
          </tr>
      });
    });
      
    return (
      <div>
        <h4>Events</h4>
        <table>
          <thead>
            <tr>
              <th width="15%">Name</th>
              <th width="15%">Description</th>
              <th width="20%"></th>
              <th width="50%"></th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
})

var Properties = React.createClass({
  
  getDefaultProps: function() {
    return {
      isProperties: true
    }
  },
  
  render: function() {
    var 
      self = this,
      props = this.props.properties,
      keys = Object.keys(props),
      rows = {},
      required = false;
    
    keys.forEach(function(key) {
      var rowspan = props[key].values || props[key].parameters ? 2 : 1;
      
      rows[key] = <tr>
          <td rowSpan={ rowspan }>{ key } { props[key].required && <span>*</span> }</td>
          <td rowSpan={ rowspan }>{ props[key].type }</td>
          <td rowSpan={ rowspan }>{ props[key].default ?  props[key].default : <span className="code">undefined</span>}</td>
          <td> { props[key].desc }</td>
        </tr>
        
      if (props[key].values) {
        var
          i = 0, 
          items = {};
          
        for (i = 0; i < props[key].values.length; i++) {
          var item = props[key].values[i];
          if (i < props[key].values.length - 2) {
            items[item] = <span><span className="code">{ item }</span>, </span>
          } else if (i < props[key].values.length - 1) {
            items[item] = <span><span className="code">{ item }</span> or </span>
          } else {
            items[item] = <span><span className="code">{ item }</span></span>
          }
        }
        
        rows[key + "_values"] = <tr>
          <td>
            <p>Allowed values:<br />{ items }</p>
          </td>
        </tr>
      }
      
      if (props[key].parameters) {
        var
          i = 0, 
          items = {};
          
        for (i = 0; i < props[key].parameters.length; i++) {
          var item = props[key].parameters[i];
          if (i == 0) {
            items[item] = <span>{ item }</span>
          } else {
            items[item] = <span>, { item }</span>
          }
        }
        
        rows[key + "_values"] = <tr>
          <td>
            <p>Signature: <br /><span className="code">{ key }({ items })</span></p>
          </td>
        </tr>
      }
      
      if (props[key].required) required = true;
    });
    
    return (
      <div>
        <h4>{ this.props.isProperties ? "Properties" : "Children Properties" }</h4>
        { this.props.children }
        <table>
          <thead>
            <tr>
              <th width="15%">Name</th>
              <th width="15%">Type</th>
              <th width="20%">Default</th>
              <th width="50%">Description</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
          { required &&
            <tfoot>
              <tr>
                <td colSpan="4">* Required</td>
              </tr>
            </tfoot>
          }
        </table>
      </div>
      ) 
  }
  
});

module.exports = {
  
  container: Container,
  
  console: Console,
  
  example: Example,
  
  properties: Properties,
  
  events: Events
  
}