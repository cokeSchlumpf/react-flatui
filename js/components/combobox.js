var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var Textbox = require("./textbox");
var Button = require("./button");
var Listbox = require("./listbox");

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
      data: React.PropTypes.object.isRequired,
      multiselect: React.PropTypes.bool,
      name: React.PropTypes.string.isRequired,
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
      if (this.props.multiple) {
        return this.props.name + "-textbox";
      } else {
        return this.props.name;
      }
    },
    
    render: function() {
      var { onChange, className, name, selectOnly, multiselect, data, ...other } = this.props;
      var 
        self = this,    // Used in inner code blocks ...
        listdata = {},  // The data which will be displayed in the listbox (only not selected items)
        textboxvalue,   // The value of the textbox when getting the focus
        values,         // The selected values (multiple selection)
        selected;       // The selected item in the listbox
      
      selected = this.state.selected;
      
      // Calculation of values and textboxvalue
      Object.keys(data).forEach(function(key) {
        if (data[key].selected) {
          if (!multiselect || values == undefined) {
            values = {}
            if (!self.state.textboxvalue) textboxvalue = data[key].title
            // if (!selected) selected = key;
          }
          values["id-" + key] = <span className="ui-control-combobox-item">{ data[key].title }</span>;
        } 
      });
      
      textboxvalue = textboxvalue ? textboxvalue : this.state.textboxvalue      
      
      // Calculation of list items
      Object.keys(data).forEach(function(key) {
        if (!multiselect) {
          var title = data[key].title;
          listdata[key] = {};
          Object.keys(data[key]).forEach(function(property) { listdata[key][property] = data[key][property] });
          listdata[key].selected = selected == key;
          
          if (!selected && title.indexOf(textboxvalue) > -1) {
            listdata[key].selected = true;
            selected = key;
          }
        }
      });
      
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
          <App.Panel className={ this._getClassNames() } onKeyDown={ this._handleKeyDown }>
            { this.state.expanded ?
                <Textbox name={ this._getTextboxName() } { ...other } value={ textboxvalue } onBlur={ this._handleTextboxBlur } onChange={ this._handleTextboxChange }>
                  { this._renderDownButton() }
                </Textbox>
              :
                <App.Panel className="ui-control-textbox-container" layout="horizontal" align="stretch">
                  <App.Panel ratio="1" onClick={ this._handleButtonClick }>
                    { values }
                  </App.Panel>
                  { this._renderDownButton() }
                </App.Panel>
            }
            { this.state.expanded && Object.keys(listdata).length > 0 && 
              <Listbox data={ listdata } style={{ maxHeight: "200px", display: "block", height: "auto" }} onChange={ this._handleListboxChange } multiselect={ multiselect } name={ this.props.name + "-listbox" } />
            }
          </App.Panel>
        );
    },
    
    _close: function(cb) {      
      this.setState({ expanded: false, textboxvalue: undefined, selected: undefined }, function() {
        if (cb) cb();
      })
    },
    
    _expand: function() {
      this.setState({ expanded: true }, function() {
        var textfield = document.getElementsByName(this.props.name)[0];
        textfield.focus();
        textfield.select();
      })
    },
    
    _handleButtonClick: function(event) {
      if (this.state.expanded) this._handleTextboxBlur(); else this._expand();
    },
    
    _handleEnterKey: function(event) {
      var self = this;
      
      if (!this.state.selected) {
        this._handleTextboxBlur();
      } else if (!this.props.multiple) {
        var selected = this.state.selected;
        this._close(function() {
          if (self.props.onChange) self.props.onChange(selected);
        });
      }
    },
    
    _nextItem: undefined,
    
    _previousItem: undefined,
    
    _selectListboxItem: function(item) {
      if (item) {
        var self = this;
        this.setState({ selected: item }, function() {
          var textfield = document.getElementById(self._getTextboxName());
          textfield.value = self.props.data[item].title;
          textfield.focus();
          textfield.select();
        });
      }
    },
    
    _handleDownKey: function(event) {
      this._selectListboxItem(this._nextItem);
    },
    
    _handleUpKey: function(event) {
      this._selectListboxItem(this._previousItem);
    },
    
    _handleKeyDown: function(event) {
      if (event && this[keyHandlers[event.which]]) this[keyHandlers[event.which]](event);
    },
    
    _handleTextboxChange: function(value) {
      if(setStateTimeout) clearTimeout(setStateTimeout)
      var self = this;
      
      setStateTimeout = setTimeout(function() {
        self.setState({ textboxvalue: value, selected: undefined  });  
      }, SETSTATE_TIMEOUT);
    },
    
    _handleTextboxBlur: function() {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      blurTimeout = setTimeout(function() {
        var field = document.getElementsByName(self.props.name)[0];
        if (field == undefined) return;
        var currentValue = field.value;
        
        var changed = false;
        var value = [];
        
        Object.keys(self.props.data).forEach(function(key) {
          if (currentValue === self.props.data[key].title) {
            if (!self.props.data[key].selected) changed = true;
            value.push(key);
          } else if (self.props.multiple && self.props.data[key].selected) {
            value.push(key);
          }
        });
        
        self._close(function() {
          if (changed && self.props.onChange) { self.props.onChange(value.length == 1 ? value[0] : value) }
        });
      }, BLUR_TIMEOUT);
    },
    
    _handleListboxChange: function(value) {
      var self = this;
      if (blurTimeout) clearTimeout(blurTimeout);
      if (!this.props.multiple) this._close(function() {
        if (self.props.onChange) self.props.onChange(value);
      });
    }
  })