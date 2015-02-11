var React = require("react/addons");


/**
  * Flat UI
  */
function extendClassNameWith(className, classNames) {
  return options.common.prefix + className + " " + classNames;
}

function simpleLayout(orientation, classNames) {
  var sizeFunction = function(child) {
    var result = {
      className: extendClassNameWith("applayout-item", ""),
      style: { 
        
      }
    }
    
    if (child && child.props && child.props.size) {
      var property = orientation === "vertical" ? "height" : "width";
      result["style"][property] = child.props.size + (isNaN(parseInt(child.props.size)) ? "" : "px");
    } else if (child && child.props && child.props.ratio) {
      result.className = extendClassNameWith("applayout-item-fixed-" + child.props.ratio, result.className);
    } else {
      result.className = extendClassNameWith("applayout-item-fixed-1", result.className);
    }
    
    return result;
  }
  
  var children = React.Children.map(this.props.children, function(child, index) {
    if (child.props) {
      return React.addons.cloneWithProps(child, sizeFunction(child))
    } else {
      return child;
    }
  })
  
  var justify = this.props.justify ? this.props.justify : "start";
  var align = this.props.align ? this.props.align : "start";
  
  classNames = extendClassNameWith("applayout-" + orientation, classNames)
  classNames = extendClassNameWith("applayout-justify-" + justify, classNames)
  classNames = extendClassNameWith("applayout-alignitems-" + align, classNames) 
  
  return (
      <div {...this.props} className={ classNames }>{ children }</div>
    );
}

var options = {
  
  common: {
    prefix: "pbm-"
  },

  layouts: {
    vertical: {
      render: function(className) {
        return simpleLayout.call(this, "vertical", className)
      }
    },
    
    horizontal: {
      render: function(className) {
        return simpleLayout.call(this, "horizontal", className)
      }
    },
    
    border: {
      render: function(className) {
        var top = [], left = [], right = [], center = [], bottom = [], middle = undefined;
        
        React.Children.forEach(this.props.children, function(child, index) {
          if (child && child.props) {
            switch (child.props.position) {
              case "top": top.push(child); break;
              case "left": left.push(child); break;
              case "bottom": bottom.push(child); break;
              case "right": right.push(child); break;
              case "center": center.push(child); break;
            }
          }
          
        })
        
        if (left.length > 0 || center.length > 0 || right.length > 0) {
          middle = (
              <App.Panel layout="horizontal" ratio={ this.props.mainRatio } size={ this.props.mainSize } align="stretch">
                { left }
                { center.length > 0 ? (center[0].props.size ? center : center[0].props.ratio ? center : React.addons.cloneWithProps(center[0], { ratio: 4 })) : center  }
                { right }
              </App.Panel>
            )
          
        }
        
        return (
          <App.Panel layout="vertical" className={ extendClassNameWith("applayout-border", className) } style={ this.props.style } align="stretch">
              { top }
              { middle }
              { bottom }
          </App.Panel>
        )
      }
    }
  }
}

var App = React.createClass({  
    getDefaultProps: function() {
      return {
        layout: Object.keys(options.layouts)[0],
        align: "stretch"
      }
    },
    
    render: function() {
      return options.layouts[this.props.layout].render.call(this, extendClassNameWith("application", this.props.className));
    }
  });

App.Panel = React.createClass({    
    getDefaultProps: function() {
      return {
        layout: Object.keys(options.layouts)[0],
        align: "stretch",
        style: { }
      }
    },
    
    render: function() {
      return options.layouts[this.props.layout].render.call(this, extendClassNameWith("applayout-panel", this.props.className));
    }
  });
  
App.Titlebar = React.createClass({
  getDefaultProps: function() {
    return { 
      layout:   "horizontal",
      size:     "20",
      justify:  "space-between",
      align:    "center"
    }
  },
  
  render: function() {
    var className = this.props.className;
    
    return (
        <App.Panel { ...this.props } className={ extendClassNameWith("titlebar", className) }>{ this.props.children }</App.Panel>
      );
  }
})

App.Text = React.createClass({
  render: function() {
    return (
        <div { ...this.props }>{ this.props.children }</div>
      );
  }
})

App.Toolbar = React.createClass({
  getDefaultProps: function() {
    return {
      layout:   "horizontal",
      size:     "100",
      justify:  "start",
      align:    "center"
    }
  },
  
  render: function() {
    var className = this.props.className;
    
    return (
        <App.Panel { ...this.props } className={ extendClassNameWith("toolbar", className) }>{ this.props.children }</App.Panel>
      );
  }
})

App.Form = React.createClass({
  render: function() {
    return (<form { ...this.props }>{ this.props.children }</form>);
  }
})

App.Form.Textfield = React.createClass({
  
  getDefaultProps: function() {
    return {
      layout:   "horizontal",
      justify:  "space-between",
      align:    "center",
      size:     "auto"
    }
  },
  
  render: function() {
    var 
      className = extendClassNameWith("control", this.props.className),
      label = undefined;
  
    if (this.props.label) {
      label = <label forName={ this.props.id } ratio="1">{ this.props.label }</label>
    }
    
    return (
        <App.Panel layout={ this.props.layout } className={ className } ratio={ this.props.ratio } size={ this.props.size }>
          { label }
          <input type="text" name={ this.props.id } defaultValue={ this.props.value } ratio="4" />
        </App.Panel>
      );
  }
})

module.exports = App;