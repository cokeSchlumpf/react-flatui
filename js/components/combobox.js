var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var Textbox = require("./textbox");
var Button = require("./button");
var Listbox = require("./listbox");
var objectAssign = require('object-assign');

var BLUR_TIMEOUT = 100;
var SETSTATE_TIMEOUT = 500;

var setStateTimeout;
var blurTimeout;

var keyHandlers = {
  38: '_handleUpKey',
  40: '_handleDownKey',
  13: '_handleEnterKey',
  27: '_handleEscKey',
  74: '_handleDownKey',
  75: '_handleUpKey'
}

module.exports = React.createClass({
    propTypes: {
      value: React.PropTypes.object.isRequired,
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func
    },
    
    getInitialState: function() {        
        return {
          expanded: false,
          textboxvalue: undefined,
          selected: undefined
        }
    },
    
    getDefaultProps: function() {
      return {
        value: { 
          1: { title: "A" },
          2: { title: "B" },
          3: { title: "C" }
        },
        multiselect: false,
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    _getClassNames: function() {
      var 
        className = this.props.className;
        cx = React.addons.classSet;
        
      var classes = {
        "ui-control": true,
        "ui-control-combobox": true,
        "ui-control-combobox-multiselect": this.props.multiselect
      };
      
      if (className) { classes[className] = true; }
      
      return cx(classes);
    },
    
    _renderDownButton: function() {
      return (
        <Button className="button-inline" onClick={ this._handleButtonClick } size="auto">
          <span>&#9660;</span>
        </Button>
        );
    },
    
    _getTextboxName: function() {
      if (this.props.multiselect) {
        return this.props.name + "-textbox";
      } else {
        return this.props.name;
      }
    },
    
    _renderHiddenControl: function() {
      var 
        self = this,
        items = {},
        selected = [];
      
      Object.keys(this.props.value).forEach(function(key) {
        if (self.props.value[key].selected) selected.push(key);
        items["id-" + key] = <option value={ key }>{ self.props.value[key].title }</option>
      });
      
      return (
          <select name={ this.props.name } id={ this.props.name } multiple={ this.props.multiselect } value={ this.props.multiselect ? selected : selected[0] } style={{ display: "none" }}>
            {items}
          </select>
        );
    },
    
    render: function() {
      var { onChange, className, name, selectOnly, multiselect, value, ...other } = this.props;
      var 
        self = this,    // Used in inner code blocks ...
        listdata = {},  // The data which will be displayed in the listbox (only not selected items)
        values,         // The selected values (multiple selection)
        selectedItems;  // Variable with selected items for multiple selection
      
      selected = this.state.selected;
      
      // Calculation of values and textboxvalue
      Object.keys(value).forEach(function(key) {
        if (value[key].selected) {
          if (!multiselect || values == undefined) { values = {} }
          values["id-" + key] = 
            <span className="ui-control-combobox-item" size="auto">
              { value[key].title }
              { multiselect &&
                <span className="ui-control-combobox-item-remove" data-id={ key } onClick={ self._handleRemoveClick }>X</span>
              }
            </span>;
        } 
      });
      
      selectedItems = [];
      
      // Calculation of list items
      Object.keys(value).forEach(function(key) {        
        if (!multiselect) {
          listdata[key] = objectAssign({}, value[key], { selected: selected == key });
        } else if (!value[key].selected) {
          listdata[key] = objectAssign({}, value[key], { selected: selected == key });
        } else {
          selectedItems.push(key);
        }
      });
      
      this._selectedItems = selectedItems;
      
      var next, previous;
      if (selected && Object.keys(listdata).length > 0) {
        var keys = Object.keys(listdata);
        var index = keys.indexOf(selected);
        
        next = index + 1;
        previous = index - 1;
        
        next = (next > keys.length - 1) ? keys[keys.length - 1] : keys[next];
        previous = (previous < 0) ? keys[0] : keys[previous];
      } else if (Object.keys(listdata).length > 0) {
        next = Object.keys(listdata)[0];
        previous = undefined;
      } else {
        next = undefined;
        previous = undefined;
      }
      
      this._nextItem = next;
      this._previousItem = previous;
      
      return (
          <App.Panel { ...other } className={ this._getClassNames() } onKeyDown={ this._handleKeyDown }>
            <div style={{ position: "relative" }}>
              { this.state.expanded ?
                  <Textbox name={ this._getTextboxName() } value={ this.state.textboxvalue } onBlur={ this._handleTextboxBlur } onChange={ this._handleTextboxChange }>
                    { multiselect && 
                        <App.Panel layout="horizontal" size="auto" align="center" position="left">
                          { values }
                        </App.Panel>
                    }
                    
                    { this._renderDownButton() }
                  </Textbox>
                :
                  <App.Panel className="ui-control-textbox-container-inner" layout="horizontal" align="stretch">
                    <App.Panel ratio="1" onClick={ this._handleButtonClick } layout="horizontal" justify="start" align="center">
                      { values }
                    </App.Panel>
                    { this._renderDownButton() }
                    { this._renderHiddenControl() }
                  </App.Panel>
              }
              { this.state.expanded && Object.keys(listdata).length > 0 && 
                <Listbox value={ listdata } style={{ maxHeight: "200px", display: "block", height: "auto" }} onChange={ this._handleListboxChange } name={ this.props.name + "-listbox" } />
              }
            </div>
          </App.Panel>
        );
    },
    
    _selectedItems: undefined,
    
    _close: function(cb) {      
      this.setState({ expanded: false, textboxvalue: undefined, selected: undefined }, function() {
        if (cb) cb();
      })
    },
    
    _expand: function() {
      var 
        i,
        selected,
        textboxvalue,
        keys = Object.keys(this.props.value);
      
      if (!this.props.multiselect) {
        for (i = 0; i < keys.length; i++) {
          if (this.props.value[keys[i]].selected) {
            selected = keys[i];
            textboxvalue = this.props.value[keys[i]].title;
            break;
          }
        }
      }
      
      this.setState({ expanded: true, textboxvalue:  textboxvalue, selected: selected }, this._selectTextbox)
    },
    
    _handleButtonClick: function(event) {
      if (this.state.expanded) this._handleTextboxBlur(); else this._expand();
    },
    
    _handleRemoveClick: function(event) {
      var 
        index,
        key = event.target.attributes["data-id"].value,
        select = this._selectedItems;
      
      index = select.indexOf(key);
      select.splice(index, 1);

      this._propagateChange(select);
      
      event.stopPropagation();
    },
    
    _handleEnterKey: function(event) {
      var self = this;
      
      if (!this.state.selected) {
        this._handleTextboxBlur();
      } else if (!this.props.multiselect) {
        var selected = this.state.selected;
        this._close(function() {
          self._propagateChange(selected);
        });
      } else {
        var selected = this.state.selected;
        var items = this._selectedItems;
        items.push(selected);
        
        this.setState({ textboxvalue: undefined, selected: undefined }, function() {
            self._propagateChange(items);
          });
      }
    },
    
    _nextItem: undefined,
    
    _previousItem: undefined,
    
    _selectTextbox: function() {
      textfield = document.getElementById(this._getTextboxName());
      textfield.focus();
      textfield.select();
    },
    
    _selectListboxItem: function(item) {
      if (item) {
        this.setState({ selected: item, textboxvalue: this.props.value[item].title }, this._selectTextbox)
      }
    },
    
    _handleDownKey: function(event) {
      this._selectListboxItem(this._nextItem);
    },
    
    _handleUpKey: function(event) {
      this._selectListboxItem(this._previousItem);
    },
    
    _handleKeyDown: function(event) {
      if (event && this[keyHandlers[event.which]]) {
        this[keyHandlers[event.which]](event);
        event.preventDefault();
      }
    },
    
    _handleEscKey: function(event) {
      this._close();
    },
    
    _handleTextboxChange: function(value) {
      var 
        i,
        self = this,
        selected,
        keys = Object.keys(this.props.value);
      
      for (var i = 0; i < keys.length; i++) {
        if (this.props.value[keys[i]].title.indexOf(value) > -1) {
          selected = keys[i];
          break;
        }  
      } 
           
      self.setState({ textboxvalue: value, selected: selected  });  
    },
    
    _handleTextboxBlur: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      blurTimeout = setTimeout(function() {
        var field = document.getElementsByName(self._getTextboxName())[0];
        if (field == undefined) return;
        var currentValue = field.value;
        
        var changed = false;
        var value = [];
        
        Object.keys(self.props.value).forEach(function(key) {
          if (currentValue == self.props.value[key].title) {
            if (!self.props.value[key].selected) changed = true;
            value.push(key);
          } else if (self.props.multiselect && self.props.value[key].selected) {
            value.push(key);
          }
        });

        self._close(function() {
          if (changed) { 
            self._propagateChange(!self.props.multiselect ? value[0] : value) }
        });
      }, BLUR_TIMEOUT);
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
    
    _handleListboxChange: function(data, value) {
      var self = this;
      if (blurTimeout) clearTimeout(blurTimeout);
     
      if (!this.props.multiselect) {
        this._close(function() {
          self._propagateChange(value);
        });
      } else {
        var items = this._selectedItems;
        items.push(value);
        self.setState({ textboxvalue: undefined, selected: undefined }, function() {
          self._propagateChange(value);
          self._selectTextbox();
        });
      }
    }
  });