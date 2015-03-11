var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;
var Listbox = require("./listbox");

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
      var { autocompleteList, autocompleteMode, onChange, className, value, defaultValue, rows, children, ...other } = this.props;
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
      
      if (rows == 1) {
        textbox =  <input 
          className={ cx(classes) } 
          onChange={ this._onChangeHandler } 
          onFocus={ this._onFocusHandler } 
          onBlur={ this._onBlurHandler } 
          id={ this.props.id ? this.props.id : this.props.name } 
          defaultValue={ defaultValue }
          value={ value ? value : undefined } 
          autoComplete="off" />
      } else {
        textbox = <textarea 
          className={ cx(classes) } 
          onChange={ this._onChangeHandler } 
          onFocus={ this._onFocusHandler } 
          onBlur={ this._onBlurHandler } 
          id={ this.props.id ? this.props.id : this.props.name } 
          defaultValue={ defaultValue}
          value={ value ? value : undefined }
          rows={ this.props.rows } />
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
          <App.Panel layout="vertical" { ...other } className={ cx(baseContainerClasses) } size="auto">
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
            output[i] = { title: item };
            break;
          case "contains":
            if (item.indexOf(value) > -1) output[i] = { title: item };
            break;
          case "startsWith":
            if (item.indexOf(value) == 0) output[i] = { title: item };
            break; 
        }
      }
      
      return output;
    },
    
    _handleListboxChange: function(value, clicked) {
      
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value, event);
    },
    
    _onFocusHandler: function(event) {
      this.setState({focused: true});
      
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    },
    
    _onBlurHandler: function(event) {
      this.setState({focused: false});
      
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }
  })