var React = require("react/addons");
var objectAssign = require("object-assign");

var Container = React.createClass({
  render: function() {
    var result = (this.props.element ?
        <this.props.element { ...this.props }>
          { this.props.children }
        </this.props.element>
      :
        <div { ...this.props }>
          { this.props.children }
        </div>);
  
    return result;
  }
});

function simpleLayout(orientation, classNames) {
  var { justify, align, element, ...other } = this.props;
  
  var sizeFunction = function(child) {    
    var result = {
      className: base.extendClassNameWith("applayout-item", ""),
      style: { }
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
  
  justify = justify ? justify : "start";
  align = align ? align : "start";
  
  classNames = base.extendClassNameWith("applayout-" + orientation, classNames)
  classNames = base.extendClassNameWith("applayout-justify-" + justify, classNames)
  classNames = base.extendClassNameWith("applayout-alignitems-" + align, classNames) 

  var content = React.Children.map(this.props.children, function(child, index) {
      if (child && child.props) {
        var extraProps = sizeFunction(child);
        if (child.props.key) extraProps.key = child.props.key;
        if (child.props.ref) extraProps.ref = child.props.ref;
        return React.addons.cloneWithProps(child, objectAssign(extraProps, { size: undefined, ratio: undefined }));
      } else {
        return child;
      }
    });

  return (
    <Container { ...other } className={ classNames }>
      { content }
    </Container>
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
              <Container { ...this.props } className={ classNames } >{ this.props.children }</Container>
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
        );
      }
    }
  }
}

var App = React.createClass({  
    getDefaultProps: function() {
      return {
        layout: Object.keys(options.layouts)[0],
        align: "stretch",
        scrollable: false
      }
    },
    
    render: function() {
      var className = this.props.className;
      if (this.props.scrollable) {
        className = base.extendClassNameWith("application", className);
        className = base.extendClassNameWith("applayout-scroll", className);
      }
      
      return options.layouts[this.props.layout].render.call(this, className);
    }
  });

App.Panel = React.createClass({    
    getDefaultProps: function() {
      return {
        layout: Object.keys(options.layouts)[0],
        scrollable: false,
        align: "stretch",
        style: { },
        element: undefined
      }
    },
    
    render: function() {
      var className = this.props.className;
      if (this.props.scrollable) {
        className = base.extendClassNameWith("applayout-scroll", className);
      }
      
      return options.layouts[this.props.layout].render.call(this, base.extendClassNameWith("applayout-panel", className));
    }
  });
  
App.Modal = React.createClass({
  render: function() {
    var { className, ...other } = this.props;
    return (<div className={ this._getClassName() } { ...other } />);
  },
  
  _getClassName: function() {
    var 
      cx = React.addons.classSet,
      className = this.props.className,
      classes = {
        "ui-modal": true
      };
      
    if (className) { classes[className] = true; }      
    return cx(classes);
  }
});
  

var base = {
  
  extendClassNameWith: function(className, classNames) {
    return (className ? (options.common.prefix + className) : "") + (classNames ? " " + classNames : "");
  },
  
  options: options,
  
  App: App,
  
}


module.exports = base;