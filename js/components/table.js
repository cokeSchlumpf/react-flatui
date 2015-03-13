var React = require("react/addons");
var options = require("./base").options;
var base = require("./base");
var options = base.options;
var App = base.App;
var Button = require("./button");
var Draggable = require("./draggable");
var Menu = require("./menu");
var objectAssign = require('object-assign');

var ColumnHeader = React.createClass({
    propTypes: {
      className: React.PropTypes.string,
      filterable: React.PropTypes.bool,
      label: React.PropTypes.string,
      onColumnWidthChange: React.PropTypes.func,
      onSort: React.PropTypes.func,
      sortable: React.PropTypes.bool,
      sorted: React.PropTypes.any, // 'asc' or 'desc' or false or undefined
    },

    getDefaultProps: function() {
      return {
        sortable: false
      }
    },
    
    getInitialState: function() {
      return {
        contextmenu: false
      }
    },
    
    _renderContextmenu: function() {
      <Menu>
        <Button label="Filter mal..." />
      </Menu>
    },

    render: function() {
      var { className, filterable, label, sortable, ...other } = this.props;
      
      return (
          <App.Panel layout="horizontal" justify="start" className={ this._getClassName() } { ...other } ref="container">
            <div className="ui-control-column-header-label" size="auto" onClick={ this._handleLabelClick } onContextMenu={ this._handleContextMenu }>{ label }</div>
            <Draggable className="ui-control-resize" size={ 25 } movey={ false } minx={ 40 } onChange={ this.props.onColumnWidthChange } />
          </App.Panel>
        );
    },
    
    _getClassName: function() {
      var 
        cx = React.addons.classSet,
        className = this.props.className,
        classes = {
          "ui-control": true,
          "ui-control-table-header-column": true,
          "ui-control-table-header-column-sortable": this.props.sortable,
          "ui-control-table-header-column-sorted": this.props.sorted
        };
      classes["ui-control-table-header-column-sorted-" + this.props.sorted] = this.props.sorted;
      if (className) { classes[className] = true; }      
      return cx(classes);
    },
    
    _handleContextMenu: function(event) {
      event.stopPropagation();
      event.preventDefault();
      this.setState({ contextmenu: true });
    },
    
    _handleLabelClick: function(event) {
      if (this.props.onSort && this.props.sortable) {
        if (this.props.sorted == "asc") this.props.onSort("desc"); else this.props.onSort("asc");
      }
    }
});

var Header = React.createClass({
    propTypes: {
      columns: React.PropTypes.object,
      onColumnWidthChange: React.PropTypes.func,
      onSort: React.PropTypes.func
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
        result[id] = <ColumnHeader { ... columns[key] } onColumnWidthChange={ self._handleColumnWidthChange(key) } onSort={ self._handleColumnSort(key) } />
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
    },
    
    _handleColumnWidthChange: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onColumnWidthChange) self.props.onColumnWidthChange(key, value);
      };
    },
    
    _handleColumnSort: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onSort) self.props.onSort(key, value);
      }
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
        
        result[id] = <Cell value={ value[key] } ratio={ columns[key].ratio } size={ columns[key].size } className={ columns[key].className } style={ objectAssign({}, columns[key].style, columns[key].cellStyle ) }  />
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
      mode: React.PropTypes.string, // 'client' or 'server'
      multiselect: React.PropTypes.bool,
      onChange: React.PropTypes.object,
      onColumnConfigurationChange: React.PropTypes.func,
      value: React.PropTypes.object
    },
    
    getDefaultProps: function() {
      return {
        mode: "client",
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    getInitialState: function() {
      return {
        columns: { }
      }
    },
    
    _getRowId: function(key) {
      return "rid-" + key;
    },
    
    _mergeColumnConfiguration: function(optionalState) {
      var
        self = this, 
        columns = objectAssign({}, this.props.columns),
        keys = Object.keys(columns);
        
      keys.forEach(function(key) {
        if (self.state.columns[key]) {
          var state = self.state.columns[key];
          columns[key] = objectAssign(columns[key], state, optionalState);
        }
      });
      
      return columns;
    },
    
    _sortValue: function(value, column, asc) {
      var 
        self = this,        
        result = objectAssign({}, value),
        keys;
      
      delete result.__keys; // usually it shouldn't be present, but it is :/ ...
      keys = Object.keys(result);
      
      keys.sort(function(a, b) {
        if (!value[b]) console.log(b);
        if (!value[b].value) console.log(value[b]);
        
        var valueA = value[a].value[column]
        var valueB = value[b].value[column];
        
        if(valueA < valueB) return -1;
        if(valueA > valueB) return 1;
        return 0;
      });
      
      if (!asc) keys.reverse();
      result.__keys = keys;
      
      return result;
    },
    
    _prepareValue: function(columns) {
      var
        self = this; 
        value = objectAssign({}, this.props.value),
        keys = Object.keys(columns);
        
      keys.forEach(function(key) {
        var column = columns[key];
        if (column.sorted) value = self._sortValue(value, key, column.sorted == "asc");
      });
      
      return value;
    },
    
    _renderRows: function(columns) {
      var
        self = this,
        value = this._prepareValue(columns),
        keys = value.__keys ? value.__keys : Object.keys(value),
        even = true,
        result = {};
        
      keys.forEach(function(key) {
        var id = self._getRowId(key);
        even = !even;
        result[id] = <Row columns={ columns } row={ key } isEvenRow={ even } size="auto" onClick={ self._handleRowClick(key) } { ...value[key] } />
      });
      
      return result;
    },
    
    render: function() {
      var { columns, className, multiselect, onChange, value, ...other } = this.props;
      var 
        mergedColumns = this._mergeColumnConfiguration();
      
      return (
          <App.Panel className={ this._getClassName() } layout="vertical" justify="start" { ...other }>
            <Header columns={ mergedColumns } size="auto" onColumnWidthChange={ this._handleColumnWidthChange } onSort={ this._handleSort } />
            <App.Panel className="ui-control-table-body" layout="vertical" justify="start" scrollable="true">
              { this._renderRows(mergedColumns) }
            </App.Panel>
          </App.Panel>
        );
    },
    
    _copyColumnState: function() {
      var columns = objectAssign({}, this.state.columns);
      var keys = Object.keys(this.props.columns);
      keys.forEach(function(key) { if (!columns[key]) columns[key] = { } });
      return columns;
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
    
    _handleColumnConfigurationChange: function(columns) {
      var 
        self = this,
        notify = function() {
          if (self.props.onColumnConfigurationChange) self.props.onColumnConfigurationChange(self._mergeColumnConfiguration(columns));
        };
      
      if (this.props.mode == "client") {
        this.setState({ columns: columns }, notify);
      } else {
        notify();
      }
    },
    
    _handleColumnWidthChange: function(column, value) {
      var columns = this._copyColumnState();
      columns[column].size = value;
      this._handleColumnConfigurationChange(columns);
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
    },
    
    _handleSort: function(column, value) {
      var 
        self = this,
        columns = this._copyColumnState(),
        keys = Object.keys(columns);
        
      keys.forEach(function(key) { columns[key].sorted = false });
      columns[column].sorted = value;
      this._handleColumnConfigurationChange(columns);
    }
  });