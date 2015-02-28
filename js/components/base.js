var React = require("react/addons");

function simpleLayout(orientation, classNames) {
  var sizeFunction = function(child) {
    var result = {
      className: base.extendClassNameWith("applayout-item", ""),
      style: child.props.style ? child.props.style : { }
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
      return React.addons.cloneWithProps(child, sizeFunction(child));
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
    none: {
      render: function(className) {
          classNames = base.extendClassNameWith("applayout-none", className)
          
          return (
              <div { ...this.props }className={ classNames } >{ this.props.children }</div>
            );
      }
    },
    
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
              case "top": 
                top.push(child); 
                break;
              case "left": 
                left.push(child); 
                break;
              case "bottom": 
                bottom.push(child); 
                break;
              case "right": 
                right.push(child); 
                break;
              case "center": 
                center.push(child); 
                break;
            }
          }
          
        })
        
        if (left.length > 0 || center.length > 0 || right.length > 0) {
          var middleRatio = undefined;
          var middleSize = undefined;
          
          var centerRatio = undefined;
          var centerSize = undefined;
          
          // Calculate the default ratio/ size for the middle panel
          if (this.props.mainSize) {
            middleSize = this.props.mainSize;
          } else if (this.props.mainRatio) {
            middleRatio = this.props.mainRatio;
          } else {
            middleRatio = 6 - top.length - bottom.length;
          }
          
          // Calculate the default ratio of the center panel
          if (center.length > 0 && center[0].props.size) {
            centerSize = center[0].props.size;
          } else if (center.length > 0 && center[0].props.ratio) {
            centerRatio = center[0].props.ratioM
          } else if (center.length > 0 && !center[0].props.size && !center[0].props.ratio) {
            centerRatio = 6 - left.length - right.length;
          }
          
          middle = (
              <App.Panel layout="horizontal" ratio={ middleRatio } size={ middleSize } align="stretch">
                { left }
                { center.length > 0 ? React.addons.cloneWithProps(center[0], { ratio: centerRatio, size: centerSize }) : center  }
                { right }
              </App.Panel>
            )
          
        }
        
        return (
          <App.Panel layout="vertical" className={ base.extendClassNameWith("applayout-border", className) } style={ this.props.style } align="stretch">
              { top }
              { middle }
              { bottom }
          </App.Panel>
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
      return options.layouts[this.props.layout].render.call(this, base.extendClassNameWith("application", this.props.className));
    }
  });

App.Panel = React.createClass({    
    getDefaultProps: function() {
      return {
        layout: Object.keys(options.layouts)[0],
        scrollable: false,
        align: "stretch",
        style: { }
      }
    },
    
    render: function() {
      var className = this.props.className;
      if (this.props.scrollable) {
        console.log("scrollable")
        className = base.extendClassNameWith("applayout-scroll", className);
        console.log(className);
      }
      
      return options.layouts[this.props.layout].render.call(this, base.extendClassNameWith("applayout-panel", className));
    }
  });
  

var base = {
  
  extendClassNameWith: function(className, classNames) {
    return (className ? (options.common.prefix + className) : "") + (classNames ? " " + classNames : "");
  },
  
  options: options,
  
  App: App
  
}


module.exports = base;