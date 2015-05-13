var React = require("react");
var Bootstrap = require("react-bootstrap");
var Button = require("./button").Button;
var DropdownButton = require("./button").DropdownButton;
var Draggable = require("./draggable");

var classnames = require("./util/classnames/index");
var updateListValue = require("./helper").updateListValue;
var getSelectedValue = require("./helper").getSelectedValue;

var $ = require("jquery");

var ColumnHeader = React.createClass({
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
      var { className, filter, id, title, sortable, sorted, onColumnWidthChange, onFilter, onSort, ...other } = this.props;
      
      return (
          <th className={ this._getClassName() } ref="container" { ...other }>
            <div className="fu-table-header-column-title" onClick={ this._handleLabelClick }>{ title }</div>
            { filter &&
              <div className="fu-table-header-column-dropdown">
                <DropdownButton multiselect={ true } value={ filter } name={ id + "_filter" } onChange={ this._handleFilter } />
              </div>
            }
            
            <Draggable size={ 25 } movey={ false } minx={ 40 } onChange={ this.props.onColumnWidthChange } />
          </th>
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

var Header = React.createClass({
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
        result[id] = <ColumnHeader { ... columns[key] } onColumnWidthChange={ self._handleColumnWidthChange(key) } onSort={ self._handleColumnSort(key) } id={ key }  onFilter={ self._handleColumnFilter(key) } />
      });

      return result;
    },

    render: function() {
      var { className, columns, ...other } = this.props;
  
      return (
          <thead>
            <tr>
              { this._renderColumns() }
              <th className="fu-table-header-menu" width="20"></th>
            </tr>
          </thead>
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

var Cell = React.createClass({
    propTypes: {
      column: React.PropTypes.object.isRequired,
      prefix: React.PropTypes.any,
      value: React.PropTypes.any
    },
    
    render: function() {
      var 
        { className, column, prefix, style, value, width, ...other } = this.props,
        content;
        
      if (prefix != null) {
        value = <div className="fu-table-cell-prefix">{ prefix }{ value }</div>
      }
      
      if (column.renderWith) {
        var Element = React.createFactory(column.renderWith);
        content = Element({ value: value });
      } else {
        content = { value };
      }
      
      return (<td className={ this._getClassName() } width={ column.width } { ...other }>{ content }</td>);
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

var Row = React.createClass({
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
        
        result[id] = <Cell value={ value[key] } column={ columns[key] } className={ self._getClassName() } prefix={ prefix }  />
        if (prefix != undefined) prefix = undefined;
      });
      
      return result;
    },
    
    render: function() {
      var { className, columns, isEvenRow, value, ...other } = this.props;
      
      return (
          <tr className={ this._getClassName() } { ...other }>
            { this._renderColumns() }
            <td className="fu-table-header-menu" width="20"></td>
          </tr>
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

module.exports = React.createClass({
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
            prefix = <span className={ "level-" + level } onClick={ self._handleExpandClick(key, !expanded) }>{ symbol }&nbsp;</span>;
            
          result[id] = <Row columns={ columns } row={ key } onClick={ self._handleRowClick(key) } { ...value[key] } ref={ "row-" + key } prefix={ prefix } />;
          
          if (expanded) {
            result = $.extend(true, result, self._renderRows(columns, value[key].children, level + 1));
          }
        } else {
          var prefix = level > 0 ? <span className={ "level-" + level }></span> : undefined;
          result[id] = <Row columns={ columns } row={ key } onClick={ self._handleRowClick(key) } { ...value[key] } ref={ "row-" + key } prefix={ prefix } />;
        }
      });
      
      return result;
    },
    
    render: function() {
      var { className, columns, mode, multiselect, noHeader, value, multiselect, onChange, onColumnConfigurationChange, ...other } = this.props;
      var 
        mergedColumns = this._mergeColumnConfiguration();
        
      if (onChange) other.hover = true;
      
      return (
          <Bootstrap.Table className={ this._getClassName() } { ...other }>
            { !noHeader &&
              <Header columns={ mergedColumns } onColumnWidthChange={ this._handleColumnWidthChange } onSort={ this._handleSort } onFilter={ this._handleFilter } />
            }
            <tbody ref="tbody">
              { this._renderRows(mergedColumns, this._prepareValue(mergedColumns)) }
            </tbody>
          </Bootstrap.Table>
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