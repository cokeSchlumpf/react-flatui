var React = require("react/addons");
var base = require("./base");
var options = base.options;
var App = base.App;

module.exports = React.createClass({
    propTypes: {
      name: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func,
      rows: React.PropTypes.number,
      value: React.PropTypes.string,
      type: React.PropTypes.string
    },
    
    // Unfortunately we need a focus state information in case we want to mark the container as focused since their is no CSS parent selector.
    getInitialState: function() {
        return {
          focused: false
        }
    },
    
    getDefaultProps: function() {
      return {
        rows: 1,
        type: "text",
        onChange: function(newValue) { console.log(newValue); }
      };
    },
    
    render: function() {
      var { onChange, className, value, defaultValue, rows, children, ...other } = this.props;
      var 
        cx = React.addons.classSet,
        output,
        textbox, 
        classes = {
          "ui-control": children == undefined,
          "ui-control-textbox": true
        },
        containerClasses = {
          "ui-control": true,
          "ui-control-textbox-container": true,
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
          { ...other } 
          id={ this.props.id ? this.props.id : this.props.name } 
          defaultValue={ defaultValue ? defaultValue : value }
          value={ value ? value : undefined } />
      } else {
        textbox = <textarea 
          className={ cx(classes) } 
          onChange={ this._onChangeHandler } 
          onFocus={ this._onFocusHandler } 
          onBlur={ this._onBlurHandler } 
          { ...other } 
          id={ this.props.id ? this.props.id : this.props.name } 
          defaultValue={ defaultValue ? defaultValue : value }
          value={ value ? value : undefined }
          rows={ this.props.rows } />
      }
      
      if (children) {
        output = 
          <App.Panel layout="horizontal" className={ cx(containerClasses) } align="stretch">
            <App.Panel layout="vertical" size="auto" className={ cx(controlsClasses) }>
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
            <App.Panel layout="vertical" size="auto" className={ cx(controlsClasses) }>
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
      
      return output;
    },
    
    _onChangeHandler: function(event) {
      this.props.onChange(event.target.value, event);
    },
    
    _onFocusHandler: function(event) {
      if (this.props.children) { // Only if we have a container
        this.setState({focused: true});
      }
      
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    },
    
    _onBlurHandler: function(event) {
      if (this.props.children) {
        this.setState({focused: false});
      }
      
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }
  })