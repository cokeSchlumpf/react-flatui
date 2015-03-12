var React = require("react/addons");
var options = require("./base").options;
var base = require("./base");
var options = base.options;
var App = base.App;
var Button = require("./button");
var objectAssign = require('object-assign');

var ColumnHeader = React.createClass({
    propTypes: {
      className: React.PropTypes.string,
      filterable: React.PropTypes.bool,
      label: React.PropTypes.string,
      sortable: React.PropTypes.string
    },
    
    render: function() {
      var { className, filterable, label, sortable, ...other } = this.props;
      
      return (
          <App.Panel layout="horizontal" className={ this._getClassName() } { ...other }>
            { label }
          </App.Panel>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-table-header-column": true
        };
        
      if (className) { classes[className] = true; }      
      return cx(classes);
    }
  });

var Header = React.createClass({
    propTypes: {
      columns: React.PropTypes.object
    },
    
    _getColumnId: function(key) {
      return "cid-" + key;
    },
    
    _renderColumns: function() {
      var 
        self = this,
        columns = this.props.columns,
        keys = Object.keys(columns),
        result = {};
        
      keys.forEach(function(key) {
        var id = self._getColumnId(key);
        result[id] = <ColumnHeader { ... columns[key] } />
      });
      
      return result;
    },
    
    render: function() {
      var { className, columns, ...other } = this.props;
  
      return (
          <App.Panel className={ this._getClassName() } layout="horizontal" { ... other }>
            { this._renderColumns() }
            
            <div className="ui-control-table-header-menu" size="20"></div>
          </App.Panel>
        )
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-table-header": true
        };
        
      if (className) { classes[className] = true; }      
      return cx(classes);
    }
  });

var Cell = React.createClass({
    propTypes: {
      value: React.PropTypes.any
    },
    
    render: function() {
      var { className, value, ...other } = this.props;
      
      return (<div className={ this._getClassName() } { ...other }>{ value }</div>);
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-table-cell": true,
        };
        
      if (className) { classes[className] = true; }      
      return cx(classes);
    }
  });

var Row = React.createClass({
    propTypes: {
      columns: React.PropTypes.object.isRequired,
      isEvenRow: React.PropTypes.bool.isRequired,
      row: React.PropTypes.string.isRequired,
      selected: React.PropTypes.bool,
      value: React.PropTypes.object.isRequired
    },
    
    getDefaultProps: function() {
      return {
        isEvenRow: false,
        selected: false
      }
    },
    
    _getCellId: function(key) {
      return "cid-" + this.props.row + "-" + key;
    },
    
    _renderColumns: function() {
      var 
        self = this,
        value = this.props.value,
        columns = this.props.columns,
        keys = Object.keys(this.props.columns),
        result = {};
        
      keys.forEach(function(key) {
        var id = self._getCellId(key);
        
        result[id] = <Cell value={ value[key] } />
      });
      
      return result;
    },
    
    render: function() {
      var { className, columns, isEvenRow, value, ...other } = this.props;
      
      return (
          <App.Panel className={ this._getClassName() } layout="horizontal" { ...other }>
            { this._renderColumns() }
            <div className="ui-control-table-row-menu" size="20"></div>
          </App.Panel>
        );
    },
    
     _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-table-row": true,
          "ui-control-table-row-even": this.props.isEvenRow,
          "ui-control-table-row-selected": this.props.selected
        };
        
      if (className) { classes[className] = true; }      
      return cx(classes);
    }
  });

module.exports = React.createClass({
    propTypes: {
      columns: React.PropTypes.object,
      multiselect: React.PropTypes.bool,
      onChange: React.PropTypes.object,
      value: React.PropTypes.object
    },
    
    getDefaultProps: function() {
      return {
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    _getRowId: function(key) {
      return "rid-" + key;
    },
    
    _renderRows: function() {
      var
        self = this,
        value = this.props.value,
        columns = this.props.columns,
        keys = Object.keys(value),
        even = true,
        result = {};
        
      keys.forEach(function(key) {
        var id = self._getRowId(key);
        even = !even;
        result[id] = <Row columns={ columns } row={ key } isEvenRow={ even } size="auto" { ...value[key] } onClick={ self._handleRowClick(key) }/>
      });
      
      return result;
    },
    
    render: function() {
      var { columns, className, multiselect, onChange, value, ...other } = this.props;
      
      return (
          <App.Panel className={ this._getClassName() } layout="vertical" justify="start" { ...other }>
            <Header columns={ columns } size="auto" />
            <App.Panel className="ui-control-table-body" layout="vertical" justify="start" scrollable="true">
              { this._renderRows() }
            </App.Panel>
          </App.Panel>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-table": true,
          "ui-control-table-selectable": this.props.onChange != undefined
        };
        
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _handleRowClick: function(key) {
      var 
        self = this,
        keys = Object.keys(this.props.value);
      
      return function() {

        if (self.props.onChange) {
          var data = objectAssign({}, self.props.value);
          
          if (self.props.multiselect) {
            data[key].selected = !data[key].selected;  
          } else {
            keys.forEach(function(k) {
              data[k].selected = k === key && !data[key].selected;
            });
          }
          
          self.props.onChange(data, key, data[key].selected);
        }
      };
    }
  });