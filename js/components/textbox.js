var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var Listbox = require("./listbox");

var BLUR_TIMEOUT = 100;
var blurTimeout;

var keyHandlers = {
  38: '_handleUpKey',
  40: '_handleDownKey',
  13: '_handleEnterKey',
  27: '_handleEscKey'
}

module.exports = React.createClass({
    propTypes: {
      autocompleteList: React.PropTypes.array,
      autocompleteMode: React.PropTypes.string, // none, startsWith or contains
      name: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func,
      rows: React.PropTypes.number,
      type: React.PropTypes.string,
      value: React.PropTypes.string
    },
    
    // Unfortunately we need a focus state information in case we want to mark the container as focused since their is no CSS parent selector.
    getInitialState: function() {
        return {
          focused: false,
          autocompleteSelected: undefined
        }
    },
    
    getDefaultProps: function() {
      return {
        autocompleteList: [],
        autocompleteMode: "contains",
        onChange: function(newValue) { console.log(newValue); },
        rows: 1,
        type: "text"
      }
    },
    
    render: function() {
      var { autocompleteList, autocompleteMode, onChange, className, value, defaultValue, rows, children, name, ...other } = this.props;
      var 
        cx = React.addons.classSet,
        autocompleteData = this._getAutocompleteData(),
        output,
        textbox, 
        
        baseContainerClasses = {
          "ui-control": true,
          "ui-control-textbox-container": true
        },
        
        classes = {
          "ui-control-textbox": true
        },
        containerClasses = {
          "ui-control-textbox-container-inner": true,
          "ui-control-textbox-container-focused": this.state.focused
        },
        controlsClasses = {
          "ui-control-textbox-control": true  
        };

      if (className) { 
        classes[className] = children == undefined;
        containerClasses[className] = true;
      }
      
      if (Object.keys(autocompleteData).length > 0) {
        var keys = Object.keys(autocompleteData);
        
        if (this.state.autocompleteSelected) {
          var index = keys.indexOf(this.state.autocompleteSelected);
          this._nextItem = index < keys.length - 1 ? keys[index + 1] : undefined;
          this._previousItem = index > 0 ? keys[index - 1] : undefined;
        } else {
          this._nextItem = keys[0];
          this._previousItem = undefined;
        }
      } else {
        this._nextItem = undefined;
        this._previousItem = undefined;
      }
      
      if (rows == 1) {
        textbox =  <input 
          className={ cx(classes) } 
          onChange={ this._onChangeHandler } 
          onFocus={ this._onFocusHandler } 
          onBlur={ this._onBlurHandler } 
          name={ this.props.name }
          id={ this.props.id ? this.props.id : this.props.name } 
          defaultValue={ defaultValue }
          value={ this.state.autocompleteSelected ? this.state.autocompleteSelected : value } 
          autoComplete="off"
          placeholder={ this.props.placeholder } />
      } else {
        textbox = <textarea 
          className={ cx(classes) } 
          onChange={ this._onChangeHandler } 
          onFocus={ this._onFocusHandler } 
          onBlur={ this._onBlurHandler } 
          name={ this.props.name }
          id={ this.props.id ? this.props.id : this.props.name } 
          defaultValue={ defaultValue}
          value={ value }
          rows={ this.props.rows }
          placeholder={ this.props.placeholder } />
      }
      
      if (children) {
        output = 
          <App.Panel layout="horizontal" className={ cx(containerClasses) } align="stretch">
            <App.Panel layout="vertical" size="auto" justify="center" align="center" className={ cx(controlsClasses) }>
              {
                React.Children.map(children, function(child, index) {
                    if (child && child.props.position == "left") {
                      return child;
                    } else {
                      return undefined;
                    }
                  })
              }
            </App.Panel>
            { textbox }
            <App.Panel layout="vertical" size="auto" justify="center" align="center" className={ cx(controlsClasses) }>
              {
                React.Children.map(children, function(child, index) {
                    if (child && child.props.position != "left") {
                      return child;
                    } else {
                      return undefined;
                    }
                  })
              }
            </App.Panel>
          </App.Panel>
      } else {
        output = textbox;
      }
      
      return (
          <App.Panel layout="vertical" { ...other } className={ cx(baseContainerClasses) } size="auto" onKeyDown={ this._handleKeyDown }>
            { output }
            { this.state.focused && Object.keys(autocompleteData).length > 0 && rows == 1 &&
              <Listbox value={ autocompleteData } style={{ maxHeight: "200px", display: "block", height: "auto" }} onChange={ this._handleListboxChange } name={ this.props.name + "-listbox" } />              
            }
          </App.Panel>
        );
    },
    
    // Currently not used due to strange errors with React ...
    _getHighlightedText: function(id, s, h) {
      var
        before,
        after, 
        index = s.indexOf(h);
        
      if (index < 0) return s;
      
      before = index > 0 ? s.substring(0, index) : "";
      after = s.substring(index + h.length);
      
      return <span id={id} dangerouslySetInnerHTML={{ __html: before + "<b>" + h + "</b>" + after }} />
    },
    
    _getAutocompleteData: function() {
      var 
        i,
        list = this.props.autocompleteList,
        mode = this.props.autocompleteMode,
        value = this.props.value,
        output = {};
        
      for (i = 0; i < list.length; i++) {
        var item = list[i];
        
        switch(mode) {
          case "none":
            output[item] = { title: item };
            break;
          case "contains":
            if (item.indexOf(value) > -1) output[item] = { title: item };
            break;
          case "startsWith":
            if (item.indexOf(value) == 0) output[item] = { title: item };
            break; 
        }
        
        if (output[item]) output[item].selected = (item == this.state.autocompleteSelected);
      }
      
      if (Object.keys(output).length == 1 && output[value]) {
        output = {};
      }
      
      return output;
    },
    
    _select: function() {
      textfield = document.getElementById(this.props.name);
      textfield.focus();
      textfield.select();
    },
    
    _handleListboxChange: function(value, selected) {
      if (blurTimeout) clearTimeout(blurTimeout);
      var self = this;
      
      this.setState({ autocompleteSelected: undefined }, function() {
        if (this.props.onChange) this.props.onChange(selected);
      });
      
      this._select();
    },
    
    _nextItem: undefined,
    
    _previousItem: undefined,
    
    _selectListboxItem: function(item) {
      if (item) {
        this.setState({ autocompleteSelected: item }, this._selectTextbox)
      }
    },
    
    _handleDownKey: function(event) {
      this._selectListboxItem(this._nextItem);
    },
    
    _handleUpKey: function(event) {
      this._selectListboxItem(this._previousItem);
    },
    
    _handleEnterKey: function(event) {
      if (this.state.autocompleteSelected) {
        var self = this;
        var selected = this.state.autocompleteSelected;
        
        this.setState({ autocompleteSelected: undefined }, function() {
          if (self.props.onChange) self.props.onChange(selected, event);
          self._select();
        });
      }  
    },
    
    _handleEscKey: function(event) {
      if (this.state.autocompleteSelected) {
        var self = this;
        var selected = this.state.autocompleteSelected;
        
        this.setState({ autocompleteSelected: undefined }, function() {
          self._select();
        });
      }  
    },
    
    _handleKeyDown: function(event) {
      if (event && this[keyHandlers[event.which]]) {
        this[keyHandlers[event.which]](event);
        event.preventDefault();
      }
    },
    
    _onChangeHandler: function(event) {
      if (this.props.onChange) this.props.onChange(event.target.value, event);
    },
    
    _onFocusHandler: function(event) {
      var self = this;
      
      this.setState({focused: true});
      
      if (self.props.onFocus) self.props.onFocus(event);
    },
    
    _onBlurHandler: function(event) {
      var self = this;
      if (blurTimeout) clearTimeout(blurTimeout);
      
      blurTimeout = setTimeout(function() {
        var selected = self.state.autocompleteSelected;
        
        self.setState({focused: false, autocompleteSelected: undefined });
        if (selected && self.props.onChange) {
          self.props.onChange(selected);
        }
        if (self.props.onBlur) {
          self.props.onBlur(event);
        }
      }, BLUR_TIMEOUT);
    }
  })