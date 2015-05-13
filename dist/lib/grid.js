var React = require("react");
var Bootstrap = require("react-bootstrap");
var Button = require("./button").Button;
var DropdownButton = require("./button").DropdownButton;
var Draggable = require("./draggable");

var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;
var getSelectedValue = require("./helper").getSelectedValue;

var $ = require("jquery");

var ColumnHeader = React.createClass({displayName: "ColumnHeader",
    propTypes: {
      className: React.PropTypes.string,
      filter: React.PropTypes.any,
      id: React.PropTypes.any.isRequired,
      title: React.PropTypes.string,
      sortable: React.PropTypes.bool,
      sorted: React.PropTypes.any, // 'asc' or 'desc' or false or undefined
      
      onColumnWidthChange: React.PropTypes.func,
      onFilter: React.PropTypes.func,
      onSort: React.PropTypes.func
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

    render: function() {
      var $__0=             this.props,className=$__0.className,filter=$__0.filter,id=$__0.id,title=$__0.title,sortable=$__0.sortable,sorted=$__0.sorted,onColumnWidthChange=$__0.onColumnWidthChange,onFilter=$__0.onFilter,onSort=$__0.onSort,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,filter:1,id:1,title:1,sortable:1,sorted:1,onColumnWidthChange:1,onFilter:1,onSort:1});
      
      return (
          React.createElement("th", React.__spread({className:  this._getClassName(), ref: "container"},   other ), 
            React.createElement("div", {className: "fu-table-header-column-title", onClick:  this._handleLabelClick}, title ), 
             filter &&
              React.createElement("div", {className: "fu-table-header-column-dropdown"}, 
                React.createElement(DropdownButton, {multiselect: true, value: filter, name:  id + "_filter", onChange:  this._handleFilter})
              ), 
            
            
            React.createElement(Draggable, {size: 25, movey: false, minx: 40, onChange:  this.props.onColumnWidthChange})
          )
        );
    },
    
    _getClassName: function() {
      var 
        self = this;

        classes = {
          "fu-table-header-column": true,
          "fu-table-header-column-sortable": this.props.sortable,
          "fu-table-header-column-sorted": this.props.sorted
        };
      classes["fu-table-header-column-sorted-" + this.props.sorted] = this.props.sorted;   
      
      if (this.props.filter) {
        classes["fu-table-header-filterable"] = true;
        var keys = Object.keys(this.props.filter);
        keys.forEach(function(key) {
          if (self.props.filter[key].selected) classes["fu-table-header-filtered"] = true;
        });
      }
      
      return classnames(this.props.className, classes);
    },
    
    _handleFilter: function(value) {
      if (this.props.onFilter) { this.props.onFilter(value) }
    },
    
    _handleLabelClick: function(event) {
      if (this.props.onSort && this.props.sortable) {
        if (this.props.sorted == "asc") this.props.onSort("desc"); else this.props.onSort("asc");
      }
    },
    
    _handleModalClick: function(event) {
      this.setState(this.getInitialState());
    }
});

var Header = React.createClass({displayName: "Header",
    propTypes: {
      columns: React.PropTypes.object,
      
      striped: React.PropTypes.bool,
      bordered: React.PropTypes.bool,
      condensed: React.PropTypes.bool,
      hover: React.PropTypes.bool,
      responsive: React.PropTypes.bool,
      
      onColumnWidthChange: React.PropTypes.func,
      onFilter: React.PropTypes.func,
      onSort: React.PropTypes.func
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table-header": true
        };
        
      return classnames(className, classes);
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
        result[id] = React.createElement(ColumnHeader, React.__spread({},    columns[key] , {onColumnWidthChange:  self._handleColumnWidthChange(key), onSort:  self._handleColumnSort(key), id: key, onFilter:  self._handleColumnFilter(key) }))
      });

      return result;
    },

    render: function() {
      var $__0=      this.props,className=$__0.className,columns=$__0.columns,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,columns:1});
  
      return (
          React.createElement("thead", null, 
            React.createElement("tr", null, 
               this._renderColumns(), 
              React.createElement("th", {className: "fu-table-header-menu", width: "20"})
            )
          )
        )
    },
    
    _handleColumnWidthChange: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onColumnWidthChange) self.props.onColumnWidthChange(key, value);
      };
    },
    
    _handleColumnFilter: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onFilter) self.props.onFilter(key, value);
      };
    },
    
    _handleColumnSort: function(key) {
      var self = this;
      
      return function(value) {
        if (self.props.onSort) self.props.onSort(key, value);
      }
    }
  });

var Cell = React.createClass({displayName: "Cell",
    propTypes: {
      column: React.PropTypes.object.isRequired,
      prefix: React.PropTypes.any,
      value: React.PropTypes.any
    },
    
    render: function() {
      var 
        $__0=          this.props,className=$__0.className,column=$__0.column,prefix=$__0.prefix,style=$__0.style,value=$__0.value,width=$__0.width,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,column:1,prefix:1,style:1,value:1,width:1}),
        content;
        
      if (prefix != null) {
        value = React.createElement("div", {className: "fu-table-cell-prefix"}, prefix, value )
      }
      
      if (column.renderWith) {
        var Element = React.createFactory(column.renderWith);
        content = Element({ value: value });
      } else {
        content = { value:value };
      }
      
      return (React.createElement("td", React.__spread({className:  this._getClassName(), width:  column.width},   other ), content ));
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table-cell": true,
        };

      return classnames(className, this.props.column.className, classes);
    }
  });

var Row = React.createClass({displayName: "Row",
    propTypes: {
      columns: React.PropTypes.object.isRequired,
      selected: React.PropTypes.bool,
      value: React.PropTypes.object.isRequired,
      prefix: React.PropTypes.any
    },
    
    getDefaultProps: function() {
      return {
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
        prefix = this.props.prefix,
        result = {};
        
      keys.forEach(function(key) {
        var id = self._getCellId(key);
        
        result[id] = React.createElement(Cell, {value:  value[key], column:  columns[key], className:  self._getClassName(), prefix: prefix })
        if (prefix != undefined) prefix = undefined;
      });
      
      return result;
    },
    
    render: function() {
      var $__0=        this.props,className=$__0.className,columns=$__0.columns,isEvenRow=$__0.isEvenRow,value=$__0.value,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,columns:1,isEvenRow:1,value:1});
      
      return (
          React.createElement("tr", React.__spread({className:  this._getClassName() },   other ), 
             this._renderColumns(), 
            React.createElement("td", {className: "fu-table-header-menu", width: "20"})
          )
        );
    },
    
     _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table-row": true,
          "fu-table-row-selected": this.props.selected
        };
        
      return classnames(className, classes);
    }
  });

module.exports = React.createClass({displayName: "exports",
    propTypes: {
      columns: React.PropTypes.object,
      mode: React.PropTypes.string, // 'client' or 'server'
      multiselect: React.PropTypes.bool,
      noHeader: React.PropTypes.bool,
      value: React.PropTypes.object,
      scrollToSelection: React.PropTypes.bool,
      
      onChange: React.PropTypes.func,
      onExpand: React.PropTypes.func,
      onColumnConfigurationChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        mode: "client",
        scrollToSelection: false,
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    getInitialState: function() {
      return {
        columns: { },
        expanded: { }
      }
    },
    
    _getRowId: function(key) {
      return "rid-" + key;
    },
    
    _mergeColumnConfiguration: function(optionalState) {
      var
        self = this, 
        columns = $.extend(true, {}, this.props.columns),
        keys = Object.keys(columns);
        
      keys.forEach(function(key) {
        if (columns[key].filter && columns[key].filter == true) columns[key].filter = self._createDefaultFilter(self.props.value, key);
        if (!columns[key].width) columns[key].width = "1*";
        if (self.state.columns[key]) {
          var state = self.state.columns[key];
          columns[key] = $.extend(true, columns[key], state, optionalState);
        }
      });
      
      if (!optionalState) {
        keys.forEach(function(key) {
          var width = columns[key].width;
          if (width.toString().indexOf("*") > -1) {
            columns[key].className = classnames(columns[key].className, "fu-applayout-item-fixed-" + width.toString().replace("*", "")) 
          }
        });
      }
      
      return columns;
    },
    
    _sortValue: function(value, column, asc) {
      var 
        self = this,        
        result = $.extend(true, {}, value),
        keys;
      
      delete result.__keys; // usually it shouldn't be present, but it is :/ ...
      keys = Object.keys(result);
      
      keys.sort(function(a, b) {
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
    
    _filterValue: function(value, column, func) {
      var
        self = this,
        result = {},
        keys;
      
      delete value.__keys; // usually it shouldn't be present, but it is :/ ...
      keys = Object.keys(value);
      
      keys.forEach(function(key) {
        if (value[key].value) {
          var val = value[key].value[column];
          if (func(val)) result[key] = value[key];
        }
      });
      
      return result;
    },
    
    _createDefaultFilter: function(value, column) {
      var
        self = this,
        result = { },
        keys;
        
      delete value.__keys; // usually it shouldn't be present, but it is :/ ...
      keys = Object.keys(value);
      
      keys.forEach(function(key) {
        var val = value[key].value[column];
        if (val && !result[val]) {
          result[val] = { title: val, filter: function(value) { return value == val; }, selected: false, exclusive: true }
        }
      });
      
      return result;
    },
    
    // TODO: Prepare value auch für Trees (Beim Filtern wird auch gematched, wenn im Baum ein Treffer ist!)
    _prepareValue: function(columns) {
      var
        self = this,
        mode = this.props.mode,
        value = $.extend(true, {}, this.props.value),
        keys = Object.keys(columns);
        
      if (mode == "client") {
        keys.forEach(function(key) {
          var 
            column = columns[key],
            filter;

          filter = Object.keys(column.filter ? column.filter : {});
          filter.forEach(function(filterName) { 
            var filter = column.filter[filterName];
            if (filter.selected && filter.filter) value = self._filterValue(value, key, filter.filter) 
          });
          if (column.sorted) value = self._sortValue(value, key, column.sorted == "asc");
        });
      }
      
      return value;
    },
    
    _renderRows: function(columns, value, level) {
      var
        self = this,
        keys = value.__keys ? value.__keys : Object.keys(value),
        result = {};
      
      if (!level) level = 0;
        
      keys.forEach(function(key) {
        var id = self._getRowId(key);
        
        if (value[key].children) {
          var 
            expanded = self.state.expanded.hasOwnProperty(key) ? self.state.expanded[key] : value[key].expanded == true,
            symbol = expanded ? String.fromCharCode(9662) : String.fromCharCode(9656),
            prefix = React.createElement("span", {className:  "level-" + level, onClick:  self._handleExpandClick(key, !expanded) }, symbol, " ");
            
          result[id] = React.createElement(Row, React.__spread({columns: columns, row: key, onClick:  self._handleRowClick(key) },   value[key] , {ref:  "row-" + key, prefix: prefix }));
          
          if (expanded) {
            result = $.extend(true, result, self._renderRows(columns, value[key].children, level + 1));
          }
        } else {
          var prefix = level > 0 ? React.createElement("span", {className:  "level-" + level}) : undefined;
          result[id] = React.createElement(Row, React.__spread({columns: columns, row: key, onClick:  self._handleRowClick(key) },   value[key] , {ref:  "row-" + key, prefix: prefix }));
        }
      });
      
      return result;
    },
    
    render: function() {
      var $__0=             this.props,className=$__0.className,columns=$__0.columns,mode=$__0.mode,multiselect=$__0.multiselect,noHeader=$__0.noHeader,value=$__0.value,multiselect=$__0.multiselect,onChange=$__0.onChange,onColumnConfigurationChange=$__0.onColumnConfigurationChange,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,columns:1,mode:1,multiselect:1,noHeader:1,value:1,multiselect:1,onChange:1,onColumnConfigurationChange:1});
      var 
        mergedColumns = this._mergeColumnConfiguration();
        
      if (onChange) other.hover = true;
      
      return (
          React.createElement(Bootstrap.Table, React.__spread({className:  this._getClassName() },   other ), 
             !noHeader &&
              React.createElement(Header, {columns: mergedColumns, onColumnWidthChange:  this._handleColumnWidthChange, onSort:  this._handleSort, onFilter:  this._handleFilter}), 
            
            React.createElement("tbody", {ref: "tbody"}, 
               this._renderRows(mergedColumns, this._prepareValue(mergedColumns)) 
            )
          )
        );
    },
    
    componentDidUpdate: function() {
      this._updateScrollPosition();
    },
    
    componentDidMount: function() {
      this._updateScrollPosition();
    },
    
    _updateScrollPosition: function() {
      if (!this.props.scrollToSelection) return;
      
      var selected = getSelectedValue(this.props.value, this.props.multiselect);
      
      if (selected.length > 0) {
        var item = this.refs["row-" + selected[0]].getDOMNode();
        var offset = item.offsetTop;
        if (this.refs.tbody.getDOMNode().childNodes[1]) {
          offset -= this.refs.tbody.getDOMNode().childNodes[1].offsetTop;
        }
        this.refs.tbody.getDOMNode().scrollTop = offset;
      }
    },
    
    _copyColumnState: function() {
      var columns = $.extend(true, {}, this.state.columns);
      var keys = Object.keys(this.props.columns);
      keys.forEach(function(key) { if (!columns[key]) columns[key] = { } });
      return columns;
    },
    
    _getClassName: function() {
      var 
        className = this.props.className,
        classes = {
          "fu-table": true,
          "fu-table-noHeader": this.props.noHeader,
          "fu-table-selectable": this.props.onChange != undefined
        };
      
      return classnames(className, classes);
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
      columns[column].width = value;
      this._handleColumnConfigurationChange(columns);
    },
    
    _handleExpandClick: function(key, expanded) {    
      var self = this;
      
      return function(event) {    
        if (self.props.onExpand) {
          self.props.onExpand(key, value, event);
        } else {
          var expandedState = $.extend(true, {}, self.state.expanded)
          expandedState[key] = expanded;
          self.setState({ expanded: expandedState });
        }
        
        event.stopPropagation();
      }
    },
    
    _handleFilter: function(column, value) {
      var columns = this._copyColumnState();
      columns[column].filter = value;
      this._handleColumnConfigurationChange(columns);
    },
    
    _handleRowClick: function(key) {
      var 
        self = this,
        keys = Object.keys(this.props.value);
      
      return function(event) {      
        if (self.props.onChange) {
          var newData = updateListValue(self.props.value, self.props.multiselect, key, !self.props.value[key].selected);
          self.props.onChange(newData, key, !self.props.value[key].selected, event);
        }
      }
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