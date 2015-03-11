var React = require("react/addons");
var base = require("./base");
var objectAssign = require('object-assign');

var App = base.App;
var options = base.options;

var ListItem = React.createClass({  
  propTypes: {
    value: React.PropTypes.any.isRequired,
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    info: React.PropTypes.string,
    selected: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired
  },
  
  getDefaultProps: function() {
      return {
        selected: false,
        onClick: function(value) { console.log("Clicked ListItem with value `" + value + "`"); }
      }
  },
    
  render: function() {
    var cx = React.addons.classSet;
    
    var className = cx({
      "ui-control-listitem": true,
      "ui-control-listitem-complex": this.props.subtitle !== undefined,
      "ui-control-selected": this.props.selected
    });

    return (
      <App.Panel className={ className } layout="horizontal" justify="center" align="center" onClick={ this._onClickHandler } id={ this.props.id }>
        <App.Panel layout="vertical">
          <App.Panel className="ui-control-title" size="auto">{ this.props.title }</App.Panel>
          { this.props.subtitle &&
             <App.Panel className="ui-control-small" size="auto">{ this.props.subtitle }</App.Panel>
          }
        </App.Panel>
        { this.props.info &&
          <App.Panel size="auto" layout="vertical" className="ui-control-info">
            { this.props.info }
          </App.Panel>
        }
      </App.Panel>);
  },
  
  _onClickHandler: function() {
    this.props.onClick(this.props.value);
  }
});

module.exports = React.createClass({
    propTypes: {
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.object.isRequired,
      listitem: React.PropTypes.any,
      multiselect: React.PropTypes.bool,
      onChange: React.PropTypes.func
    },
    
    getDefaultProps: function() {
      return {
        listitem: ListItem,
        multiselect: false
      };
    },
    
    _getContainerName: function() {
      return this.props.name + "-container";
    },
    
    _createId: function(value) {
      return "id-" + value;
    },
    
    _renderHiddenControl: function() {
      var 
        self = this,
        items = {},
        selected = [];
      
      Object.keys(this.props.value).forEach(function(key) {
        if (self.props.value[key].selected) selected.push(key);
        items[self._createId(key)] = <option value={ key }>{ self.props.value[key].title }</option>
      });
      
      return (
          <select name={ this.props.name } id={ this.props.name } multiple={ this.props.multiselect } value={ this.props.multiselect ? selected : selected[0] } style={{ display: "none" }}>
            {items}
          </select>
        );
    },
    
    render: function() {
      var { onChange, className, ...other } = this.props;
      var cx = React.addons.classSet;
      var self = this;
      
      /** assemble class name */
      var classes = {
        "ui-control": true,
        "ui-control-listbox": true,
        "ui-control-selectable": this.props.onChange !== undefined
      };

      if (className) { classes[className] = true; }
      
      var items = {}
      Object.keys(this.props.value).forEach(function(result) {
        var value = self.props.value[result];
        var id = self._createId(result);
        items[id] = <ListItem { ...value } value={ result } onClick={ self._onChangeHandler } id={ id } />; 
      });
      
      return (
          <App.Panel { ...this.props } className={ cx(classes) } layout="vertical" justify="start" scrollable="true" id={ this._getContainerName() }>
            { items }
            { self._renderHiddenControl() }
          </App.Panel>
        );
    },
    
    componentDidUpdate: function() {
      this._updateScrollPosition();
    },
    
    componentDidMount: function() {
      this._updateScrollPosition();
    },
    
    _updateScrollPosition: function() {
      var selected = this._getSelected();
      if (selected.length > 0) {
        var item = document.getElementById(this._createId(selected[0]));
        var offset = item.offsetTop;
        if (document.getElementById(this._getContainerName()).childNodes[1]) {
          offset -= document.getElementById(this._getContainerName()).childNodes[1].offsetTop;
        }
        document.getElementById(this._getContainerName()).scrollTop = offset;
      }
    },
    
    _getSelected: function() {
      var selected = [];
      var self = this;
      
      Object.keys(this.props.value).forEach(function(item) {
        if (self.props.value[item].selected) selected.push(item);
      });
      
      return selected;
    },
    
    _propagateChange: function(value) {
      if (this.props.onChange) {
        var
          self = this, 
          data = objectAssign({}, this.props.value);
        
        Object.keys(data).forEach(function(key) {
          if (self.props.multiselect && value.indexOf(key) > -1) {
            data[key].selected = true;
          } else if (!self.props.multiselect && value == key) {
            data[key].selected = true;
          } else {
            data[key].selected = false;
          }
        });
        this.props.onChange(data, value);
      }
    },
    
    _onChangeHandler: function(selectedValue) {
      var selectedItems = this._getSelected();
      var index = selectedItems.indexOf(selectedValue);
      
      if (this.props.onChange && !this.props.multiselect && index == -1) {
        this._propagateChange(selectedValue);
      } else if (this.props.onChange && this.props.multiselect) { 
        if (index > -1) {
          selectedItems.splice(index, 1);
          this._propagateChange(selectedItems);
        } else {
          selectedItems.push(selectedValue);
          this._propagateChange(selectedItems);
        }
      }
    }
  })