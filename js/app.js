var React = require("react/addons");

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
      result["style"][property] = child.props.size + "px";
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
  
  return (
      <div className={ extendClassNameWith("applayout-" + orientation, classNames) } style={ this.props.style }>{ children }</div>
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
              <App.Panel layout="horizontal" ratio={ this.props.mainRatio } size={ this.props.mainSize }>
                { left }
                { center }
                { right }
              </App.Panel>
            )
          
        }
        
        return (
          <App.Panel layout="vertical" className={ extendClassNameWith("applayout-border", className) } style={ this.props.style }>
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
        style: { }
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
        style: { }
      }
    },
    
    render: function() {
      return options.layouts[this.props.layout].render.call(this, extendClassNameWith("applayout-panel", this.props.className));
    }
  });
  
  
  
React.render(<App className="myApp" layout="border">
  <App.Panel position="top" size="100" style={ { backgroundColor: "#ff0000" } }>Hallo Freunde</App.Panel>
  <App.Panel position="left" ratio="1">LEFT</App.Panel>
  <App.Panel position="center" style={ { backgroundColor: "#00ff00" } } ratio="5">Sooo</App.Panel>
</App>, document.body);