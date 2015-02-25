var React = require("react/addons");

function simpleLayout(orientation, classNames) {
  var sizeFunction = function(child) {
    var result = {
      className: base.extendClassNameWith("applayout-item", ""),
      style: { 
        
      }
    }
    
    if (child && child.props && child.props.size) {
      var property = orientation === "vertical" ? "height" : "width";
      result["style"][property] = child.props.size + (isNaN(parseInt(child.props.size)) ? "" : "px");
    } else if (child && child.props && child.props.ratio) {
      result.className = base.extendClassNameWith("applayout-item-fixed-" + child.props.ratio, result.className);
    } else {
      result.className = base.extendClassNameWith("applayout-item-fixed-1", result.className);
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
  
  classNames = base.extendClassNameWith("applayout-" + orientation, classNames)
  classNames = base.extendClassNameWith("applayout-justify-" + justify, classNames)
  classNames = base.extendClassNameWith("applayout-alignitems-" + align, classNames) 
  
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
              <Panel layout="horizontal" ratio={ this.props.mainRatio } size={ this.props.mainSize } align="stretch">
                { left }
                { center.length > 0 ? (center[0].props.size ? center : center[0].props.ratio ? center : React.addons.cloneWithProps(center[0], { ratio: 4 })) : center  }
                { right }
              </Panel>
            )
          
        }
        
        return (
          <Panel layout="vertical" className={ extendClassNameWith("applayout-border", className) } style={ this.props.style } align="stretch">
              { top }
              { middle }
              { bottom }
          </Panel>
        )

        return (<div>Hallo</div>);
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
      return options.layouts[this.props.layout].render.call(this, base.extendClassNameWith("applayout-panel", this.props.className));
    }
  });
  

var base = {
  
  extendClassNameWith: function(className, classNames) {
    return options.common.prefix + className + " " + classNames;
  },
  
  options: options,
  
  App: App
  
}


module.exports = base;